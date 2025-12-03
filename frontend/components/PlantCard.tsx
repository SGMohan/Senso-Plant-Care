import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface PlantCardProps {
  plant: {
    id: number;
    name: string;
    type: string;
    moisture?: number;
    temperature?: number;
    distance?: string;
    connected: boolean;
    image: any;
  };
}

export default function PlantCard({ plant }: PlantCardProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const handlePlantPress = () => {
    // TODO: Backend Integration - Pass plant ID and instruction type as params
    router.push('/instruction');
  };
  
  return (
    <TouchableOpacity style={styles.plantCard} onPress={handlePlantPress}>
      <View style={styles.plantCardContent}>
        <View style={styles.plantImageContainer}>
          <Image 
            source={plant.image} 
            style={styles.plantImage}
            resizeMode="cover"
            fadeDuration={0}
            loadingIndicatorSource={require('../assets/plant_1.png')}
          />
        </View>
        <View style={styles.plantInfo}>
          <View style={styles.plantInfoRow}>
            <View style={styles.plantNameContainer}>
              <Text style={styles.plantName}>{plant.name}</Text>
              <Text style={styles.plantType}>{plant.type}</Text>
            </View>
            <TouchableOpacity 
              style={[
                styles.deviceButton,
                plant.connected ? styles.deviceButtonActive : styles.deviceButtonInactive,
                isPressed && styles.deviceButtonPressed
              ]}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text style={[
                styles.deviceButtonText,
                plant.connected ? styles.deviceButtonTextActive : styles.deviceButtonTextInactive
              ]}>Device</Text>
            </TouchableOpacity>
          </View>
          
          {plant.connected ? (
            <View style={styles.plantMetrics}>
              <View style={styles.metricItem}>
                <View style={styles.metricIconContainer}>
                  <Ionicons name="water" size={20} color="#3b82f6" />
                </View>
                <Text style={styles.metricValue}>{plant.moisture}%</Text>
              </View>
              <View style={styles.metricItem}>
                <View style={styles.metricIconContainer}>
                  <Ionicons name="thermometer" size={20} color="#ef4444" />
                </View>
                <Text style={styles.metricValue}>
                  {plant.temperature}°C
                </Text>
              </View>
              <View style={styles.metricItem}>
                <View style={styles.metricIconContainer}>
                  <MaterialIcons
                    name="straighten"
                    size={20}
                    color="#eab308"
                  />
                </View>
                <Text style={styles.metricValue}>{plant.distance}</Text>
              </View>
            </View>
          ) : (
            <>
              <View style={styles.plantMetrics}>
                <View style={styles.metricIconContainer}>
                  <Ionicons name="water" size={24} color="#93c5fd" />
                </View>
                <View style={styles.metricIconContainer}>
                  <Ionicons name="thermometer" size={24} color="#fca5a5" />
                </View>
                <View style={styles.metricIconContainer}>
                  <Ionicons name="alert-circle" size={24} color="#fde047" />
                </View>
              </View>
              <Text style={styles.waitingText}>
                Waiting for senso to connect
              </Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  plantCardContent: {
    flexDirection: "row",
    gap: 16,
  },
  plantImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
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
    fontFamily: "Inter",
  },
  plantType: {
    fontSize: 14,
    color: "#6b8a7a",
    marginTop: 2,
    fontFamily: "Roboto",
  },
  deviceButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  deviceButtonActive: {
    borderColor: "#3E4E2F",
  },
  deviceButtonInactive: {
    borderColor: "#868686",
  },
  deviceButtonPressed: {
    backgroundColor: "#E8F5E8",
  },
  deviceButtonText: {
    fontSize: 12,
    fontFamily: "Roboto",
  },
  deviceButtonTextActive: {
    color: "#3E4E2F",
  },
  deviceButtonTextInactive: {
    color: "#868686",
  },
  plantMetrics: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 8,
    gap: 16,
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
    fontFamily: "Inter",
  },
  waitingText: {
    textAlign: "center",
    fontSize: 14,
    color: "#9ca3af",
    fontStyle: "italic",
    marginTop: 8,
    fontFamily: "Roboto",
  },
});