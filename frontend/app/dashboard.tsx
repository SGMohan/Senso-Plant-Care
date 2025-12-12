/**
 * Dashboard screen for the Senso Plant Care app
 * Displays user's plants and their status with backend integration
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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from '../context/AppContext';
import { plants, tasks } from "../assets";
import TaskCard from "../components/TaskCard";
import PlantCard from "../components/PlantCard";
import BottomNavigation from "../components/BottomNavigation";

// ============================================================================
// BACKEND CONNECTION & API INTEGRATION
// ============================================================================
// TODO: Replace static data with real API calls
// TODO: Implement WebSocket connection for real-time plant sensor data
// TODO: Add authentication and user session management
// TODO: Implement push notifications for plant care reminders
// TODO: Add offline data caching and synchronization
// ============================================================================

/**
 * API Service Functions - To be implemented with backend
 */
const ApiService = {
  // Fetch user's plants from backend
  fetchPlants: async () => {
    // TODO: Replace with actual API endpoint
    // return await fetch('/api/plants').then(res => res.json());
    return plants; // Using static data for now
  },

  // Fetch user's tasks from backend
  fetchTasks: async () => {
    // TODO: Replace with actual API endpoint
    // return await fetch('/api/tasks').then(res => res.json());
    return tasks; // Using static data for now
  },

  // Update plant sensor data
  updatePlantMetrics: async (plantId: number, metrics: any) => {
    // TODO: Send sensor data to backend
    // return await fetch(`/api/plants/${plantId}/metrics`, {
    //   method: 'PUT',
    //   body: JSON.stringify(metrics)
    // });
    console.log("Update plant metrics:", plantId, metrics);
  },

  // Mark task as completed
  completeTask: async (taskId: number) => {
    // TODO: Update task status in backend
    // return await fetch(`/api/tasks/${taskId}/complete`, { method: 'POST' });
    console.log("Complete task:", taskId);
  },

  // Get real-time sensor data via WebSocket
  connectToSensorData: (onDataReceived: (data: any) => void) => {
    // TODO: Establish WebSocket connection
    // const ws = new WebSocket('ws://your-backend-url/sensors');
    // ws.onmessage = (event) => onDataReceived(JSON.parse(event.data));
    console.log("WebSocket connection placeholder");
  },
};

/**
 * Custom Hooks for Backend Integration
 */
const usePlantData = () => {
  // TODO: Implement real-time plant data fetching
  // const [plantData, setPlantData] = useState([]);
  // const [loading, setLoading] = useState(true);
  //
  // useEffect(() => {
  //   ApiService.fetchPlants().then(setPlantData).finally(() => setLoading(false));
  //   ApiService.connectToSensorData(setPlantData);
  // }, []);
  //
  // return { plantData, loading };
  return { plantData: plants, loading: false };
};

const useTaskData = () => {
  // TODO: Implement task management with backend
  return { taskData: tasks, loading: false };
};

/**
 * Dashboard component - displays user's plants with their current status
 * @returns {JSX.Element} The dashboard screen component
 */
