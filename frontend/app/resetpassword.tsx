import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import axios from "axios";

export default function ResetPasswordScreen() {
  const { token } = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!password || !confirmPassword) {
      Alert.alert("Error", "All fields required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`http://YOUR_API_URL/api/auth/reset-password/${token}`, {
        password,
      });

      Alert.alert("Success", "Password reset successfully");
      router.replace("/login");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Invalid or expired link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.subtitle}>
          Your new password must be different from previous ones
        </Text>

        <TextInput
          style={styles.input}
          placeholder="New password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.6 }]}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Reset Password"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f0f4f0" },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
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
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8e4",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#2d5a3d",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontSize: 14, fontWeight: "500" },
});
