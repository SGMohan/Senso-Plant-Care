import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

/**
 * SensoDoneScreen
 * Implementation of the connection screen showing completed state.
 */
export default function SensoDoneScreen() {
  const handleClose = () => {
    router.push("/dashboard/dashboard");
  };

  const handleContinue = async () => {
    router.push("/dashboard/dashboard"); 
  };

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
              source={require("../../assets/images/wifi_pair_image.png")}
              style={styles.connectImage}
              resizeMode="contain"
              fadeDuration={0}
            />
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text variant="h2" weight="semibold" style={styles.instructionTitle}>Ready to Use</Text>
          <Text variant="body" style={styles.instructionText}>
            Congratulations! Please enjoy Senso and care for your plants.{"\n"}
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Bottom Button */}
        <Button 
          title="Done" 
          onPress={handleContinue} 
          style={styles.continueButton} 
        />
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
  loadingCircle: {
    width: RING_SIZE,
    height: RING_SIZE,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  staticOuterRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: RING_BORDER,
    borderColor: "#f0f0f0",
    position: "absolute",
  },
  gradientRing: {
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    padding: RING_BORDER,
  },
  gradientRingInner: {
    width: "100%",
    height: "100%",
    borderRadius: RING_SIZE / 2,
    backgroundColor: "#E9F5EC",
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
    marginBottom: 12,
  },
  instructionText: {
    color: "#4C4C4C",
    lineHeight: 22,
  },
  spacer: {
    flex: 1,
  },
  continueButton: {
    marginBottom: 32,
    marginHorizontal: 12,
  },
});
