/**
 * Select Soil Type Screen - Soil type selection for plant setup
 *
 * BACKEND INTEGRATION REQUIREMENTS:
 * ================================
 *
 * 1. SOIL TYPE MANAGEMENT
 *    - Endpoint: GET /api/soil-types
 *    - Fetch available soil types based on plant type
 *    - Retrieve recommended soil type from plant care database
 *    - Store soil type preferences for user recommendations
 *
 * 2. PLANT DATA UPDATE
 *    - Endpoint: PUT /api/plants/{plantId}/soil-type
 *    - Update plant profile with selected soil type
 *    - Store soil composition details for care calculations
 *    - Link soil type to watering schedule and nutrient requirements
 *
 * 3. RECOMMENDATION ENGINE
 *    - Endpoint: GET /api/plants/{plantId}/soil-recommendation
 *    - Calculate optimal soil type based on plant species and environment
 *    - Consider drainage, pH, and nutrient requirements
 *    - Provide personalized recommendations with reasoning
 *
 * 4. PLANT SETUP WORKFLOW
 *    - Endpoint: POST /api/plants/{plantId}/setup/complete
 *    - Mark soil type selection as complete in setup flow
 *    - Initialize plant care schedule based on soil type
 *    - Set up monitoring parameters for soil-specific metrics
 *
 * 5. SOIL PROPERTIES DATABASE
 *    - Endpoint: GET /api/soil-types/{id}/properties
 *    - Retrieve detailed soil properties (drainage, pH, nutrients)
 *    - Provide care instructions specific to soil type
 *    - Track soil performance metrics over time
 */

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { soilTypes } from "../assets";

interface SoilType {
  id: string;
  name: string;
  description: string;
  image: any;
}

// BACKEND DATA CONTRACTS (for later implementation)
// ================================================
// These interfaces and functions define how this screen will talk
// to the backend once APIs are available. They are not wired up yet,
// but provide a clear contract for future implementation.

interface SoilTypeApiItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

interface SoilTypesResponse {
  items: SoilTypeApiItem[];
  recommendedSoilId?: string;
}

interface SoilTypeSelectionPayload {
  plantId: string;
  soilTypeId: string;
}

interface SetupStepCompletePayload {
  plantId: string;
  step: "soilType";
}

// NOTE: Replace the base URL with your actual backend base URL or use
// your shared API client once it exists.
const API_BASE_URL = "https://api.your-backend.com";

// Fetch list of soil types (and optionally a recommendation) for a plant
// Endpoint: GET /api/soil-types?plantId={plantId}
async function fetchSoilTypesForPlant(
  plantId: string
): Promise<SoilTypesResponse> {
  const url = `${API_BASE_URL}/api/soil-types?plantId=${encodeURIComponent(
    plantId
  )}`;

  const response = await fetch(url);

  if (!response.ok) {
    // In the real implementation, surface this error to the UI
    throw new Error(`Failed to fetch soil types: ${response.status}`);
  }

  return (await response.json()) as SoilTypesResponse;
}

// Save the selected soil type for a plant
// Endpoint: PUT /api/plants/{plantId}/soil-type
async function saveSoilTypeSelection(
  payload: SoilTypeSelectionPayload
): Promise<void> {
  const url = `${API_BASE_URL}/api/plants/${encodeURIComponent(
    payload.plantId
  )}/soil-type`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ soilTypeId: payload.soilTypeId }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save soil type: ${response.status}`);
  }
}

// Mark the soil type step as complete in the plant setup workflow
// Endpoint: POST /api/plants/{plantId}/setup/complete-step
async function completeSoilTypeSetupStep(
  payload: SetupStepCompletePayload
): Promise<void> {
  const url = `${API_BASE_URL}/api/plants/${encodeURIComponent(
    payload.plantId
  )}/setup/complete-step`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ step: payload.step }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to complete soil type setup step: ${response.status}`
    );
  }
}

