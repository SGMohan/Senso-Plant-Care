/**
 * Plant Care Instructions Screen
 * Matches the reference design with backend integration and dynamic AI-powered data
 */
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { getMyPlants } from "../../services/plantService";
import Text from "../../components/ui/Text";

// MAIN COLORS
const PRIMARY_GREEN = "#76B198"; 
const LIGHT_GREEN_BG = "#EAF4F0"; 
const PAGE_BG = "#EDF2E9"; 

export default function InstructionScreen() {
  const { plantId } = useLocalSearchParams();
  const [plantData, setPlantData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        if (plantId) {
          const plants = await getMyPlants();
          const plant = plants.find((p: any) => p._id === plantId || p.id === plantId);
          if (plant) {
            setPlantData(plant);
          }
        }
      } catch (error) {
        console.error("Error fetching plant details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantDetails();
  }, [plantId]);

  const handleBackPress = () => {
    router.back();
  };

  /**
   * Dynamic instructions based on backend careInstructions (AI generated during identification)
   */
  const getDynamicInstructions = () => {
    const care = plantData?.careInstructions;
    
    return [
      {
        id: 'step1',
        icon: "water-outline",
        iconType: "Ionicons",
        title: "Watering Instructions",
        description: care?.watering || "Water only when the top inch of soil feels dry to the touch. Ensure proper drainage."
      },
      {
        id: 'step2',
        icon: "white-balance-sunny",
        iconType: "MaterialCommunityIcons",
        title: "Caring & Light",
        description: care?.light || "Place in bright indirect light. Clean leaves periodically to ensure optimal photosynthesis."
      },
      {
        id: 'step3',
        icon: "flask-outline",
        iconType: "Ionicons",
        title: "Fertilizing Guide",
        description: "Apply balanced fertilizer during the growing season (Spring/Summer) every 4 weeks."
      },
      {
        id: 'step4',
        icon: "thermometer-outline",
        iconType: "Ionicons",
        title: "Temperature & Environment",
        description: care?.temperature || "Maintain room temperature between 18-24°C. Avoid placing near cold drafts or heaters."
      }
    ];
  };

  const instructions = getDynamicInstructions();

  if (loading) {
    return (
      <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={PRIMARY_GREEN} />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.topSection}>
          <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}
              >
                <Ionicons name="chevron-back" size={20} color="#6B7280" />
              </TouchableOpacity>
              <Text weight="medium" style={styles.headerTitle}>Instructions</Text>
              <View style={styles.placeholder} />
            </View>

            {/* Top content */}
            <View style={styles.content}>
              <View style={styles.imageContainer}>
                <Image
                  source={typeof plantData?.image === 'string' ? { uri: plantData.image } : plantData?.image}
                  style={styles.plantImage}
                  contentFit="cover"
                  transition={300}
                />
              </View>

              <Text variant="h2" weight="semibold" style={styles.plantName}>{plantData?.plantName || "Plant Care"}</Text>
              <Text variant="bodySmall" style={styles.botanicalName}>{plantData?.scientificName || "Botanical Species"}</Text>
            </View>
          </SafeAreaView>
        </View>

        {/* Bottom sheet */}
        <View style={styles.instructionsCard}>
          <View style={styles.innerWhiteBox}>
            <Text weight="semibold" style={styles.instructionHeaderText}>
              Care & Maintenance Guide
            </Text>

            <View style={styles.instructionsList}>
              {instructions.map((instruction, index) => (
                <View key={instruction.id} style={styles.instructionItem}>
                  <View style={styles.iconContainer}>
                    <View style={styles.iconSquare}>
                      {instruction.iconType === "Ionicons" ? (
                        <Ionicons
                          name={instruction.icon as any}
                          size={28}
                          color={PRIMARY_GREEN}
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name={instruction.icon as any}
                          size={28}
                          color={PRIMARY_GREEN}
                        />
                      )}
                    </View>
                    <View style={styles.numberOverlay}>
                      <Text weight="semibold" style={styles.stepNumber}>{index + 1}</Text>
                    </View>
                  </View>

                  <View style={styles.instructionTextContainer}>
                    <Text weight="semibold" style={styles.instructionTitle}>
                      {index + 1}. {instruction.title}
                    </Text>
                    <Text variant="caption" style={styles.instructionDescription}>
                      {instruction.description}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    backgroundColor: PAGE_BG,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: PAGE_BG,
    paddingBottom: 20,
  },
  safeArea: {
    paddingTop: 10,
  },

  // HEADER
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    color: "#374151",
  },
  placeholder: {
    width: 44,
    height: 44,
  },

  // TOP CONTENT
  content: {
    paddingHorizontal: 25,
    paddingTop: 10,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: 190,
    marginBottom: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#E5E7EB",
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  plantName: {
    color: "#111827",
    textAlign: "center",
    marginBottom: 4,
  },
  botanicalName: {
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 10,
  },

  // BOTTOM SHEET
  instructionsCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    flex: 1,
  },

  innerWhiteBox: {
    backgroundColor: "#FFFFFF",
    padding: 20,
  },

  instructionHeaderText: {
    color: "#4B5563",
    marginBottom: 20,
    fontSize: 19,
  },

  // LIST
  instructionsList: {
    width: "100%",
  },
  instructionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },

  // ICON + NUMBER
  iconContainer: {
    position: "relative",
    marginRight: 15,
  },
  iconSquare: {
    width: 58,
    height: 58,
    borderRadius: 14,
    backgroundColor: LIGHT_GREEN_BG,
    justifyContent: "center",
    alignItems: "center",
  },
  numberOverlay: {
    position: "absolute",
    top: -2,
    left: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: PRIMARY_GREEN,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  stepNumber: {
    fontSize: 10,
    color: "#FFFFFF",
  },

  // TEXT
  instructionTextContainer: {
    flex: 1,
    paddingTop: 2,
  },
  instructionTitle: {
    fontSize: 15,
    color: "#111827",
    marginBottom: 3,
  },
  instructionDescription: {
    color: "#4B5563",
    lineHeight: 18,
  },
});
