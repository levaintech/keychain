/**
 * Run this script via `yarn run version "1.0.0"`.
 *
 * This script updates the app version in app.json by reading the version argument from the command line.
 * Together with GitHub workflows, this script is used to automate the versioning process.
 * - We use CalVer (https://calver.org/) for preview versioning.
 * - We use Major versioning for production releases. 1.0.0, 2.0.0, 3.0.0, etc.
 */
import { readFileSync, writeFileSync } from 'node:fs';

const version = process.argv[2];
if (!version) {
  console.error('Missing version argument');
  process.exit(1);
}

const config = JSON.parse(readFileSync('app.json', { encoding: 'utf-8' }));
config.expo.version = version;
writeFileSync('app.json', JSON.stringify(config, null, 2), { encoding: 'utf-8' });
