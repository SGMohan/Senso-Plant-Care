import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// TODO: Backend Integration - Import Senso Device Connection Services
// import { connectToSensoDevice, getSensoConnectionStatus, configureSensoDevice } from '../services/sensoDeviceService';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SensoConnectScreen() {
  const rotation = useRef(new Animated.Value(0)).current;

  // TODO: Backend Integration - Senso Device Connection State Management
  // const [connectionStatus, setConnectionStatus] = useState('connecting'); // 'connecting', 'connected', 'failed', 'timeout'
  // const [deviceInfo, setDeviceInfo] = useState(null);
  // const [connectionProgress, setConnectionProgress] = useState(0);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [retryCount, setRetryCount] = useState(0);
  // const [connectionTimeout, setConnectionTimeout] = useState(null);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    );

    animation.start();

    // TODO: Backend Integration - Start Senso Device Connection Process
    // initiateSensoConnection();

    // TEMPORARY: Auto-navigate to done page for preview
    const connectionTimer = setTimeout(() => {
      router.push('/sensodone');
    }, 3000); // Navigate after 3 seconds

    return () => {
      animation.stop();
      clearTimeout(connectionTimer);
    };

    // TODO: Backend Integration - Set Connection Timeout
    // const timeout = setTimeout(() => {
    //   if (connectionStatus === 'connecting') {
    //     setConnectionStatus('timeout');
    //     handleConnectionTimeout();
    //   }
    // }, 30000); // 30 second timeout
    // setConnectionTimeout(timeout);
  }, []);

  // TODO: Backend Integration - Initiate Senso Device Connection
  // const initiateSensoConnection = async () => {
  //   try {
  //     setConnectionStatus('connecting');
  //     setConnectionProgress(0);
  //
  //     // Step 1: Establish WiFi connection with Senso device
  //     setConnectionProgress(25);
  //     const wifiConnection = await connectToSensoWiFi();
  //
  //     // Step 2: Authenticate with Senso device
  //     setConnectionProgress(50);
  //     const authResult = await authenticateWithSenso(wifiConnection);
  //
  //     // Step 3: Configure device settings
  //     setConnectionProgress(75);
  //     const deviceConfig = await configureSensoDevice(authResult);
  //
  //     // Step 4: Finalize connection and save device info
  //     setConnectionProgress(100);
  //     await saveSensoDeviceInfo(deviceConfig);
  //
  //     setConnectionStatus('connected');
  //     setDeviceInfo(deviceConfig);
  //
  //     // Navigate to success screen after short delay
  //     setTimeout(() => {
  //       router.push('/dashboard');
  //     }, 2000);
  //
  //   } catch (error) {
  //     console.error('Senso connection failed:', error);
  //     setConnectionStatus('failed');
  //     setErrorMessage(error.message || 'Connection failed');
  //     handleConnectionError(error);
  //   }
  // };

  // TODO: Backend Integration - Connect to Senso WiFi Network
  // const connectToSensoWiFi = async () => {
  //   // Implementation for connecting to Senso device WiFi
  //   // Return connection details
  // };

  // TODO: Backend Integration - Authenticate with Senso Device
  // const authenticateWithSenso = async (wifiConnection) => {
  //   // Implementation for device authentication
  //   // Return authentication token/session
  // };

  // TODO: Backend Integration - Configure Senso Device Settings
  // const configureSensoDevice = async (authResult) => {
  //   // Implementation for device configuration
  //   // Set up plant monitoring, notifications, etc.
  //   // Return device configuration
  // };

  // TODO: Backend Integration - Save Device Information
  // const saveSensoDeviceInfo = async (deviceConfig) => {
  //   // Save device info to AsyncStorage and backend
  //   // await AsyncStorage.setItem('sensoDevice', JSON.stringify(deviceConfig));
  //   // await saveDeviceToBackend(deviceConfig);
  // };

  // TODO: Backend Integration - Handle Connection Error
  // const handleConnectionError = (error) => {
  //   setRetryCount(prev => prev + 1);
  //
  //   // Auto-retry logic (max 3 attempts)
  //   if (retryCount < 3) {
  //     setTimeout(() => {
  //       initiateSensoConnection();
  //     }, 3000);
  //   }
  // };

  // TODO: Backend Integration - Handle Connection Timeout
  // const handleConnectionTimeout = () => {
  //   setErrorMessage('Connection timeout. Please try again.');
  //   // Show retry options or navigate back
  // };

  // TODO: Backend Integration - Retry Connection
  // const retryConnection = () => {
  //   setConnectionStatus('connecting');
  //   setErrorMessage('');
  //   setRetryCount(0);
  //   initiateSensoConnection();
  // };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleClose = () => {
    // TODO: Backend Integration - Cancel ongoing connection process
    // if (connectionStatus === 'connecting') {
    //   cancelSensoConnection();
    // }
    router.back();
  };

  // TODO: Backend Integration - Cancel Senso Connection Process
  // const cancelSensoConnection = async () => {
  //   try {
  //     // Cancel any ongoing connection attempts
  //     // Disconnect from Senso WiFi if connected
  //     // Clear connection timeout
  //     if (connectionTimeout) {
  //       clearTimeout(connectionTimeout);
  //     }
  //     setConnectionStatus('cancelled');
  //   } catch (error) {
  //     console.error('Error cancelling connection:', error);
  //   }
  // };

  return (
    <LinearGradient colors={["#E6F4ED", "#F4F5EE"]} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={24} color="#b8b8b8" />
        </TouchableOpacity>

        {/* Center Image with Loading Circle */}
        <View style={styles.imageContainer}>
          {/* Static outer grey ring */}
          <View style={styles.staticOuterRing} />

          {/* Animated gradient circular ring */}
          <Animated.View
            style={[styles.loadingCircle, { transform: [{ rotate }] }]}
          >
            <LinearGradient
              colors={["#D7F7D5", "#A8E6B8", "#5FCF62"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientRing}
            >
              {/* inner fill – same as bg, so only ring visible */}
              <View style={styles.gradientRingInner} />
            </LinearGradient>
          </Animated.View>

          {/* WiFi Image with Circular Mask */}
          <View style={styles.imageMask}>
            <Image
              source={require("../assets/wifi_pair_image.png")}
              style={styles.connectImage}
              resizeMode="contain"
              fadeDuration={0}
            />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>Connecting to Senso...</Text>
          <Text style={styles.instructionText}>
            This may take a few sounds. Keep your phone close to Senso.
          </Text>
          {/* TODO: Backend Integration - Dynamic Status Messages */}
          {/* {connectionStatus === 'connecting' && (
            <Text style={styles.statusText}>
              {connectionProgress < 25 && 'Establishing WiFi connection...'}
              {connectionProgress >= 25 && connectionProgress < 50 && 'Authenticating device...'}
              {connectionProgress >= 50 && connectionProgress < 75 && 'Configuring settings...'}
              {connectionProgress >= 75 && 'Finalizing connection...'}
            </Text>
          )}
          {connectionStatus === 'failed' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={retryConnection}>
                <Text style={styles.retryButtonText}>Retry Connection</Text>
              </TouchableOpacity>
            </View>
          )}
          {connectionStatus === 'connected' && (
            <Text style={styles.successText}>Successfully connected to Senso!</Text>
          )} */}
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />
      </View>
    </LinearGradient>
  );
}

const RING_SIZE = 320;
const RING_BORDER = 10;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
    position: "relative",
  },
  // animated container
  loadingCircle: {
    width: RING_SIZE,
    height: RING_SIZE,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },

  // light static ring outside
  staticOuterRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_BORDER,
    borderColor: "#e8e8e8",
    position: "absolute",
  },

  // gradient ring (full circle)
  gradientRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    padding: RING_BORDER, // ring thickness
  },

  // inner circle – matches background so ring is visible
  gradientRingInner: {
    width: "100%",
    height: "100%",
    borderRadius: RING_SIZE / 2,
    backgroundColor: "#E6F4ED", // same as top gradient color
  },

  imageMask: {
    width: RING_SIZE - RING_BORDER * 2,
    height: RING_SIZE - RING_BORDER * 2,
    borderRadius: (RING_SIZE - RING_BORDER * 2) / 2,
    overflow: "hidden",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -1,
  },
  connectImage: {
    width: 320,
    height: 280,
  },
  instructionsContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    alignItems: "flex-start",
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 10,
    fontFamily: "Inter",
  },
  instructionText: {
    fontSize: 16,
    color: "#666666",
    lineHeight: 22,
    fontFamily: "Roboto",
  },
  spacer: {
    flex: 1,
  },
});
