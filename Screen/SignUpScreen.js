import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
} from "react-native";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState('');
    const nav = useNavigation();
  
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ marginVertical: 10 }}>
            <View style={{ width: 100, height: 1, backgroundColor: "#000" }} />
          </View>
  
          <Image source={require("../assets/Logo.png")} style={{ margin: 12 }} />
  
          <View style={{ alignItems: "flex-end", marginVertical: 10 }}>
            <View style={{ width: 100, height: 1, backgroundColor: "#000" }} />
          </View>
        </View>
  
        <Text style={styles.subHeader}>WELCOME BACK</Text>
        <View style={styles.box} >
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 12}}>
            <Text style={{fontSize: 14, fontWeight: '600', color: '#909090'}}>Already have account? </Text>
            <Text onPress={() => nav.navigate('LoginScreen')} style={{fontSize: 14, fontWeight: '700'}}>SIGN IN</Text>
        </View>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
      // alignItems: "center",
      marginTop: 100,
      padding: 20,
      // backgroundColor: "#fff",
    },
  
    subHeader: {
      fontSize: 24,
      marginTop: 12,
      marginBottom: 20,
      fontWeight: "700",
    },
    input: {
      width: "100%",
      padding: 10,
      
      borderColor: "#ccc",
      borderRadius: 5,
      marginBottom: 15,
    },
    forgotPassword: {
      color: "#303030",
      marginTop: 20,
      marginBottom: 20,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center'
    },
    button: {
      backgroundColor: "#000",
      padding: 15,
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
      marginBottom: 10,
      marginTop: 20,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 18
    },
    signUp: {
      color: "#303030",
      fontSize: 16,
      marginTop: 20,
      fontWeight: '600',
      textAlign: 'center'
    },
    box:{
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      marginTop: 20,
  
      // iOS shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 4,
  
      // Android shadow
      elevation: 6,
      
    }
  });
  

export default SignUpScreen