/**
 * Name Your Plant Screen - Final Step in Sequential Plant Setup
 */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Location from "expo-location";
import { plantImages } from "../../assets/images";
import { savePlant } from "../../services/plantService";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function NameYourPlantScreen() {
  const params = useLocalSearchParams();
  const { plantType, scientificName, scannedImageUri, potSize, soilType } =
    params;

  const [plantName, setPlantName] = useState(
    (params.plantName as string) || (plantType as string) || "Volvo"
  );
  const [selectedLocation, setSelectedLocation] = useState(
    (params.location as string) || "Living Room"
  );
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [selectedButton, setSelectedButton] = useState("addPlant");

  const predefinedLocations = ["Living Room", "Balcony"];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        setCoords({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      }
    })();
  }, []);

  const handleBackPress = () => router.back();
  const handleClosePress = () => router.replace("/dashboard/dashboard");

  const handleAddInfo = () => {
    // Sequential flow: navigate to soiltype page
    router.push({
      pathname: "/plants/soiltype",
      params: {
        ...params,
        plantName,
        location: selectedLocation,
        scannedImageUri: scannedImageUri || params.scannedImageUri,
        scientificName: scientificName || params.scientificName,
        plantType: plantType || params.plantType,
      },
    });
  };

  const handleAddPlant = async () => {
    if (!plantName) {
      Alert.alert("Required", "Please give your plant a name");
      return;
    }

    setLoading(true);
    try {
      const plantData = {
        plantName,
        scientificName: scientificName || "",
        type: plantType || "Unknown",
        location: selectedLocation,
        image: scannedImageUri,
        potSize: potSize || "Not specified",
        soilType: soilType || "Not specified",
        status: "healthy",
        latitude: coords?.lat,
        longitude: coords?.lng,
      };

      await savePlant(plantData);

      Alert.alert("Success! 🌱", `${plantName} has been added.`, [
        { text: "View Dashboard", onPress: () => router.replace("/dashboard/dashboard") },
      ]);
    } catch (error: any) {
      Alert.alert("Save Failed", error.message || "Could not save plant");
    } finally {
      setLoading(false);
    }
  };

  const ProfileIcon = plantImages.plantProfile;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={22} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={handleClosePress}
            >
              <Ionicons name="close" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Title */}
          <Text variant="h2" weight="semibold" style={styles.title}>Name Your Plant</Text>
          <Text variant="bodySmall" style={styles.subtitle}>{plantType || "Gardenia"}</Text>

          {/* Plant Image */}
          <View style={styles.imageWrapper}>
            <View style={styles.imageCircle}>
              {scannedImageUri ? (
                <Image
                  source={{ uri: scannedImageUri as string }}
                  style={styles.plantImage}
                  resizeMode="cover"
                />
              ) : (
                <ProfileIcon width={280} height={280} />
              )}
            </View>
          </View>

          {/* Plant Name Input (pill) */}
          <View style={styles.nameInputContainer}>
            <TextInput
              style={styles.nameInput}
              value={plantName}
              onChangeText={setPlantName}
              placeholder="Enter plant name"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Location Selection */}
          <View style={styles.locationSection}>
            <View style={styles.locationButtons}>
              {predefinedLocations.map((location) => {
                const isActive = selectedLocation === location;
                return (
                  <TouchableOpacity
                    key={location}
                    style={[
                      styles.locationButton,
                      isActive
                        ? styles.locationButtonActive
                        : styles.locationButtonInactive,
                    ]}
                    onPress={() => setSelectedLocation(location)}
                  >
                    <Text
                      weight="medium"
                      style={[
                        styles.locationButtonText,
                        isActive
                          ? styles.locationButtonTextActive
                          : styles.locationButtonTextInactive,
                      ]}
                    >
                      {location}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Add sites Button */}
            <TouchableOpacity
              style={styles.addLocationButton}
              onPress={handleAddInfo}
            >
              <Ionicons name="add-circle" size={20} color="#10B981" />
              <Text weight="semibold" style={styles.addLocationText}>Add sites</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Action Buttons */}
      <View style={styles.actionButtons}>
        <Button 
          title="Add Info" 
          onPress={handleAddInfo} 
          variant={selectedButton === "addInfo" ? "primary" : "outline"}
          style={styles.bottomButton}
        />

        <Button 
          title="Add Plant" 
          onPress={handleAddPlant} 
          loading={loading}
          variant={selectedButton === "addPlant" ? "primary" : "outline"}
          style={styles.bottomButton}
        />
      </View>
    </SafeAreaView>
  );
}

const BG_COLOR = "#E6F1E7";
const PRIMARY_GREEN = "#10B981";

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_COLOR },
  keyboardAvoid: { flex: 1 },
  container: { flex: 1, backgroundColor: BG_COLOR },
  scrollContent: { paddingBottom: 140, flexGrow: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  roundIconBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  title: {
    textAlign: "center",
    marginTop: 12,
  },
  subtitle: {
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  imageWrapper: { marginTop: 24, alignItems: "center" },
  imageCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#E6F1E7",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  plantImage: { width: "100%", height: "100%" },
  nameInputContainer: { marginTop: 24, alignItems: "center" },
  nameInput: {
    minWidth: 160,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  locationSection: { marginTop: 26, paddingHorizontal: 28 },
  locationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  locationButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: "center",
    borderWidth: 1.5,
  },
  locationButtonActive: {
    backgroundColor: "#FFFFFF",
    borderColor: PRIMARY_GREEN,
  },
  locationButtonInactive: {
    backgroundColor: "#F3F4F6",
    borderColor: "#E5E7EB",
  },
  locationButtonText: { fontSize: 14 },
  locationButtonTextActive: { color: PRIMARY_GREEN },
  locationButtonTextInactive: { color: "#6B7280" },
  addLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addLocationText: {
    marginLeft: 6,
    color: "#6B7280",
  },
  actionButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 30,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    elevation: 10,
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
