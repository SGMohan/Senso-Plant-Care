import {
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { connectImage1 } from "../../assets/images";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function ConnectDeviceScreen() {
  const handleClose = () => {
    router.push("/dashboard/myplants");
  };

  const handleReadyToConnect = () => {
    console.log("Ready to connect pressed");
    router.push("/devices/wifiselect");
  };

  return (
    <LinearGradient colors={["#E6F4ED", "#F4F5EE"]} style={styles.safeArea}>
      <View style={styles.container}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#a8b5a8" />
        </TouchableOpacity>

        {/* Center Image */}
        <View style={styles.imageContainer}>
          {(() => {
            const Img = connectImage1 as any;
            return <Img width={360} height={360} />;
          })()}
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text variant="h2" weight="semibold" style={styles.instructionTitle}>Turn On & Connect</Text>
          <Text variant="body" style={styles.instructionText}>
            To begin, turn on your Senso device. Open the menu and click on the
            Communication Button.
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Ready to Connect Button */}
        <Button 
          title="Ready to Connect" 
          onPress={handleReadyToConnect} 
          style={styles.connectButton} 
        />
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
  instructionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "flex-start",
  },
  instructionTitle: {
    marginBottom: 12,
  },
  instructionText: {
    color: "#4C4C4C",
  },
  spacer: {
    flex: 1,
  },
  connectButton: {
    marginBottom: 32,
    marginHorizontal: 12,
  },
});
