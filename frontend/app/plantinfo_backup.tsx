/**
 * Plant Information Screen
 * UI matching the reference design exactly with Real-time Graph
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import RealTimeGraph from "../components/RealTimeGraph";

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { plantInfoData, plantInfoStatusCards, infoImages, uiIcons } from "../assets";

// MAIN COLORS
const PRIMARY_GREEN = "#4AA88B";
const LIGHT_GREEN_BG = "#E5F6EF";
const PAGE_BG = "#ECF1E7";

// (Still here if you want to use it somewhere else later)
const AnimatedWaveform = () => {
  const waveAnimation = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(waveAnimation, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };
    animate();
  }, []);

  const wavePoints = [20, 35, 15, 40, 25, 30, 45, 20, 35, 25, 40, 30];

  return (
    <View style={styles.animatedWaveContainer}>
      {wavePoints.map((baseHeight, index) => {
        const animatedHeight = waveAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [baseHeight, baseHeight + Math.sin(index * 0.5) * 15],
        });
        return (
          <Animated.View
            key={index}
            style={[styles.animatedWaveBar, { height: animatedHeight }]}
          />
        );
      })}
    </View>
  );
};



export default function PlantInfoScreen() {
  const [activeTab, setActiveTab] = React.useState("todo");
  const [selectedTodos, setSelectedTodos] = React.useState<string[]>([]);
  const [selectedButton, setSelectedButton] = React.useState<string | null>(
    null
  );
  const [selectedTimePeriod, setSelectedTimePeriod] = React.useState("Day");
  const [isOnline, setIsOnline] = React.useState(false); // Toggle for online/offline mode
  const [healthStatus, setHealthStatus] = React.useState("healthy"); // "healthy" or "unhealthy"
  
  // TODO: Backend Integration - Add these states for API integration
  // const [plantData, setPlantData] = React.useState<PlantData | null>(null);
  // const [sensorData, setSensorData] = React.useState<SensorData | null>(null);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState<string | null>(null);
  // const realtimeService = React.useRef<RealtimeService>(new RealtimeService());
  // const plantId = useRoute().params?.plantId || "plant_123";

  const toggleTodo = (todoId: string) => {
    setSelectedTodos((prev: string[]) =>
      prev.includes(todoId)
        ? prev.filter((id: string) => id !== todoId)
        : [...prev, todoId]
    );
  };

  // Use data from assets/index.ts
  const plantData = plantInfoData;
  const statusCards = plantInfoStatusCards;
  
  // TODO: Backend Integration - Replace with API data fetching
  // React.useEffect(() => {
  //   const fetchPlantData = async () => {
  //     try {
  //       setLoading(true);
  //       const plant = await PlantAPI.getPlantById(plantId);
  //       setPlantData(plant);
  //       setIsOnline(plant.isOnline);
  //       setHealthStatus(plant.healthStatus);
  //       
  //       if (plant.deviceId && plant.isOnline) {
  //         const sensors = await PlantAPI.getRealTimeSensorData(plant.deviceId);
  //         setSensorData(sensors);
  //         
  //         realtimeService.current.connect(plant.deviceId);
  //         realtimeService.current.subscribe('sensorData', setSensorData);
  //       }
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchPlantData();
  //   return () => realtimeService.current.disconnect();
  // }, [plantId]);

  const handleBackPress = () => {
    router.back();
  };

  const handleSharePress = () => {
    // TODO: Implement share functionality
    console.log("Share plant info");
  };
  
  // TODO: Backend Integration - Helper functions for data processing
  // const getSensorValue = (cardId: string, sensors: SensorData): string => {
  //   switch (cardId) {
  //     case 'humidity': return `${Math.round(sensors.humidity)}%`;
  //     case 'temp': case 'temperature': return `${Math.round(sensors.temperature)}°C`;
  //     case 'light': case 'dli': return `${(sensors.lightLevel / 1000).toFixed(1)} DLI`;
  //     default: return '--';
  //   }
  // };
  // 
  // const formatLastWatered = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   const now = new Date();
  //   const diffTime = Math.abs(now.getTime() - date.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //   return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  // };

  return (
    <LinearGradient
      colors={["#ECF1E7", "#E8ECE5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.safeArea}
    >
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={20} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plant Info</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={[styles.modeToggle, { backgroundColor: isOnline ? '#4AA88B' : '#EF4444' }]}
              onPress={() => setIsOnline(!isOnline)}
            >
              <Text style={styles.modeToggleText}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleSharePress}
            >
              <Image
                source={uiIcons.shareIcon}
                style={styles.shareIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Top image */}
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/instruction_sample_image.png")}
              style={styles.plantImage}
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          {/* Name & subtitle */}
          <Text style={styles.plantName}>{plantData.name}</Text>
          <Text style={styles.botanicalName}>{plantData.botanicalName}</Text>

          {/* Status cards */}
          <View style={styles.statusGrid}>
            {statusCards.map((card: any) => {
              return (
                <View key={card.id} style={styles.statusCard}>
                  <View
                    style={[
                      styles.statusIconCircle,
                      { backgroundColor: card.bgColor },
                    ]}
                  >
                    {card.image ? (
                      <Image
                        source={card.image}
                        style={styles.statusImage}
                        resizeMode="contain"
                      />
                    ) : (
                      <Ionicons
                        name={card.icon as any}
                        size={18}
                        color={card.iconColor}
                      />
                    )}
                  </View>
                  <View style={styles.statusTextContainer}>
                    {card.label && card.sublabel ? (
                      <>
                        <Text style={styles.statusValueTop}>{card.label}</Text>
                        <Text style={styles.statusValueBottom}>
                          {card.sublabel}
                        </Text>
                      </>
                    ) : (
                      <Text style={styles.statusValue}>
                        {/* TODO: Backend Integration - Replace with real sensor data */}
                        {/* {isOnline && sensorData ? getSensorValue(card.id, sensorData) : (isOnline ? card.value : '--')} */}
                        {isOnline ? card.value : '--'}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          {/* Segmented control */}
          <View style={styles.segmentContainer}>
            <TouchableOpacity
              style={[
                styles.segmentItem,
                activeTab === "todo" && styles.segmentItemActive,
              ]}
              onPress={() => setActiveTab("todo")}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === "todo" && styles.segmentTextActive,
                ]}
              >
                Todo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.segmentItem,
                activeTab === "care" && styles.segmentItemActive,
              ]}
              onPress={() => setActiveTab("care")}
            >
              <Text
                style={[
                  styles.segmentText,
                  activeTab === "care" && styles.segmentTextActive,
                ]}
              >
                Care Info
              </Text>
            </TouchableOpacity>
          </View>

          {/* Todo Content */}
          {activeTab === "todo" && (
            <View style={styles.todoContainer}>
              <Text style={styles.mainSectionTitle}>Todo</Text>

              {/* Today Card */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Today</Text>

                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    <Image
                      source={infoImages.info1}
                      style={styles.todoIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text style={styles.todoText}>Water</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTodos.includes("water") && styles.checkboxChecked,
                    ]}
                    onPress={() => toggleTodo("water")}
                  >
                    {selectedTodos.includes("water") && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    <Image
                      source={infoImages.info2}
                      style={styles.todoIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text style={styles.todoText}>Misted</Text>
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusBadgeText}>1d late</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTodos.includes("misted") &&
                        styles.checkboxChecked,
                    ]}
                    onPress={() => toggleTodo("misted")}
                  >
                    {selectedTodos.includes("misted") && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Upcoming Card */}
              <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>Upcoming</Text>

                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    <Image
                      source={infoImages.info1}
                      style={styles.todoIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.upcomingTextContainer}>
                    <Text style={styles.todoText}>Water</Text>
                    <Text style={styles.upcomingTime}>in 5 days</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTodos.includes("upcomingWater") &&
                        styles.checkboxChecked,
                    ]}
                    onPress={() => toggleTodo("upcomingWater")}
                  >
                    {selectedTodos.includes("upcomingWater") && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>

                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    <Image
                      source={infoImages.info2}
                      style={styles.todoIcon}
                      resizeMode="contain"
                    />
                  </View>
                  <View style={styles.upcomingTextContainer}>
                    <Text style={styles.todoText}>Misted</Text>
                    <Text style={styles.upcomingTime}>in 3 days</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.checkboxContainer,
                      selectedTodos.includes("upcomingMisted") &&
                        styles.checkboxChecked,
                    ]}
                    onPress={() => toggleTodo("upcomingMisted")}
                  >
                    {selectedTodos.includes("upcomingMisted") && (
                      <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Health Status Section */}
              <View style={styles.healthStatusSection}>
                <Text style={[styles.sectionTitle, { color: '#000000' }]}>Health Status</Text>

                <View style={styles.healthCard}>
                  <Text style={styles.healthLabel}>Current Status :</Text>
                  <View style={styles.healthContentRow}>
                    <View style={styles.healthLeftContent}>
                      <View style={styles.healthStatusRow}>
                        <View style={[
                          styles.healthIndicator,
                          { backgroundColor: isOnline ? (healthStatus === 'healthy' ? '#4AA88B' : '#EF4444') : '#9CA3AF' }
                        ]}>
                          <Ionicons 
                            name={isOnline ? (healthStatus === 'healthy' ? 'checkmark' : 'close') : 'help'} 
                            size={14} 
                            color="#fff" 
                          />
                        </View>
                        <Text style={styles.healthStatusText}>
                          {isOnline ? (healthStatus === 'healthy' ? 'Healthy' : 'Unhealthy') : '--'}
                        </Text>
                      </View>
                      <Text style={styles.healthSubtext}>
                        Last watered : {isOnline ? '2 days ago' : '--'}
                      </Text>
                    </View>
                    <View style={styles.healthRightContent}>
                      {isOnline && <RealTimeGraph isHealthStatus={true} useWaveOnly={true} />}
                    </View>
                  </View>
                </View>
              </View>

              {/* Graphs Section */}
              {isOnline && (
                <View style={styles.graphsSection}>
                  <View style={styles.graphsHeader}>
                    <Text style={[styles.sectionTitle, { color: '#000000' }]}>Graphs</Text>
                    <TouchableOpacity style={[styles.connectedButton, { backgroundColor: "#E4EDE1", borderWidth: 0 }]}>
                      <Text style={[styles.connectedButtonText, { fontSize: 10, fontWeight: "400" }]}>Connected</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Time Period Selector */}
                  <View style={styles.timePeriodContainer}>
                    <TouchableOpacity
                      style={[
                        styles.timePeriodButton,
                        selectedTimePeriod !== "Day" && styles.timePeriodInactive,
                      ]}
                      onPress={() => setSelectedTimePeriod("Day")}
                    >
                      <Text
                        style={[
                          styles.timePeriodText,
                          selectedTimePeriod !== "Day" &&
                            styles.timePeriodTextInactive,
                        ]}
                      >
                        Day
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.timePeriodButton,
                        selectedTimePeriod !== "Week" &&
                          styles.timePeriodInactive,
                      ]}
                      onPress={() => setSelectedTimePeriod("Week")}
                    >
                      <Text
                        style={[
                          styles.timePeriodText,
                          selectedTimePeriod !== "Week" &&
                            styles.timePeriodTextInactive,
                        ]}
                      >
                        Week
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.timePeriodButton,
                        selectedTimePeriod !== "Month" &&
                          styles.timePeriodInactive,
                      ]}
                      onPress={() => setSelectedTimePeriod("Month")}
                    >
                      <Text
                        style={[
                          styles.timePeriodText,
                          selectedTimePeriod !== "Month" &&
                            styles.timePeriodTextInactive,
                        ]}
                      >
                        Month
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {/* Water Content Card */}
                  <View style={styles.waterContentCard}>
                    <Text style={styles.waterContentLabel}>
                      Volumetric Water Content :
                    </Text>
                    <Text style={styles.waterContentValue}>
                      {/* TODO: Backend Integration - Show real-time soil moisture */}
                      {/* {sensorData ? `${Math.round(sensorData.soilMoisture)}%` : '13-64%'} */}
                      13-64%
                    </Text>
                    <Text style={styles.waterContentRange}>Range</Text>

                    {/* TODO: Backend Integration - Pass real-time data to graph */}
                    {/* <RealTimeGraph isHealthStatus={false} useWaveOnly={true} sensorData={sensorData} timePeriod={selectedTimePeriod} /> */}
                    <RealTimeGraph isHealthStatus={false} useWaveOnly={true} />
                  </View>
                </View>
              )}
              
              {/* Add Sensor Section for Offline Mode */}
              {!isOnline && (
                <View style={styles.graphsSection}>
                  <View style={styles.graphsHeader}>
                    <Text style={[styles.sectionTitle, { color: '#000000' }]}>Graphs</Text>
                    <TouchableOpacity style={[styles.connectedButton, { backgroundColor: "#D2D2D2", borderWidth: 0 }]}>
                      <Text style={styles.connectedButtonText}>Add Sensor</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Care Guide Section */}
              <View style={styles.careGuideSection}>
                <Text style={[styles.sectionTitle, { color: '#000000' }]}>Care Guide</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.careGuideScrollView}
                >
                  <View style={styles.careGuideCard}>
                    <View style={styles.careGuideIconContainer}>
                      <Text style={styles.careGuideEmoji}>💧</Text>
                    </View>
                    <Text style={styles.careGuideCardText}>
                      Water when top 2 inches of soil are dry. Mist
                      occasionally.
                    </Text>
                  </View>
                  <View style={styles.careGuideCard}>
                    <View style={styles.careGuideIconContainer}>
                      <Text style={styles.careGuideEmoji}>💧</Text>
                    </View>
                    <Text style={styles.careGuideCardText}>
                      Place in bright, indirect light. Avoid direct sun.
                    </Text>
                  </View>
                  <View style={styles.careGuideCard}>
                    <View style={styles.careGuideIconContainer}>
                      <Text style={styles.careGuideEmoji}>💧</Text>
                    </View>
                    <Text style={styles.careGuideCardText}>
                      Water when top 2 inches of soil are dry. Mist
                      occasionally.
                    </Text>
                  </View>
                  <View style={styles.careGuideCard}>
                    <View style={styles.careGuideIconContainer}>
                      <Text style={styles.careGuideEmoji}>💧</Text>
                    </View>
                    <Text style={styles.careGuideCardText}>
                      Place in bright, indirect light. Avoid direct sun.
                    </Text>
                  </View>
                  <View style={styles.careGuideCard}>
                    <View style={styles.careGuideIconContainer}>
                      <Text style={styles.careGuideEmoji}>💧</Text>
                    </View>
                    <Text style={styles.careGuideCardText}>
                      Fertilize monthly during growing season with diluted
                      liquid fertilizer.
                    </Text>
                  </View>
                  <View style={styles.careGuideCard}>
                    <View style={styles.careGuideIconContainer}>
                      <Text style={styles.careGuideEmoji}>💧</Text>
                    </View>
                    <Text style={styles.careGuideCardText}>
                      Maintain humidity between 40-60% for optimal growth.
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </View>
          )}

          {/* Care Content */}
          {activeTab === "care" && (
            <ScrollView
              style={styles.innerContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Green Container with all cards */}
              <View
                style={{
                  backgroundColor: "#E8F5EF",
                  borderRadius: 4,
                  padding: 12,
                  marginTop: 16,
                  marginBottom: 12,
                }}
              >
                {/* Plant Introduction Card */}
                <View style={styles.infoCard}>
                  <View style={styles.infoHeaderRow}>
                    <Text style={styles.infoIconEmoji}>🌿</Text>
                    <Text style={styles.infoTitle}>Plant Introduction</Text>
                  </View>
                  <Text style={styles.infoDescription}>
                    The Fiddle Leaf Fig is a stunning tree with large, glossy
                    leaves that create a tropical atmosphere. Native to West
                    Africa, it's popular for indoor spaces and adds a dramatic
                    touch.
                  </Text>
                </View>

                {/* Recommended Soil Card */}
                <View style={styles.infoCard}>
                  <View style={styles.infoHeaderRow}>
                    <Text style={styles.infoIconEmoji}>🪴</Text>
                    <Text style={styles.infoTitle}>Recommended Soil</Text>
                  </View>
                  <Text style={styles.infoDescription}>
                    Use a well-draining mix of potting soil, perlite, and orchid
                    bark. Avoid heavy clay soils. Ensure proper drainage to
                    prevent root rot.
                  </Text>
                </View>

                {/* Care Summary Grid */}
                <View style={styles.careGrid}>
                  <View style={styles.careGridItem}>
                    <Ionicons name="sunny-outline" size={20} color="#2d5a3d" />
                    <Text style={styles.careGridText}>
                      Light: Bright Indirect
                    </Text>
                  </View>
                  <View style={styles.careGridItem}>
                    <Ionicons name="water-outline" size={20} color="#2d5a3d" />
                    <Text style={styles.careGridText}>Water: Moderate</Text>
                  </View>
                  <View style={styles.careGridItem}>
                    <Ionicons
                      name="thermometer-outline"
                      size={20}
                      color="#2d5a3d"
                    />
                    <Text style={styles.careGridText}>Humidity: 40-60%</Text>
                  </View>
                  <View style={styles.careGridItem}>
                    <Ionicons
                      name="thermometer-outline"
                      size={20}
                      color="#2d5a3d"
                    />
                    <Text style={styles.careGridText}>Temp: 65-75°F</Text>
                  </View>
                </View>

                {/* Advanced Card */}
                <View style={styles.advancedCard}>
                  <View style={styles.advancedHeader}>
                    <Ionicons name="paw" size={16} color="#B91C1C" />
                    <View style={styles.advancedPill}>
                      <Text style={styles.advancedTitle}>Advanced</Text>
                    </View>
                  </View>
                  <Text style={styles.advancedText}>
                    Prefers stable temperatures. Sensitive to cold drafts.
                  </Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      {activeTab === "todo" && (
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomButtonsRow}>
            <TouchableOpacity
              style={[
                styles.primaryButton,
                selectedButton === "photo" && styles.secondaryButton,
              ]}
              onPress={() =>
                setSelectedButton(
                  selectedButton === "reminder" ? null : "reminder"
                )
              }
            >
              <Text
                style={[
                  styles.primaryButtonText,
                  selectedButton === "photo" && styles.secondaryButtonText,
                ]}
              >
                Set Reminder
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.secondaryButton,
                selectedButton === "photo" && styles.primaryButton,
              ]}
              onPress={() =>
                setSelectedButton(selectedButton === "photo" ? null : "photo")
              }
            >
              <Text
                style={[
                  styles.secondaryButtonText,
                  selectedButton === "photo" && styles.primaryButtonText,
                ]}
              >
                Take Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // PAGE
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    fontFamily: "Inter",
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  modeToggle: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modeToggleText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  shareIcon: {
    width: 18,
    height: 18,
  },

  // TOP CONTENT
  content: {
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 0,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    marginBottom: -24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },

  // BOTTOM SHEET
  bottomSheet: {
    backgroundColor: "#F8FAFC",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 24,
    marginTop: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },

  // NAME
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

  // STATUS CARDS
  statusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statusCard: {
    width: "31%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statusIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  statusImage: {
    width: 30,
    height: 30,
  },
  statusTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  statusValue: {
    fontSize: 12,
    // fontWeight: "600",
    color: "#000000",
    fontFamily: "Inter",
  },
  statusValueTop: {
    fontSize: 12,
    // fontWeight: "600",
    color: "#000000",
    fontFamily: "Inter",
    lineHeight: 16,
  },
  statusValueBottom: {
    fontSize: 12,
    // fontWeight: "600",
    color: "#000000",
    fontFamily: "Inter",
    lineHeight: 16,
  },

  // SEGMENTED CONTROL
  segmentContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignSelf: "flex-start",
    gap: 12,
  },
  segmentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderColor: "#E5E7EB",
    borderWidth: 1,
  },
  segmentItemActive: {
    backgroundColor: "#2C593A",
  },
  segmentText: {
    fontSize: 16,
    color: "#4C4C4C",
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  segmentTextActive: {
    color: "white",
  },

  // TODO SECTION
  todoContainer: {
    marginTop: 16,
    backgroundColor: "#F8FAFC",
    minHeight: "100%",
  },
  mainSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 6,
    fontFamily: "Inter",
  },
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#5B9C71",
    marginBottom: 12,
    fontFamily: "Inter",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 6,
  },
  todoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#EFF3EA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  todoIcon: {
    width: 30,
    height: 30,
  },
  todoTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  upcomingTextContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  todoText: {
    fontSize: 14,
    color: "#2d5a3d",
    fontWeight: "400",
    fontFamily: "Inter",
  },
  statusBadge: {
    backgroundColor: "#FF9A9C",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    color: "#AC0000",
    fontWeight: "600",
    fontFamily: "Inter",
  },
  upcomingTime: {
    fontSize: 10,
    color: "#9CA3AF",
    fontWeight: "400",
    fontFamily: "Inter",
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#4AA88B",
    borderColor: "#4AA88B",
  },

  // HEALTH STATUS SECTION
  healthStatusSection: {
    marginBottom: 20,
  },
  healthCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  healthLabel: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "400",
    marginBottom: 8,
    fontFamily: "Inter",
  },
  healthStatusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  healthIndicator: {
    width: 24,
    height: 24,
    borderRadius: 16,
    backgroundColor: "#4AA88B",
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  healthContentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  healthLeftContent: {
    flex: 1,
  },
  healthRightContent: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  animatedWaveContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 50,
    gap: 3,
  },
  animatedWaveBar: {
    width: 4,
    backgroundColor: "#4AA88B",
    borderRadius: 2,
  },

  healthStatusText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    letterSpacing: -0.5,
    fontFamily: "Inter",
  },
  healthSubtext: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 0.2,
    fontWeight: "400",
    fontFamily: "Inter",
  },

  // GRAPHS SECTION
  graphsSection: {
    marginBottom: 20,
  },
  graphsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  connectedButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3E4E2F",
  },
  connectedButtonText: {
    fontSize: 12,
    color: "#3E5842",
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  timePeriodContainer: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#E8F5EF",
    borderRadius: 25,
    padding: 4,
  },
  timePeriodButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#4AA88B",
    alignItems: "center",
  },
  timePeriodInactive: {
    backgroundColor: "transparent",
  },
  timePeriodText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#fff",
    fontFamily: "Roboto",
  },
  timePeriodTextInactive: {
    color: "#9CA3AF",
  },
  waterContentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  waterContentLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 4,
    fontFamily: "Inter",
  },
  waterContentValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 2,
    fontFamily: "Inter",
  },
  waterContentRange: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 16,
    fontFamily: "Inter",
  },

  // CARE INFO SECTION
  innerContainer: {
    marginTop: 0,
    backgroundColor: "#F8FAFC",
    padding: 2,
    minHeight: "100%",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoIconEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d5a3d",
    fontFamily: "Inter",
  },
  infoDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    fontFamily: "Inter",
  },
  careGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  careGridItem: {
    width: "48%",
    backgroundColor: "#B8E6D5",
    borderRadius: 28,
    padding: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  careGridText: {
    fontSize: 11,
    color: "#2d5a3d",
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
    fontFamily: "Inter",
  },

  // ADVANCED CARD
  advancedCard: {
    backgroundColor: "#FEF2F2",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  advancedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  advancedPill: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  advancedTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    fontFamily: "Inter",
  },
  advancedText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 20,
    fontFamily: "Inter",
  },

  // BOTTOM NAVIGATION
  bottomNavContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  bottomButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  primaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 22,
    backgroundColor: "#5A9D6E",
    alignItems: "center",
    marginRight: 8,
  },
  primaryButtonText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#FFFFFF",
    fontFamily: "Roboto",
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#6C9A75",
    backgroundColor: "transparent",
    alignItems: "center",
    marginLeft: 8,
  },
  secondaryButtonText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#627456",
    fontFamily: "Roboto",
  },

  // CARE GUIDE SECTION
  careGuideSection: {
    marginTop: 20,
  },
  careGuideScrollView: {
    flexDirection: "row",
  },
  careGuideCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginRight: 12,
    width: Dimensions.get('window').width * 0.35,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  careGuideIconContainer: {
    width: 28,
    height: 28,
    backgroundColor: "#EFF3EA",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  careGuideEmoji: {
    fontSize: 14,
  },
  careGuideCardText: {
    fontSize: 12,
    color: "#6B7280",
    lineHeight: 16,
    fontFamily: "Inter",
  },
});