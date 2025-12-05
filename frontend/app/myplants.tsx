/**
 * My Plants Dashboard - Detailed view of user's plant collection
 * Displays plants grouped by location with backend integration
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
import { router } from "expo-router";
import { myPlantsByLocation } from "../assets";
import BottomNavigation from "../components/BottomNavigation";

// ============================================================================
// BACKEND CONNECTION & API INTEGRATION
// ============================================================================
// TODO: Replace static data with real API calls
// TODO: Implement real-time plant status updates
// TODO: Add plant care history and analytics
// TODO: Implement plant grouping and filtering by location
// TODO: Add plant search and sorting functionality
// ============================================================================

type MyPlant =
  (typeof myPlantsByLocation)[keyof typeof myPlantsByLocation][number];

/**
 * API Service Functions - To be implemented with backend
 */
const MyPlantsApiService = {
  // Fetch user's plants grouped by location
  fetchPlantsByLocation: async () => {
    // TODO: Replace with actual API endpoint
    // return await fetch('/api/plants/by-location').then(res => res.json());
    return myPlantsByLocation; // Using static data for now
  },

  // Update plant care status
  updatePlantCareStatus: async (plantId: number, careType: string) => {
    // TODO: Send care update to backend
    // return await fetch(`/api/plants/${plantId}/care`, {
    //   method: 'POST',
    //   body: JSON.stringify({ careType, timestamp: new Date() })
    // });
    console.log("Update plant care:", plantId, careType);
  },

  // Get plant care history
  getPlantCareHistory: async (plantId: number) => {
    // TODO: Fetch care history from backend
    // return await fetch(`/api/plants/${plantId}/history`).then(res => res.json());
    console.log("Get care history for plant:", plantId);
  },

  // Add new plant to location
  addPlantToLocation: async (plantData: any, location: string) => {
    // TODO: Add plant to backend
    // return await fetch('/api/plants', {
    //   method: 'POST',
    //   body: JSON.stringify({ ...plantData, location })
    // });
    console.log("Add plant to location:", plantData, location);
  },

  // Remove plant from collection
  removePlant: async (plantId: number) => {
    // TODO: Remove plant from backend
    // return await fetch(`/api/plants/${plantId}`, { method: 'DELETE' });
    console.log("Remove plant:", plantId);
  },
};

/**
 * Custom Hooks for Backend Integration
 */
const usePlantData = () => {
  // TODO: Implement real-time plant data fetching by location
  // const [plantsByLocation, setPlantsByLocation] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  //
  // useEffect(() => {
  //   MyPlantsApiService.fetchPlantsByLocation()
  //     .then(setPlantsByLocation)
  //     .catch(setError)
  //     .finally(() => setLoading(false));
  // }, []);
  //
  // return { groupedPlants: plantsByLocation, loading, error };
  return { groupedPlants: myPlantsByLocation, loading: false, error: null };
};

const usePlantCareActions = () => {
  // TODO: Implement plant care action handlers
  const markAsWatered = async (plantId: number) => {
    await MyPlantsApiService.updatePlantCareStatus(plantId, 'watered');
    // TODO: Update local state and trigger re-render
  };

  const markAsFertilized = async (plantId: number) => {
    await MyPlantsApiService.updatePlantCareStatus(plantId, 'fertilized');
    // TODO: Update local state and trigger re-render
  };

  return { markAsWatered, markAsFertilized };
};

/**
 * My Plants Dashboard component - detailed view of user's plant collection
 * @returns {JSX.Element} The my plants dashboard screen component
 */
