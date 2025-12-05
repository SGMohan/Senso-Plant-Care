/**
 * Notifications Screen
 * Displays user notifications with real-time updates and management capabilities
 */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { notifications } from "../assets";
import NotificationCard from "../components/NotificationCard";

// ============================================================================
// BACKEND INTEGRATION STRUCTURE
// ============================================================================
// TODO: Replace with actual API service imports
// import { NotificationApiService } from '../services/notificationService';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useAuth } from '../contexts/AuthContext';
// import { usePushNotifications } from '../hooks/usePushNotifications';
// ============================================================================

/**
 * Notification API Service - To be implemented with backend
 */
const NotificationApiService = {
  // Fetch all notifications for user
  fetchNotifications: async (userId: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/notifications/${userId}`, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // }).then(res => res.json());
    return notifications; // Using static data for now
  },

  // Mark notification as read
  markAsRead: async (notificationId: string, userId: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/notifications/${notificationId}/read`, {
    //   method: 'PATCH',
    //   headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, readAt: new Date() })
    // });
    return Promise.resolve();
  },

  // Delete notification
  deleteNotification: async (notificationId: string, userId: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/notifications/${notificationId}`, {
    //   method: 'DELETE',
    //   headers: { 'Authorization': `Bearer ${token}` },
    //   body: JSON.stringify({ userId })
    // });
    return Promise.resolve();
  },

  // Mark all notifications as read
  markAllAsRead: async (userId: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/notifications/mark-all-read`, {
    //   method: 'PATCH',
    //   headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId })
    // });
    return Promise.resolve();
  },

  // Get notification settings
  getNotificationSettings: async (userId: string) => {
    // TODO: Replace with actual API endpoint
    // return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/${userId}/notification-settings`)
    //   .then(res => res.json());
    return { pushEnabled: true, emailEnabled: false, smsEnabled: false };
  },
};

/**
 * Custom Hooks for Backend Integration
 */
const useNotifications = (userId: string) => {
  // TODO: Implement real-time notification fetching
  // const queryClient = useQueryClient();
  // const { data: notifications, isLoading, error, refetch } = useQuery({
  //   queryKey: ['notifications', userId],
  //   queryFn: () => NotificationApiService.fetchNotifications(userId),
  //   refetchInterval: 30000, // Refetch every 30 seconds
  //   staleTime: 10000 // Consider data stale after 10 seconds
  // });
  
  return {
    notifications,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
    markAsReadMutation: { mutate: () => {} },
    deleteNotificationMutation: { mutate: () => {} }
  };
};

export default function NotificationsScreen() {
  // ============================================================================
  // BACKEND DATA INTEGRATION
  // ============================================================================
  // TODO: Get user ID from authentication context
  // const { user } = useAuth();
  // const userId = user?.id || '';
  const userId = 'user123'; // Static for now
  
  // TODO: Replace with real backend hooks
  // const { notifications, isLoading, error, refetch, markAsReadMutation, deleteNotificationMutation } = useNotifications(userId);
  
  // Local state for development
  const [notificationList, setNotificationList] = useState(notifications);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // ============================================================================
  // BACKEND OPERATION HANDLERS
  // ============================================================================
  
  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // TODO: Implement real refresh
      // await refetch();
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Error refreshing notifications:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);
  
  // Handle notification press (mark as read)
  const handleNotificationPress = async (notificationId: string) => {
    try {
      // TODO: Implement with backend
      // await markAsReadMutation.mutateAsync({ notificationId });
      await NotificationApiService.markAsRead(notificationId, userId);
      
      // Update local state for now
      setNotificationList(prev => 
        prev.map(notif => 
          notif.id.toString() === notificationId 
            ? { ...notif, read: true }
            : notif
        )
      );
      
      // TODO: Navigate to relevant screen based on notification type
      // if (notification.type === 'plant_care') {
      //   router.push(`/plant/${notification.plantId}`);
      // }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      Alert.alert('Error', 'Failed to update notification');
    }
  };
  
  // Handle notification deletion
  const handleDeleteNotification = async (notificationId: string) => {
    try {
      Alert.alert(
        'Delete Notification',
        'Are you sure you want to delete this notification?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              // TODO: Implement with backend
              // await deleteNotificationMutation.mutateAsync({ notificationId });
              await NotificationApiService.deleteNotification(notificationId, userId);
              
              // Update local state for now
              setNotificationList(prev => 
                prev.filter(notif => notif.id.toString() !== notificationId)
              );
            }
          }
        ]
      );
    } catch (error) {
      console.error('Error deleting notification:', error);
      Alert.alert('Error', 'Failed to delete notification');
    }
  };
  
  // Handle mark all as read
  const handleMarkAllAsRead = async () => {
    try {
      // TODO: Implement with backend
      // await NotificationApiService.markAllAsRead(userId);
      
      setNotificationList(prev => 
        prev.map(notif => ({ ...notif, read: true }))
      );
    } catch (error) {
      console.error('Error marking all as read:', error);
      Alert.alert('Error', 'Failed to mark all notifications as read');
    }
  };
  
  // Handle navigation back
  const handleBackPress = () => {
    // TODO: Track analytics
    // AnalyticsService.trackScreenExit('notifications');
    router.back();
  };
  
  // Handle notification settings
  const handleNotificationSettings = () => {
    // TODO: Navigate to notification settings
    // router.push('/settings/notifications');
    Alert.alert('Settings', 'Notification settings coming soon!');
  };
  
  // ============================================================================
  // LIFECYCLE & EFFECTS
  // ============================================================================
  
  useEffect(() => {
    // TODO: Set up real-time notification listeners
    // const unsubscribe = NotificationService.onNotificationReceived((notification) => {
    //   setNotificationList(prev => [notification, ...prev]);
    // });
    // 
    // return () => unsubscribe();
  }, []);
  
  // TODO: Handle push notification permissions
  useEffect(() => {
    // const requestPermissions = async () => {
    //   const { status } = await Notifications.requestPermissionsAsync();
    //   if (status !== 'granted') {
    //     Alert.alert('Permission needed', 'Please enable notifications to receive plant care reminders.');
    //   }
    // };
    // requestPermissions();
  }, []);
  
  // Get unread count for badge
  const unreadCount = notificationList.filter(n => !n.read).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#22c55e']}
            tintColor={'#22c55e'}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Ionicons name="chevron-back" size={28} color="#6b7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={handleNotificationSettings}>
            <Ionicons name="notifications-outline" size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>


        {/* Notifications List */}
        <View style={styles.notificationsList}>
          {isLoading ? (
            <View style={styles.loadingState}>
              <Text style={styles.loadingText}>Loading notifications...</Text>
            </View>
          ) : notificationList.length > 0 ? (
            notificationList.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={{
                  ...notification,
                  priority: notification.priority as "normal" | "medium" | "high" | "low" | "info"
                }}
                onPress={handleNotificationPress}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons
                name="notifications-off-outline"
                size={64}
                color="#9ca3af"
              />
              <Text style={styles.emptyTitle}>No notifications</Text>
              <Text style={styles.emptyMessage}>
                You're all caught up! We'll notify you when there's something new.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: "#f9fafb",
  },
  backButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    fontFamily: "Inter",
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationsList: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 20,
  },
  loadingState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
    fontFamily: "Inter",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1a3c2a",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "Inter",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#6b8a7a",
    textAlign: "center",
    lineHeight: 24,
    fontFamily: "Inter",
  },
});