/**
 * NotificationCard Component
 * Displays individual notification with actions and backend integration
 */
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// ============================================================================
// BACKEND INTEGRATION TYPES
// ============================================================================
// TODO: Import from shared types when backend is implemented
// import { NotificationType, NotificationPriority } from '../types/notification';
// ============================================================================

interface NotificationCardProps {
  notification: {
    id: number;
    title: string;
    message: string;
    plantName: string;
    time: string;
    priority: "high" | "medium" | "normal" | "low" | "info";
    read: boolean;
    icon: ImageSourcePropType;
    iconColor: string;
    // TODO: Add backend fields when implemented
    // type: NotificationType;
    // plantId?: string;
    // actionUrl?: string;
    // metadata?: Record<string, any>;
    // createdAt: string;
    // updatedAt: string;
  };
  onPress: (notificationId: string) => void;
  // TODO: Add optional delete handler when backend supports it
  onDelete?: (notificationId: string) => void;
  // TODO: Add optional long press handler for context menu
  onLongPress?: (notificationId: string) => void;
}

export default function NotificationCard({
  notification,
  onPress,
  onDelete,
  onLongPress,
}: NotificationCardProps) {
  // ============================================================================
  // BACKEND INTEGRATION HANDLERS
  // ============================================================================

  // Handle notification press with analytics
  const handlePress = () => {
    // TODO: Track notification interaction analytics
    // AnalyticsService.trackNotificationClick(notification.id, notification.type);

    onPress(notification.id.toString());
  };

  // Handle long press for context menu
  const handleLongPress = () => {
    // TODO: Show context menu with options (mark as read, delete, etc.)
    if (onLongPress) {
      onLongPress(notification.id.toString());
    }
  };

  // Handle delete action
  const handleDelete = () => {
    if (onDelete) {
      onDelete(notification.id.toString());
    }
  };

  // TODO: Format time with proper localization
  const formatTime = (timeString: string) => {
    // TODO: Use proper date formatting library (date-fns, moment, etc.)
    // return formatDistanceToNow(new Date(timeString), { addSuffix: true });
    return timeString;
  };

  // TODO: Get notification type icon based on type
  const getNotificationTypeIcon = () => {
    // TODO: Map notification types to appropriate icons
    // switch (notification.type) {
    //   case 'water_reminder': return 'water-outline';
    //   case 'fertilizer_reminder': return 'leaf-outline';
    //   case 'light_warning': return 'sunny-outline';
    //   case 'plant_health': return 'medical-outline';
    //   default: return 'notifications-outline';
    // }
    return "notifications-outline";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444";
      case "medium":
        return "#f59e0b";
      case "normal":
        return "#3b82f6";
      case "low":
      case "info":
        return "#22c55e";
      default:
        return "#6b8a7a";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.notificationCard, !notification.read && styles.unreadCard]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
    >
      {/* Priority Badge - Top Right */}
      <View
        style={[
          styles.priorityBadge,
          {
            backgroundColor: getPriorityColor(notification.priority),
          },
        ]}
      >
        <Text style={styles.priorityText}>!</Text>
      </View>

      <View style={styles.notificationContent}>
        {/* Icon Container - Left Side */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: notification.iconColor + "20" },
          ]}
        >
          <Image
            source={notification.icon}
            style={styles.iconImage}
            resizeMode="cover"
          />
        </View>

        {/* Content - Right Side */}
        <View style={styles.notificationInfo}>
          <Text style={styles.notificationTitle}>{notification.title}</Text>
          <Text style={styles.notificationMessage}>{notification.message}</Text>
          <View style={styles.footer}>
            <Text style={styles.plantName}>{notification.plantName}</Text>
            <Text style={styles.notificationTime}>
              {formatTime(notification.time)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  notificationCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    position: "relative",
  },
  unreadCard: {
    backgroundColor: "#fefefe",
  },
  notificationContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: 70,
    height: 70,
    borderRadius: 16,
  },
  notificationInfo: {
    flex: 1,
    gap: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
    fontFamily: "Inter",
  },
  notificationMessage: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b7280",
    lineHeight: 20,
    marginBottom: 6,
    fontFamily: "Inter",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  plantName: {
    fontSize: 13,
    color: "#4AA88B",
    fontWeight: "500",
    fontFamily: "Inter",
  },
  notificationTime: {
    fontSize: 13,
    color: "#9ca3af",
    fontFamily: "Inter",
  },
  priorityBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  priorityText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Inter",
  },
});
