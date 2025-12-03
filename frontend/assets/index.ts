// ============================================================================
// ASSETS INDEX - CENTRALIZED DATA MANAGEMENT
// ============================================================================
// This file contains all dummy/sample data used across the application
// TODO: Replace with real API calls when backend is implemented
// ============================================================================

// Plant images - Used in dashboard plant cards and task cards
export const plantImages = {
  plant1: require('./plant_1.png'),
  plant2: require('./plant_2.png'),
  plantProfile: require('./plant_profile_sample_image.png'),
  smallPot: require('./small_pot.png'),
  mediumPot: require('./medium_pot.png'),
  largePot: require('./large_pot.png'),
  recommendPlant: require('./recommend_plant.png'),
  bigPlant: require('./big_plant.png'),
};

// Connect images - Used in device connection page
export const connectImage1 = require('./connect_image_1.png');

// Notification images - Used in notification cards
export const notificationImages = {
  waterAlert: require('./water_alert_icon.png'),
  sunlightAlert: require('./sunlight_alert_icon.png'),
  waterIcon: require('./water_icon.png'),
  fertilizeIcon: require('./fertilizer_icon.png'),
  notifyIcon: require('./notify_icon.png'),
};

// Plants data - Used in: app/dashboard/index.tsx
// Displays plant cards with metrics, status, and device connection info
export const plants = [
  {
    id: 1,
    name: "Little Ben",
    type: "Monstera Deliciosa",
    moisture: 80,
    temperature: 18,
    distance: "0.2 DU",
    status: "healthy",
    connected: true,
    image: plantImages.plant1,
  },
  {
    id: 2,
    name: "Little Ben",
    type: "Monstera Deliciosa",
    moisture: 65,
    temperature: 20,
    distance: "0.5 DU",
    status: "waiting",
    connected: false,
    image: plantImages.plant2,
  },
  {
    id: 3,
    name: "Green Buddy",
    type: "Snake Plant",
    moisture: 45,
    temperature: 22,
    distance: "0.8 DU",
    status: "healthy",
    connected: true,
    image: plantImages.plant1,
  },
];

// Tasks data - Used in: app/dashboard/index.tsx
// Displays "Today's Tasks" horizontal scroll cards
export const tasks = [
  { id: 1, title: "Water Monstera", time: "Today 4:00 PM", image: plantImages.plant1 },
  { id: 2, title: "Water Monstera", time: "Today 4:00 PM", image: plantImages.plant2 },
  { id: 3, title: "Check Snake Plant", time: "Today 6:00 PM", image: plantImages.plant1 },
];

// Notifications data - Used in: app/notifications.tsx
// Displays notification cards with priority indicators and alert icons
export const notifications = [
  {
    id: 1,
    title: "Watering Overdue!",
    message: "Your basil plant needs water now",
    time: "30 min ago",
    type: "water",
    priority: "high",
    plantName: "Basil Plant",
    icon: notificationImages.waterAlert,
    iconColor: "#ef4444",
    read: false,
  },
  {
    id: 2,
    title: "Low Light Warning",
    message: "Tomato plant receiving insufficient sunlight",
    time: "1 hour ago",
    type: "light",
    priority: "medium",
    plantName: "Tomato Plant",
    icon: notificationImages.sunlightAlert,
    iconColor: "#fb923c",
    read: false,
  },
  {
    id: 3,
    title: "Watering Reminder",
    message: "Your succulent needs water today",
    time: "2 hours ago",
    type: "water",
    priority: "normal",
    plantName: "Succulent",
    icon: notificationImages.waterIcon,
    iconColor: "#60a5fa",
    read: false,
  },
  {
    id: 4,
    title: "Fertilizer Time",
    message: "Fertilize your fern plant",
    time: "4 hours ago",
    type: "fertilizer",
    priority: "low",
    plantName: "Fern Plant",
    icon: notificationImages.fertilizeIcon,
    iconColor: "#4ade80",
    read: true,
  },
  {
    id: 5,
    title: "Growth Update",
    message: "Your snake plant has new leaves",
    time: "6 hours ago",
    type: "success",
    priority: "info",
    plantName: "Snake Plant",
    icon: notificationImages.notifyIcon,
    iconColor: "#4ade80",
    read: true,
  },
];

// WiFi networks data - Used in: app/wifiselect.tsx
// Displays available WiFi networks for device connection
export const wifiNetworks = [
  { ssid: "Home_WiFi_5G", signal: 95, secured: true, connected: false },
  { ssid: "Home_WiFi_2.4G", signal: 88, secured: true, connected: true },
  { ssid: "Guest_Network", signal: 72, secured: false, connected: false },
  { ssid: "Neighbor_WiFi", signal: 45, secured: true, connected: false },
  { ssid: "Office_Network", signal: 38, secured: true, connected: false },
];

// Plant instruction data - Used in: app/instruction.tsx
// Plant details and care instructions for instruction page
export const instructionPlantData = {
  name: "Watered Little Ben",
  botanicalName: "Monstera Deliciosa",
};

// Care instructions data - Used in: app/instruction.tsx
// Step-by-step plant care instructions with icons
export const careInstructions = [
  {
    id: 1,
    icon: "water-outline",
    title: "Check Soil Moisture",
    description: "Water only when the top inch of soil feels dry to the touch.",
  },
  {
    id: 2,
    icon: "water",
    title: "Water When Dry",
    description: "Thoroughly water until excess water drains out from the bottom.",
  },
  {
    id: 3,
    icon: "thermometer",
    title: "Use Room Temperature Water",
    description: "Avoid using cold water to prevent shock to the roots.",
  },
  {
    id: 4,
    icon: "checkmark-circle",
    title: "Drain Excess Water",
    description: "Ensure no water is left standing in the saucer or pot.",
  },
];

// Pot sizes data - Used in: app/potsize.tsx
// Pot size options for plant setup with measurements and images
export const potSizes = [
  {
    id: 0,
    name: "Small",
    measurement: "(4-8inches)",
    image: plantImages.smallPot,
  },
  {
    id: 1,
    name: "Medium",
    measurement: "(8-10inches)",
    image: plantImages.mediumPot,
  },
  {
    id: 2,
    name: "Large",
    measurement: "(12-15inches)",
    image: plantImages.largePot,
  },
];

// ============================================================================
// USAGE SUMMARY:
// - plantImages: Referenced in plants, tasks, and notification components
// - plants: Dashboard plant cards with sensor metrics and connection status
// - tasks: Dashboard "Today's Tasks" section with plant care reminders
// - notifications: Notifications page with alert cards and priority badges
// - wifiNetworks: WiFi selection page for device connection setup
// - instructionPlantData: Plant details for instruction page header
// - careInstructions: Step-by-step care instructions with icons and descriptions
// - potSizes: Pot size selection options for plant setup with measurements
// ============================================================================