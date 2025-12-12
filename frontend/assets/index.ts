// ============================================================================
// ASSETS INDEX - CENTRALIZED DATA MANAGEMENT
// ============================================================================
// This file contains all dummy/sample data used across the application
// TODO: Replace with real API calls when backend is implemented
// ============================================================================

// Plant images - Used in dashboard plant cards and task cards
export const plantImages = {
  plant1: require("./plant_1.png"),
  plant2: require("./plant_2.png"),
  plantProfile: require("./plant_profile_sample_image.png"),
  smallPot: require("./small_pot.png"),
  mediumPot: require("./medium_pot.png"),
  largePot: require("./large_pot.png"),
  recommendPlant: require("./recommend_plant.png"),
  bigPlant: require("./big_plant.png"),
};

// My Plants images - Used in myplants screen dummy data
export const myPlantImages = {
  myplant1: require("./myplant_1.png"),
  myplant2: require("./myplant_2.png"),
  myplant3: require("./myplant_3.png"),
  myplant4: require("./myplant_4.png"),
  myplant5: require("./myplant_5.png"),
};

// Soil images - Used in soil type selection screen
export const soilImages = {
  soil1: require('./soil_1.png'),
  soil2: require('./soil_2.png'),
  soil3: require('./soil_3.png'),
  soil4: require('./soil_4.png'),
  soil5: require('./soil_5.png'),
};

// Connect images - Used in device connection page
export const connectImage1 = require('./connect_image_1.png');

// Device pairing images - Used in device selection
export const deviceImages = {
  sensoPair: require('./senso_pair.png'),
  miniSensoPair: require('./mini_senos_pair.png'),
};

// Info images - Used in plant info status cards
export const infoImages = {
  info1: require('./info_1.png'),
  info2: require('./info_2.png'),
  info3: require('./info_3.png'),
};

// UI icons - Used in various screens
export const uiIcons = {
  shareIcon: require('./share_icon.png'),
};

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

// My Plants by location - Used in: app/myplants.tsx
// Dummy data for user's plants grouped by location
export const myPlantsByLocation = {
  LivingRoom: [
    {
      id: 1,
      name: "Monstera",
      type: "Deliciosa",
      location: "Living Room",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant1,
    },
    {
      id: 2,
      name: "Fiddle",
      type: "Leaf Fig",
      location: "Living Room",
      needsWater: false,
      health: "excellent",
      image: myPlantImages.myplant2,
    },
    {
      id: 3,
      name: "Snake Plant",
      type: "Laurentii",
      location: "Living Room",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant3,
    },
    {
      id: 4,
      name: "Pelia",
      type: "Peperomia",
      location: "Living Room",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant4,
    },
    {
      id: 5,
      name: "Fiddle",
      type: "Leaf Fig",
      location: "Living Room",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant5,
    }
  ],
  Balcony: [
        {
      id: 6,
      name: "Monstera",
      type: "Deliciosa",
      location: "Balcony",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant1,
    },
    {
      id: 7,
      name: "Fiddle",
      type: "Leaf Fig",
      location: "Balcony",
      needsWater: false,
      health: "excellent",
      image: myPlantImages.myplant2,
    },
    {
      id: 8,
      name: "Snake Plant",
      type: "Laurentii",
      location: "Balcony",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant3,
    },
    {
      id: 9,
      name: "Pelia",
      type: "Peperomia",
      location: "Balcony",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant3,
    },
    {
      id: 10,
      name: "Fiddle",
      type: "Leaf Fig",
      location: "Balcony",
      needsWater: true,
      health: "good",
      image: myPlantImages.myplant4,
    },
  ],
};

// Tasks data - Used in: app/dashboard/index.tsx
// Displays "Today's Tasks" horizontal scroll cards
export const tasks = [
  { id: 1, title: "Water Monstera", time: "Today 4:00 PM", image: plantImages.plant1 },
  { id: 2, title: "Water Monstera", time: "Today 4:00 PM", image: plantImages.plant2 },
  { id: 3, title: "Check Snake Plant", time: "Today 6:00 PM", image: plantImages.plant1 },
];

// Task types data - Used in: app/index.tsx (tasks page)
// Displays available task types for plant care
export const taskTypes = [
  { id: 1, name: 'Water', icon: infoImages.info1 },
  { id: 2, name: 'Mist', icon: infoImages.info1 },
  { id: 3, name: 'Clean', icon: infoImages.info1 },
  { id: 4, name: 'Repot', icon: infoImages.info1 },
  { id: 5, name: 'Add fertilizer', icon: infoImages.info1 },
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

// Soil types data - Used in: app/soiltype.tsx
// Soil type options for plant setup with descriptions and images
export const soilTypes = [
  {
    id: "potting-mix",
    name: "Potting Mix",
    description: "Ideal for most houseplants, retains moisture",
    image: soilImages.soil1,
  },
  {
    id: "cactus-mix",
    name: "Cactus Mix",
    description: "Excellent drainage, low nutrients",
    image: soilImages.soil2,
  },
  {
    id: "peat-moss",
    name: "Peat Moss",
    description: "Improves aeration, retains water",
    image: soilImages.soil3,
  },
  {
    id: "perlite-mix",
    name: "Perlite Mix",
    description: "Enhances drainage, lightweight",
    image: soilImages.soil4,
  },
  {
    id: "orchid-bark",
    name: "Orchid Bark",
    description: "Aeration, prevents waterlogging",
    image: soilImages.soil5,
  },
];

// Plant info data - Used in: app/plantinfo.tsx
// Plant details and status cards for plant information screen
export const plantInfoData = {
  name: "Monstera Deliciosa",
  botanicalName: "Monstera Deliciosa",
};

// Plant info status cards - Used in: app/plantinfo.tsx
// Status cards displaying plant metrics with icons or images
export const plantInfoStatusCards = [
  {
    id: "humidity",
    icon: "water",
    iconColor: "#3B82F6",
    value: "80%",
    bgColor: "#F0FDF4",
  },
  {
    id: "temp",
    icon: "thermometer",
    iconColor: "#EF4444",
    value: "18°C",
    bgColor: "#F0FDF4",
  },
  {
    id: "dli",
    icon: "sunny",
    iconColor: "#F59E0B",
    value: "0.2 DLI",
    bgColor: "#F0FDF4",
  },
  {
    id: "watering",
    image: infoImages.info1,
    value: "Every 7 days",
    bgColor: "#F0FDF4",
    label: "Every",
    sublabel: "7 days",
  },
  {
    id: "light",
    image: infoImages.info2,
    value: "Indirect light",
    bgColor: "#F0FDF4",
    label: "Indirect",
    sublabel: "light",
  },
  {
    id: "range",
    image: infoImages.info3,
    value: "18-27°C",
    bgColor: "#F0FDF4",
  },
];

// ============================================================================
// USAGE SUMMARY:
// - plantImages: Referenced in plants, tasks, and notification components
// - soilImages: Soil type images used in soil selection screen
// - infoImages: Info images used in plant info status cards
// - plants: Dashboard plant cards with sensor metrics and connection status
// - tasks: Dashboard "Today's Tasks" section with plant care reminders
// - notifications: Notifications page with alert cards and priority badges
// - wifiNetworks: WiFi selection page for device connection setup
// - instructionPlantData: Plant details for instruction page header
// - careInstructions: Step-by-step care instructions with icons and descriptions
// - potSizes: Pot size selection options for plant setup with measurements
// - soilTypes: Soil type selection options for plant setup with descriptions
// - plantInfoData: Plant details for plant info screen (name, botanicalName)
// - plantInfoStatusCards: Status cards for plant info screen with metrics
// ============================================================================