import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { wifiNetworks } from "../../assets/images";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

interface WiFiNetwork {
  ssid: string;
  signal: number;
  secured: boolean;
  connected: boolean;
}

export default function WiFiSelectScreen() {
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleNetworkSelect = (ssid: string) => {
    setSelectedNetwork(ssid);
    setPassword("");
  };

  const handleNextStep = async () => {
    console.log("Connecting to:", selectedNetwork);
    router.push("/devices/sensoconnect");
  };

  const getSignalIcon = (signal: number) => {
    if (signal >= 80) return "wifi";
    if (signal >= 60) return "wifi-outline";
    if (signal >= 40) return "cellular";
    return "cellular-outline";
  };

  return (
    <LinearGradient
      colors={["#E6F4ED", "#F4F5EE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.safeArea}
    >
      <View style={styles.container}>
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Main Card Container */}
          <View style={styles.cardContainer}>
            {/* Title */}
            <Text variant="h3" weight="semibold" style={styles.title}>请输入 Wi-Fi 信息</Text>
            <Text variant="bodySmall" style={styles.subtitle}>选择设备工作 Wi-Fi 并输入密码</Text>

            {/* WiFi Network Selection */}
            <View style={styles.wifiSelectionContainer}>
              <Ionicons name="wifi" size={18} color="#1a3c2a" />
              <View style={styles.wifiInfo}>
                <Text weight="medium" style={styles.wifiLabel}>
                  {selectedNetwork || "1+11"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  console.log("Select WiFi");
                }}
              >
                <Text weight="medium" style={styles.selectButtonText}>选择 Wi-Fi</Text>
              </TouchableOpacity>
            </View>

            {/* Password Input */}
            <View style={styles.passwordSection}>
              <View style={styles.passwordRow}>
                <Ionicons name="lock-closed" size={16} color="#1a3c2a" />
                <TextInput
                  style={styles.passwordInput}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="wangshuaigen"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Available Networks List (Expandable) */}
            <View style={styles.networksListContainer}>
              {wifiNetworks.slice(0, 3).map((network, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.networkItem}
                  onPress={() => handleNetworkSelect(network.ssid)}
                >
                  <View style={styles.networkLeft}>
                    <Ionicons
                      name={getSignalIcon(network.signal)}
                      size={18}
                      color="#6b7280"
                    />
                    <Text variant="bodySmall" style={styles.networkName}>{network.ssid}</Text>
                  </View>
                  {network.secured && (
                    <Ionicons name="lock-closed" size={14} color="#6b7280" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Spacer */}
          <View style={styles.spacer} />
        </ScrollView>

        {/* Next Step Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Next Step"
            onPress={handleNextStep}
            disabled={!selectedNetwork}
            style={styles.nextButton}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  cardContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 24,
    elevation: 3,
  },
  title: {
    color: "#1a3c2a",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 24,
  },
  wifiSelectionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  wifiInfo: {
    flex: 1,
    marginLeft: 12,
  },
  wifiLabel: {
    fontSize: 16,
    color: "#1a3c2a",
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectButtonText: {
    fontSize: 14,
    color: "#4a90e2",
  },
  passwordSection: {
    marginBottom: 20,
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  passwordInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#1a3c2a",
  },
  eyeButton: {
    padding: 4,
  },
  networksListContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
  },
  networkItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  networkLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  networkName: {
    color: "#1a3c2a",
    marginLeft: 12,
  },
  spacer: {
    height: 100,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    paddingTop: 16,
  },
  nextButton: {
    elevation: 3,
  },
});
