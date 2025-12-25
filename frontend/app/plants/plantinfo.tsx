/**
 * Plant Information Screen
 * UI matching the reference design exactly with Real-time Graph and Backend Connection
 */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
  Platform,
  Alert,
  Share,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HealthStatus, { HealthStatusType } from "../../components/HealthStatus";
import { SimpleGraph } from "../../components/RealTimeGraph";

import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { infoImages, uiIcons, plantImages } from "../../assets/images";
import {
  getPlantById,
  deletePlant,
} from "../../services/plantService";
import { getDeviceStatus } from "../../services/deviceService";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

// MAIN COLORS
const PRIMARY_GREEN = "#4AA88B";
const PAGE_BG = "#ECF1E7";
const DARK_GREEN = "#2C593A";

export default function PlantInfoScreen() {
  const params = useLocalSearchParams();
  const plantId = params.plantId;

  // STATE
  const [plant, setPlant] = React.useState<any>(null);
  const [sensorData, setSensorData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState("todo");
  const [selectedTodos, setSelectedTodos] = React.useState<string[]>([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = React.useState("Day");
  const [healthStatus, setHealthStatus] =
    React.useState<HealthStatusType>("healthy");
  const [selectedMetric, setSelectedMetric] = React.useState("moisture");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [shareDropdownOpen, setShareDropdownOpen] = React.useState(false);

  // FETCH DATA
  const loadPlantData = React.useCallback(async () => {
    if (!plantId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const plantId_str = Array.isArray(plantId) ? plantId[0] : plantId;
      const plantData = await getPlantById(plantId_str);
      setPlant(plantData);

      if (plantData?.healthStatus) {
        setHealthStatus(plantData.healthStatus as HealthStatusType);
      }

      if (plantData?.deviceId) {
        const status = await getDeviceStatus(plantData.deviceId);
        if (status && status.lastData) {
          setSensorData({
            moisture: status.lastData.sh / 10,
            temperature: status.lastData.t / 10,
            light: status.lastData.lx / 10,
            isOnline: status.isOnline,
          });
        }
      }
    } catch (err) {
      console.error("Error loading plant data:", err);
    } finally {
      setLoading(false);
    }
  }, [plantId]);

  React.useEffect(() => {
    loadPlantData();
  }, [loadPlantData]);

  const toggleTodo = (todoId: string) => {
    setSelectedTodos((prev: string[]) =>
      prev.includes(todoId)
        ? prev.filter((id: string) => id !== todoId)
        : [...prev, todoId]
    );
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleSharePress = () => {
    setShareDropdownOpen(!shareDropdownOpen);
  };

  const handleSharePlant = async () => {
    try {
      const shareText = `Check out my ${plant.plantName} (${plant.scientificName || ''}) on Senso Plant Care!`;
      await Share.share({
        message: shareText,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const handleDeletePlant = async () => {
    if (!plantId) return;
    Alert.alert("Delete Plant", "Are you sure you want to delete this plant?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const plantId_str = Array.isArray(plantId) ? plantId[0] : plantId;
            await deletePlant(plantId_str);
            router.replace("/dashboard");
          } catch (error) {
            console.error("Error deleting plant:", error);
            Alert.alert("Error", "Failed to delete plant. Please try again.");
          }
        },
      },
    ]);
  };

  const handleTakePhoto = () => {
    router.push({
      pathname: "/devices/camera",
      params: { 
        plantId: Array.isArray(plantId) ? plantId[0] : plantId,
        mode: 'health-scan'
      }
    });
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "moisture": return "water";
      case "temperature": return "thermometer";
      case "light": return "sunny";
      default: return "water";
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "moisture": return "#3b82f6";
      case "temperature": return "#ef4444";
      case "light": return "#eab308";
      default: return "#3b82f6";
    }
  };

  if (loading && !plant) {
    return (
      <View style={[styles.safeArea, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={PRIMARY_GREEN} />
      </View>
    );
  }

  const isOnline = sensorData?.isOnline || false;
  const InstructionImage = plantImages.instructionSampleImage;

  const statusCards = [
    { id: "humidity", icon: "water", iconColor: "#3B82F6", value: isOnline ? `${Math.round(sensorData?.moisture || 0)}%` : "--", bgColor: "#F0FDF4" },
    { id: "temp", icon: "thermometer", iconColor: "#EF4444", value: isOnline ? `${Math.round(sensorData?.temperature || 0)}°C` : "--", bgColor: "#F0FDF4" },
    { id: "dli", icon: "sunny", iconColor: "#F59E0B", value: isOnline ? `${Math.round(sensorData?.light || 0)} DLI` : "--", bgColor: "#F0FDF4" },
    { id: "watering", image: infoImages.info1, bgColor: "#F0FDF4", label: "Every", sublabel: plant?.wateringFrequency ? `${plant.wateringFrequency} days` : "7 days" },
    { id: "light", image: infoImages.info2, bgColor: "#F0FDF4", label: plant?.lightRequirement || "Indirect", sublabel: "light" },
    { id: "range", image: infoImages.info3, value: plant?.temperatureRange || "18-27°C", bgColor: "#F0FDF4" },
  ];

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
          <Text weight="semibold" style={styles.headerTitle}>Plant Info</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleSharePress}
            >
              {(() => {
                const ShareIcon = uiIcons.shareIcon;
                return <ShareIcon width={24} height={24} />;
              })()}
            </TouchableOpacity>

            {shareDropdownOpen && (
              <View style={styles.shareDropdownMenu}>
                <TouchableOpacity
                  style={styles.shareDropdownItem}
                  onPress={() => {
                    setShareDropdownOpen(false);
                  }}
                >
                  <Text weight="medium" style={styles.shareDropdownItemText}>Set Reminder</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.shareDropdownItem}
                  onPress={() => {
                    setShareDropdownOpen(false);
                    handleDeletePlant();
                  }}
                >
                  <Text weight="medium" style={[styles.shareDropdownItemText, { color: "#EF4444" }]}>
                    Delete Plant
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.shareDropdownItem, { borderBottomWidth: 0 }]}
                  onPress={() => {
                    setShareDropdownOpen(false);
                    handleSharePlant();
                  }}
                >
                  <Text weight="medium" style={styles.shareDropdownItemText}>Share Plant</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Top image */}
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            {(() => {
              if (plant?.image) {
                if (typeof plant.image === "string") {
                  return <Image source={{ uri: plant.image }} style={styles.plantImage} resizeMode="cover" />;
                } else {
                  const Img = plant.image;
                  return <Img width={220} height={220} />;
                }
              }
              return <InstructionImage width={220} height={220} />;
            })()}
          </View>
        </View>

        {/* Bottom Sheet */}
        <View style={styles.bottomSheet}>
          <Text variant="h2" weight="semibold" style={styles.plantName}>{plant?.plantName || "Plant"}</Text>
          <Text variant="bodySmall" style={styles.botanicalName}>{plant?.scientificName || "Scientific Name"}</Text>

          {/* Status cards */}
          <View style={styles.statusGrid}>
            {statusCards.map((card: any) => (
              <View key={card.id} style={styles.statusCard}>
                <View style={[styles.statusIconCircle, { backgroundColor: card.bgColor }]}>
                  {card.image ? (
                    (() => {
                      const Icon = card.image;
                      return <Icon width={20} height={20} />;
                    })()
                  ) : (
                    <Ionicons name={card.icon as any} size={18} color={card.iconColor} />
                  )}
                </View>
                <View style={styles.statusTextContainer}>
                  {card.label && card.sublabel ? (
                    <>
                      <Text variant="caption" weight="semibold" style={styles.statusValueTop}>{card.label}</Text>
                      <Text variant="caption" weight="semibold" style={styles.statusValueBottom}>{card.sublabel}</Text>
                    </>
                  ) : (
                    <Text variant="caption" weight="semibold" style={styles.statusValue}>{card.value}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Segmented control */}
          <View style={styles.segmentContainer}>
            <TouchableOpacity
              style={[styles.segmentItem, activeTab === "todo" && styles.segmentItemActive]}
              onPress={() => setActiveTab("todo")}
            >
              <Text weight="semibold" style={[styles.segmentText, activeTab === "todo" && styles.segmentTextActive]}>Todo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.segmentItem, activeTab === "care" && styles.segmentItemActive]}
              onPress={() => setActiveTab("care")}
            >
              <Text weight="semibold" style={[styles.segmentText, activeTab === "care" && styles.segmentTextActive]}>Care Info</Text>
            </TouchableOpacity>
          </View>

          {/* Todo Content */}
          {activeTab === "todo" && (
            <View style={styles.todoContainer}>
              <Text variant="h3" weight="semibold" style={styles.mainSectionTitle}>Todo</Text>

              {/* Today Card */}
              <View style={styles.sectionCard}>
                <Text weight="semibold" style={styles.sectionTitle}>Today</Text>
                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    {(() => {
                      const Icon = infoImages.info1;
                      return <Icon width={24} height={24} />;
                    })()}
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text weight="medium" style={styles.todoText}>Water</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkboxContainer, selectedTodos.includes("water") && styles.checkboxChecked]}
                    onPress={() => toggleTodo("water")}
                  >
                    {selectedTodos.includes("water") && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>
                </View>

                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    {(() => {
                      const Icon = infoImages.info2;
                      return <Icon width={24} height={24} />;
                    })()}
                  </View>
                  <View style={styles.todoTextContainer}>
                    <Text weight="medium" style={styles.todoText}>Misted</Text>
                    <View style={styles.statusBadge}>
                      <Text weight="semibold" style={styles.statusBadgeText}>1d late</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkboxContainer, selectedTodos.includes("misted") && styles.checkboxChecked]}
                    onPress={() => toggleTodo("misted")}
                  >
                    {selectedTodos.includes("misted") && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Upcoming Card */}
              <View style={styles.sectionCard}>
                <Text weight="semibold" style={styles.sectionTitle}>Upcoming</Text>
                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    {(() => {
                      const Icon = infoImages.info1;
                      return <Icon width={24} height={24} />;
                    })()}
                  </View>
                  <View style={styles.upcomingTextContainer}>
                    <Text weight="medium" style={styles.todoText}>Water</Text>
                    <Text variant="caption" style={styles.upcomingTime}>in 5 days</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkboxContainer, selectedTodos.includes("upcomingWater") && styles.checkboxChecked]}
                    onPress={() => toggleTodo("upcomingWater")}
                  >
                    {selectedTodos.includes("upcomingWater") && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>
                </View>

                <View style={styles.todoItem}>
                  <View style={styles.todoIconContainer}>
                    {(() => {
                      const Icon = infoImages.info2;
                      return <Icon width={24} height={24} />;
                    })()}
                  </View>
                  <View style={styles.upcomingTextContainer}>
                    <Text weight="medium" style={styles.todoText}>Misted</Text>
                    <Text variant="caption" style={styles.upcomingTime}>in 3 days</Text>
                  </View>
                  <TouchableOpacity
                    style={[styles.checkboxContainer, selectedTodos.includes("upcomingMisted") && styles.checkboxChecked]}
                    onPress={() => toggleTodo("upcomingMisted")}
                  >
                    {selectedTodos.includes("upcomingMisted") && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Health Status */}
              <View style={styles.healthStatusSection}>
                <View style={styles.healthStatusHeader}>
                  <Text weight="semibold" style={[styles.sectionTitle, { color: "#000000" }]}>Health Status</Text>
                </View>
                <HealthStatus
                  status={healthStatus}
                  isOnline={isOnline}
                  lastWatered={plant?.lastWatered ? new Date(plant.lastWatered).toLocaleDateString() : "--"}
                />
              </View>

              {/* Graphs */}
              {isOnline && (
                <View style={styles.graphsSection}>
                  <View style={styles.graphsHeader}>
                    <Text weight="semibold" style={[styles.sectionTitle, { color: "#000000" }]}>Graphs</Text>
                    <View>
                      <TouchableOpacity style={styles.dropdownButton} onPress={() => setDropdownOpen(!dropdownOpen)}>
                        <View style={styles.dropdownIconContainer}>
                          <Ionicons name={getMetricIcon(selectedMetric) as any} size={12} color={getMetricColor(selectedMetric)} />
                        </View>
                        <Ionicons name="chevron-down" size={10} color="#6B7280" />
                      </TouchableOpacity>
                      {dropdownOpen && (
                        <View style={styles.dropdownMenu}>
                          {[{ id: "moisture", label: "Soil Moisture", icon: "water", color: "#3b82f6" }, { id: "temperature", label: "Temperature", icon: "thermometer", color: "#ef4444" }, { id: "light", label: "Light", icon: "sunny", color: "#eab308" }].map((metric, index) => (
                            <TouchableOpacity key={metric.id} style={[styles.dropdownItem, index === 2 && { borderBottomWidth: 0 }]} onPress={() => { setSelectedMetric(metric.id); setDropdownOpen(false); }}>
                              <View style={styles.dropdownItemIconContainer}><Ionicons name={metric.icon as any} size={16} color={metric.color} /></View>
                              <Text variant="bodySmall" weight="medium" style={styles.dropdownItemText}>{metric.label}</Text>
                            </TouchableOpacity>
                          ))}
                        </View>
                      )}
                    </View>
                  </View>

                  {/* Time Period Selector */}
                  <View style={styles.timePeriodContainer}>
                    {["Day", "Week", "Month"].map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={[
                          styles.timePeriodButton,
                          selectedTimePeriod !== period && styles.timePeriodInactive,
                        ]}
                        onPress={() => setSelectedTimePeriod(period)}
                      >
                        <Text
                          weight="semibold"
                          style={[
                            styles.timePeriodText,
                            selectedTimePeriod !== period && styles.timePeriodTextInactive,
                          ]}
                        >
                          {period}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.waterContentCard}>
                    <View style={styles.waterContentHeader}>
                      <View>
                        <Text variant="caption" style={styles.waterContentLabel}>{selectedMetric === "moisture" ? "Volumetric Water Content :" : selectedMetric === "temperature" ? "Ambient :" : "Amount (DLI) :"}</Text>
                        <Text weight="bold" style={styles.waterContentValue}>
                          {selectedMetric === "moisture" ? "45%" : selectedMetric === "temperature" ? "22°C" : "12.5 mol"}
                        </Text>
                        <Text variant="caption" style={styles.waterContentRange}>
                          {selectedMetric === "moisture" ? "Range" : selectedMetric === "temperature" ? "Range" : "Received today"}
                        </Text>
                      </View>
                      <View style={styles.dateBadge}><Text variant="caption" weight="medium" style={styles.dateBadgeText}>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</Text></View>
                    </View>
                    <SimpleGraph selectedMetric={selectedMetric} selectedPeriod={selectedTimePeriod} />
                  </View>

                  {/* Dynamic Summary Cards */}
                  <View style={styles.careSummaryContainer}>
                    {selectedMetric === "moisture" && (
                      <>
                        <View style={styles.careSummaryCard}>
                          <Text variant="caption" style={styles.careSummaryTitle}>Last watering</Text>
                          <Text weight="semibold" style={styles.careSummaryDate}>Dec 7, 2025</Text>
                        </View>
                        <View style={styles.careSummaryCard}>
                          <Text variant="caption" style={styles.careSummaryTitle}>Next watering</Text>
                          <Text weight="semibold" style={styles.careSummaryDate}>Dec 12, 2025</Text>
                        </View>
                      </>
                    )}
                    {selectedMetric === "temperature" && (
                      <>
                        <View style={styles.careSummaryCard}>
                          <Text variant="caption" style={styles.careSummaryTitle}>Temperature</Text>
                          <Text weight="semibold" style={styles.careSummaryDate}>22°C current</Text>
                        </View>
                        <View style={styles.careSummaryCard}>
                          <Text variant="caption" style={styles.careSummaryTitle}>Median</Text>
                          <Text weight="semibold" style={styles.careSummaryDate}>21°C median</Text>
                        </View>
                      </>
                    )}
                    {selectedMetric === "light" && (
                      <>
                        <View style={styles.careSummaryCard}>
                          <Text variant="caption" style={styles.careSummaryTitle}>Trend</Text>
                          <Text weight="semibold" style={styles.careSummaryDate}>↗ 2 %</Text>
                        </View>
                        <View style={styles.careSummaryCard}>
                          <Text variant="caption" style={styles.careSummaryTitle}>Avg. hours of light :</Text>
                          <Text weight="semibold" style={styles.careSummaryDate}>8.5 hours</Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>
              )}

              {/* Add Sensor Section for Offline Mode */}
              {!isOnline && (
                <View style={styles.graphsSection}>
                  <View style={styles.graphsHeader}>
                    <Text weight="semibold" style={[styles.sectionTitle, { color: "#000000" }]}>Graphs</Text>
                    <TouchableOpacity style={styles.addSensorButton} onPress={() => router.push("/devices/connectdevice")}>
                      <Text weight="medium" style={styles.addSensorButtonText}>Add Sensor</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Care Guide Section */}
              <View style={styles.careGuideSection}>
                <Text weight="semibold" style={[styles.sectionTitle, { color: "#000000" }]}>Care Guide</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.careGuideScrollView}>
                  {[
                    { emoji: "💧", text: "Water when top 2 inches of soil are dry. Mist occasionally." },
                    { emoji: "☀️", text: "Place in bright, indirect light. Avoid direct sun." },
                    { emoji: "🧪", text: "Fertilize monthly during growing season with liquid fertilizer." },
                    { emoji: "🌡️", text: "Maintain humidity between 40-60% for optimal growth." }
                  ].map((item, index) => (
                    <View key={index} style={styles.careGuideCard}>
                      <View style={styles.careGuideIconContainer}><Text style={styles.careGuideEmoji}>{item.emoji}</Text></View>
                      <Text variant="caption" style={styles.careGuideCardText}>{item.text}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}

          {/* Care Content */}
          {activeTab === "care" && (
            <ScrollView style={styles.innerContainer} showsVerticalScrollIndicator={false}>
              <View style={{ backgroundColor: "#E8F5EF", borderRadius: 12, padding: 16, marginTop: 16 }}>
                <View style={styles.infoCard}>
                  <View style={styles.infoHeaderRow}><Text style={styles.infoIconEmoji}>🌿</Text><Text weight="semibold" style={styles.infoTitle}>Plant Introduction</Text></View>
                  <Text variant="bodySmall" style={styles.infoDescription}>{plant?.description || "The Fiddle Leaf Fig is a stunning tree with large, glossy leaves. Native to West Africa, it's popular for indoor spaces."}</Text>
                </View>
                <View style={styles.infoCard}>
                  <View style={styles.infoHeaderRow}><Text style={styles.infoIconEmoji}>🪴</Text><Text weight="semibold" style={styles.infoTitle}>Recommended Soil</Text></View>
                  <Text variant="bodySmall" style={styles.infoDescription}>{plant?.soilType || "Use a well-draining mix of potting soil, perlite, and orchid bark. Ensure proper drainage to prevent root rot."}</Text>
                </View>
                <View style={styles.careGrid}>
                  {[
                    { icon: "sunny-outline", text: "Light: Bright Indirect" },
                    { icon: "water-outline", text: "Water: Moderate" },
                    { icon: "thermometer-outline", text: "Humidity: 40-60%" },
                    { icon: "thermometer-outline", text: "Temp: 65-75°F" }
                  ].map((item, index) => (
                    <View key={index} style={styles.careGridItem}>
                      <Ionicons name={item.icon as any} size={20} color="#2d5a3d" />
                      <Text weight="medium" style={styles.careGridText}>{item.text}</Text>
                    </View>
                  ))}
                </View>
                <View style={styles.advancedCard}>
                  <View style={styles.advancedHeader}>
                    <Ionicons name="paw" size={16} color="#B91C1C" />
                    <View style={styles.advancedPill}><Text weight="semibold" style={styles.advancedTitle}>Advanced</Text></View>
                  </View>
                  <Text variant="caption" style={styles.advancedText}>Prefers stable temperatures. Sensitive to cold drafts.</Text>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {activeTab === "todo" && (
        <View style={styles.bottomNavContainer}>
          <View style={styles.bottomButtonsRow}>
            <Button
              title="Set Reminder"
              variant="primary"
              onPress={() => {}}
              style={[styles.bottomBtn, styles.hoverEffect]}
            />
            <Button
              title="Take Photo"
              variant="outline"
              onPress={handleTakePhoto}
              style={styles.bottomBtn}
            />
          </View>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingTop: Platform.OS === "ios" ? 50 : 30 },
  scrollContainer: { flex: 1 },
  scrollContent: { paddingBottom: 120 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", elevation: 2 },
  headerTitle: { fontSize: 16, color: "#111827" },
  shareButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFFFFF", justifyContent: "center", alignItems: "center", elevation: 2 },
  headerRight: { flexDirection: "row", alignItems: "center", gap: 8 },
  shareDropdownMenu: { position: "absolute", top: 50, right: 0, backgroundColor: "#fff", borderRadius: 12, padding: 8, minWidth: 160, elevation: 10, zIndex: 2000 },
  shareDropdownItem: { paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  shareDropdownItemText: { fontSize: 14, color: "#374151" },
  content: { paddingHorizontal: 18, paddingTop: 4, alignItems: "center" },
  imageContainer: { width: "100%", height: 200, marginBottom: -24, borderRadius: 16, overflow: "hidden", backgroundColor: "#E5E7EB", zIndex: 10, elevation: 5 },
  plantImage: { width: "100%", height: "100%" },
  bottomSheet: { backgroundColor: "#F8FAFC", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24, elevation: 8 },
  plantName: { textAlign: "center", marginBottom: 2 },
  botanicalName: { color: "#9CA3AF", textAlign: "center", marginBottom: 18 },
  statusGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 20 },
  statusCard: { width: "31%", backgroundColor: "#FFFFFF", borderRadius: 12, paddingVertical: 10, paddingHorizontal: 8, marginBottom: 10, flexDirection: "row", alignItems: "center", elevation: 2 },
  statusIconCircle: { width: 36, height: 36, borderRadius: 6, justifyContent: "center", alignItems: "center", marginRight: 8 },
  statusTextContainer: { flex: 1, justifyContent: "center" },
  statusValue: { color: "#000000" },
  statusValueTop: { color: "#000000", lineHeight: 16 },
  statusValueBottom: { color: "#000000", lineHeight: 16 },
  segmentContainer: { flexDirection: "row", marginBottom: 14, alignSelf: "flex-start", gap: 12 },
  segmentItem: { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, borderColor: "#E5E7EB", borderWidth: 1 },
  segmentItemActive: { backgroundColor: DARK_GREEN },
  segmentText: { fontSize: 14, color: "#4C4C4C" },
  segmentTextActive: { color: "white" },
  todoContainer: { marginTop: 4, backgroundColor: "#F8FAFC" },
  mainSectionTitle: { color: "#000000", marginTop: 2, marginBottom: 14 },
  sectionCard: { backgroundColor: "#fff", borderRadius: 12, padding: 12, marginBottom: 20, elevation: 1 },
  sectionTitle: { fontSize: 16, color: "#5B9C71", marginBottom: 12, flex: 1 },
  todoItem: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 12, borderRadius: 12, marginBottom: 8 },
  todoIconContainer: { width: 54, height: 54, borderRadius: 12, backgroundColor: "#EFF3EA", justifyContent: "center", alignItems: "center", marginRight: 12 },
  todoTextContainer: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
  upcomingTextContainer: { flex: 1, flexDirection: "column", justifyContent: "center" },
  todoText: { fontSize: 14, color: "#2d5a3d" },
  statusBadge: { backgroundColor: "#FF9A9C", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, marginLeft: 8 },
  statusBadgeText: { fontSize: 11, color: "#AC0000" },
  upcomingTime: { color: "#9CA3AF" },
  checkboxContainer: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: "#D1D5DB", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  checkboxChecked: { backgroundColor: "#4AA88B", borderColor: "#4AA88B" },
  healthStatusSection: { marginBottom: 20 },
  healthStatusHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  graphsSection: { marginBottom: 20 },
  graphsHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  dropdownButton: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 16, borderWidth: 1, borderColor: "#D1D5DB", backgroundColor: "#F3F4F6" },
  dropdownIconContainer: { width: 20, height: 20, borderRadius: 10, alignItems: "center", justifyContent: "center" },
  dropdownMenu: { position: "absolute", top: 40, right: 0, backgroundColor: "#fff", borderRadius: 12, padding: 8, minWidth: 180, elevation: 5, zIndex: 1000 },
  dropdownItem: { flexDirection: "row", alignItems: "center", gap: 10, padding: 10, borderRadius: 8, borderBottomWidth: 1, borderBottomColor: "#F3F4F6" },
  dropdownItemIconContainer: { width: 24, height: 24, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  dropdownItemText: { fontSize: 13, color: "#374151" },
  timePeriodContainer: { flexDirection: "row", marginBottom: 16, backgroundColor: "#E8F5EF", borderRadius: 25, padding: 4 },
  timePeriodButton: { flex: 1, paddingVertical: 10, borderRadius: 20, backgroundColor: "#4AA88B", alignItems: "center" },
  timePeriodInactive: { backgroundColor: "transparent" },
  timePeriodText: { fontSize: 14, color: "#fff" },
  timePeriodTextInactive: { color: "#9CA3AF" },
  waterContentCard: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 20, elevation: 1, alignItems: "flex-start" },
  waterContentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", width: "100%", marginBottom: 16 },
  dateBadge: { backgroundColor: "#F3F4F6", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  dateBadgeText: { fontSize: 12, color: "#3E5842" },
  waterContentLabel: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
  waterContentValue: { fontSize: 24, marginBottom: 4 },
  waterContentRange: { fontSize: 12, color: "#9CA3AF", marginBottom: 16 },
  addSensorButton: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, backgroundColor: "#D2D2D2" },
  addSensorButtonText: { fontSize: 12, color: "#6B7280" },
  careGuideSection: { marginTop: 20 },
  careGuideScrollView: { flexDirection: "row" },
  careGuideCard: { backgroundColor: "#fff", borderRadius: 12, padding: 12, marginRight: 12, width: 130, elevation: 1 },
  careGuideIconContainer: { width: 40, height: 40, backgroundColor: "#EFF3EA", borderRadius: 8, justifyContent: "center", alignItems: "center", marginBottom: 12 },
  careGuideEmoji: { fontSize: 20 },
  careGuideCardText: { fontSize: 10, color: "#6B7280", lineHeight: 16 },
  innerContainer: { backgroundColor: "#F8FAFC" },
  infoCard: { backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 20, elevation: 1 },
  infoHeaderRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  infoIconEmoji: { fontSize: 20, marginRight: 8 },
  infoTitle: { fontSize: 18, color: "#2d5a3d" },
  infoDescription: { fontSize: 14, color: "#6B7280", lineHeight: 20 },
  careGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 12 },
  careGridItem: { width: "48%", backgroundColor: "#B8E6D5", borderRadius: 28, padding: 12, marginBottom: 8, flexDirection: "row", alignItems: "center", elevation: 1 },
  careGridText: { fontSize: 11, color: "#2d5a3d", marginLeft: 8, flex: 1 },
  advancedCard: { backgroundColor: "#FEF2F2", borderRadius: 12, padding: 16, marginBottom: 20, borderWidth: 1, borderColor: "#FECACA" },
  advancedHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  advancedPill: { backgroundColor: "#FEE2E2", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginLeft: 8 },
  advancedTitle: { fontSize: 12, color: "#6B7280" },
  advancedText: { fontSize: 12, color: "#6B7280", lineHeight: 20 },
  bottomNavContainer: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", paddingTop: 16, paddingBottom: Platform.OS === "ios" ? 30 : 20, paddingHorizontal: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 10 },
  bottomButtonsRow: { flexDirection: "row", justifyContent: "space-between", gap: 16 },
  bottomBtn: { flex: 1 },
  hoverEffect: { shadowColor: "#4AA88B", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 },
});
