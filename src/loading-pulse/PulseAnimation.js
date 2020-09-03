/* eslint-disable no-shadow */
console.disableYellowBox = true;
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {StyleSheet, Animated, Easing} from 'react-native';
import {Container} from '../Containers';

const CircleWrapper = styled.View`
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const LoadingText = styled.Text`
  font-size: 20;
  height: 24;
  color: gray;
`;

const PulseAnimatedView = styled(Animated.View)`
  border-width: ${1 * StyleSheet.hairlineWidth};
  border-color: #1c1d1f;
  background-color: #d8d8d8;
`;

export const Pulse = ({interval, size = 110, pulseMaxSize = 250}) => {
  const [anim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(anim, {toValue: 1, duration: interval, easing: Easing.in}).start();
  }, [anim, interval]);

  return (
    <CircleWrapper>
      <PulseAnimatedView
        style={[
          {
            width: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            height: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [size, pulseMaxSize],
            }),
            borderRadius: pulseMaxSize / 2,
            opacity: anim.interpolate({inputRange: [0, 1], outputRange: [1, 0]}),
          },
        ]}
      />
    </CircleWrapper>
  );
};

export const PulseAnimation = ({intervalTime = 1000}) => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    setCircles((circles) => [...circles, 1]);
    const interval = setInterval(
      () => setCircles((circles) => [...circles, 1]),
      intervalTime,
    );
    return () => clearInterval(interval);
  }, [intervalTime]);

  return (
    <Container>
      {circles.map((circle, index) => (
        <Pulse key={index} interval={intervalTime} />
      ))}
      <LoadingText>Loading...</LoadingText>
    </Container>
  );
};
