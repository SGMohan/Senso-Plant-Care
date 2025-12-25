// SelectDeviceScreen.tsx
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { deviceImages } from "../../assets/images"; // Fixed path
import Text from "../../components/ui/Text";

const { width } = Dimensions.get("window");

const SelectDeviceScreen: React.FC = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);

  const handleClose = () => {
    router.back();
  };

  const handleDeviceSelect = (deviceName: string) => {
    setSelected(deviceName);
    console.log(`Selected device: ${deviceName}`);
    // router.push(`/devices/pairing/${deviceName}`);
  };

  return (
    <LinearGradient colors={["#EAF3EC", "#EEF6EF"]} style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#EAF3EC" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerWrap}>
          <Text weight="semibold" style={styles.headerTitle}>Select device to pair</Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
            activeOpacity={0.8}
            accessibilityLabel="close"
          >
            <Ionicons name="close" size={20} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Devices row */}
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleDeviceSelect("Mini Senso")}
            style={[
              styles.deviceCard,
              selected === "Mini Senso" && styles.deviceCardSelected,
            ]}
          >
            <View style={styles.innerWrap}>
              <View style={styles.imgBoxMini}>
                {(() => {
                  const MiniIcon = deviceImages.miniSensoPair as any;
                  return <MiniIcon width={240} height={140} />;
                })()}
              </View>
            </View>

            <View style={styles.nameWrap}>
              <Text weight="semibold" style={styles.deviceName}>Mini Senso</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => handleDeviceSelect("Senso 1")}
            style={[
              styles.deviceCard,
              selected === "Senso 1" && styles.deviceCardSelected,
            ]}
          >
            <View style={styles.innerWrap}>
              <View style={styles.imgBox}>
                {(() => {
                  const SensoIcon = deviceImages.sensoPair as any;
                  return <SensoIcon width={100} height={100} />;
                })()}
              </View>
            </View>

            <View style={styles.nameWrap}>
              <Text weight="semibold" style={styles.deviceName}>Senso 1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const CARD_GAP = 16;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2; // 20px horizontal padding each side, gap between cards

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },

  /* Header */
  headerWrap: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 16,
  },
  closeButton: {
    position: "absolute",
    right: 18,
    top: 14,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },

  /* Row for two cards */
  row: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: CARD_GAP,
    marginTop: 8,
  },

  /* Card */
  deviceCard: {
    width: CARD_WIDTH,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  deviceCardSelected: {
    borderWidth: 2,
    borderColor: "#2d5a3d",
    backgroundColor: "#f0f9f4",
    elevation: 5,
  },

  innerWrap: {
    paddingTop: 20,
    paddingBottom: 6,
    paddingHorizontal: 14,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  imgBox: {
    width: 140,
    height: 140,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
    elevation: 2,
  },

  imgBoxMini: {
    width: 140,
    height: 140,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    overflow: "hidden",
    elevation: 2,
  },

  nameWrap: {
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  deviceName: {
    fontSize: 13,
    color: "#374151",
    textAlign: "center",
  },
});

export default SelectDeviceScreen;
