import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { registerUser } from "../Redux/actions/authAction";
import { clearError } from "../Redux/reducer/authReducer";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const nav = useNavigation();
    const dispatch = useDispatch();
    const { isLoading, error } = useSelector((state) => state.auth);

    // Clear error when component mounts
    useEffect(() => {
      dispatch(clearError());
    }, [dispatch]);

    // Handle successful registration
    useEffect(() => {
      if (!isLoading && !error) {
        // Có thể thêm logic để tự động chuyển về login hoặc hiển thị thông báo
      }
    }, [isLoading, error]);

    // Validation functions
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      return password.length >= 6;
    };

    // Handle registration
    const handleSignUp = () => {
      // Clear previous errors
      dispatch(clearError());

      // Validation
      if (!name.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên');
        return;
      }

      if (!email.trim()) {
        Alert.alert('Lỗi', 'Vui lòng nhập email');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Lỗi', 'Email không hợp lệ');
        return;
      }

      if (!password) {
        Alert.alert('Lỗi', 'Vui lòng nhập mật khẩu');
        return;
      }

      if (!validatePassword(password)) {
        Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp');
        return;
      }

      // Dispatch register action
      dispatch(registerUser({ name: name.trim(), email: email.trim(), password }));

      nav.navigate('LoginScreen');
    };
  
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}

        <TouchableOpacity 
          onPress={handleSignUp} 
          style={[styles.button, isLoading && styles.buttonDisabled]}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
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
    errorText: {
      color: '#ff0000',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
    buttonDisabled: {
      backgroundColor: '#666',
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