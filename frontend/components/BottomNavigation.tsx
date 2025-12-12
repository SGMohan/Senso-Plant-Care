import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={[styles.navItem, activeTab === "home" && styles.activeNavItem]}
        onPress={() => setActiveTab("home")}
      >
        <Ionicons
          name={activeTab === "home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "home" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, activeTab === "add" && styles.activeNavItem]}
        onPress={() => {
          // PAIRING DEVICE FLOW - Decision: Pairing Device?
          // YES → Pair Sensor via Bluetooth
          // NO → Return to Plant Management Page (MVP)
          router.push('/connectdevice');
        }}
      >
        <Ionicons
          name="add"
          size={24}
          color={activeTab === "add" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navItem, activeTab === "leaf" && styles.activeNavItem]}
        onPress={() => router.push('/scanner')}
      >
        <Ionicons
          name={activeTab === "leaf" ? "leaf" : "leaf-outline"}
          size={24}
          color={activeTab === "leaf" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItem,
          activeTab === "profile" && styles.activeNavItem,
        ]}
        onPress={() => setActiveTab("profile")}
      >
        <Ionicons
          name={activeTab === "profile" ? "person" : "person-outline"}
          size={24}
          color={activeTab === "profile" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    ...Platform.select({
      web: { boxShadow: "0px -2px 8px rgba(0, 0, 0, 0.1)" },
      default: {
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
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