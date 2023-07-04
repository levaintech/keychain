import { createIconSet } from '@expo/vector-icons';

import glyph from '../assets/fonts/AntDesign.json';
// @ts-ignore
import font from '../assets/fonts/AntDesign.ttf';

/**
 * A custom icon set that uses the AntDesign font.
 * This is created due to mono-repo bundling issues with the expo/vector-icons package.
 */
export const IconSet = createIconSet(glyph, 'AntDesign', font);
