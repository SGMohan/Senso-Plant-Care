/**
 * Select Pot Size Screen - Plant pot size selection after naming plant
 *
 * BACKEND INTEGRATION REQUIREMENTS:
 * ================================
 *
 * 1. POT SIZE MANAGEMENT
 *    - Endpoint: GET /api/pot-sizes
 *    - Fetch available pot sizes based on plant type
 *    - Retrieve recommended pot size from plant care database
 *    - Store pot size preferences for user recommendations
 *
 * 2. PLANT DATA UPDATE
 *    - Endpoint: PUT /api/plants/{plantId}/pot-size
 *    - Update plant profile with selected pot size
 *    - Store pot dimensions and volume for care calculations
 *    - Link pot size to watering schedule and fertilizer amounts
 *
 * 3. RECOMMENDATION ENGINE
 *    - Endpoint: GET /api/plants/{plantId}/pot-recommendation
 *    - Calculate optimal pot size based on plant species and age
 *    - Consider root growth patterns and space requirements
 *    - Provide personalized recommendations with reasoning
 *
 * 4. PLANT SETUP WORKFLOW
 *    - Endpoint: POST /api/plants/{plantId}/setup/complete
 *    - Mark pot size selection as complete in setup flow
 *    - Initialize plant care schedule based on pot size
 *    - Set up monitoring parameters for pot-specific metrics
 *
 * 5. USER PREFERENCES
 *    - Endpoint: GET/POST /api/users/pot-preferences
 *    - Save user's preferred pot sizes by plant type
 *    - Track pot size history and changes over time
 *    - Provide quick selection based on past choices
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
import { plantImages, potSizes } from "../assets";
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

export default function SelectPotSizeScreen() {
  // TODO: BACKEND INTEGRATION - Pot Size State Management
  // ====================================================
  // - Fetch recommended pot size from backend based on plant type
  // - Initialize selectedSize with recommended value
  // - Load user's pot size preferences if available
  // - Handle loading states while fetching pot size options
  const [selectedSize, setSelectedSize] = useState(0); // 0=small, 1=medium, 2=large

  // TODO: BACKEND INTEGRATION - Fetch Pot Size Data
  // ===============================================
  // useEffect(() => {
  //   // Fetch recommended pot size: GET /api/plants/{plantId}/pot-recommendation
  //   // Fetch available pot sizes: GET /api/pot-sizes?plantType={type}
  //   // Set initial selectedSize based on recommendation
  // }, []);

  const handleBackPress = () => {
    router.back();
  };

  const handleClosePress = () => {
    // TODO: BACKEND INTEGRATION - Save Draft State
    // - Save current pot size selection as draft before closing
    // - POST /api/plants/{plantId}/draft with potSize data
    router.push("/dashboard");
  };

  const handleConfirm = () => {
    // TODO: BACKEND IMPLEMENTATION - Save Pot Size Selection
    // =====================================================
    //
    // POT SIZE CONFIRMATION PROCESS:
    // - Validate selected pot size is appropriate for plant
    // - Update plant profile with pot size information
    // - Calculate and update care schedule based on pot volume
    // - Initialize monitoring parameters for pot-specific metrics
    // - Complete pot size setup step in plant creation workflow
    //
    // BACKEND INTEGRATION:
    // - PUT /api/plants/{plantId}/pot-size with selectedSize
    // - POST /api/plants/{plantId}/setup/complete-step (potSize)
    // - Recalculate watering schedule based on pot volume
    // - Navigate to next step or dashboard upon completion
    //
    console.log("Continue with pot size:", selectedSize);
    // TODO: Navigate to next screen or dashboard after successful save
    // router.push('/dashboard');
  };

  const getSizeLabel = () => {
    // TODO: BACKEND INTEGRATION - Dynamic Size Labels
    // ===============================================
    // - Fetch accurate measurements from backend pot size data
    // - Use plant-specific recommended size ranges
    // - Display volume information (liters/gallons) if available
    const size = potSizes[selectedSize];
    const inches =
      size.name === "Small" ? "6" : size.name === "Medium" ? "8" : "12";
    return `${size.name} (${inches}")`;
  };

  // Animated slider
  const translateX = useSharedValue(0);
  const sliderWidth = 300; // Approximate width

  const updateSelectedSize = (value: number) => {
    setSelectedSize(value);
  };

  const startX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      const newX = startX.value + event.translationX;
      translateX.value = Math.max(0, Math.min(sliderWidth, newX));
    })
    .onEnd(() => {
      const percentage = translateX.value / sliderWidth;
      let snapIndex = 0;

      if (percentage < 0.25) {
        snapIndex = 0;
      } else if (percentage < 0.75) {
        snapIndex = 1;
      } else {
        snapIndex = 2;
      }

      translateX.value = withSpring((snapIndex / 2) * sliderWidth);
      runOnJS(updateSelectedSize)(snapIndex);
    });

  const animatedThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value,
    };
  });

  // Initialize position
  React.useEffect(() => {
    translateX.value = (selectedSize / 2) * sliderWidth;
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
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
          <Text style={styles.title}>Select Pot Size</Text>

          {/* Plant Image */}
          <View style={styles.imageWrapper}>
            <Image
              source={plantImages.bigPlant}
              style={styles.plantImage}
              resizeMode="contain"
            />
          </View>

          {/* Size Slider - WITHOUT tick marks */}
          <View style={styles.scaleContainer}>
            <View style={styles.scaleWrapper}>
              {/* Track */}
              <View style={styles.scaleTrack}>
                <Animated.View
                  style={[styles.scaleProgress, animatedProgressStyle]}
                />

                {/* Draggable Thumb */}
                <GestureDetector gesture={panGesture}>
                  <Animated.View
                    style={[styles.scaleThumb, animatedThumbStyle]}
                  />
                </GestureDetector>

                {/* Invisible touch zones for 3 steps */}
                <View style={styles.scaleHitZones}>
                  {[0, 1, 2].map((index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.scaleHitZone}
                      onPress={() => {
                        setSelectedSize(index);
                        translateX.value = withSpring(
                          (index / 2) * sliderWidth
                        );
                      }}
                      activeOpacity={1}
                    />
                  ))}
                </View>
              </View>
            </View>

            <Text style={styles.sizeLabel}>{getSizeLabel()}</Text>
          </View>

          {/* Pot Size Options */}
          <View style={styles.potSizeContainer}>
            {potSizes.map((pot) => {
              const active = selectedSize === pot.id;
              return (
                <TouchableOpacity
                  key={pot.id}
                  style={[styles.potOption, active && styles.potOptionActive]}
                  onPress={() => {
                    setSelectedSize(pot.id);
                    translateX.value = withSpring((pot.id / 2) * sliderWidth);
                  }}
                >
                  <Image
                    source={pot.image}
                    style={styles.potImage}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.potName,
                      active ? styles.potNameActive : styles.potNameInactive,
                    ]}
                  >
                    {pot.name}
                  </Text>
                  <Text
                    style={[
                      styles.potMeasurement,
                      active
                        ? styles.potMeasurementActive
                        : styles.potMeasurementInactive,
                    ]}
                  >
                    {pot.measurement}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Recommendation Card */}
          {/* TODO: BACKEND INTEGRATION - Dynamic Recommendation Card
              - Fetch recommendation text from backend: GET /api/plants/{plantId}/pot-recommendation
              - Display plant-specific reasoning for pot size recommendation
              - Show comparison with current pot size if plant already exists
              - Update recommendation based on plant growth stage
          */}
          <View style={styles.recommendationCard}>
            <View style={styles.recommendationImageContainer}>
              <Image
                source={plantImages.recommendPlant}
                style={styles.recommendationImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.recommendationContent}>
              <Text style={styles.recommendationTitle}>
                Recommended for your plant
              </Text>
              <Text style={styles.recommendationText}>
                Provides adequate space for root growth and stability
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleConfirm}
          >
            <Text style={styles.continueButtonText}>Confirm Size</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const BG_COLOR = "#E6F1E7";
