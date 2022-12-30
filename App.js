import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Weather from './app/screens/weather';
import { People } from './app/screens/people';

const Tab = createBottomTabNavigator()

export default class App extends React.Component {
  render () {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='People' component={People}/>
          <Tab.Screen name='Random Weather' component={Weather}/>
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    );
  }
}