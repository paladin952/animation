/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';
import {FollowSection} from '../Containers';

import LottieView from 'lottie-react-native';

const Container = styled.View`
  flex: 1;
`;

const UsernameContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-end;
`;

export const JumpingPin = () => {
  return (
    <Container>
      <LottieView source={require('./animation.json')} autoPlay loop />

      <UsernameContainer>
        <FollowSection />
      </UsernameContainer>
      <SafeAreaView />
    </Container>
  );
};
