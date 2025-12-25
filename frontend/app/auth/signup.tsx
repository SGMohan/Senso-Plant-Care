import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AppContext";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function SignupScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const { register, isLoading, googleAuth } = useAuth();

  const handleBack = () => {
    router.replace("/dashboard");
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(name.trim(), email.toLowerCase().trim(), password);
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
        await googleAuth();
        router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Google Login Failed", error.message);
    }
  };

  const handleLoginNavigation = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color="#1a3c2a" />
            </TouchableOpacity>
            <Text weight="medium" style={styles.headerTitle}>Sign Up</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.content}>
            <Text variant="h2" weight="semibold" style={styles.title}>Create Account</Text>
            <Text variant="bodySmall" style={styles.subtitle}>
              Join Senso to start monitoring your plants
            </Text>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Text weight="medium" style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputContainer}>
                <Text weight="medium" style={styles.inputLabel}>Email</Text>
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
                <Text weight="medium" style={styles.inputLabel}>Password</Text>
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
                <Text weight="medium" style={styles.inputLabel}>Confirm Password</Text>
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

            {/* Signup Button */}
            <Button
              title={isLoading ? "Creating Account..." : "Create Account"}
              onPress={handleSignup}
              loading={isLoading}
              style={styles.signupButton}
            />

            {/* Google Button */}
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignup}
            >
              <Ionicons name="logo-google" size={20} color="#1a3c2a" />
              <Text weight="medium" style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text variant="bodySmall" style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={handleLoginNavigation}>
                <Text variant="bodySmall" weight="medium" style={styles.loginLink}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f4f0" },
  keyboardAvoidingView: { flex: 1 },
  container: { flex: 1, backgroundColor: "#f0f4f0" },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 16, paddingBottom: 16 },
  backButton: { padding: 8, justifyContent: "center", alignItems: "center" },
  headerTitle: { color: "#1a3c2a" },
  placeholder: { width: 44 },
  content: { paddingHorizontal: 24, paddingTop: 20 },
  title: { color: "#1a3c2a", marginBottom: 8 },
  subtitle: { color: "#6b8a7a", marginBottom: 40 },
  form: { gap: 20, marginBottom: 32 },
  inputContainer: { gap: 8 },
  inputLabel: { color: "#1a3c2a" },
  input: { backgroundColor: "#ffffff", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 16, fontSize: 14, color: "#1a3c2a", borderWidth: 1, borderColor: "#e2e8e4" },
  signupButton: { marginBottom: 24, elevation: 3 },
  loginContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: 40 },
  loginText: { color: "#6b8a7a" },
  loginLink: { color: "#2d5a3d" },
  googleButton: { flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "#ffffff", borderRadius: 16, paddingVertical: 14, borderWidth: 1, borderColor: "#e2e8e4", marginBottom: 24, gap: 10 },
  googleButtonText: { color: "#1a3c2a" },
});
