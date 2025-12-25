/**
 * Plant Scanner Screen - Precise identification with UI refinements
 */
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Dimensions,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { identifyPlant, getGlobalPlantCount } from "../../services/plantService";
import Text from "../../components/ui/Text";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { width, height } = Dimensions.get("window");

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const cameraRef = useRef<CameraView>(null);
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  // 1. Fetch Global Count & Increment Logic
  useEffect(() => {
    const fetchCount = async () => {
      const count = await getGlobalPlantCount();
      setPlantsIdentified(count);
    };
    fetchCount();

    const interval = setInterval(() => {
      if (!isScanning) {
        setPlantsIdentified(prev => prev + Math.floor(Math.random() * 2));
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isScanning]);

  // 2. Animations (Scan Line & Circular Progress)
  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanLineAnim, { 
            toValue: CIRCLE_SIZE - 4, // Stop just before bottom
            duration: 1600, 
            useNativeDriver: true 
          }),
          Animated.timing(scanLineAnim, { 
            toValue: 4, // Stop just before top
            duration: 1600, 
            useNativeDriver: true 
          }),
        ])
      ).start();
      
      Animated.timing(progressAnim, { 
        toValue: 1, 
        duration: 3500, 
        useNativeDriver: true 
      }).start();
    } else {
      scanLineAnim.setValue(0);
      progressAnim.setValue(0);
    }
  }, [isScanning]);

  // 3. Update Progress State
  useEffect(() => {
    const listener = progressAnim.addListener(({ value }) => {
      setScanProgress(Math.min(99, Math.round(value * 100)));
    });
    return () => progressAnim.removeListener(listener);
  }, []);

  const processImage = async (uri: string) => {
    setSelectedImage(uri);
    setIsScanning(true);
    
    try {
      const result = await identifyPlant(uri);
      
      // Artificial delay to let the animation complete
      setTimeout(() => {
        setIsScanning(false);
        if (result.success) {
          router.push({
            pathname: "/plants/nameplant",
            params: {
              plantType: result.data.plantName || result.data.scientificName,
              scientificName: result.data.scientificName || "",
              confidence: result.data.confidence ? (result.data.confidence * 100).toFixed(0) : "0",
              scannedImageUri: uri,
            }
          });
        } else {
          handleFailure(uri);
        }
      }, 3500);
    } catch (err: any) {
      console.error("Scan error:", err);
      setIsScanning(false);
      handleFailure(uri);
    }
  };

  const handleFailure = (uri: string) => {
    Alert.alert(
      "Identification Failed", 
      "We couldn't identify this plant. Would you like to enter details manually?",
      [
        { text: "Try Again", onPress: () => setSelectedImage(null) },
        { 
          text: "Manual Entry", 
          onPress: () => router.push({
            pathname: "/plants/nameplant",
            params: { scannedImageUri: uri, plantType: "" }
          }) 
        }
      ]
    );
  };

  const handleTakePicture = async () => {
    if (cameraRef.current && !isScanning) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ 
          quality: 0.7,
          skipProcessing: true 
        });
        if (photo) await processImage(photo.uri);
      } catch (err) {
        Alert.alert("Error", "Failed to capture image");
      }
    }
  };

  const handleUploadFromGallery = async () => {
    if (isScanning) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });
      if (!result.canceled && result.assets[0]) {
        await processImage(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to select image");
    }
  };

  if (!permission) return <View style={styles.permissionContainer}><ActivityIndicator size="large" color={PRIMARY_GREEN} /></View>;
  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>No access to camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text weight="semibold" style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [RING_CIRCUMFERENCE, 0],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color="#1F2933" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.headerIconBtn, styles.hamburgerBtn]}
          onPress={() => Alert.alert("Scanner Settings", "History and camera preferences coming soon!")}
        >
          <View style={styles.hamburgerMenu}>
            <View style={[styles.hamburgerLine, styles.hamburgerLineTop]} />
            <View style={[styles.hamburgerLine, styles.hamburgerLineMiddle]} />
            <View style={[styles.hamburgerLine, styles.hamburgerLineBottom]} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <View style={styles.titleRow}>
          <Text variant="h2" weight="semibold" style={styles.title}>Plant Scanner</Text>
          <Text style={{ marginLeft: 6, fontSize: 28 }}>🌿</Text>
        </View>
        <View style={styles.chip}>
          <Text weight="semibold" style={styles.chipText}>
            {plantsIdentified.toLocaleString()} plants identified
          </Text>
        </View>
      </View>

      <View style={styles.scannerWrapper}>
        <View style={styles.outerCircle}>
          <View style={styles.dottedRing} />
          {isScanning && (
            <View style={styles.circularRingContainer}>
              <Svg width={CIRCLE_SIZE + 30} height={CIRCLE_SIZE + 30}>
                <Circle cx={(CIRCLE_SIZE + 30) / 2} cy={(CIRCLE_SIZE + 30) / 2} r={RING_RADIUS} stroke="#D4F2E4" strokeWidth="7" fill="none" />
                <AnimatedCircle
                  cx={(CIRCLE_SIZE + 30) / 2} cy={(CIRCLE_SIZE + 30) / 2} r={RING_RADIUS} stroke={PROGRESS_GREEN} strokeWidth="7" fill="none"
                  strokeDasharray={RING_CIRCUMFERENCE} strokeDashoffset={strokeDashoffset} strokeLinecap="round" rotation="-90" origin={`${(CIRCLE_SIZE + 30) / 2}, ${(CIRCLE_SIZE + 30) / 2}`}
                />
              </Svg>
              <Animated.View style={[styles.circularPercentageContainer, { 
                transform: [
                  { rotate: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] }) }
                ] 
              }]}>
                <View style={styles.percentageBox}>
                  <Text weight="semibold" style={styles.circularPercentageText}>{scanProgress}%</Text>
                </View>
              </Animated.View>
            </View>
          )}

          <View style={styles.scannerCircle}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.camera} resizeMode="cover" />
            ) : (
              <CameraView ref={cameraRef} style={styles.camera} facing="back" enableTorch={flashMode}>
                {isScanning && (
                  <Animated.View pointerEvents="none" style={[styles.scanLine, { transform: [{ translateY: scanLineAnim }] }]} />
                )}
              </CameraView>
            )}
            {selectedImage && isScanning && (
              <Animated.View pointerEvents="none" style={[styles.scanLine, { transform: [{ translateY: scanLineAnim }] }]} />
            )}
          </View>
          
          {/* Corner Decorations */}
          <View style={[styles.corner, styles.topLeft]} />
          <View style={[styles.corner, styles.topRight]} />
          <View style={[styles.corner, styles.bottomLeft]} />
          <View style={[styles.corner, styles.bottomRight]} />
        </View>
      </View>

      <Text variant="caption" style={styles.hintText}>{isScanning ? `Matching probability: ${scanProgress}%` : "Position plant within frame"}</Text>

      <View style={styles.bottomCard}>
        <TouchableOpacity style={styles.smallControlBtn} onPress={handleUploadFromGallery} disabled={isScanning}>
          <Ionicons name="image-outline" size={24} color={PRIMARY_GREEN} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.scanButton, isScanning && styles.scanButtonDisabled]} 
          onPress={() => {
            if (selectedImage && !isScanning) {
              setSelectedImage(null);
            } else {
              handleTakePicture();
            }
          }} 
          disabled={isScanning}
        >
          <Text weight="semibold" style={styles.scanButtonText}>{isScanning ? "Scanning..." : selectedImage ? "Reset Camera" : "Tap to Scan"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallControlBtn} onPress={() => setFlashMode(!flashMode)} disabled={isScanning}>
          <Ionicons name={flashMode ? "flash" : "flash-off"} size={24} color={PRIMARY_GREEN} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR, alignItems: "center" },
  header: { width: "100%", flexDirection: "row", justifyContent: "space-between", padding: 20 },
  headerIconBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
  hamburgerBtn: { alignItems: "flex-end" },
  hamburgerMenu: { width: 20, height: 16, justifyContent: "space-between", alignItems: "flex-end" },
  hamburgerLine: { backgroundColor: "#1F2933", borderRadius: 1 },
  hamburgerLineTop: { width: 20, height: 3 },
  hamburgerLineMiddle: { width: 14, height: 2 },
  hamburgerLineBottom: { width: 20, height: 3 },
  titleContainer: { marginTop: 10, alignItems: "center" },
  titleRow: { flexDirection: "row", alignItems: "center" },
  title: { color: "#111827" },
  chip: { marginTop: 8, paddingHorizontal: 18, paddingVertical: 6, borderRadius: 999, backgroundColor: LIGHT_GREEN },
  chipText: { fontSize: 13, color: PRIMARY_GREEN },
  scannerWrapper: { marginTop: height * 0.05, alignItems: "center", justifyContent: "center" },
  outerCircle: { width: CIRCLE_SIZE + 60, height: CIRCLE_SIZE + 60, borderRadius: (CIRCLE_SIZE + 60) / 2, alignItems: "center", justifyContent: "center", position: "relative" },
  dottedRing: { position: "absolute", width: CIRCLE_SIZE + 52, height: CIRCLE_SIZE + 52, borderRadius: 999, borderWidth: 1.5, borderColor: "#A7E0C2", borderStyle: "dashed" },
  circularRingContainer: { position: "absolute", width: CIRCLE_SIZE + 30, height: CIRCLE_SIZE + 30, justifyContent: "center", alignItems: "center" },
  circularPercentageContainer: { position: "absolute", width: CIRCLE_SIZE + 30, height: CIRCLE_SIZE + 30, justifyContent: "flex-start", alignItems: "center" },
  percentageBox: { backgroundColor: BG_COLOR, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, marginTop: -5 },
  circularPercentageText: { color: PRIMARY_GREEN },
  scannerCircle: { width: CIRCLE_SIZE, height: CIRCLE_SIZE, borderRadius: CIRCLE_SIZE / 2, overflow: "hidden", backgroundColor: "#F5F5F5" },
  camera: { width: "100%", height: "100%" },
  scanLine: { position: "absolute", left: 0, width: "100%", height: 3, backgroundColor: "#00F79F", shadowColor: "#00F79F", shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 10 },
  corner: { position: "absolute", width: 46, height: 46, borderColor: "#1F5A3A", borderWidth: 4, zIndex: 10 },
  topLeft: { top: 12, left: 12, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 12 },
  topRight: { top: 12, right: 12, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 12 },
  bottomLeft: { bottom: 12, left: 12, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 12 },
  bottomRight: { bottom: 12, right: 12, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 12 },
  hintText: { marginTop: 22, color: "#94A3B8", textAlign: "center" },
  bottomCard: { position: "absolute", bottom: 40, width: width - 40, backgroundColor: "#FFFFFF", borderRadius: 20, padding: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", elevation: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
  smallControlBtn: { width: 48, height: 48, borderRadius: 12, backgroundColor: "#D4F2E4", justifyContent: "center", alignItems: "center" },
  scanButton: { flex: 1, marginHorizontal: 16, height: 48, backgroundColor: PRIMARY_GREEN, borderRadius: 24, justifyContent: "center", alignItems: "center" },
  scanButtonDisabled: { opacity: 0.8 },
  scanButtonText: { color: "#FFFFFF" },
  permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: BG_COLOR },
  permissionText: { fontSize: 18, fontWeight: "600" },
  permissionButton: { marginTop: 16, backgroundColor: PRIMARY_GREEN, padding: 12, borderRadius: 8 },
  permissionButtonText: { color: "#FFFFFF" }
});