export default function MyPlantsDashboard() {
  const [activeTab, setActiveTab] = useState("my-plants");
  const [selectedLocation, setSelectedLocation] = useState("all");
  
  // ============================================================================
  // BACKEND DATA INTEGRATION
  // ============================================================================
  // TODO: Replace with actual backend hooks when implemented
  const { groupedPlants, loading, error } = usePlantData();
  const { markAsWatered, markAsFertilized } = usePlantCareActions();

  // TODO: Add loading states and error handling
  // TODO: Implement pull-to-refresh functionality
  // TODO: Add real-time updates for plant status
  // ============================================================================

  // Navigation handlers
  const handleNavPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      router.push("/dashboard"); // Navigate back to main dashboard
    } else if (tab === "add") {
      router.push("/connectdevice");
    }
  };

  const handlePlantPress = (plant: MyPlant) => {
    // TODO: Navigate to individual plant detail page
    router.push({
      pathname: "/plantinfo",
      params: { plantId: plant.id, plantName: plant.name }
    });
  };

  const handlePlantCareAction = async (plantId: number, action: string) => {
    // TODO: Implement plant care actions
    if (action === 'water') {
      await markAsWatered(plantId);
    } else if (action === 'fertilize') {
      await markAsFertilized(plantId);
    }
  };

  // TODO: Add useEffect for initial data loading and real-time updates
  useEffect(() => {
    // TODO: Initialize backend connections
    // TODO: Set up real-time plant status listeners
    // TODO: Handle app state changes (background/foreground)
  }, []);

  // TODO: Add loading and error states
  // if (loading) return <LoadingScreen />;
  // if (error) return <ErrorScreen error={error} onRetry={refetch} />;

  return (
    <LinearGradient
      colors={["#EBF3E8", "#D1EBD7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.safeArea}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>My Plants</Text>
            <Text style={styles.headerSubtitle}>
              Your plants are thriving today!
            </Text>
          </View>

          {/* PLANTS BY LOCATION */}
          {Object.entries(groupedPlants).map(([location, locationPlants]) => (
            <View key={location} style={styles.locationSection}>
              <Text style={styles.locationTitle} numberOfLines={1}>
                {location === "LivingRoom" ? "Living Room" : location}
              </Text>

              <View style={styles.gridContainer}>
                {locationPlants.map((plant, index) => (
                  <TouchableOpacity
                    key={`${plant.id}-${index}`}
                    style={styles.gridCard}
                    onPress={() => handlePlantPress(plant)}
                  >
                    <View style={styles.gridImageContainer}>
                      <Image
                        source={plant.image}
                        style={styles.gridImage}
                        resizeMode="cover"
                      />
                    </View>

                    <View style={styles.cardContent}>
                      <Text style={styles.gridPlantName} numberOfLines={1}>
                        {plant.name}
                      </Text>
                      
                      <Text style={styles.plantType} numberOfLines={1}>
                        {plant.type}
                      </Text>

                      <View style={styles.statusRow}>
                        <Ionicons name="checkmark-circle" size={12} color="#22C55E" />
                        <Text style={styles.statusText}>Watered</Text>
                      </View>

                      <View style={styles.locationBadge}>
                        <Text style={styles.locationText}>{plant.location}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* BOTTOM NAV */}
      <BottomNavigation activeTab={activeTab} setActiveTab={handleNavPress} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: 20,
    paddingBottom: 120,
  },

  // HEADER
  header: {
    marginTop: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    height: 60,
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 6,
    fontFamily: "Inter",
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
    fontFamily: "Inter",
  },

  // LOCATION SECTION
  locationSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  locationTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 16,
    fontFamily: "Inter",
  },

  // GRID CONTAINER
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },

  gridCard: {
    width: "49%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    gap: 10,
    minHeight: 100,
  },

  gridImageContainer: {
    width: 60,
    height: 85,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#F3F3F3",
  },
  gridImage: { width: "100%", height: "100%" },

  cardContent: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 4,
  },

  gridPlantName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 2,
    fontFamily: "Inter",
  },

  plantType: {
    fontSize: 12,
    fontWeight: "500",
    color: "#1A1A1A",
    marginBottom: 6,
    fontFamily: "Inter",
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 4,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "400",
    color: "#868686",
    fontFamily: "Inter",
  },

  locationBadge: {
    backgroundColor: "#E8F5E8",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },

  locationText: {
    fontSize: 10,
    fontWeight: "400",
    color: "#234220",
    fontFamily: "Inter",
  },
});
