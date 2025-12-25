import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image } from 'expo-image';
import Text from './ui/Text';

interface PlantCardProps {
  plant: {
    _id?: string;
    id?: number | string;
    name: string;
    scientificName?: string;
    type?: string;
    moisture?: number;
    temperature?: number;
    distance?: string;
    connected: boolean;
    image: any;
    status?: string;
    needsWater?: boolean;
  };
}

export default function PlantCard({ plant }: PlantCardProps) {
  const [isPressed, setIsPressed] = React.useState(false);
  
  const handlePlantPress = () => {
    // Navigate to the plant info page inside the plants directory
    router.push({
      pathname: '/plants/plantinfo',
      params: { plantId: plant._id || plant.id }
    });
  };

  const handleDevicePress = () => {
    // Navigate to device connection flow (Corrected path)
    router.push('/devices/connectdevice');
  };
  
  return (
    <TouchableOpacity style={styles.plantCard} onPress={handlePlantPress} activeOpacity={0.9}>
      <View style={styles.plantCardContent}>
        {/* Left Side: Plant Image */}
        <View style={styles.plantImageContainer}>
          <Image 
            source={typeof plant.image === 'string' ? { uri: plant.image } : plant.image} 
            style={styles.plantImage}
            contentFit="cover"
            transition={300}
          />
        </View>

        {/* Right Side: Info and Metrics */}
        <View style={styles.plantInfo}>
          <View style={styles.headerRow}>
            <View style={styles.textContainer}>
              <Text weight="bold" style={styles.plantName} numberOfLines={1}>{plant.name}</Text>
              <Text variant="caption" style={styles.scientificName} numberOfLines={1}>
                {plant.scientificName || plant.type || "Scientific Name"}
              </Text>
            </View>
            
            <TouchableOpacity 
              style={[
                styles.deviceButton,
                isPressed && styles.deviceButtonPressed
              ]}
              onPress={handleDevicePress}
              onPressIn={() => setIsPressed(true)}
              onPressOut={() => setIsPressed(false)}
            >
              <Text weight="medium" style={styles.deviceButtonText}>Device</Text>
            </TouchableOpacity>
          </View>

          {/* Metrics Row */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconCircle}>
                <Ionicons name="water" size={22} color="#3b82f6" />
              </View>
              <Text weight="semibold" style={styles.metricValue}>{plant.connected ? `${plant.moisture || 0}%` : "--"}</Text>
            </View>
            
            <View style={styles.metricItem}>
              <View style={styles.metricIconCircle}>
                <Ionicons name="thermometer" size={22} color="#ef4444" />
              </View>
              <Text weight="semibold" style={styles.metricValue}>{plant.connected ? `${plant.temperature || 0}°C` : "--"}</Text>
            </View>
            
            <View style={styles.metricItem}>
              <View style={styles.metricIconCircle}>
                <Ionicons name="sunny" size={22} color="#facc15" />
              </View>
              <Text weight="semibold" style={styles.metricValue}>{plant.connected ? (plant.distance || "0.2 DLI") : "--"}</Text>
            </View>
          </View>
          
          {!plant.connected && (
            <Text variant="caption" style={styles.waitingText}>Waiting for senso to connect...</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plantCard: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  plantCardContent: {
    flexDirection: "row",
    alignItems: 'center',
  },
  plantImageContainer: {
    width: 100,
    height: 120,
    borderRadius: 12, 
    overflow: 'hidden', 
    marginRight: 12,
    backgroundColor: '#F3F3F3',
  },
  plantImage: {
    width: "100%",
    height: "100%",
  },
  plantInfo: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  plantName: {
    fontSize: 22,
    color: "#1a1a1a",
  },
  scientificName: {
    color: "#888",
    marginTop: 2,
  },
  deviceButton: {
    backgroundColor: "#E8F0E8",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4A634A",
  },
  deviceButtonPressed: {
    backgroundColor: "#D0E0D0",
  },
  deviceButtonText: {
    fontSize: 12,
    color: "#4A634A",
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: 'flex-start',
    gap: 20,
  },
  metricItem: {
    alignItems: "center",
  },
  metricIconCircle: {
    backgroundColor: "#EFF5EF",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 13,
    color: "#333",
  },
  waitingText: {
    fontStyle: "italic",
    marginTop: 8,
  },
});
