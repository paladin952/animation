import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native';

const UsernameText = styled.Text`
  font-size: 16;
  color: gray;
`;

export const Flex = styled.View`
  flex: 1;
`;

export const Page = ({children}) => {
  return (
    <Container>
      <Container>{children}</Container>
      <UsernameText>Follow</UsernameText>
      <UsernameText>@remoteokjobs</UsernameText>
      <UsernameText>@the.mobiledeveloper</UsernameText>
      <SafeAreaView />
    </Container>
  );
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Horizontal = styled.View`
  flex-direction: row;
`;

export const Vertical = styled.View`
  flex-direction: column;
`;