const PRIMARY_GREEN = "#5FB57A";
const DARK_GREEN = "#2D5F3F";
const LIGHT_GREEN = "#A8D5BA";
const SOFT_MINT = "#D4EDD9";
const CARD_BG = "#E8F5E9";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },

  // Title
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
    marginTop: 10,
  },

  // Plant Image
  imageWrapper: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
  },
  plantImage: {
    width: 280,
    height: 240,
  },

  // Slider - WITHOUT tick marks
  scaleContainer: {
    marginTop: 26,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  scaleWrapper: {
    width: "100%",
    position: "relative",
    height: 40,
    justifyContent: "center",
  },
  scaleTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: LIGHT_GREEN,
    position: "relative",
    overflow: "visible",
  },
  scaleProgress: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 999,
    backgroundColor: PRIMARY_GREEN,
  },
  scaleThumb: {
    position: "absolute",
    top: -8,
    left: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: PRIMARY_GREEN,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },
  scaleHitZones: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  scaleHitZone: {
    flex: 1,
  },
  sizeLabel: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "600",
    color: "#1F1F1F",
    textAlign: "center",
  },

  // Pot Options
  potSizeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 18,
  },
  potOption: {
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
    flex: 1,
    marginHorizontal: 6,
  },
  potOptionActive: {
    borderColor: PRIMARY_GREEN,
    backgroundColor: CARD_BG,
  },
  potImage: {
    width: 54,
    height: 54,
  },
  potName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  potNameActive: {
    color: "#1F1F1F",
  },
  potNameInactive: {
    color: "#6B7280",
  },
  potMeasurement: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "400",
  },
  potMeasurementActive: {
    color: "#6B7280",
  },
  potMeasurementInactive: {
    color: "#9CA3AF",
  },

  // Recommendation Card
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  recommendationImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: CARD_BG,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  recommendationImage: {
    width: 40,
    height: 40,
  },
  recommendationContent: {
    flex: 1,
    justifyContent: "center",
  },
  recommendationTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F1F1F",
    marginBottom: 4,
  },
  recommendationText: {
    fontSize: 13,
    color: "#6B7280",
    lineHeight: 19,
  },

  // Bottom Button
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
  continueButton: {
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
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
