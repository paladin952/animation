import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {PulseAnimation} from './src/loadingpulse/PulseAnimation';
import {HeartPulseAnimation} from './src/heartpulse/HeartPulse';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Stack.Navigator initialRouteName="Heart Pulse">
        <Stack.Screen name="Heart Pulse" component={HeartPulseAnimation} />
        <Stack.Screen name="Loading Pulse" component={PulseAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
