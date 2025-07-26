import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen';
import SettingScreen from '../Screen/SettingScreen';
import CartScreen from '../Screen/CartScreen';
import { Ionicons } from '@expo/vector-icons';

import Icon from "react-native-vector-icons/FontAwesome";

const Tab = () => {

    const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 70,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Favorite") {
            iconName = "bookmark";
          } else if (route.name === "Cart") {
            iconName = "shopping-cart";
          } else if (route.name === "Setting") {
            iconName = "user";
          }

          return (
            <Icon
              name={iconName}
              size={26}
              color={focused ? "#000" : "#aaa"}
            />
          );
        },
      })}
    >
        <Tab.Screen name='Home' component={HomeScreen} 
  
        />
        <Tab.Screen name='Cart' component={CartScreen} />
        <Tab.Screen name='Favorite' component={FavoriteScreen} />
        <Tab.Screen name='Setting' component={SettingScreen} />
        
    </Tab.Navigator>
  )
}

export default Tab