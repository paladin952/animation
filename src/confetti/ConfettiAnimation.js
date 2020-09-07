/* eslint-disable react-hooks/exhaustive-deps */
import React, {useRef, useEffect} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import {FollowSection} from '../Containers';
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
