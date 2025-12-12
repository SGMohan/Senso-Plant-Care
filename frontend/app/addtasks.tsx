import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { taskTypes } from "../assets";

const AddTasksScreen = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [wateredButtonPressed, setWateredButtonPressed] = useState(false);
  const [closeButtonPressed, setCloseButtonPressed] = useState(false);

  const handleTaskClick = (taskName: string) => {
    setSelectedTask(taskName);
    setShowModal(true);
  };

  const handleWatered = () => {
    setShowModal(false);
    router.push("/camera" as any);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <LinearGradient
      colors={["#EBF3E8", "#D1EBD7"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#EBF3E8" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="chevron-back" size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Add Tasks</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Task Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add task to Monstera Deliciosa</Text>

          {/* Task List */}
          <View style={styles.taskList}>
            {taskTypes.map((task, index) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskItem}
                onPress={() => handleTaskClick(task.name)}
                activeOpacity={0.7}
              >
                <View style={styles.taskContent}>
                  <View style={styles.iconContainer}>
                    <Image source={task.icon} style={styles.taskIcon} />
                  </View>
                  <Text style={styles.taskName}>{task.name}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Mark as watered?</Text>
            <Text style={styles.modalText}>
              This action will mark the Monster Deliciosa as watered.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.wateredButton,
                  wateredButtonPressed && styles.wateredButtonPressed,
                ]}
                onPress={handleWatered}
                onPressIn={() => setWateredButtonPressed(true)}
                onPressOut={() => setWateredButtonPressed(false)}
                activeOpacity={1}
              >
                <Text
                  style={[
                    styles.wateredButtonText,
                    wateredButtonPressed && styles.wateredButtonTextPressed,
                  ]}
                >
                  Watered
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  closeButtonPressed && styles.closeButtonPressed,
                ]}
                onPress={handleClose}
                onPressIn={() => setCloseButtonPressed(true)}
                onPressOut={() => setCloseButtonPressed(false)}
                activeOpacity={1}
              >
                <Text
                  style={[
                    styles.closeButtonText,
                    closeButtonPressed && styles.closeButtonTextPressed,
                  ]}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    fontFamily: "Inter",
  },
  headerSpacer: {
    width: 40,
    height: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    marginHorizontal: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    color: "#5a9a7a",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 16,
  },
  taskList: {
    backgroundColor: "#fff",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },

  taskContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#f0f9f4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  taskIcon: {
    width: 32,
    height: 32,
  },
  taskName: {
    fontSize: 16,
    color: "#333",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#d4e8d8",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 340,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  wateredButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5a9a7a",
  },
  wateredButtonPressed: {
    backgroundColor: "#5a9a7a",
    borderColor: "#5a9a7a",
  },
  wateredButtonText: {
    color: "#5a9a7a",
    fontSize: 16,
    fontWeight: "600",
  },
  wateredButtonTextPressed: {
    color: "#fff",
  },
  closeButton: {
    flex: 1,
    backgroundColor: "transparent",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#5a9a7a",
  },
  closeButtonPressed: {
    backgroundColor: "#5a9a7a",
    borderColor: "#5a9a7a",
  },
  closeButtonText: {
    color: "#5a9a7a",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButtonTextPressed: {
    color: "#fff",
  },
});

export default AddTasksScreen;
