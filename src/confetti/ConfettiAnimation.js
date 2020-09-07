/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {Animated, Easing, SafeAreaView} from 'react-native';
import {Page, FollowSection} from '../Containers';
import {crossPlatformElevation} from '../utils/StyleUtils';
import ConfettiCannon from 'react-native-confetti-cannon';

const Container = styled.View`
  flex: 1;
`;

const UsernameContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

const INTERVAL = 4300;
const COUNT = 300;

export const ConfettiAnimation = () => {
  const explosionRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => explode(), INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const explode = () => {
    if (explosionRef.current) {
      explosionRef.current.start();
    }
  };

  return (
    <Container>
      <ConfettiCannon
        ref={explosionRef}
        count={COUNT}
        origin={{x: -10, y: 0}}
        autoStart={false}
      />
      <UsernameContainer>
        <FollowSection />
      </UsernameContainer>
      <SafeAreaView />
    </Container>
  );
};
