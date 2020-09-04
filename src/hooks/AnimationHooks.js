/* eslint-disable react-hooks/exhaustive-deps */
import {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

export const useFadeOut = (duration = 1000, interval = 0) => {
  const fadeOutAnimatedvalue = useRef(new Animated.Value(1)).current;

  const animate = () => {
    Animated.timing(fadeOutAnimatedvalue, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start(() => {
      fadeOutAnimatedvalue.setValue(1);
    });
  };

  useEffect(() => {
    let intervalObj;

    animate();
    if (interval > 0) {
      intervalObj = setInterval(() => {
        animate();
      }, interval);
    }
    return () => {
      if (intervalObj) {
        clearInterval(intervalObj);
      }
    };
  }, []);

  return fadeOutAnimatedvalue;
};
