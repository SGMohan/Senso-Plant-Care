/**
 * Dashboard screen for the Senso Plant Care app
 * Displays user's plants and their status with backend integration
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
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../../context/AppContext";
import TaskCard from "../../components/TaskCard";
import PlantCard from "../../components/PlantCard";
import BottomNavigation from "../../components/BottomNavigation";
import { getMyPlants } from "../../services/plantService";
import Text from "../../components/ui/Text";

export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeFilter, setActiveFilter] = useState("all");
  const [plants, setPlants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchPlants = async () => {
    try {
      const data = await getMyPlants();
      setPlants(data || []);
    } catch (error) {
      console.error("Error fetching plants:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchPlants();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const onRefresh = useCallback(() => {
    if (isAuthenticated) {
      setRefreshing(true);
      fetchPlants();
    }
  }, [isAuthenticated]);

  const filteredPlants = (plants || []).filter((plant) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "senso") return plant.connected;
    if (activeFilter === "need-care")
      return plant.status === "waiting" || plant.needsWater;
    return true;
  });

  const totalPlants = plants.length;
  const needsWaterCount = plants.filter(
    (p) => p.status === "waiting" || p.needsWater
  ).length;
  const healthyCount = plants.filter(
    (p) => p.status === "healthy" && !p.needsWater
  ).length;

  const tasks = plants
    .filter((p) => p.needsWater || p.status === "waiting")
    .map((p) => ({
      id: p._id || p.id,
      title: `Water ${p.plantName || p.name}`,
      time: "Due Today",
      image: typeof p.image === "string" ? { uri: p.image } : p.image,
    }));

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <LinearGradient
      colors={["#EBF3E8", "#D1EBD7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.safeArea}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#2d5a3d"]}
            />
          }
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.notificationButton}
              onPress={() => router.push("/dashboard/notifications")}
            >
              <Ionicons name="notifications-outline" size={24} color="#666" />
            </TouchableOpacity>

            <View style={styles.profileCircle}>
              <Text style={styles.profileInitial}>
                {getInitials(user?.name)}
              </Text>
            </View>
          </View>

          {/* Today's Tasks */}
          <View style={styles.section}>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>Today's Tasks</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.tasksScrollView}
            >
              {tasks.length > 0 ? (
                tasks.map((task) => <TaskCard key={task.id} task={task} />)
              ) : (
                <View style={styles.noTasksContainer}>
                  <Text variant="bodySmall" style={styles.noTasksText}>No tasks assigned! 🌿</Text>
                </View>
              )}
            </ScrollView>
          </View>

          {/* Plants Overview Header */}
          <View style={styles.plantsOverviewSection}>
            <View style={styles.plantsOverviewHeader}>
              <View style={styles.plantsOverviewLeft}>
                <Text style={styles.plantsOverviewMainText}>
                  {totalPlants} Plants
                </Text>
                <Text weight="medium" style={styles.plantsOverviewSubText}>
                  Total in your jungle
                </Text>
              </View>
              <View style={styles.plantsOverviewRight}>
                <View style={styles.plantsOverviewStat}>
                  <View style={styles.plantsOverviewStatRow}>
                    <Text style={styles.plantsOverviewStatNumber}>
                      {needsWaterCount}
                    </Text>
                    <Ionicons name="water" size={30} color="#1e90ff" />
                    
                    <View style={styles.plantsOverviewStatSpacer} />
                    
                    <Text style={styles.plantsOverviewStatNumber}>
                      {healthyCount}
                    </Text>
                    <Ionicons
                      name="checkmark-circle"
                      size={30}
                      color="#4BAB5F"
                    />
                  </View>
                  <View style={styles.plantsOverviewStatRow}>
                    <Text variant="caption" style={styles.plantsOverviewStatLabel}>Need Water</Text>
                    <View style={styles.plantsOverviewLabelSpacer} />
                    <Text variant="caption" style={styles.plantsOverviewStatLabel}>Healthy</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Filter Tabs */}
          <View style={styles.filterContainer}>
            {["all", "senso", "need-care"].map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  weight="medium"
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive,
                  ]}
                >
                  {filter === "all"
                    ? "All"
                    : filter === "senso"
                    ? "Senso"
                    : "Need Care"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Plant Cards */}
          <View style={styles.plantsList}>
            {loading ? (
              <ActivityIndicator
                size="large"
                color="#2d5a3d"
                style={{ marginTop: 20 }}
              />
            ) : filteredPlants.length > 0 ? (
              filteredPlants.map((plant) => (
                <PlantCard
                  key={plant._id || plant.id}
                  plant={{
                    ...plant,
                    name: plant.plantName || plant.name,
                    scientificName: plant.scientificName || plant.type,
                    image: plant.image
                      ? typeof plant.image === "string"
                        ? { uri: plant.image }
                        : plant.image
                      : null,
                    moisture: plant.moisture,
                    temperature: plant.temperature,
                    distance: plant.distance,
                  }}
                />
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No plants found.</Text>
                {!isAuthenticated && (
                  <TouchableOpacity onPress={() => router.push("/auth/login")}>
                    <Text weight="semibold" style={styles.loginLink}>
                      Login to see your plants
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === "home") {
            router.push("/dashboard/dashboard");
          } else if (tab === "add") {
            router.push("/devices/scanner");
          } else if (tab === "my-plants") {
            router.push("/dashboard/myplants");
          } else if (tab === "profile") {
            if (isAuthenticated) {
              router.push("/auth/profile");
            } else {
              router.push("/auth/login");
            }
          }
        }}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
    marginTop: 10,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#D1EBD7",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  profileInitial: { color: "#1a3c2a", fontSize: 18, fontWeight: "600" },
  container: { flex: 1 },
  section: { paddingHorizontal: 16, marginTop: 16, marginBottom: 16 },
  sectionTitle: {
    marginBottom: 12,
  },
  tasksScrollView: { flexDirection: "row" },
  noTasksContainer: { padding: 10 },
  noTasksText: { color: "#6b8a7a" },
  plantsOverviewSection: {
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
  },
  plantsOverviewHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-end",
    paddingTop: 8,
    paddingBottom: 8,
  },
  plantsOverviewLeft: { flex: 1 },
  plantsOverviewMainText: {
    fontSize: 40,
    fontWeight: "600",
    color: "#000000",
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  plantsOverviewSubText: {
    color: "#000000",
    marginTop: 2,
  },
  plantsOverviewRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  plantsOverviewStat: { alignItems: "center" },
  plantsOverviewStatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  plantsOverviewStatNumber: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000000",
    lineHeight: 36,
  },
  plantsOverviewStatLabel: {
    color: "#666666",
  },
  plantsOverviewStatSpacer: {
    width: 20,
  },
  plantsOverviewLabelSpacer: {
    width: 25,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    marginTop: 8,
    justifyContent: "space-between",
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#4C4C4C",
    alignItems: "center",
  },
  filterButtonActive: { backgroundColor: "#2d5a3d", borderColor: "#2d5a3d" },
  filterText: { color: "#4C4C4C" },
  filterTextActive: { color: "white" },
  plantsList: { paddingHorizontal: 16, paddingBottom: 100 },
  emptyContainer: { alignItems: "center", marginTop: 40 },
  emptyText: { textAlign: "center", color: "#666" },
  loginLink: {
    color: "#2d5a3d",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
