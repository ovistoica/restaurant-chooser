import RestaurantsScreen from '../screens/RestaurantsScreen';
// import { PeopleScreen } from './screens/PeopleScreen';
// import { DecisionScreen } from './screens/DecisionScreen';
import { Constants } from 'expo-constants';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Platform, Image, StyleSheet, View, Text } from 'react-native';
import React from 'react';

const platformOS = Platform.OS.toLowerCase();

class PeopleScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>People!</Text>
      </View>
    );
  }
}

class DecisionScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Decision Time, Baby!</Text>
      </View>
    );
  }
}

const AppNavigator = createBottomTabNavigator(
  {
    PeopleScreen: {
      screen: PeopleScreen,
      navigationOptions: {
        tabBarLabel: 'People',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('../assets/images/people-icon.png')}
            style={{ ...imgStyle.container, tintColor: tintColor }} />
        )
      },
    },
    DecisionScreen: {
      screen: DecisionScreen,
      navigationOptions: {
        tabBarLabel: 'Decision',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('../assets/images/decision-icon.png')}
            style={{ ...imgStyle.container, tintColor: tintColor }} />
        )
      },
    },
    RestaurantsScreen: {
      screen: RestaurantsScreen,
      navigationOptions: {
        tabBarLabel: 'Restaurants',
        tabBarIcon: ({ tintColor }) => (
          <Image source={require('../assets/images/restaurants-icon.png')}
            style={{ ...imgStyle.container, tintColor: tintColor }} />
        )
      },
    },
  },
  {
    initialRouteName: "DecisionScreen", animationEnabled: true,
    swipeEnabled: true,
    backBehavior: "none", lazy: true,
    tabBarOptions: {
      activeTintColor: "#ff0000", showIcon: true,
      style: {
        paddingTop: platformOS === "android" ?
          Constants.statusBarHeight : 0
      }
    }
  }
);

const imgStyle = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
  }
});

const AppContainer = createAppContainer(AppNavigator);
export default AppContainer;