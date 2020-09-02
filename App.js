import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {PulseAnimation} from './src/PulseAnimation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView />
      <Stack.Navigator>
        <Stack.Screen name="Pulse Animation" component={PulseAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
