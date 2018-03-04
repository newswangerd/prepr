import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Platform } from 'react-native'

import ShopView from './components/ShopView'
import MasterView from './components/MasterView'

const tabBarOptions = Platform.OS === 'ios' ?
  {
    // iOS tabBarOptions
    showLabel: true
  } : {
    // Android tabBarOptions
    showIcon: true,
    showLabel: true
  }

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class RecipesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class ShopListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
}

export default TabNavigator({
  Recipes: {
    screen: RecipesScreen

  },

  Home: { screen: HomeScreen },
  Shop: {screen: ShopListScreen}
},
{
  tabBarPosition: 'bottom',
}
);
