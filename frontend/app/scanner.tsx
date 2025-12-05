/**
 * Plant Scanner Screen - UI like design + simple scanning animation
 */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

// Create animated SVG Circle component
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// Mock service – same as before
const PlantScannerService = {
  identifyPlant: async (imageUri: string) => {
    return {
      plantName: "Monstera Deliciosa",
      confidence: 0.95,
      suggestions: ["Swiss Cheese Plant", "Split-leaf Philodendron"],
      careInstructions: "Water when soil is dry, bright indirect light",
    };
  },
};

const { width } = Dimensions.get("window");

const BG_COLOR = "#EAF5EE";
const PRIMARY_GREEN = "#2E9A6A";
const LIGHT_GREEN = "#D4F2E4";
const PROGRESS_GREEN = "#5FCF62";

const CIRCLE_SIZE = width * 0.8;
const RING_RADIUS = (CIRCLE_SIZE + 30) / 2 - 5;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [flashMode, setFlashMode] = useState(false);
  const [plantsIdentified, setPlantsIdentified] = useState(2847);
  const [scanProgress, setScanProgress] = useState(0);

  const cameraRef = useRef<CameraView>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Scanning animation effect
  useEffect(() => {
    if (isScanning) {
      const scanAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, {
            toValue: CIRCLE_SIZE,
            duration: 1600,
            useNativeDriver: true,
          }),
          Animated.timing(scanLineAnim, {
            toValue: 0,
            duration: 1600,
            useNativeDriver: true,
          }),
        ])
      );

      const progressAnimation = Animated.timing(progressAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      });

      scanAnimation.start();
      progressAnimation.start();

      return () => {
        scanAnimation.stop();
        progressAnimation.stop();
        scanLineAnim.setValue(0);
        progressAnim.setValue(0);
      };
    } else {
      scanLineAnim.setValue(0);
      progressAnim.setValue(0);
      setScanProgress(0);
    }
  }, [isScanning]);

  // Update progress percentage
  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setScanProgress(Math.round(value * 100));
    });
    return () => progressAnim.removeListener(listener);
  }, []);

  const handleBackPress = () => {
    router.back();
  };

  const handleMenuPress = () => {
    // TODO: BACKEND IMPLEMENTATION - Scanner Settings Menu
    // ================================================
    //
    // SCAN HISTORY FEATURE:
    // - Create /scan-history route with user's scan history
    // - Backend: GET /api/users/scan-history
    // - Display: Date, plant name, confidence, image thumbnail
    // - Features: Search, filter by date/plant type, export data
    //
    // CAMERA SETTINGS FEATURE:
    // - Save user preferences to backend
    // - Backend: POST/PUT /api/users/camera-settings
    // - Settings: Flash default, image quality, auto-focus mode
    // - Sync across devices for logged-in users
    //
    // HELP & TIPS FEATURE:
    // - Create /scanner-help route with scanning guidelines
    // - Backend: GET /api/content/scanner-tips
    // - Content: Best practices, lighting tips, plant positioning
    // - Interactive tutorials and video guides

    Alert.alert("Menu", "Scanner settings coming soon!");
  };

  const handleTakePicture = async () => {
    // TODO: BACKEND IMPLEMENTATION - Plant Identification
    // ================================================
    //
    // IMAGE CAPTURE & PROCESSING:
    // - Capture high-quality image from camera
    // - Validate image quality (blur detection, lighting)
    // - Compress and optimize for AI processing
    // - Generate thumbnail for history storage
    //
    // AI IDENTIFICATION SERVICE:
    // - Backend: POST /api/plants/identify
    // - Send image to TensorFlow/PyTorch model
    // - Process AI response with confidence scoring
    // - Handle multiple plant suggestions
    //
    // USER ANALYTICS & TRACKING:
    // - Track scan attempts and success rates
    // - Store scan history with timestamps
    // - Update global identification counter
    // - Generate usage analytics for improvement

    setIsScanning(true);
    try {
      // const photo = await cameraRef.current?.takePictureAsync({ quality: 0.8 });
      // const result = await PlantScannerService.identifyPlant(photo?.uri as string);

      // mock delay
      await new Promise((res) => setTimeout(res, 3000));
      Alert.alert(
        "Plant Identified! 🌿",
        "Monstera Deliciosa (95% confidence)",
        [
          { text: "Name Your Plant", onPress: () => router.push("/nameplant") },
          { text: "Scan Again", style: "cancel" },
        ]
      );
      setPlantsIdentified((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to scan plant. Please try again.");
    } finally {
      setIsScanning(false);
    }
  };

  const handleUploadFromGallery = async () => {
    // TODO: BACKEND IMPLEMENTATION - Gallery Image Processing
    // ====================================================
    //
    // IMAGE PICKER INTEGRATION:
    // - Open device gallery with proper permissions
    // - Allow image editing and cropping
    // - Validate selected image format and size
    // - Handle multiple image selection (future feature)
    //
    // IMAGE PROCESSING PIPELINE:
    // - Resize and compress uploaded images
    // - Extract EXIF data for better analysis
    // - Validate image quality before AI processing
    // - Generate thumbnails for storage
    //
    // BATCH PROCESSING SUPPORT:
    // - Queue multiple images for processing
    // - Background processing with progress updates
    // - Retry mechanism for failed uploads
    // - Offline storage for later processing

    try {
      Alert.alert("Upload", "Gallery upload coming soon!");
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Failed to upload image.");
      setIsScanning(false);
    }
  };

  const handleFlashToggle = () => {
    // TODO: BACKEND IMPLEMENTATION - Camera Settings Persistence
    // =======================================================
    //
    // USER PREFERENCE STORAGE:
    // - Save flash mode preference to user settings
    // - Backend: PUT /api/users/camera-preferences
    // - Sync flash setting across user devices
    // - Remember setting for future app sessions
    //
    // CAMERA OPTIMIZATION:
    // - Adjust camera settings based on lighting conditions
    // - Auto-detect low light scenarios
    // - Provide flash recommendations to users
    // - Track flash usage analytics for UX improvement

    setFlashMode((prev) => !prev);
  };

  // permission states
  if (!permission) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>Requesting camera permission…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <Text style={styles.permissionSubtext}>
          Please enable camera access in settings.
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.permissionButton}
        >
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calculate stroke dash offset for progress animation
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [RING_CIRCUMFERENCE, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header icons */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerIconBtn}
          onPress={handleBackPress}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2933" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.headerIconBtn, styles.hamburgerBtn]}
          onPress={handleMenuPress}
        >
          <View style={styles.hamburgerMenu}>
            <View style={[styles.hamburgerLine, styles.hamburgerLineTop]} />
            <View style={[styles.hamburgerLine, styles.hamburgerLineMiddle]} />
            <View style={[styles.hamburgerLine, styles.hamburgerLineBottom]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Title + chip */}
      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Plant Scanner</Text>
          <Text style={{ marginLeft: 6, fontSize: 28 }}>🌿</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>
            {plantsIdentified.toLocaleString()} plants identified
          </Text>
        </View>
      </View>

      {/* Scanner circle + decorations */}
      <View style={styles.scannerWrapper}>
        {/* dotted outer circle */}
        <View style={styles.outerCircle}>
          <View style={styles.dottedRing} />

          {/* Circular animated ring with percentage using SVG */}
          {isScanning && (
            <View style={styles.circularRingContainer}>
              <Svg
                width={CIRCLE_SIZE + 30}
                height={CIRCLE_SIZE + 30}
                style={styles.progressSvg}
              >
                {/* Background circle */}
                <Circle
                  cx={(CIRCLE_SIZE + 30) / 2}
                  cy={(CIRCLE_SIZE + 30) / 2}
                  r={RING_RADIUS}
                  stroke="#D4F2E4"
                  strokeWidth="7"
                  fill="none"
                />
                {/* Animated progress circle */}
                <AnimatedCircle
                  cx={(CIRCLE_SIZE + 30) / 2}
                  cy={(CIRCLE_SIZE + 30) / 2}
                  r={RING_RADIUS}
                  stroke={PROGRESS_GREEN}
                  strokeWidth="7"
                  fill="none"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  rotation="-90"
                  origin={`${(CIRCLE_SIZE + 30) / 2}, ${
                    (CIRCLE_SIZE + 30) / 2
                  }`}
                />
              </Svg>

              {/* Percentage display at loading ring end */}
              <Animated.View
                style={[
                  styles.circularPercentageContainer,
                  {
                    transform: [
                      {
                        rotate: progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ["0deg", "360deg"],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <View style={styles.percentageBox}>
                  <Text style={styles.circularPercentageText}>
                    {scanProgress}%
                  </Text>
                </View>
              </Animated.View>
            </View>
          )}

          {/* main circular camera view */}
          <View style={styles.scannerCircle}>
            <CameraView
              ref={cameraRef}
              style={styles.camera}
              facing="back"
              flash={flashMode ? "on" : "off"}
            >
              {/* animated scanning line */}
              {isScanning && (
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.scanLine,
                    {
                      transform: [{ translateY: scanLineAnim }],
                    },
                  ]}
                />
              )}
            </CameraView>
          </View>

          {/* 4 corner brackets */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      {/* Hint text */}
      <Text style={styles.hintText}>Position plant within frame</Text>

      {/* Bottom controls card */}
      <View style={styles.bottomCard}>
        {/* Gallery */}
        <TouchableOpacity
          style={styles.smallControlBtn}
          onPress={handleUploadFromGallery}
        >
          <Ionicons name="image-outline" size={24} color={PRIMARY_GREEN} />
        </TouchableOpacity>

        {/* Scan button */}
        <TouchableOpacity
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]}
          onPress={handleTakePicture}
          disabled={isScanning}
        >
          <Text style={styles.scanButtonText}>
            {isScanning ? "Scanning..." : "Tap to Scan"}
          </Text>
        </TouchableOpacity>

        {/* Flash */}
        <TouchableOpacity
          style={styles.smallControlBtn}
          onPress={handleFlashToggle}
        >
          <Ionicons
            name={flashMode ? "flash" : "flash-off"}
            size={24}
            color={PRIMARY_GREEN}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ================== STYLES ==================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    alignItems: "center",
  },

  // header
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  hamburgerBtn: {
    alignItems: "flex-end",
  },

  // Custom hamburger menu
  hamburgerMenu: {
    width: 20,
    height: 16,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  hamburgerLine: {
    backgroundColor: "#1F2933",
    borderRadius: 1,
  },
  hamburgerLineTop: {
    width: 20,
    height: 3,
  },
  hamburgerLineMiddle: {
    width: 14,
    height: 2,
  },
  hamburgerLineBottom: {
    width: 20,
    height: 3,
  },

  // title
  titleContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "Inter",
  },
  chip: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: LIGHT_GREEN,
  },
  chipText: {
    fontSize: 13,
    color: PRIMARY_GREEN,
    fontWeight: "600",
    fontFamily: "Inter",
  },

  // scanner
  scannerWrapper: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  outerCircle: {
    width: CIRCLE_SIZE + 60,
    height: CIRCLE_SIZE + 60,
    borderRadius: (CIRCLE_SIZE + 60) / 2,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  dottedRing: {
    position: "absolute",
    width: CIRCLE_SIZE + 52,
    height: CIRCLE_SIZE + 52,
    borderRadius: (CIRCLE_SIZE + 52) / 2,
    borderWidth: 1.5,
    borderColor: "#A7E0C2",
    borderStyle: "dashed",
  },

  // Circular animated ring with SVG
  circularRingContainer: {
    position: "absolute",
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "center",
    alignItems: "center",
  },
  progressSvg: {
    position: "absolute",
  },
  circularPercentageContainer: {
    position: "absolute",
    width: CIRCLE_SIZE + 30,
    height: CIRCLE_SIZE + 30,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  percentageBox: {
    backgroundColor: BG_COLOR,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: -5,
  },
  circularPercentageText: {
    fontSize: 16,
    fontWeight: "700",
    color: PRIMARY_GREEN,
  },

  scannerCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    overflow: "hidden",
    backgroundColor: "#F5F5F5",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  scanLine: {
    position: "absolute",
    left: 0,
    width: "100%",
    height: 3,
    backgroundColor: "#00F79F",
    shadowColor: "#22C55E",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },

  // corner brackets
  corner: {
    position: "absolute",
    width: 46,
    height: 46,
    borderColor: "#1F5A3A",
    borderWidth: 4,
  },
  topLeft: {
    top: 12,
    left: 12,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 12,
  },
  topRight: {
    top: 12,
    right: 12,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopRightRadius: 12,
  },
  bottomLeft: {
    bottom: 12,
    left: 12,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomLeftRadius: 12,
  },
  bottomRight: {
    bottom: 12,
    right: 12,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderBottomRightRadius: 12,
  },

  hintText: {
    marginTop: 22,
    fontSize: 14,
    color: "#94A3B8",
    textAlign: "center",
    fontFamily: "Inter",
  },

  // bottom controls card
  bottomCard: {
    position: "absolute",
    bottom: 60,
    width: width - 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  smallControlBtn: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#D4F2E4",
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    flex: 1,
    marginHorizontal: 16,
    height: 48,
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonDisabled: {
    opacity: 0.8,
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },

  // permission states
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BG_COLOR,
    paddingHorizontal: 40,
  },
  permissionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
    fontFamily: "Inter",
  },
  permissionSubtext: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 8,
    fontFamily: "Inter",
  },
  permissionButton: {
    marginTop: 16,
    backgroundColor: PRIMARY_GREEN,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
});