export default function SelectSoilTypeScreen() {
  // TODO: BACKEND INTEGRATION - Soil Type State Management
  // ======================================================
  // - Fetch recommended soil type from backend based on plant type
  // - Initialize selectedSoil with recommended value
  // - Load user's soil type preferences if available
  // - Handle loading states while fetching soil type options
  const [selectedSoil, setSelectedSoil] = useState("potting-mix");

  // TODO: BACKEND INTEGRATION - Fetch Soil Type Data
  // ================================================
  //
  // Example implementation outline (to be wired later):
  //
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string | null>(null);
  // const [remoteSoilTypes, setRemoteSoilTypes] = useState<SoilTypeApiItem[]>([]);
  //
  // useEffect(() => {
  //   const plantId = "CURRENT_PLANT_ID_FROM_CONTEXT_OR_PARAMS";
  //
  //   const loadSoilTypes = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //
  //       const data = await fetchSoilTypesForPlant(plantId);
  //
  //       setRemoteSoilTypes(data.items);
  //
  //       // If backend provides a recommended soil type, use it
  //       if (data.recommendedSoilId) {
  //         setSelectedSoil(data.recommendedSoilId);
  //       }
  //     } catch (err) {
  //       console.error("Error loading soil types", err);
  //       setError("Unable to load soil types. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   loadSoilTypes();
  // }, []);

  const handleBackPress = () => {
    router.back();
  };

  const handleClosePress = () => {
    // TODO: BACKEND INTEGRATION - Save Draft State
    // - Save current soil type selection as draft before closing
    // - POST /api/plants/{plantId}/draft with soilType data
    router.push("/dashboard");
  };

  const handleConfirm = () => {
    // TODO: BACKEND IMPLEMENTATION - Save Soil Type Selection
    // ======================================================
    //
    // SOIL TYPE CONFIRMATION PROCESS:
    // - Validate selected soil type is appropriate for plant
    // - Update plant profile with soil type information
    // - Calculate and update care schedule based on soil properties
    // - Initialize monitoring parameters for soil-specific metrics
    // - Complete soil type setup step in plant creation workflow
    //
    // BACKEND INTEGRATION:
    // - PUT /api/plants/{plantId}/soil-type with selectedSoil
    // - POST /api/plants/{plantId}/setup/complete-step (soilType)
    // - Recalculate watering schedule based on soil drainage
    // - Update fertilizer schedule based on soil nutrients
    // - Navigate to next step or dashboard upon completion
    //
    console.log("Selected soil:", selectedSoil);

    // LATER IMPLEMENTATION: Persist selection & advance workflow
    // =========================================================
    // const plantId = "CURRENT_PLANT_ID_FROM_CONTEXT_OR_PARAMS";
    //
    // const persistSelection = async () => {
    //   try {
    //     // 1) Save soil type on the plant
    //     await saveSoilTypeSelection({
    //       plantId,
    //       soilTypeId: selectedSoil,
    //     });
    //
    //     // 2) Mark soil type step as complete in setup workflow
    //     await completeSoilTypeSetupStep({
    //       plantId,
    //       step: "soilType",
    //     });
    //
    //     // 3) Navigate to the next step or dashboard
    //     router.push("/dashboard");
    //   } catch (err) {
    //     console.error("Failed to save soil type selection", err);
    //     // TODO: Show user-friendly error message / toast
    //   }
    // };
    //
    // persistSelection();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.soilListContent}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={22} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.title}>Select Soil Type</Text>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={handleClosePress}
            >
              <Ionicons name="close" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Soil Types List */}
          <View style={styles.soilList}>
            {soilTypes.map((soil) => (
              <TouchableOpacity
                key={soil.id}
                style={styles.soilCard}
                onPress={() => setSelectedSoil(soil.id)}
                activeOpacity={1}
              >
                <Image
                  source={soil.image}
                  style={styles.soilImage}
                  resizeMode="cover"
                />
                <View style={styles.soilInfo}>
                  <Text style={styles.soilName}>{soil.name}</Text>
                  <Text style={styles.soilDescription}>{soil.description}</Text>
                </View>
                <View
                  style={[
                    styles.radioButton,
                    selectedSoil === soil.id && styles.radioButtonSelected,
                  ]}
                >
                  {selectedSoil === soil.id && (
                    <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Confirm Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirm Selection</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const BG_COLOR = "#E6F1E7";
const PRIMARY_GREEN = "#5FB57A";
const DARK_GREEN = "#2D5F3F";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    fontFamily: "Roboto",
    flex: 1,
  },
  soilList: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 36,
  },
  soilListContent: {
    paddingBottom: 120,
  },
  soilCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    gap: 14,
  },
  soilCardSelected: {
    borderColor: PRIMARY_GREEN,
    backgroundColor: "#f0fdf4",
  },
  soilImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E8F5E8",
  },
  soilInfo: {
    flex: 1,
    gap: 4,
  },
  soilName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    fontFamily: "Roboto",
  },
  soilDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 18,
    fontFamily: "Roboto",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: "#d1d5db",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: PRIMARY_GREEN,
    backgroundColor: PRIMARY_GREEN,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingVertical: 18,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  confirmButton: {
    backgroundColor: PRIMARY_GREEN,
    borderRadius: 28,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: PRIMARY_GREEN,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  confirmButtonText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
});
