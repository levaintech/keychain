/* eslint-disable */
const path = require('node:path');
const fs = require('node:fs/promises');
const watcher = require('@parcel/watcher');
const { getDefaultConfig } = require('expo/metro-config');
const { default: tailwindrn } = require('tailwind-rn/dist/build');
const tailwind = require('tailwindcss');
const postcss = require('postcss');

/**
 * METRO_CONFIG_JS_WATCH=true will enable watch mode that rebuild tailwind.json on file changes.
 * export METRO_CONFIG_JS_WATCH=true && expo start
 */
module.exports = (async () => {
  const config = getDefaultConfig(__dirname);
  config.resolver.blockList = /^.+\.e2e\.ts$/;
  await postCSS(process.env.METRO_CONFIG_JS_WATCH === 'true');
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

  async function process() {
    const result = processor.process(`@tailwind utilities;`);
    const utilities = tailwindrn(result.css);
    const content = JSON.stringify(utilities, null, '\t');
    await fs.writeFile(path.join(__dirname, 'tailwind.json'), content);
  }

  await process();

  if (watch) {
    await watcher.subscribe(path.join(__dirname, 'app'), process);
  }
}
