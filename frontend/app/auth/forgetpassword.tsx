import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { forgotPassword } from "../../services/authService";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

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
      await forgotPassword(email.toLowerCase().trim());

      Alert.alert("Success", "If an account exists with that email, a password reset link has been sent.");
      router.replace("/auth/login");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Something went wrong"
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
            <Text weight="medium" style={styles.headerTitle}>Forgot Password</Text>
            <View style={{ width: 44 }} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text variant="h2" weight="semibold" style={styles.title}>Reset your password</Text>
            <Text variant="bodySmall" style={styles.subtitle}>
              Enter your registered email and we’ll send you a reset link
            </Text>

            <View style={styles.inputContainer}>
              <Text weight="medium" style={styles.label}>Email</Text>
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

            <Button
              title="Send Reset Link"
              onPress={handleSubmit}
              loading={loading}
              style={styles.button}
            />
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
  headerTitle: { color: "#1a3c2a" },
  content: { paddingHorizontal: 24, paddingTop: 40 },
  title: { color: "#1a3c2a", marginBottom: 8 },
  subtitle: { color: "#6b8a7a", marginBottom: 32 },
  inputContainer: { marginBottom: 24 },
  label: { color: "#1a3c2a", marginBottom: 8 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8e4",
    fontSize: 14,
  },
  button: { elevation: 3 },
});
