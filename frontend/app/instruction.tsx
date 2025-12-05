/**
 * Plant Care Instructions Screen
 * Displays detailed care instructions for specific plants with step-by-step guidance
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
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { instructionPlantData, careInstructions } from "../assets";

// ============================================================================
// BACKEND CONNECTION & API INTEGRATION
// ============================================================================
// TODO: Replace static data with real API calls
// TODO: Implement plant-specific instruction fetching
// TODO: Add user progress tracking for instruction completion
// TODO: Implement instruction analytics and user engagement metrics
// TODO: Add offline caching for instruction data
// ============================================================================

// MAIN COLORS (same feel as reference)
const PRIMARY_GREEN = "#4AA88B"; // circle + icon
const LIGHT_GREEN_BG = "#E5F6EF"; // square bg
const PAGE_BG = "#ECF1E7";

/**
 * API Service Functions - To be implemented with backend
 */
const InstructionApiService = {
  // Fetch plant details by ID
  fetchPlantDetails: async (plantId: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`/api/plants/${plantId}`).then(res => res.json());
    return instructionPlantData; // Using static data for now
  },

  // Fetch care instructions by plant ID and type
  fetchCareInstructions: async (plantId: string, instructionType: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`/api/plants/${plantId}/instructions/${instructionType}`).then(res => res.json());
    return careInstructions; // Using static data for now
  },

  // Track instruction view analytics
  trackInstructionView: async (plantId: string, instructionType: string) => {
    // TODO: Implement analytics tracking with backend
    // try {
    //   await fetch(
    //     `${process.env.EXPO_PUBLIC_API_URL}/plants/${plantId}/track-instruction`,
    //     {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify({
    //         plantId,
    //         instructionType,
    //         timestamp: new Date(),
    //       }),
    //     }
    //   );
    // } catch (error) {
    //   // Handle error appropriately
    // }
    return Promise.resolve();
  },

  // Mark instruction step as completed
  markStepCompleted: async (plantId: string, stepId: number) => {
    // TODO: Update user progress in backend
    // return await fetch(`/api/plants/${plantId}/progress`, {
    //   method: 'POST',
    //   body: JSON.stringify({ stepId, completed: true, timestamp: new Date() })
    // });
    return Promise.resolve();
  },

  // Get user's instruction completion progress
  getInstructionProgress: async (plantId: string) => {
    // TODO: Fetch user progress from backend
    // return await fetch(`/api/plants/${plantId}/progress`).then(res => res.json());
    return { completedSteps: [], lastViewed: null }; // Using static data for now
  },
};

/**
 * Custom Hooks for Backend Integration
 */
const usePlantInstructions = (plantId: string, instructionType: string) => {
  // TODO: Implement real-time instruction data fetching
  // const [plantData, setPlantData] = useState(null);
  // const [instructions, setInstructions] = useState([]);
  // const [progress, setProgress] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  //
  // useEffect(() => {
  //   const loadInstructionData = async () => {
  //     try {
  //       setLoading(true);
  //       const [plantDetails, instructionData, progressData] = await Promise.all([
  //         InstructionApiService.fetchPlantDetails(plantId),
  //         InstructionApiService.fetchCareInstructions(plantId, instructionType),
  //         InstructionApiService.getInstructionProgress(plantId)
  //       ]);
  //       setPlantData(plantDetails);
  //       setInstructions(instructionData);
  //       setProgress(progressData);
  //
  //       // Track analytics
  //       await InstructionApiService.trackInstructionView(plantId, instructionType);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   loadInstructionData();
  // }, [plantId, instructionType]);
  //
  // return { plantData, instructions, progress, loading, error };

  return {
    plantData: instructionPlantData,
    instructions: careInstructions,
    progress: { completedSteps: [], lastViewed: null },
    loading: false,
    error: null,
  };
};

