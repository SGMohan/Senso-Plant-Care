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

// ============================================================================
// BACKEND INTEGRATION - DEVICE SETUP COMPLETION & DATA SYNCHRONIZATION
// ============================================================================
// TODO: Replace static success state with real device completion workflow
// TODO: Implement device registration and user account linking
// TODO: Add initial plant data synchronization from Senso device
// TODO: Implement device settings backup and cloud storage
// TODO: Add analytics tracking for setup completion rates
// ============================================================================

// TODO: Backend Integration - Import Device Management Services
// import { 
//   getSensoDeviceInfo, 
//   syncDeviceData, 
//   updateDeviceSettings,
//   registerDeviceToUser,
//   backupDeviceSettings,
//   initializeDeviceMonitoring,
//   trackSetupCompletion 
// } from '../services/sensoDeviceService';
// import { useQuery, useMutation } from '@tanstack/react-query';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useAuth } from '../contexts/AuthContext';
// import { analytics } from '../services/analyticsService';

export default function SensoDoneScreen() {
  const rotation = useRef(new Animated.Value(0)).current;
  
  // ============================================================================
  // BACKEND STATE MANAGEMENT - Device Setup Completion
  // ============================================================================
  // TODO: Backend Integration - Device Success State Management
  // const [deviceInfo, setDeviceInfo] = useState(null);
  // const [syncStatus, setSyncStatus] = useState('syncing'); // 'syncing', 'synced', 'failed'
  // const [plantData, setPlantData] = useState([]);
  // const [deviceSettings, setDeviceSettings] = useState({});
  // const [setupProgress, setSetupProgress] = useState(0);
  // const [registrationStatus, setRegistrationStatus] = useState('pending');
  // const [backupStatus, setBackupStatus] = useState('idle');
  // const [monitoringActive, setMonitoringActive] = useState(false);
  // const { user } = useAuth();

  useEffect(() => {
    // Animation stopped - showing completed state
    // TODO: Backend Integration - Complete Device Setup Workflow
    // initializeDeviceCompletion();
    // loadDeviceInfo();
    // syncInitialData();
    // registerDeviceToUserAccount();
    // backupDeviceConfiguration();
    // startDeviceMonitoring();
    // trackSetupAnalytics();
  }, []);

  // ============================================================================
  // BACKEND INTEGRATION - Device Setup Completion Workflow
  // ============================================================================
  
  // TODO: Backend Integration - Initialize Device Completion Process
  // const initializeDeviceCompletion = async () => {
  //   try {
  //     setSetupProgress(0);
  //     
  //     // Step 1: Verify device connection is stable
  //     setSetupProgress(20);
  //     const connectionStatus = await verifyDeviceConnection();
  //     if (!connectionStatus.stable) throw new Error('Device connection unstable');
  //     
  //     // Step 2: Register device to user account
  //     setSetupProgress(40);
  //     await registerDeviceToUserAccount();
  //     
  //     // Step 3: Sync initial device data
  //     setSetupProgress(60);
  //     await syncInitialData();
  //     
  //     // Step 4: Backup device settings to cloud
  //     setSetupProgress(80);
  //     await backupDeviceConfiguration();
  //     
  //     // Step 5: Start monitoring services
  //     setSetupProgress(100);
  //     await startDeviceMonitoring();
  //     
  //     // Track completion analytics
  //     await trackSetupAnalytics();
  //     
  //   } catch (error) {
  //     console.error('Device completion failed:', error);
  //     handleSetupError(error);
  //   }
  // };
  
  // TODO: Backend Integration - Verify Device Connection Stability
  // const verifyDeviceConnection = async () => {
  //   // Test device connectivity and signal strength
  //   // Verify sensor data is being received
  //   // Check device firmware version compatibility
  //   // Return connection stability status
  // };
  
  // TODO: Backend Integration - Register Device to User Account
  // const registerDeviceToUserAccount = async () => {
  //   try {
  //     setRegistrationStatus('registering');
  //     
  //     const deviceData = await AsyncStorage.getItem('sensoDevice');
  //     if (!deviceData) throw new Error('Device data not found');
  //     
  //     const device = JSON.parse(deviceData);
  //     const registrationResult = await registerDeviceToUser({
  //       deviceId: device.id,
  //       userId: user.id,
  //       deviceName: device.name,
  //       setupTimestamp: new Date().toISOString(),
  //       wifiNetwork: device.wifiNetwork
  //     });
  //     
  //     setDeviceInfo(registrationResult);
  //     setRegistrationStatus('completed');
  //     
  //   } catch (error) {
  //     setRegistrationStatus('failed');
  //     throw error;
  //   }
  // };

  // TODO: Backend Integration - Load Connected Device Information
  // const loadDeviceInfo = async () => {
  //   try {
  //     const savedDevice = await AsyncStorage.getItem('sensoDevice');
  //     if (savedDevice) {
  //       const device = JSON.parse(savedDevice);
  //       setDeviceInfo(device);
  //       
  //       // Fetch latest device status from backend
  //       const deviceStatus = await getSensoDeviceInfo(device.id);
  //       setDeviceInfo(deviceStatus);
  //     }
  //   } catch (error) {
  //     console.error('Error loading device info:', error);
  //   }
  // };

  // TODO: Backend Integration - Sync Initial Plant and Sensor Data
  // const syncInitialData = async () => {
  //   try {
  //     setSyncStatus('syncing');
  //     
  //     // Sync plant data from device sensors
  //     const plants = await syncDeviceData('plants');
  //     setPlantData(plants);
  //     
  //     // Sync device configuration settings
  //     const settings = await syncDeviceData('settings');
  //     setDeviceSettings(settings);
  //     
  //     // Sync historical sensor readings
  //     const sensorHistory = await syncDeviceData('sensorHistory');
  //     
  //     // Sync device calibration data
  //     const calibrationData = await syncDeviceData('calibration');
  //     
  //     // Store synced data locally for offline access
  //     await AsyncStorage.setItem('plantData', JSON.stringify(plants));
  //     await AsyncStorage.setItem('deviceSettings', JSON.stringify(settings));
  //     
  //     setSyncStatus('synced');
  //   } catch (error) {
  //     console.error('Error syncing data:', error);
  //     setSyncStatus('failed');
  //     handleSyncError(error);
  //   }
  // };
  
  // TODO: Backend Integration - Backup Device Configuration to Cloud
  // const backupDeviceConfiguration = async () => {
  //   try {
  //     setBackupStatus('backing-up');
  //     
  //     const deviceConfig = {
  //       deviceId: deviceInfo.id,
  //       settings: deviceSettings,
  //       plantProfiles: plantData,
  //       calibrationData: deviceInfo.calibration,
  //       setupDate: new Date().toISOString(),
  //       userId: user.id
  //     };
  //     
  //     await backupDeviceSettings(deviceConfig);
  //     setBackupStatus('completed');
  //     
  //   } catch (error) {
  //     console.error('Backup failed:', error);
  //     setBackupStatus('failed');
  //   }
  // };
  
  // TODO: Backend Integration - Start Device Monitoring Services
  // const startDeviceMonitoring = async () => {
  //   try {
  //     // Initialize real-time sensor data monitoring
  //     await initializeDeviceMonitoring(deviceInfo.id);
  //     
  //     // Set up push notification triggers
  //     await setupNotificationTriggers(deviceInfo.id);
  //     
  //     // Start automated care reminders
  //     await initializeCareReminders(plantData);
  //     
  //     setMonitoringActive(true);
  //     
  //   } catch (error) {
  //     console.error('Monitoring setup failed:', error);
  //     setMonitoringActive(false);
  //   }
  // };
  
  // TODO: Backend Integration - Track Setup Completion Analytics
  // const trackSetupAnalytics = async () => {
  //   try {
  //     await analytics.track('device_setup_completed', {
  //       deviceId: deviceInfo.id,
  //       userId: user.id,
  //       setupDuration: Date.now() - setupStartTime,
  //       plantCount: plantData.length,
  //       deviceType: deviceInfo.type,
  //       firmwareVersion: deviceInfo.firmware
  //     });
  //   } catch (error) {
  //     console.error('Analytics tracking failed:', error);
  //   }
  // };
  
  // TODO: Backend Integration - Handle Setup Errors
  // const handleSetupError = (error) => {
  //   console.error('Setup error:', error);
  //   
  //   // Log error for debugging
  //   analytics.track('device_setup_error', {
  //     error: error.message,
  //     step: setupProgress,
  //     deviceId: deviceInfo?.id
  //   });
  //   
  //   // Show user-friendly error message
  //   // Provide retry options
  //   // Offer support contact information
  // };
  
  // TODO: Backend Integration - Handle Data Sync Errors
  // const handleSyncError = (error) => {
  //   // Implement retry logic with exponential backoff
  //   // Store failed sync attempts for later retry
  //   // Notify user of sync issues
  // };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const handleClose = () => {
    router.back();
  };

  const handleContinue = async () => {
    // TODO: Backend Integration - Complete setup and navigate to dashboard
    // await finalizeDeviceSetup();
    
    // TODO: Backend Integration - Verify all setup steps completed
    // if (syncStatus !== 'synced' || registrationStatus !== 'completed') {
    //   alert('Setup not complete. Please wait for all processes to finish.');
    //   return;
    // }
    
    router.push("/dashboard");
  };

  // TODO: Backend Integration - Finalize Device Setup and Navigate
  // const finalizeDeviceSetup = async () => {
  //   try {
  //     // Mark device as fully configured in backend
  //     await updateDeviceSettings({ 
  //       setupComplete: true,
  //       completionTimestamp: new Date().toISOString(),
  //       finalizedBy: user.id
  //     });
  //     
  //     // Update local storage with completion status
  //     await AsyncStorage.setItem('deviceSetupComplete', 'true');
  //     await AsyncStorage.setItem('lastDeviceId', deviceInfo.id);
  //     
  //     // Send final setup completion analytics
  //     await trackSetupCompletion({
  //       deviceId: deviceInfo.id,
  //       userId: user.id,
  //       totalSetupTime: Date.now() - setupStartTime,
  //       success: true
  //     });
  //     
  //     // Trigger welcome notification
  //     await scheduleWelcomeNotification(deviceInfo.id);
  //     
  //   } catch (error) {
  //     console.error('Error finalizing setup:', error);
  //     // Still allow navigation even if finalization fails
  //   }
  // };
  
  // TODO: Backend Integration - Schedule Welcome Notification
  // const scheduleWelcomeNotification = async (deviceId) => {
  //   // Schedule a welcome notification for 1 hour after setup
  //   // Include tips for first-time device usage
  //   // Provide links to user guide and support
  // };
  
  // TODO: Backend Integration - Setup Notification Triggers
  // const setupNotificationTriggers = async (deviceId) => {
  //   // Configure plant care reminder notifications
  //   // Set up low battery alerts
  //   // Configure sensor threshold alerts
  //   // Set up connectivity issue notifications
  // };
  
  // TODO: Backend Integration - Initialize Care Reminders
  // const initializeCareReminders = async (plants) => {
  //   // Create care schedules based on plant types
  //   // Set up watering reminders
  //   // Configure fertilizing schedules
  //   // Set up repotting reminders
  // };

  return (
    <LinearGradient colors={["#E6F4ED", "#F4F5EE"]} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#a8b5a8" />
        </TouchableOpacity>

        {/* Center Image with Success Circle */}
        <View style={styles.imageContainer}>
          {/* Static outer grey ring */}
          <View style={styles.staticOuterRing} />

          {/* Static gradient circular ring (completed state) */}
          <View style={styles.loadingCircle}>
            <LinearGradient
              colors={["#5FCF62", "#A8E6B8", "#D7F7D5"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientRing}
            >
              {/* inner fill – same as bg, so only ring visible */}
              <View style={styles.gradientRingInner} />
            </LinearGradient>
          </View>

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
          <Text style={styles.instructionTitle}>Ready to Use</Text>
          <Text style={styles.instructionText}>
            Congratulations! Please enjoy Senso and care for your plants.{"\n"}
          </Text>
          {/* TODO: Backend Integration - Dynamic Device Information Display */}
          {/* {deviceInfo && (
            <View style={styles.deviceInfoContainer}>
              <Text style={styles.deviceName}>Device: {deviceInfo.name}</Text>
              <Text style={styles.deviceId}>ID: {deviceInfo.id}</Text>
              <Text style={styles.syncStatus}>
                Status: {syncStatus === 'synced' ? 'Ready' : 'Syncing...'}
              </Text>
              <Text style={styles.plantCount}>
                Plants: {plantData.length} detected
              </Text>
              <Text style={styles.registrationStatus}>
                Registration: {registrationStatus}
              </Text>
              <Text style={styles.backupStatus}>
                Backup: {backupStatus}
              </Text>
              <Text style={styles.monitoringStatus}>
                Monitoring: {monitoringActive ? 'Active' : 'Inactive'}
              </Text>
            </View>
          )} */}
          
          {/* TODO: Backend Integration - Setup Progress Indicator */}
          {/* {setupProgress < 100 && (
            <View style={styles.progressContainer}>
              <Text style={styles.progressText}>Setup Progress: {setupProgress}%</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${setupProgress}%` }]} />
              </View>
            </View>
          )} */}
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Bottom Button */}
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Done</Text>
        </TouchableOpacity>
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
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
    position: "relative",
  },
  // static container (no animation)
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
    borderColor: "#f0f0f0",
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
    backgroundColor: "#E9F5EC", // exact page background color
  },

  imageMask: {
    width: RING_SIZE - RING_BORDER * 2,
    height: RING_SIZE - RING_BORDER * 2,
    borderRadius: (RING_SIZE - RING_BORDER * 2) / 2,
    overflow: "hidden",
    zIndex: 2,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -18,
  },
  connectImage: {
    width: 320,
    height: 280,
  },
  instructionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "flex-start",
  },
  instructionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 12,
    fontFamily: "Inter",
  },
  instructionText: {
    fontSize: 14,
    color: "#4C4C4C",
    lineHeight: 22,
    fontFamily: "Inter",
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    backgroundColor: "#5A9D6E",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 32,
    marginHorizontal: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
});