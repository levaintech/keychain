/* eslint-disable */
const path = require('node:path');
const fs = require('node:fs/promises');
const watcher = require('@parcel/watcher');
const { getDefaultConfig } = require('expo/metro-config');
const { default: tailwindrn } = require('tailwind-rn/dist/build');
const tailwind = require('tailwindcss');
const postcss = require('postcss');

/**
 * NODE_ENV=development will enable watch mode that rebuilds tailwind.json on file changes.
 */
module.exports = (async () => {
  const config = getDefaultConfig(__dirname);
  config.resolver.blockList = /^.+\.e2e\.ts$/;
  await postCSS(process.env.NODE_ENV === 'development');
  return config;
})();

/**
 * Process and build `tailwind.json` the file.
 *
 * @param watch {boolean} watch mode
 */
async function postCSS(watch) {
  const processor = postcss([
    tailwind({
      corePlugins: require('tailwind-rn/unsupported-core-plugins'),
      content: ['./app/**/*.{js,jsx,ts,tsx}'],
      theme: {
        fontFamily: {
          mono: ['JetBrainsMono'],
        },
        extend: {},
      },
      plugins: [],
    }),
  ]);

  const filePath = path.join(__dirname, 'tailwind.json');
  async function process() {
    const result = await processor.process(`@tailwind utilities;`);
    const utilities = tailwindrn(result.css);
    const content = JSON.stringify(utilities);
    await fs.writeFile(filePath, content);
  }

  await process();

  if (watch) {
    await watcher.subscribe(path.join(__dirname, 'app'), process);
  }
}
