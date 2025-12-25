/**
 * Select Soil Type Screen - Part of multi-step plant setup
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { soilTypes } from "../../assets/images";

export default function SelectSoilTypeScreen() {
  const params = useLocalSearchParams();
  const [selectedSoil, setSelectedSoil] = useState("potting-mix");

  const handleBackPress = () => router.back();
  const handleClosePress = () => router.push("/dashboard");

  const handleConfirm = () => {
    // Find the soil name based on ID
    const soilName =
      soilTypes.find((s) => s.id === selectedSoil)?.name || selectedSoil;

    // Navigation flow: navigate to potsize page
    router.push({
      pathname: "/potsize",
      params: {
        ...params,
        soilType: soilName,
      },
    });
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
                style={[
                  styles.soilCard,
                  selectedSoil === soil.id && styles.soilCardSelected,
                ]}
                onPress={() => setSelectedSoil(soil.id)}
                activeOpacity={1}
              >
                <View style={styles.soilImage}>
                  {(() => {
                    const Icon = soil.image as any;
                    return <Icon width={60} height={60} />;
                  })()}
                </View>
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
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
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
    // Removed border color and background change
    borderColor: "#e5e7eb",
  },
  soilImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E8F5E8",
    overflow: "hidden",
  },
  soilInfo: {
    flex: 1,
    gap: 4,
  },
  soilName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  soilDescription: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: 18,
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
    elevation: 6,
  },
  confirmButtonText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
  },
});