export default function InstructionScreen() {
  // ============================================================================
  // BACKEND DATA INTEGRATION
  // ============================================================================
  // TODO: Get plant ID and instruction type from route parameters
  // const { plantId, instructionType } = useLocalSearchParams();
  // const { plantData, instructions, progress, loading, error } = usePlantInstructions(
  //   plantId as string,
  //   instructionType as string || 'watering'
  // );

  // TODO: Add state management for user interactions
  // const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  // const [currentStep, setCurrentStep] = useState(0);

  // Using static data for now - TODO: Replace with backend data
  const plantData = instructionPlantData;
  const instructions = careInstructions;

  // ============================================================================
  // BACKEND OPERATION HANDLERS
  // ============================================================================

  // TODO: Implement handlers when backend is ready
  // const handleStepComplete = async (stepId: number) => {
  //   await InstructionApiService.markStepCompleted(plantId, stepId);
  // };

  // const handleInstructionInteraction = async (action: string, stepId?: number) => {
  //   await InstructionApiService.trackInstructionInteraction(plantId, action, stepId);
  // };

  // useEffect(() => {
  //   // Initialize backend connections
  //   // Load user progress and preferences
  //   // Set up real-time updates if needed
  // }, []);

  const handleBackPress = () => {
    // TODO: Track navigation analytics
    // InstructionApiService.trackInstructionExit(plantId, 'back_button');
    router.back();
  };

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#ECF1E7", "#E8ECE5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.safeArea}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Instructions</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Top content */}
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/instruction_sample_image.png")}
                style={styles.plantImage}
                resizeMode="cover"
              />
            </View>

            <Text style={styles.plantName}>{plantData.name}</Text>
            <Text style={styles.botanicalName}>{plantData.botanicalName}</Text>
          </View>

          {/* Bottom sheet */}
          <View style={styles.instructionsCard}>
            <View style={styles.innerContainer}>
              <View style={styles.instructionHeader}>
                <Text style={styles.instructionHeaderText}>
                  Watering Instructions
                </Text>
              </View>

              <View style={styles.instructionsList}>
                {instructions.map((instruction, index) => (
                  <View key={instruction.id} style={styles.instructionItem}>
                    <View style={styles.iconContainer}>
                      <View style={styles.iconSquare}>
                        <Ionicons
                          name={instruction.icon as any}
                          size={26}
                          color={PRIMARY_GREEN}
                        />
                      </View>
                      <View style={styles.numberOverlay}>
                        <Text style={styles.stepNumber}>{index + 1}</Text>
                      </View>
                    </View>

                    <View style={styles.instructionTextContainer}>
                      <Text style={styles.instructionTitle}>
                        {index + 1}. {instruction.title}
                      </Text>
                      <Text style={styles.instructionDescription}>
                        {instruction.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  // PAGE
  wrapper: {
    flex: 1,
    backgroundColor: "#E8ECE5",
  },
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: PAGE_BG,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    fontFamily: "Inter",
  },
  placeholder: {
    width: 40,
    height: 40,
  },

  // TOP CONTENT
  content: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 0,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  plantName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 2,
    fontFamily: "Inter",
  },
  botanicalName: {
    fontSize: 14,
    fontWeight: "400",
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 18,
    fontFamily: "Inter",
  },

  // BOTTOM SHEET
  instructionsCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingTop: 24,
    paddingBottom: 24,
    marginTop: 12,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  // INNER CARD
  innerContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  instructionHeader: {
    width: "100%",
    marginBottom: 16,
  },
  instructionHeaderText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4B5563",
    fontFamily: "Inter",
  },

  // LIST
  instructionsList: {
    width: "100%",
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  // ICON + NUMBER (matches reference image)
  iconContainer: {
    position: "relative",
    marginRight: 20,
  },
  iconSquare: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: LIGHT_GREEN_BG,
    justifyContent: "center",
    alignItems: "center",
  },
  numberOverlay: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: "center",
    alignItems: "center",
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "Inter",
  },

  // TEXT
  instructionTextContainer: {
    flex: 1,
    paddingTop: 4,
  },
  instructionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
    fontFamily: "Inter",
  },
  instructionDescription: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 18,
    fontFamily: "Inter",
  },
});
