import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
  Platform,
} from "react-native";
import {
  CameraView,
  useCameraPermissions,
  type CameraType,
} from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const CameraScreen = () => {
  const router = useRouter();
  const cameraRef = useRef<CameraView>(null);

  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>("back");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!permission || !permission.granted) {
        await requestPermission();
      }
    })();
  }, [permission, requestPermission]);

  const handleClose = () => {
    router.back();
  };

  const handleGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to open gallery");
    }
  };

  const handleCapture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
        });

        setCapturedImage(photo.uri);
      } catch (error) {
        Alert.alert("Error", "Failed to capture photo");
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUsePhoto = () => {
    // TODO: Process the photo (send to API, navigate, etc.)
    Alert.alert("Success", "Photo ready to use!");
    router.back();
  };

  const toggleCameraType = () => {
    setCameraType((current: CameraType) =>
      current === "back" ? "front" : "back"
    );
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.container, styles.permissionContainer]}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <Ionicons name="camera-outline" size={48} color="#a8b5a8" />
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Ionicons name="lock-open" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }

  // If image is captured, show preview
  if (capturedImage) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />

        <Image source={{ uri: capturedImage }} style={styles.previewImage} />

        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Preview Controls */}
        <View style={styles.previewControls}>
          <TouchableOpacity style={styles.retakeButton} onPress={handleRetake}>
            <Ionicons name="refresh" size={28} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.usePhotoButton}
            onPress={handleUsePhoto}
          >
            <Ionicons name="checkmark" size={32} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Camera view
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing={cameraType}
      >
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {/* Empty space for centering */}
          <View style={styles.emptySpace} />

          {/* Capture Button */}
          <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
            <View style={styles.captureButtonInner} />
          </TouchableOpacity>

          {/* Gallery Button */}
          <TouchableOpacity style={styles.galleryButton} onPress={handleGallery}>
            <Ionicons name="images" size={24} color="#5a9a7a" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  permissionButton: {
    backgroundColor: "#4aa88b",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  camera: {
    flex: 1,
  },

  closeButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },

  bottomControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: Platform.OS === "ios" ? 50 : 30,
    paddingTop: 30,
  },
  emptySpace: {
    width: 50,
    height: 50,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#5a9a7a",
  },

  previewImage: {
    flex: 1,
    resizeMode: "cover",
  },
  previewControls: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 50 : 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 60,
  },
  retakeButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  usePhotoButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#5a9a7a",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default CameraScreen;
