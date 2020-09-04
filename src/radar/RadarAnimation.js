/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Animated, Easing} from 'react-native';
import {Page} from '../Containers';
import {crossPlatformElevation} from '../utils/StyleUtils';
import {random} from '../utils/MathUtils';
import {useFadeOut} from '../hooks/AnimationHooks';

const MIN_AIRPLANES = 5;
const MAX_AIRPLANES = 10;
const DIAMETER = 300;
const MIN_AIRPLANE_POSITION = 50;
const MAX_AIRPLANE_POSITION = 200;

const Background = styled.View`
  width: ${DIAMETER}px;
  height: ${DIAMETER}px;
  border-radius: ${DIAMETER / 2}px;
  background-color: #f5f5f5;
  justify-content: center;
  align-items: center;
  ${crossPlatformElevation(10)};
`;

const AirplaneIcon = styled(Animated.Image).attrs({
  source: require('../assets/plane.png'),
  resizeMode: 'contain',
})`
  position: absolute;
  width: 15px;
  height: 15px;
`;

const LineAnimated = styled(Animated.View)`
  width: ${DIAMETER};
  flex-direction: row;
`;

const TransparentLine = styled.View`
  height: 3;
  width: ${DIAMETER / 2};
`;

const ColoredLine = styled.View`
  height: 3;
  width: ${DIAMETER / 2};
  background-color: green;
`;

const GreenDot = styled.View`
  background-color: green;
  width: 10;
  height: 10;
  border-radius: 5;
  position: absolute;
`;

const LineContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const INTERVAL = 3000;

const timingOptions = {
  toValue: 1,
  duration: INTERVAL,
  useNativeDriver: true,
  easing: Easing.linear,
};

const getRandomRotationPosition = () => {
  const rotationNumber = random(1, 3);
  return rotationNumber === 1 ? '0deg' : rotationNumber === 2 ? '90deg' : '-90deg';
};

const generatePositions = () => {
  const nrAirplanes = random(MIN_AIRPLANES, MAX_AIRPLANES);
  return [...Array(nrAirplanes)].map((_, i) => {
    return {
      x: random(MIN_AIRPLANE_POSITION, MAX_AIRPLANE_POSITION),
      y: random(MIN_AIRPLANE_POSITION, MAX_AIRPLANE_POSITION),
      rotate: getRandomRotationPosition(),
    };
  });
};

export const RadarAnimation = () => {
  const [positions, setPositions] = useState([]);
  const fadeOut = useFadeOut(INTERVAL, INTERVAL);
  const transformLineValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions(generatePositions());
    }, INTERVAL);
    setPositions(generatePositions());
    Animated.loop(Animated.timing(transformLineValue, timingOptions)).start();
    return () => clearInterval(interval);
  }, []);

  const Line = () => {
    return (
      <LineContainer>
        <LineAnimated style={[{transform: transformLine}]}>
          <TransparentLine />
          <ColoredLine />
        </LineAnimated>
      </LineContainer>
    );
  };

  const transformLine = [
    {
      rotate: transformLineValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
      }),
    },
  ];

  return (
    <Page>
      <Background>
        {positions.map((t) => (
          <AirplaneIcon
            style={{
              left: t.x,
              top: t.y,
              opacity: fadeOut,
              transform: [{rotate: t.rotate}],
            }}
          />
        ))}
        <Line />
        <GreenDot />
      </Background>
    </Page>
  );
};
