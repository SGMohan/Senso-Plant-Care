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
// import { registerUser, validateEmail, checkEmailExists } from '../services/authService';
// import { useMutation, useQuery } from '@tanstack/react-query';

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  
  // TODO: Backend Integration - Form validation and submission
  // const [errors, setErrors] = useState({});
  // const [isLoading, setIsLoading] = useState(false);
  
  // const registerMutation = useMutation({
  //   mutationFn: registerUser,
  //   onSuccess: (data) => {
  //     // Store auth token and user data
  //     AsyncStorage.setItem('authToken', data.token);
  //     AsyncStorage.setItem('userData', JSON.stringify(data.user));
  //     router.replace('/dashboard');
  //   },
  //   onError: (error) => {
  //     setErrors(error.response?.data?.errors || {});
  //   }
  // });
  
  // const checkEmailMutation = useMutation({
  //   mutationFn: checkEmailExists,
  //   onSuccess: (exists) => {
  //     if (exists) {
  //       setErrors({ email: 'Email already exists' });
  //     }
  //   }
  // });

  const handleBack = () => {
    router.back();
  };

  const handleSignup = () => {
    // TODO: Backend Integration - Form validation and user registration
    // const validationErrors = validateSignupForm({ name, email, password, confirmPassword });
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // 
    // registerMutation.mutate({
    //   name: name.trim(),
    //   email: email.toLowerCase().trim(),
    //   password,
    //   confirmPassword
    // });
    
    console.log("Signup pressed");
    router.push('/dashboard');
  };

  // TODO: Backend Integration - Real-time email validation
  const handleEmailBlur = () => {
    // if (email && validateEmail(email)) {
    //   checkEmailMutation.mutate(email);
    // }
    console.log('Email validation:', email);
  };

  // TODO: Backend Integration - Password strength validation
  const validatePasswordStrength = (pwd: string) => {
    // return {
    //   hasMinLength: pwd.length >= 8,
    //   hasUpperCase: /[A-Z]/.test(pwd),
    //   hasLowerCase: /[a-z]/.test(pwd),
    //   hasNumbers: /\d/.test(pwd),
    //   hasSpecialChar: /[!@#$%^&*]/.test(pwd)
    // };
    console.log('Password strength check:', pwd.length);
  };

  const handleLoginNavigation = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={28} color="#1a3c2a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sign Up</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join Senso to start monitoring your plants</Text>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                placeholderTextColor="#9ca3af"
              />
            </View>

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
                placeholder="Create a password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
              />
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLoginNavigation}>
              <Text style={styles.loginLink}>Sign In</Text>
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
  signupButton: {
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
  signupButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b8a7a",
    fontFamily: "Inter",
  },
  loginLink: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d5a3d",
    fontFamily: "Inter",
  },
});