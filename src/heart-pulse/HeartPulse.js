import React, {useRef} from 'react';
import styled from 'styled-components/native';
import {Animated, TouchableOpacity} from 'react-native';
import {Page} from '../Containers';

const AnimatedHearth = styled(Animated.View)`
  width: 100;
  height: 100;
`;

const HeartIcon = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 100%;
`;

export const HeartPulseAnimation = () => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const createAnimation = (toValue) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    });
  };

  const animate = () => {
    Animated.sequence([
      createAnimation(0.4),
      createAnimation(1),
      createAnimation(0.4),
      createAnimation(1),
    ]).start();
  };

  return (
    <Page>
      <TouchableOpacity onPress={animate}>
        <AnimatedHearth style={{transform: [{scale: animatedValue}]}}>
          <HeartIcon source={require('../assets/heart_full.png')} />
        </AnimatedHearth>
      </TouchableOpacity>
    </Page>
  );
};
