import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image } from 'react-native';
const platformOS = Platform.OS.toLowerCase();
import { createAppContainer } from 'react-navigation';

import AppContainer from './navigation/TabNavigator';

console.log("------------------------------------------------------------");
console.log(`RestaurantChooser starting on ${Platform.OS}`);
 
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}