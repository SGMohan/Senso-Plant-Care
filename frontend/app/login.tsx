import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// TODO: Backend Integration - Authentication Service
// import { loginUser, forgotPassword, validateCredentials } from '../services/authService';
// import { useMutation } from '@tanstack/react-query';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // TODO: Backend Integration - Authentication state management
  // const [errors, setErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  // const [rememberMe, setRememberMe] = useState(false);
  
  // const loginMutation = useMutation({
  //   mutationFn: loginUser,
  //   onSuccess: async (data) => {
  //     // Store auth token and user data
  //     await AsyncStorage.setItem('authToken', data.token);
  //     await AsyncStorage.setItem('userData', JSON.stringify(data.user));
  //     
  //     if (rememberMe) {
  //       await AsyncStorage.setItem('rememberCredentials', 'true');
  //     }
  //     
  //     router.replace('/dashboard');
  //   },
  //   onError: (error) => {
  //     setErrors(error.response?.data?.errors || { general: 'Login failed' });
  //   }
  // });
  
  // const forgotPasswordMutation = useMutation({
  //   mutationFn: forgotPassword,
  //   onSuccess: () => {
  //     Alert.alert('Success', 'Password reset email sent!');
  //   },
  //   onError: (error) => {
  //     Alert.alert('Error', error.message);
  //   }
  // });

  const handleBack = () => {
    router.back();
  };

  const handleLogin = () => {
    // TODO: Backend Integration - Form validation and user authentication
    // const validationErrors = validateCredentials({ email, password });
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // 
    // loginMutation.mutate({
    //   email: email.toLowerCase().trim(),
    //   password
    // });
    
    console.log("Login pressed");
    router.push('/dashboard');
  };

  const handleSignupNavigation = () => {
    router.push('/signup');
  };

  const handleForgotPassword = () => {
    // TODO: Backend Integration - Password reset flow
    // if (!email) {
    //   Alert.alert('Email Required', 'Please enter your email address first.');
    //   return;
    // }
    // 
    // forgotPasswordMutation.mutate(email);
    console.log("Forgot password pressed");
  };

  // TODO: Backend Integration - Biometric authentication
  const handleBiometricLogin = async () => {
    // const biometricResult = await authenticateWithBiometrics();
    // if (biometricResult.success) {
    //   const storedCredentials = await getStoredCredentials();
    //   loginMutation.mutate(storedCredentials);
    // }
    console.log('Biometric login attempted');
  };

  // TODO: Backend Integration - Social login integration
  const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
    // initiateSocialAuth(provider).then((result) => {
    //   if (result.success) {
    //     router.replace('/dashboard');
    //   }
    // });
    console.log('Social login:', provider);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color="#1a3c2a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign In</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue monitoring your plants</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>

            {/* Forgot Password */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Signup Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={handleSignupNavigation}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f0",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f4f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a3c2a",
    fontFamily: "Inter",
  },
  placeholder: {
    width: 44,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a3c2a",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b8a7a",
    marginBottom: 40,
    fontFamily: "Inter",
  },
  form: {
    gap: 20,
    marginBottom: 32,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a3c2a",
    fontFamily: "Inter",
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 14,
    fontWeight: "400",
    color: "#1a3c2a",
    borderWidth: 1,
    borderColor: "#e2e8e4",
    fontFamily: "Inter",
  },
  forgotPassword: {
    alignSelf: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#2d5a3d",
    fontWeight: "400",
    fontFamily: "Inter",
  },
  loginButton: {
    backgroundColor: "#2d5a3d",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  signupText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b8a7a",
    fontFamily: "Inter",
  },
  signupLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d5a3d",
    fontFamily: "Inter",
  },
});