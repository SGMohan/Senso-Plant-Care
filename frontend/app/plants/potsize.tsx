/**
 * Select Pot Size Screen - Part of sequential setup
 */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { plantImages, potSizes } from "../../assets/images";
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
import { savePlant } from "../../services/plantService";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function SelectPotSizeScreen() {
  const params = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBackPress = () => router.back();
  const handleClosePress = () => router.push("/dashboard/dashboard");

  const handleConfirm = async () => {
    const sizeName = potSizes[selectedSize].name;

    setLoading(true);
    try {
      // Collect all data from params and final selection
      const plantData = {
        plantName: (params.plantName as string) || "My Plant",
        scientificName: (params.scientificName as string) || "",
        type: (params.plantType as string) || "Unknown",
        location: (params.location as string) || "Living Room",
        image: params.scannedImageUri as string,
        potSize: sizeName,
        soilType: (params.soilType as string) || "Not specified",
        status: "healthy",
      };

      await savePlant(plantData);

      Alert.alert("Success! 🌱", `${plantData.plantName} has been added.`, [
        { text: "View Dashboard", onPress: () => router.replace("/dashboard/dashboard") },
      ]);
    } catch (error: any) {
      Alert.alert("Save Failed", error.message || "Could not save plant");
    } finally {
      setLoading(false);
    }
  };

  const getSizeLabel = () => {
    const size = potSizes[selectedSize];
    const inches =
      size.name === "Small" ? "6" : size.name === "Medium" ? "8" : "12";
    return `${size.name} (${inches}")`;
  };

  const translateX = useSharedValue(0);
  const sliderWidth = 300;
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
      let snapIndex = percentage < 0.25 ? 0 : percentage < 0.75 ? 1 : 2;
      translateX.value = withSpring((snapIndex / 2) * sliderWidth);
      runOnJS(setSelectedSize)(snapIndex);
    });

  const animatedThumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: translateX.value,
  }));

  React.useEffect(() => {
    translateX.value = (selectedSize / 2) * sliderWidth;
  }, []);

  const BigPlantIcon = plantImages.bigPlant;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={handleBackPress}
            >
              <Ionicons name="chevron-back" size={22} color="#6B7280" />
            </TouchableOpacity>
            <Text weight="semibold" style={styles.title}>Select Pot Size</Text>
            <TouchableOpacity
              style={styles.roundIconBtn}
              onPress={handleClosePress}
            >
              <Ionicons name="close" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.imageWrapper}>
            <BigPlantIcon width={280} height={240} />
          </View>

          <View style={styles.scaleContainer}>
            <View style={styles.scaleWrapper}>
              <View style={styles.scaleTrack}>
                <Animated.View
                  style={[styles.scaleProgress, animatedProgressStyle]}
                />
                <GestureDetector gesture={panGesture}>
                  <Animated.View
                    style={[styles.scaleThumb, animatedThumbStyle]}
                  />
                </GestureDetector>
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
            <Text weight="semibold" style={styles.sizeLabel}>{getSizeLabel()}</Text>
          </View>

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
                  {(() => {
                    const PotIcon = pot.image;
                    return <PotIcon width={54} height={54} />;
                  })()}
                  <Text weight="medium" style={styles.potName}>
                    {pot.name}
                  </Text>
                  <Text
                    variant="caption"
                    style={[
                      styles.potMeasurement,
                      { color: active ? "#6B7280" : "#9CA3AF" },
                    ]}
                  >
                    {pot.measurement}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.recommendationCard}>
            <View style={styles.recommendationImageContainer}>
              {(() => {
                const Recommend = plantImages.recommendPlant;
                return <Recommend width={40} height={40} />;
              })()}
            </View>
            <View style={styles.recommendationContent}>
              <Text weight="medium" style={styles.recommendationTitle}>
                Recommended for your plant
              </Text>
              <Text variant="caption" style={styles.recommendationText}>
                Provides adequate space for root growth and stability
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <Button
            title="Confirm Size"
            onPress={handleConfirm}
            loading={loading}
            style={styles.continueButton}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const BG_COLOR = "#E6F1E7";
const PRIMARY_GREEN = "#5FB57A";
const LIGHT_GREEN = "#A8D5BA";
const CARD_BG = "#E8F5E9";

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: BG_COLOR },
  container: { flex: 1, backgroundColor: BG_COLOR },
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
    flex: 1,
  },
  imageWrapper: {
    marginTop: 38,
    alignItems: "center",
    justifyContent: "center",
    height: 240,
  },
  scaleContainer: {
    marginTop: 26,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  scaleWrapper: { width: "100%", height: 40, justifyContent: "center" },
  scaleTrack: {
    width: "100%",
    height: 10,
    borderRadius: 999,
    backgroundColor: LIGHT_GREEN,
    position: "relative",
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
    elevation: 5,
  },
  scaleHitZones: { ...StyleSheet.absoluteFillObject, flexDirection: "row" },
  scaleHitZone: { flex: 1 },
  sizeLabel: {
    marginTop: 20,
    textAlign: "center",
  },
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
  potOptionActive: { borderColor: PRIMARY_GREEN, backgroundColor: CARD_BG },
  potName: { marginTop: 8 },
  potMeasurement: { marginTop: 2 },
  recommendationCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 110,
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
  recommendationContent: { flex: 1, justifyContent: "center" },
  recommendationTitle: {
    marginBottom: 4,
  },
  recommendationText: {
    lineHeight: 19,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 18,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  continueButton: {
    elevation: 6,
  },
});