export default function DashboardScreen() {
  const [activeTab, setActiveTab] = useState("home");
  const [activeFilter, setActiveFilter] = useState("all");
  const { user, logout, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  // ============================================================================
  // BACKEND DATA INTEGRATION
  // ============================================================================
  // TODO: Replace with actual backend hooks when implemented
  const { plantData, loading: plantsLoading } = usePlantData();
  const { taskData, loading: tasksLoading } = useTaskData();

  // TODO: Add loading states and error handling
  // TODO: Implement pull-to-refresh functionality
  // TODO: Add real-time updates for sensor data
  // ============================================================================

  // Handler functions for backend operations
  const handleTaskComplete = async (taskId: number) => {
    // TODO: Implement task completion with backend
    await ApiService.completeTask(taskId);
  };

  const handlePlantUpdate = async (plantId: number, metrics: any) => {
    // TODO: Implement plant metrics update
    await ApiService.updatePlantMetrics(plantId, metrics);
  };

  const handleRefreshData = async () => {
    // TODO: Implement data refresh from backend
    console.log("Refreshing data from backend...");
  };

  // TODO: Add useEffect for initial data loading and real-time updates
  useEffect(() => {
    // TODO: Initialize backend connections
    // TODO: Set up WebSocket listeners
    // TODO: Handle app state changes (background/foreground)
  }, []);

  return (
    <LinearGradient
      colors={["#EBF3E8", "#D1EBD7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.safeArea}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() =>
              router.push({
                pathname: "/notifications",
                params: { direction: "left" },
              })
            }
          >
            <Ionicons name="notifications-outline" size={24} color="#666" />
          </TouchableOpacity>
          
          <View style={styles.profileContainer}>
            <TouchableOpacity 
              style={styles.profileButton}
              onPress={() => router.push('/profile' as any)}
            >
              <Ionicons name="person-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Welcome Message */}
        {user && (
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeText}>Welcome back, {user.name}!</Text>
          </View>
        )}

        {/* Today's Tasks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Tasks</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tasksScrollView}
          >
            {/* TODO: Replace with taskData from backend */}
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </ScrollView>
        </View>

        {/* Plants Overview Header - CLICKABLE */}
        <TouchableOpacity
          style={styles.plantsOverviewSection}
          onPress={() => router.push("/myplants" as any)}
          activeOpacity={0.7}
        >
          <View style={styles.plantsOverviewHeader}>
            <View style={styles.plantsOverviewLeft}>
              <Text style={styles.plantsOverviewMainText}>5 Plants</Text>
              <Text style={styles.plantsOverviewSubText}>
                Total in your jungle
              </Text>
            </View>
            <View style={styles.plantsOverviewRight}>
              <View style={styles.plantsOverviewStat}>
                <View style={styles.plantsOverviewStatRow}>
                  <Text style={styles.plantsOverviewStatNumber}>3</Text>
                  <Ionicons name="water" size={30} color="#1e90ff" />
                </View>
                <Text style={styles.plantsOverviewStatLabel}>Need Water</Text>
              </View>
              <View style={styles.plantsOverviewStat}>
                <View style={styles.plantsOverviewStatRow}>
                  <Text style={styles.plantsOverviewStatNumber}>2</Text>
                  <Ionicons name="checkmark-circle" size={30} color="#22c55e" />
                </View>
                <Text style={styles.plantsOverviewStatLabel}>Healthy</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "all" && styles.filterTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "senso" && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter("senso")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "senso" && styles.filterTextActive,
              ]}
            >
              Senso
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              activeFilter === "need-care" && styles.filterButtonActive,
            ]}
            onPress={() => setActiveFilter("need-care")}
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === "need-care" && styles.filterTextActive,
              ]}
            >
              Need Care
            </Text>
          </TouchableOpacity>
        </View>

        {/* Plant Cards */}
        <View style={styles.plantsList}>
          {/* TODO: Replace with plantData from backend */}
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} setActiveTab={(tab) => {
        setActiveTab(tab);
        if (tab === "home") {
          router.push("/myplants");
        } else if (tab === "add") {
          // ADDING PLANTS FLOW - Step 1: Photo Identification
          router.push("/scanner");
        }
      }} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    height: 60,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },
  profileContainer: {
    position: "relative",
  },
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    elevation: 2,
  },

  container: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1a3c2a",
    fontFamily: "Inter",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a3c2a",
    marginBottom: 12,
    fontFamily: "Inter",
  },
  tasksScrollView: {
    flexDirection: "row",
  },

  /* ===== CLICKABLE PLANTS OVERVIEW STYLES ===== */
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
  plantsOverviewLeft: {
    flex: 1,
  },
  plantsOverviewMainText: {
    fontSize: 40,
    fontWeight: "800",
    color: "#000000",
    fontFamily: "Inter",
    letterSpacing: -0.5,
    lineHeight: 44,
  },
  plantsOverviewSubText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Inter",
    fontWeight: "400",
    marginTop: 2,
  },
  plantsOverviewRight: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 32,
    marginBottom: 4,
  },
  plantsOverviewStat: {
    alignItems: "center",
  },
  plantsOverviewStatRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  plantsOverviewStatNumber: {
    fontSize: 32,
    fontWeight: "800",
    color: "#000000",
    fontFamily: "Inter",
    lineHeight: 36,
  },
  plantsOverviewStatLabel: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Inter",
    fontWeight: "400",
  },
  /* ===== END OF PLANTS OVERVIEW STYLES ===== */

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
  filterButtonActive: {
    backgroundColor: "#2d5a3d",
    borderColor: "#2d5a3d",
  },
  filterText: {
    fontSize: 14,
    color: "#4C4C4C",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  filterTextActive: {
    color: "white",
  },
  plantsList: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  plantCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.05)",
    elevation: 3,
  },
  plantCardContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
  },
  plantImageContainer: {
    width: 140,
    height: 140,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  plantInfo: {
    flex: 1,
  },
  plantInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  plantNameContainer: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a3c2a",
  },
  plantType: {
    fontSize: 14,
    color: "#6b8a7a",
    marginTop: 2,
  },
  deviceButton: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  deviceButtonText: {
    fontSize: 12,
    color: "#6b8a7a",
  },
  plantDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginVertical: 12,
  },
  plantMetrics: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    gap: 16,
    flexWrap: "wrap",
  },
  metricItem: {
    alignItems: "center",
  },
  metricIconContainer: {
    backgroundColor: "#f8fafc",
    borderRadius: 24,
    padding: 12,
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1a3c2a",
  },
  waitingText: {
    textAlign: "center",
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
    marginTop: 8,
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 28,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    elevation: 8,
    boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  activeNavItem: {
    backgroundColor: "transparent",
  },
});
