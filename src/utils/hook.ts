import {Dimensions, ScaledSize} from 'react-native';
import {useEffect, useState} from 'react';

export const useWindowDimensions = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({
      window,
      screen,
    }: {
      window: ScaledSize;
      screen: ScaledSize;
    }) => {
      setScreenData(window);
    };

    Dimensions.addEventListener('change', onChange);

    return () => Dimensions.removeEventListener('change', onChange);
  });

  return {
    width: screenData.width,
    height: screenData.height,
    isLandscape: screenData.width > screenData.height,
  };
};
