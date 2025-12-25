import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface BottomNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("home")}
      >
        <Ionicons
          name={activeTab === "home" ? "home" : "home-outline"}
          size={24}
          color={activeTab === "home" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("add")}
      >
        <Ionicons
          name="add"
          size={32}
          color={activeTab === "add" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setActiveTab("my-plants")}
      >
        <Ionicons
          name={activeTab === "my-plants" ? "leaf" : "leaf-outline"}
          size={24}
          color={activeTab === "my-plants" ? "#2d5a3d" : "#9ca3af"}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.navItem}
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
});
