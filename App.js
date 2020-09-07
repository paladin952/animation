import React from 'react';
import {StatusBar, ScrollView} from 'react-native';
import {PulseAnimation} from './src/loading-pulse/PulseAnimation';
import {HeartPulseAnimation} from './src/heart-pulse/HeartPulse';
import {LoadingAirplane} from './src/loading-airplane/LoadingAirplane';
import {RadarAnimation} from './src/radar/RadarAnimation';
import {ConfettiAnimation} from './src/confetti/ConfettiAnimation';
import {JumpingPin} from './src/jumping-pin/JumpingPin';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import styled from 'styled-components/native';

const Stack = createStackNavigator();

const RowContainer = styled.TouchableOpacity`
  width: 100%;
  padding-top: 20;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
`;
const Title = styled.Text`
  font-size: 20;
`;

const Divider = styled.View`
  margin-top: 10;
  width: 100%;
  height: 1px;
  background-color: gray;
`;

const Menu = () => {
  const navigation = useNavigation();

  const renderRow = (text, onPress) => {
    return (
      <RowContainer onPress={onPress}>
        <Title>{text}</Title>
        <Divider />
      </RowContainer>
    );
  };

  return (
    <ScrollView>
      {renderRow('Loading Pulse', () => navigation.navigate('Loading Pulse'))}
      {renderRow('Heart Pulse', () => navigation.navigate('Heart Pulse'))}
      {renderRow('Loading Airplane', () => navigation.navigate('Loading Airplane'))}
      {renderRow('Radar Animation', () => navigation.navigate('Radar Animation'))}
      {renderRow('Confetti Animation', () => navigation.navigate('Confetti Animation'))}
      {renderRow('Jumping Pin', () => navigation.navigate('Jumping Pin'))}
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Heart Pulse" component={HeartPulseAnimation} />
        <Stack.Screen name="Loading Pulse" component={PulseAnimation} />
        <Stack.Screen name="Loading Airplane" component={LoadingAirplane} />
        <Stack.Screen name="Radar Animation" component={RadarAnimation} />
        <Stack.Screen name="Confetti Animation" component={ConfettiAnimation} />
        <Stack.Screen name="Jumping Pin" component={JumpingPin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
