import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { taskTypes } from "../../assets/images";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

const AddTasksScreen = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [wateredButtonPressed, setWateredButtonPressed] = useState(false);
  const [closeButtonPressed, setCloseButtonPressed] = useState(false);

  const handleTaskClick = (taskName: string) => {
    // Navigation flow: when user clicks arrow icon (or item) tasks shows the instruction page
    router.push("/dashboard/instruction");
  };

  const handleWatered = () => {
    setShowModal(false);
    router.push("/devices/camera");
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    router.push("/dashboard/dashboard"); // Close icon navigate to dashboard page
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
            <Ionicons name="close" size={20} color="#6b7280" />
          </TouchableOpacity>
          <Text weight="medium" style={styles.headerTitle}>Add Tasks</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Task Card */}
        <View style={styles.card}>
          <Text weight="medium" style={styles.cardTitle}>Add task to Monstera Deliciosa</Text>

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
                    {(() => {
                      const iconValue = task.icon as any;
                      if (typeof iconValue === "function") {
                        const SvgIcon = iconValue;
                        return <SvgIcon width={32} height={32} />;
                      }
                      // iconValue is not a component — treat as image source
                      return (
                        <Image
                          source={iconValue as any}
                          style={styles.taskIcon}
                        />
                      );
                    })()}
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
            <Text weight="semibold" style={styles.modalTitle}>Mark as watered?</Text>
            <Text variant="bodySmall" style={styles.modalText}>
              This action will mark the Monster Deliciosa as watered.
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Watered"
                variant={wateredButtonPressed ? "primary" : "outline"}
                onPress={handleWatered}
                style={styles.modalBtn}
              />
              <Button
                title="Close"
                variant={closeButtonPressed ? "primary" : "outline"}
                onPress={handleClose}
                style={styles.modalBtn}
              />
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
    elevation: 2,
  },
  headerTitle: {
    color: "#111827",
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
    elevation: 3,
  },
  cardTitle: {
    color: "#5a9a7a",
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
    elevation: 8,
  },
  modalTitle: {
    color: "#1a1a1a",
    marginBottom: 12,
  },
  modalText: {
    color: "#333",
    marginBottom: 24,
    lineHeight: 20,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtn: {
    flex: 1,
  }
});

export default AddTasksScreen;
