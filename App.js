import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LoginScreen from './Screen/LoginScreen';
import Splash from './Screen/Splash';
import SignUpScreen from './Screen/SignUpScreen';
import HomeScreen from './Screen/HomeScreen'
import Tab from './tabs/Tab';
import CartScreen from './Screen/CartScreen';
import FavoriteScreen from './Screen/FavoriteScreen';
import SettingScreen from './Screen/SettingScreen';
import ProductDetails from './Screen/ProductDetails';
import AdminScreen from './Screen/AdminScreen';
import QLSPScreen from './Screen/QLSPScreen';

import store from './Redux/store/store'
import { Provider } from 'react-redux';




// Component để quản lý navigation dựa trên trạng thái auth
function AppNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator 
      initialRouteName='Splash'
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      
      {/* Protected routes */}
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen
        name="Tab"
        component={Tab}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='CartScreen' component={CartScreen} />
      <Stack.Screen name='FavoriteScreen' component={FavoriteScreen} />
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
      <Stack.Screen name='ProductDetails' component={ProductDetails} />
      <Stack.Screen name='AdminScreen' component={AdminScreen} />
      <Stack.Screen name='QLSPScreen' component={QLSPScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
