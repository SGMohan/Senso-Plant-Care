import {
  View,
  Text,
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
import axios from "axios";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBack = () => router.back();

  const handleSubmit = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://YOUR_API_URL/api/auth/forgot-password", {
        email: email.toLowerCase().trim(),
      });

      Alert.alert("Success", "Password reset link has been sent to your email");
      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack}>
              <Ionicons name="chevron-back" size={28} color="#1a3c2a" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Forgot Password</Text>
            <View style={{ width: 44 }} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>
              Enter your registered email and we’ll send you a reset link
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && { opacity: 0.6 }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f4f0" },
  container: { flexGrow: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a3c2a",
  },
  content: { paddingHorizontal: 24, paddingTop: 40 },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a3c2a",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6b8a7a",
    marginBottom: 32,
  },
  inputContainer: { marginBottom: 24 },
  label: { fontSize: 14, color: "#1a3c2a", marginBottom: 8 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8e4",
  },
  button: {
    backgroundColor: "#2d5a3d",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "500" },
});
