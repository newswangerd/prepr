import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'; // Version can be specified in package.json
import { Platform } from 'react-native'

import ShopView from './components/ShopView'
import MasterView from './components/MasterView'
import HomeView from './components/HomeView'

const tabBarOptions = Platform.OS === 'ios' ?
  {
    // iOS tabBarOptions
    showLabel: true
  } : {
    // Android tabBarOptions
    showIcon: true,
    showLabel: true
  }

export default TabNavigator({
  Recipes: {screen: MasterView},
  Home: { screen: HomeView },
  Shop: {screen: ShopView},
},
{
  tabBarPosition: 'bottom',
}
);
