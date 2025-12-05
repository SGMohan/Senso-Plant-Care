import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { connectImage1 } from "../assets";

// TODO: Backend Integration - Device Connection Service
// import { scanForDevices, connectToDevice, getDeviceStatus } from '../services/deviceService';
// import { useQuery, useMutation } from '@tanstack/react-query';

export default function ConnectDeviceScreen() {
  // TODO: Backend Integration - Device connection state management
  // const [isScanning, setIsScanning] = useState(false);
  // const [availableDevices, setAvailableDevices] = useState([]);
  // const [connectionStatus, setConnectionStatus] = useState('idle');
  
  // const scanDevicesMutation = useMutation({
  //   mutationFn: scanForDevices,
  //   onSuccess: (devices) => setAvailableDevices(devices),
  //   onError: (error) => console.error('Scan failed:', error)
  // });
  
  // const connectDeviceMutation = useMutation({
  //   mutationFn: connectToDevice,
  //   onSuccess: () => {
  //     setConnectionStatus('connected');
  //     router.push('/device-connected');
  //   },
  //   onError: (error) => console.error('Connection failed:', error)
  // });

  const handleClose = () => {
    router.back();
  };

  const handleReadyToConnect = () => {
    // TODO: Backend Integration - Start device scanning and connection process
    // setIsScanning(true);
    // scanDevicesMutation.mutate();
    console.log("Ready to connect pressed");
    router.push('/wifiselect');
  };

  // TODO: Backend Integration - Handle device selection and connection
  const handleDeviceSelect = (deviceId: string) => {
    // connectDeviceMutation.mutate(deviceId);
    console.log('Device selected:', deviceId);
  };

  // TODO: Backend Integration - Check device connection status
  const checkConnectionStatus = async () => {
    // const status = await getDeviceStatus();
    // setConnectionStatus(status);
    console.log('Checking connection status');
  };

  return (
    <LinearGradient colors={['#E6F4ED', '#F4F5EE']} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#a8b5a8" />
        </TouchableOpacity>

        {/* Center Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={connectImage1} 
            style={styles.connectImage}
            resizeMode="contain"
            fadeDuration={0}
          />
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionTitle}>Turn On & Connect</Text>
          <Text style={styles.instructionText}>
            To begin, turn on your Senso device. Open the menu and click on the
            Communication Button.
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Ready to Connect Button */}
        <TouchableOpacity
          style={styles.connectButton}
          onPress={handleReadyToConnect}
        >
          <Text style={styles.connectButtonText}>Ready to Connect</Text>
        </TouchableOpacity>
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
  },
  connectImage: {
    width: 360,
    height: 360,
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
    lineHeight: 24,
    fontFamily: "Inter",
  },
  spacer: {
    flex: 1,
  },
  connectButton: {
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
  connectButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
});