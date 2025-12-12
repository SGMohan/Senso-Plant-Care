/**
 * Name Your Plant Screen - Plant setup and configuration after scanning
 * 
 * BACKEND INTEGRATION REQUIREMENTS:
 * ================================
 * 
 * 1. PLANT DATA MANAGEMENT
 *    - Endpoint: POST /api/plants/create
 *    - Store plant name, location, and identification data
 *    - Link to user account and scanner results
 *    - Generate unique plant ID for tracking
 * 
 * 2. LOCATION MANAGEMENT
 *    - Endpoint: GET/POST /api/users/locations
 *    - Fetch user's existing locations
 *    - Add new custom locations
 *    - Location-based care recommendations
 * 
 * 3. PLANT PROFILE CREATION
 *    - Save plant image from scanner
 *    - Store plant species information
 *    - Initialize care schedule based on plant type
 *    - Set up monitoring preferences
 * 
 * 4. USER PREFERENCES
 *    - Save naming patterns and preferences
 *    - Store location preferences
 *    - Track user's plant collection growth
 *    - Personalized recommendations
 * 
 * 5. INTEGRATION WITH SCANNER DATA
 *    - Retrieve plant identification results
 *    - Pre-populate plant species information
 *    - Link scanner confidence scores
 *    - Store identification accuracy feedback
 */

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { plantImages } from "../assets";

export default function NameYourPlantScreen() {
  const [plantName, setPlantName] = useState("Volvo");
  const [selectedLocation, setSelectedLocation] = useState("Living Room");
  const [customLocations, setCustomLocations] = useState<string[]>([]);
  const [selectedButton, setSelectedButton] = useState("addPlant");

  const predefinedLocations = ["Living Room", "Balcony"];

  const handleBackPress = () => {
    router.back();
  };

  const handleClosePress = () => {
    router.back();
  };

  const handleAddLocation = () => {
    router.push('/potsize');
  };

  const handleAddInfo = () => {
    // PERSONALIZED PLANT PROFILE FLOW - Detail Settings (Post-MVP)
    // ===========================================================
    // Decision: Detail Setting? YES → Detail Settings
    // Navigate to detailed plant configuration
    
    // TODO: BACKEND IMPLEMENTATION - Additional Plant Information
    // ========================================================
    // 
    // PLANT INFORMATION COLLECTION:
    // - Navigate to detailed plant info form
    // - Collect care preferences and schedules
    // - Add plant notes and custom reminders
    // - Set up monitoring device connections
    // 
    // BACKEND INTEGRATION:
    // - Save partial plant data as draft
    // - POST /api/plants/draft with current info
    
    console.log("Add info with:", { plantName, selectedLocation });
    
    // Navigate to detail settings (Post-MVP features)
    // For now, go to pot size selection as first detail setting
    router.push({
      pathname: "/potsize",
      params: {
        plantName,
        location: selectedLocation,
        fromDetailSettings: "true"
      }
    });
  };

  const handleAddPlant = () => {
    // PERSONALIZED PLANT PROFILE FLOW - Direct Plant Addition
    // ======================================================
    // Decision: Detail Setting? NO → Finish Setting → Return to Homepage
    // Create plant profile and return to dashboard
    
    // TODO: BACKEND IMPLEMENTATION - Create Plant Profile
    // =================================================
    // 
    // PLANT CREATION PROCESS:
    // - Validate required fields (name, location)
    // - Create complete plant profile in database
    // - Initialize default care schedule
    // - Set up monitoring and notifications
    // 
    // BACKEND INTEGRATION:
    // - POST /api/plants/create with full plant data
    // - Upload plant image to cloud storage
    // - Initialize care tracking records
    // - Add plant to user's dashboard
    
    console.log("Add plant with:", { plantName, selectedLocation });
    
    // Show success message and navigate to dashboard
    Alert.alert(
      "Plant Added Successfully! 🌱",
      `${plantName} has been added to your ${selectedLocation}`,
      [
        {
          text: "View Plant",
          onPress: () => router.push("/dashboard")
        }
      ]
    );
  };

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
        <Text style={styles.title}>Name Your Plant</Text>
        <Text style={styles.subtitle}>Gardenia</Text>

        {/* Plant Image */}
        {/* TODO: REPLACE WITH SCANNED PLANT IMAGE */}
        {/* ===================================== */}
        {/* CURRENT: Using dummy plantProfile image */}
        {/* FUTURE: Display scanned plant image from scanner.tsx */}
        {/* 
         * IMPLEMENTATION PLAN:
         * 1. Receive scanned image URI from scanner page via route params
         * 2. Replace plantImages.plantProfile with scanned image
         * 3. Add image processing for circular crop if needed
         * 4. Handle image loading states and errors
         * 
         * ROUTE PARAMS STRUCTURE:
         * {
         *   scannedImageUri: string,
         *   plantType: string,
         *   confidence: number
         * }
         */}
        <View style={styles.imageWrapper}>
          <View style={styles.imageCircle}>
            <Image
              source={plantImages.plantProfile} // TODO: Replace with scanned image
              style={styles.plantImage}
              resizeMode="cover"
            />
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
            onPress={handleAddLocation}
          >
            <Ionicons name="add-circle" size={20} color="#10B981" />
            <Text style={styles.addLocationText}>Add sites</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[
            styles.bottomButton,
            selectedButton === "addInfo" ? styles.bottomButtonActive : styles.bottomButtonInactive
          ]}
          onPress={() => {
            setSelectedButton("addInfo");
            handleAddInfo();
          }}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.bottomButtonText,
            selectedButton === "addInfo" ? styles.bottomButtonTextActive : styles.bottomButtonTextInactive
          ]}>Add Info</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.bottomButton,
            selectedButton === "addPlant" ? styles.bottomButtonActive : styles.bottomButtonInactive
          ]}
          onPress={() => {
            setSelectedButton("addPlant");
            handleAddPlant();
          }}
          activeOpacity={0.8}
        >
          <Text style={[
            styles.bottomButtonText,
            selectedButton === "addPlant" ? styles.bottomButtonTextActive : styles.bottomButtonTextInactive
          ]}>Add Plant</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const BG_COLOR = "#E6F1E7";
