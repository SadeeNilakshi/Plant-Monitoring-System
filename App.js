import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LiveDataScreen from './screens/LiveDataScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2B2D42', 
            height: 50, 
          },
          headerTitleStyle: {
            fontSize: 18, 
          },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LiveData" component={LiveDataScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


