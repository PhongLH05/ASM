import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Screen/LoginScreen';
import Splash from './Screen/Splash';
import SignUpScreen from './Screen/SignUpScreen';
import HomeScreen from './Screen/HomeScreen'
import Tab from './tabs/Tab';
import CartScreen from './Screen/CartScreen';
import FavoriteScreen from './Screen/FavoriteScreen';
import SettingScreen from './Screen/SettingScreen';
import ProductDetails from './Screen/ProductDetails';




export default function App() {

  const Stack = createStackNavigator();


  return (
   
      <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash' screenOptions={{headerShown: false}}>

      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='Splash' component={Splash} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
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

      </Stack.Navigator>
    </NavigationContainer>
    
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
