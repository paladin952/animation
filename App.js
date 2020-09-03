import React from 'react';
import {SafeAreaView, StatusBar, ScrollView} from 'react-native';
import {PulseAnimation} from './src/loading-pulse/PulseAnimation';
import {HeartPulseAnimation} from './src/heart-pulse/HeartPulse';
import {LoadingAirplane} from './src/loading-airplane/LoadingAirplane';
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
      {renderRow('Heart Pulse', () => navigation.navigate('Heart Pulse'))}
      {renderRow('Loading Pulse', () => navigation.navigate('Loading Pulse'))}
      {renderRow('Loading Airplane', () => navigation.navigate('Loading Airplane'))}
    </ScrollView>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Stack.Navigator initialRouteName="Menu">
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Heart Pulse" component={HeartPulseAnimation} />
        <Stack.Screen name="Loading Pulse" component={PulseAnimation} />
        <Stack.Screen name="Loading Airplane" component={LoadingAirplane} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
