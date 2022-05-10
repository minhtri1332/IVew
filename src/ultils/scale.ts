import {Dimensions, PixelRatio} from 'react-native';
import {isTablet} from 'react-native-device-info';

//Guideline sizes are based on iphone 6/7/8
export const guidelineBaseWidth = 375;
export const guidelineBaseHeight = 667;

let dims = Dimensions.get('screen');

export const isLandscape = () => dims.width > dims.height;

let screenWidth = dims.width;
let screenHeight = dims.height;
const [shortDimension, longDimension] =
  screenWidth < screenHeight
    ? [screenWidth, screenHeight]
    : [screenHeight, screenWidth];

export const screenShortDimension = shortDimension;
export const screenLongDimension = longDimension;

export const scaleFactor = shortDimension / guidelineBaseWidth;
export const vScaleFactor = longDimension / guidelineBaseHeight;

export const scale = (size: number) =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);
export const vScale = (size: number) =>
  PixelRatio.roundToNearestPixel(size * vScaleFactor);
export const fScale = (size: number, factor = 0.25) =>
  PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);

export const fontScale = (size: number) => Math.round(fScale(size, 0.25));
export const fontTabletScale = (size: number) => {
  if (isTablet()) {
    return fontScale(size);
  }
  return size;
};

export const fTabletScale = (size: number) => {
  if (isTablet()) {
    return fScale(size);
  }
  return size;
};

export const FORM_WIDTH = screenShortDimension <= 320 ? 250 : 300;