const PRIMARY_GREEN = "#10B981";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  keyboardAvoid: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  scrollContent: {
    paddingBottom: 140,
    flexGrow: 1,
  },

  // Header
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
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.06)",
    elevation: 2,
  },

  // Titles
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: "#3E4E2F",
    textAlign: "center",
    marginTop: 12,
    fontFamily: "Roboto",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
    fontFamily: "Roboto",
  },

  // Image
  imageWrapper: {
    marginTop: 24,
    alignItems: "center",
  },
  imageCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "#E6F1E7",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.12)",
    elevation: 6,
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },

  // Name input pill
  nameInputContainer: {
    marginTop: 24,
    alignItems: "center",
  },
  nameInput: {
    minWidth: 160,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    borderWidth: 0,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    fontFamily: "Roboto",
  },

  // Locations
  locationSection: {
    marginTop: 26,
    paddingHorizontal: 28,
  },
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
  locationButtonText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  locationButtonTextActive: {
    color: PRIMARY_GREEN,
  },
  locationButtonTextInactive: {
    color: "#6B7280",
  },

  addLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  addLocationText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    fontFamily: "Roboto",
  },

  // Bottom sheet buttons
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
    boxShadow: "0px -3px 8px rgba(0, 0, 0, 0.08)",
    elevation: 10,
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1.5,
  },
  bottomButtonActive: {
    backgroundColor: PRIMARY_GREEN,
    borderColor: PRIMARY_GREEN,
  },
  bottomButtonInactive: {
    backgroundColor: "#FFFFFF",
    borderColor: "#6C9A75",
  },
  bottomButtonText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Roboto",
  },
  bottomButtonTextActive: {
    color: "#FFFFFF",
  },
  bottomButtonTextInactive: {
    color: "#627456",
  },
});
