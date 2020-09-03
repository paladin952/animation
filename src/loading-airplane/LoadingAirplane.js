/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import {Animated, Easing} from 'react-native';
import styled from 'styled-components/native';
import {Container} from '../Containers';

const DIAMETER = 150;

const AirplaneIcon = styled.Image.attrs({
  source: require('../assets/plane.png'),
  resizeMode: 'contain',
})`
  width: 35px;
  height: 35px;
`;

const Circle = styled.View`
  width: ${DIAMETER}px;
  height: ${DIAMETER}px;
  border-radius: ${DIAMETER / 2}px;
  border-width: 2;
  border-color: #3498db;
`;

const LoadingText = styled.Text`
  color: #3498db;
  position: absolute;
  width: 100%;
  text-align: center;
`;

const SquareAnimated = styled(Animated.View)`
  width: ${DIAMETER};
  height: ${DIAMETER};
`;

const LineAnimated = styled(Animated.View)`
  height: 1;
  align-items: center;
  justify-content: center;
`;

const timingOptions = {
  toValue: 1,
  duration: 3000,
  useNativeDriver: true,
  easing: Easing.linear,
};

export const LoadingAirplane = () => {
  const rotateXYAnimValue = useRef(new Animated.Value(0)).current;
  const pointingAnimValue = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  const outputRange1 = ['0deg', '360deg'];
  const outputRange2 = ['0deg', '-360deg'];

  useEffect(() => {
    animate();
  }, []);

  const animate = () => {
    Animated.loop(Animated.timing(rotateXYAnimValue, timingOptions)).start();
    Animated.loop(Animated.timing(pointingAnimValue, timingOptions)).start();
  };

  const createInterpolation = (animatedValue, inputRange, outputRange) => {
    return animatedValue.interpolate({inputRange, outputRange});
  };

  const transform1 = [
    {rotate: createInterpolation(rotateXYAnimValue, inputRange, outputRange1)},
  ];

  const transform2 = [
    {rotate: createInterpolation(rotateXYAnimValue, inputRange, outputRange2)},
  ];

  const transform3 = [
    {rotate: createInterpolation(pointingAnimValue, inputRange, outputRange1)},
  ];

  return (
    <Container>
      <Circle>
        <SquareAnimated style={[{transform: transform1}]}>
          <LineAnimated style={[{transform: transform2}]}>
            <Animated.View style={[{transform: transform3}]}>
              <AirplaneIcon />
            </Animated.View>
          </LineAnimated>
        </SquareAnimated>
      </Circle>

      <LoadingText>Loading...</LoadingText>
    </Container>
  );
};
