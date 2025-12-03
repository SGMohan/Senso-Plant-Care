import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { wifiNetworks } from "../assets";

// ============================================================================
// BACKEND INTEGRATION - WiFi MANAGEMENT & DEVICE CONNECTION
// ============================================================================
// TODO: Replace static data with real WiFi scanning and connection APIs
// TODO: Implement device-to-WiFi pairing for IoT sensor connectivity
// TODO: Add real-time WiFi signal strength monitoring
// TODO: Implement secure credential storage and transmission
// TODO: Add connection status monitoring and error handling
// ============================================================================

// TODO: Backend Integration - Import WiFi service functions
// import { 
//   scanAvailableNetworks, 
//   connectToWiFiNetwork, 
//   validateWiFiCredentials,
//   getConnectionStatus,
//   disconnectFromNetwork,
//   saveWiFiCredentials 
// } from '../services/wifiService';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import AsyncStorage from '@react-native-async-storage/async-storage';

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

  // ============================================================================
  // BACKEND STATE MANAGEMENT - WiFi Connection & Device Pairing
  // ============================================================================
  // TODO: Backend Integration - WiFi scanning and connection state
  // const [isScanning, setIsScanning] = useState(false);
  // const [isConnecting, setIsConnecting] = useState(false);
  // const [connectionError, setConnectionError] = useState<string | null>(null);
  // const [savedNetworks, setSavedNetworks] = useState<WiFiNetwork[]>([]);
  
  // TODO: Backend Integration - React Query for WiFi operations
  // const wifiScanQuery = useQuery({
  //   queryKey: ['wifiNetworks'],
  //   queryFn: scanAvailableNetworks,
  //   refetchInterval: 10000,
  //   enabled: isScanning
  // });
  
  // const connectMutation = useMutation({
  //   mutationFn: ({ ssid, password }) => connectToWiFiNetwork(ssid, password),
  //   onSuccess: (data) => {
  //     saveWiFiCredentials(selectedNetwork, password);
  //     router.push('/devicepairing');
  //   },
  //   onError: (error) => setConnectionError(error.message)
  // });

  // Mock WiFi networks - TODO: Replace with actual WiFi scanning

  const handleBack = () => {
    router.back();
  };

  // ============================================================================
  // BACKEND INTEGRATION - WiFi Connection Handlers
  // ============================================================================
  
  const handleNetworkSelect = (ssid: string) => {
    setSelectedNetwork(ssid);
    setPassword("");
    // TODO: Backend Integration - Load saved credentials if available
    // const savedPassword = await AsyncStorage.getItem(`wifi_${ssid}`);
    // if (savedPassword) setPassword(savedPassword);
  };

  const handleWiFiScan = async () => {
    // TODO: Backend Integration - Start WiFi network scanning
    // setIsScanning(true);
    // try {
    //   const networks = await scanAvailableNetworks();
    //   console.log('Available networks:', networks);
    // } catch (error) {
    //   console.error('WiFi scan failed:', error);
    // } finally {
    //   setIsScanning(false);
    // }
    console.log('WiFi scan initiated');
  };

  const handlePasswordValidation = async () => {
    // TODO: Backend Integration - Validate WiFi credentials before connection
    // if (!selectedNetwork || !password) {
    //   setConnectionError('Please select network and enter password');
    //   return false;
    // }
    // return await validateCredentialsMutation.mutateAsync({ ssid: selectedNetwork, password });
    return true;
  };

  const handleNextStep = async () => {
    // TODO: Backend Integration - Complete WiFi connection flow
    // setConnectionError(null);
    // setIsConnecting(true);
    // 
    // try {
    //   const isValid = await handlePasswordValidation();
    //   if (isValid) {
    //     await connectMutation.mutateAsync({ ssid: selectedNetwork, password });
    //     // Connection success handled in mutation onSuccess
    //   }
    // } catch (error) {
    //   console.error('Connection process failed:', error);
    // } finally {
    //   setIsConnecting(false);
    // }
    
    console.log("Connecting to:", selectedNetwork);
    router.push("/sensoconnect");
  };

  const handleConnectionRetry = async () => {
    // TODO: Backend Integration - Retry failed WiFi connection
    // setConnectionError(null);
    // await handleNextStep();
    console.log('Retrying connection to:', selectedNetwork);
  };

  const handleForgetNetwork = async (ssid: string) => {
    // TODO: Backend Integration - Remove saved WiFi credentials
    // await AsyncStorage.removeItem(`wifi_${ssid}`);
    // const updatedNetworks = savedNetworks.filter(n => n.ssid !== ssid);
    // setSavedNetworks(updatedNetworks);
    console.log('Forgetting network:', ssid);
  };

  const getSignalIcon = (signal: number) => {
    if (signal >= 80) return "wifi";
    if (signal >= 60) return "wifi-outline";
    if (signal >= 40) return "cellular";
    return "cellular-outline";
  };

  const selectedNetworkData = wifiNetworks.find(
    (n) => n.ssid === selectedNetwork
  );

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
            <Text style={styles.title}>请输入 Wi-Fi 信息</Text>
            <Text style={styles.subtitle}>选择设备工作 Wi-Fi 并输入密码</Text>

            {/* WiFi Network Selection */}
            <View style={styles.wifiSelectionContainer}>
              <Ionicons name="wifi" size={18} color="#1a3c2a" />
              <View style={styles.wifiInfo}>
                <Text style={styles.wifiLabel}>
                  {selectedNetwork || "1+11"}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => {
                  // You can add a modal or navigate to WiFi list
                  console.log("Select WiFi");
                }}
              >
                <Text style={styles.selectButtonText}>选择 Wi-Fi</Text>
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
                    <Text style={styles.networkName}>{network.ssid}</Text>
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
          <TouchableOpacity
            style={[
              styles.nextButton,
              !selectedNetwork && styles.nextButtonDisabled,
            ]}
            onPress={handleNextStep}
            disabled={!selectedNetwork}
          >
            <Text style={styles.nextButtonText}>Next Step</Text>
          </TouchableOpacity>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a3c2a",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 24,
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
  },
  selectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  selectButtonText: {
    fontSize: 14,
    color: "#4a90e2",
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
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
    fontSize: 14,
    color: "#1a3c2a",
    marginLeft: 12,
    fontFamily: "Roboto",
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
    backgroundColor: "#5a9b7a",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonDisabled: {
    backgroundColor: "#d1d5db",
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#ffffff",
    fontFamily: "Inter",
  },
});
