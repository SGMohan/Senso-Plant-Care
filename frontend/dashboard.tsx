/**
 * Dashboard screen for the Senso Plant Care app
 * Displays user's plants and their status
 */
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

/**
 * Dashboard component - displays user's plants with their current status
 * @returns {JSX.Element} The dashboard screen component
 */
export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Plants</Text>
        <Text style={styles.subtitle}>3 plants need attention</Text>
      </View>
      <ScrollView style={styles.content}>
        <View style={styles.plantCard}>
          <Text style={styles.plantName}>Monstera Deliciosa</Text>
          <Text style={styles.plantStatus}>Needs water</Text>
        </View>
        <View style={styles.plantCard}>
          <Text style={styles.plantName}>Snake Plant</Text>
          <Text style={styles.plantStatus}>Healthy</Text>
        </View>
        <View style={styles.plantCard}>
          <Text style={styles.plantName}>Fiddle Leaf Fig</Text>
          <Text style={styles.plantStatus}>Low light</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Plant</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8faf8" },
  header: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "700", color: "#1a3c2a", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#6b8a7a" },
  content: { flex: 1, paddingHorizontal: 24 },
  plantCard: { backgroundColor: "white", padding: 20, borderRadius: 12, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  plantName: { fontSize: 18, fontWeight: "600", color: "#1a3c2a", marginBottom: 4 },
  plantStatus: { fontSize: 14, color: "#6b8a7a" },
  addButton: { backgroundColor: "#2d5a3d", margin: 24, paddingVertical: 16, borderRadius: 12, alignItems: "center" },
  addButtonText: { color: "white", fontSize: 16, fontWeight: "500" },
});