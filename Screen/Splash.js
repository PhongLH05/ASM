import { View, Text, ImageBackground, StyleSheet, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/colors'
import { useNavigation } from '@react-navigation/native'
import { useFonts } from 'expo-font'

const Splash = () => {

    const nav = useNavigation();
    

  return (
    <View style={styles.container}>
        
      <ImageBackground 
        source={require("../assets/startpic.jpg")} 
        style={styles.image}
        resizeMode="cover"
        imageStyle={{transform: [{ scaleX: -1 }]}}
      >
        <View style={{marginBottom: 120}}>

        <Text style={[styles.text, {marginLeft: 20}]}>MAKE YOUR</Text>
        <Text style={{fontWeight:'700', fontSize: 30,marginLeft: 20}}>HOME BEAUTIFUL</Text>
        <Text style={{fontWeight:'400', fontSize: 18, marginLeft: 20 ,color: Colors.lightGrey, alignItems: 'center', letterSpacing: 2, gap: 4, padding: 20, lineHeight: 35}}>The best simple place where you discover most wonderful furnitures and make your home beautiful</Text>
        
        </View>
        <TouchableOpacity  style={styles.button} onPress={() => nav.navigate('LoginScreen')} >
            <Text style={{fontSize: 18, fontWeight: '600', color: 'white'}}>Get Started</Text>
        </TouchableOpacity>
        
      </ImageBackground>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center', 
    // alignItems: 'center',    
  },
  text: {
    color: Colors.grey,           
    fontSize: 24,
    fontWeight: '600',
  },
  button: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    padding: 12,
    marginTop: 24
  },
  

})

export default Splash


