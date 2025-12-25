import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AppContext";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, googleAuth } = useAuth();

  const handleBack = () => {
    router.replace("/dashboard");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await login(email.toLowerCase().trim(), password);
      router.replace("/dashboard");
    } catch (error: any) {
      Alert.alert("Login Failed", error.message || "Invalid credentials");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
            <Text weight="medium" style={styles.headerTitle}>Sign In</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text variant="h2" weight="semibold" style={styles.title}>Welcome Back</Text>
            <Text variant="bodySmall" style={styles.subtitle}>Sign in to continue monitoring your plants</Text>

            {/* Form */}
            <View style={styles.form}>
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
                  placeholder="Enter your password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity 
                style={styles.forgotPasswordContainer} 
                onPress={() => router.push('/auth/forgetpassword')}
              >
                <Text variant="caption" weight="medium" style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <Button
              title={isLoading ? "Signing In..." : "Sign In"}
              onPress={handleLogin}
              loading={isLoading}
              style={styles.loginButton}
            />

            {/* Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text variant="caption" weight="medium" style={styles.separatorText}>OR</Text>
              <View style={styles.separatorLine} />
            </View>

            {/* Google Button */}
            <Button
              title="Continue with Google"
              variant="neutral"
              onPress={async () => {
                try {
                  await googleAuth();
                  router.replace("/dashboard");
                } catch (e: any) {
                  Alert.alert("Google Error", e.message);
                }
              }}
              icon={<Ionicons name="logo-google" size={20} color="#1a3c2a" />}
              style={styles.googleButton}
            />

            {/* Signup Link */}
            <View style={styles.signupContainer}>
              <Text variant="bodySmall" style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/auth/signup")}>
                <Text variant="bodySmall" weight="medium" style={styles.signupLink}>Sign Up</Text>
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
  backButton: { padding: 8 },
  headerTitle: { color: "#1a3c2a" },
  placeholder: { width: 44 },
  content: { paddingHorizontal: 24, paddingTop: 20 },
  title: { color: "#1a3c2a", marginBottom: 8 },
  subtitle: { color: "#6b8a7a", marginBottom: 40 },
  form: { gap: 20, marginBottom: 32 },
  inputContainer: { gap: 8 },
  inputLabel: { color: "#1a3c2a" },
  input: { backgroundColor: "#ffffff", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 16, fontSize: 14, color: "#1a3c2a", borderWidth: 1, borderColor: "#e2e8e4" },
  forgotPasswordContainer: { alignSelf: 'flex-end' },
  forgotPasswordText: { color: '#2d5a3d' },
  loginButton: { marginBottom: 24, elevation: 3 },
  separatorContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  separatorLine: { flex: 1, height: 1, backgroundColor: '#e2e8e4' },
  separatorText: { marginHorizontal: 10, color: '#6b8a7a' },
  signupContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", paddingBottom: 40 },
  signupText: { color: "#6b8a7a" },
  signupLink: { color: "#2d5a3d" },
  googleButton: { marginBottom: 20 },
});
