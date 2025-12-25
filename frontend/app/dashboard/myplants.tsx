/**
 * My Plants Dashboard - Detailed view of user's plant collection
 * Displays plants grouped by location with backend integration
 */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AppContext";
import BottomNavigation from "../../components/BottomNavigation";
import { getMyPlants } from "../../services/plantService";
import Text from "../../components/ui/Text";

export default function MyPlantsDashboard() {
  const [activeTab, setActiveTab] = useState("my-plants");
  const { isAuthenticated } = useAuth();
  const [groupedPlants, setGroupedPlants] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [plantCount, setPlantCount] = useState(0);

  const loadData = async () => {
    if (!isAuthenticated) {
      setLoading(false);
      setRefreshing(false);
      return;
    }
    try {
      const plants = await getMyPlants();
      setPlantCount(plants?.length || 0);
      
      const grouped = (plants || []).reduce((acc: any, plant: any) => {
        const loc = plant.location || "General";
        if (!acc[loc]) acc[loc] = [];
        acc[loc].push(plant);
        return acc;
      }, {});
      
      setGroupedPlants(grouped);
    } catch (err) {
      console.error("Error loading plants:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [isAuthenticated]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [isAuthenticated]);

  const handleNavPress = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") {
      router.push("/dashboard");
    } else if (tab === "add") {
      router.push("/devices/scanner");
    } else if (tab === "profile") {
      if (isAuthenticated) router.push("/auth/profile");
      else router.push("/auth/login");
    }
  };

  const handlePlantPress = (plant: any) => {
    router.push({
      pathname: "/plants/plantinfo",
      params: { plantId: plant._id }
    });
  };

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#2d5a3d"]} />
        }
      >
        <View style={styles.container}>
          {/* HEADER */}
          <View style={styles.header}>
            <Text variant="h1" weight="semibold" style={styles.headerTitle}>My Plants</Text>
            <Text variant="bodySmall" style={styles.headerSubtitle}>
              {plantCount > 0 
                ? "Your plants are thriving today!" 
                : "Your jungle is waiting for its first plant!"}
            </Text>
          </View>

          {loading && !refreshing ? (
            <ActivityIndicator size="large" color="#2d5a3d" style={{ marginTop: 40 }} />
          ) : plantCount > 0 ? (
            Object.entries(groupedPlants).map(([location, locationPlants]: [string, any]) => (
              <View key={location} style={styles.locationSection}>
                <Text variant="h3" weight="semibold" style={styles.locationTitle} numberOfLines={1}>
                  {location === "LivingRoom" ? "Living Room" : location}
                </Text>

                <View style={styles.gridContainer}>
                  {locationPlants.map((plant: any, index: number) => (
                    <TouchableOpacity
                      key={`${plant._id}-${index}`}
                      style={styles.gridCard}
                      onPress={() => handlePlantPress(plant)}
                    >
                      <View style={styles.gridImageContainer}>
                        <Image
                          source={typeof plant.image === 'string' ? { uri: plant.image } : plant.image}
                          style={styles.gridImage}
                          contentFit="cover"
                          transition={300}
                        />
                      </View>

                      <View style={styles.cardContent}>
                        <Text weight="medium" style={styles.gridPlantName} numberOfLines={1}>
                          {plant.plantName}
                        </Text>
                        
                        <Text variant="caption" style={styles.plantType} numberOfLines={1}>
                          {plant.scientificName || plant.type || "Unknown Species"}
                        </Text>

                        <View style={styles.statusRow}>
                          <Ionicons name="checkmark-circle" size={12} color="#22C55E" />
                          <Text variant="caption" style={styles.statusText}>Watered</Text>
                        </View>

                        <View style={styles.locationBadge}>
                          <Text variant="caption" weight="medium" style={styles.locationText}>{plant.location || "General"}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No plants found. Start by scanning a plant! 🌿</Text>
              {!isAuthenticated && (
                <TouchableOpacity onPress={() => router.push('/auth/login')}>
                  <Text weight="semibold" style={styles.loginLink}>Login to see your collection</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      
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
    color: "#1A1A1A",
    marginBottom: 6,
  },
  headerSubtitle: {
    color: "#6B7280",
  },

  // LOCATION SECTION
  locationSection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  locationTitle: {
    color: "#1A1A1A",
    marginBottom: 16,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    color: "#1A1A1A",
    marginBottom: 2,
  },

  plantType: {
    fontSize: 10,
    color: "#666",
    marginBottom: 6,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 4,
  },

  statusText: {
    fontSize: 10,
    color: "#868686",
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
    color: "#234220",
  },
  
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
  loginLink: {
    color: '#2d5a3d',
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});
