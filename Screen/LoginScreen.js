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
import { loginUser } from "../Redux/actions/authAction";
import { clearError } from "../Redux/reducer/authReducer";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated, role } = useSelector((state) => state.auth);

  // Handle navigation based on role after successful login
  useEffect(() => {
    if (isAuthenticated && role) {
      if (role === 'admin') {
        nav.navigate('AdminScreen');
      } else {
        nav.navigate('Tab');
      }
    }
  }, [isAuthenticated, role, nav]);

  // Clear error when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Handle login
  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }
    dispatch(loginUser({ email, password }));
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

      <Text style={styles.header}>Hello !</Text>
      <Text style={styles.subHeader}>WELCOME BACK</Text>
      <View style={styles.box} >
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

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
      
      <TouchableOpacity 
        onPress={handleLogin} 
        style={[styles.button, isLoading && styles.buttonDisabled]}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Log in</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => nav.navigate('SignUpScreen')} >
        <Text style={styles.signUp}>SIGN UP</Text>
      </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    marginTop: 100,
    padding: 20,
    // backgroundColor: "#fff",
  },

  header: {
    fontSize:30,
    fontWeight: "700",
    color: "#909090"
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
    justifyContent: 'center',
    alignItems: 'center',
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

export default LoginScreen;
