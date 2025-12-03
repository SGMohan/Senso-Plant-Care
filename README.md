# Senso Plant Care App - Navigation Flow Documentation

## Overview
This document outlines all navigation flows in the Senso Plant Care React Native application for backend implementation reference.

## Navigation Structure

### 1. Dashboard (`/dashboard`)
**Entry Point**: Main app screen
**Navigation From**: 
- App launch (default route)
- Sensodone page (after device setup completion)

**Navigation To**:
- `/notifications` - Via notification bell icon (top-left)
- `/connectdevice` - Via plus button in bottom navigation
- `/instruction` - Via plant card tap (any plant card)

**Backend Integration Notes**:
- Load user's plants from API
- Fetch real-time sensor data
- Display task notifications
- Handle plant care reminders

---

### 2. Notifications (`/notifications`)
**Entry Point**: Notification management screen
**Navigation From**: 
- Dashboard notification bell icon

**Navigation To**:
- Back to previous screen via back button

**Backend Integration Notes**:
- Fetch user notifications from API
- Mark notifications as read
- Delete notifications
- Handle notification actions

---

### 3. Connect Device Flow

#### 3.1 Connect Device (`/connectdevice`)
**Entry Point**: Device setup initiation
**Navigation From**: 
- Dashboard plus button

**Navigation To**:
- `/wifiselect` - Via "Ready to Connect" button

**Backend Integration Notes**:
- Scan for available Senso devices
- Check device compatibility
- Initiate device pairing process

#### 3.2 WiFi Select (`/wifiselect`)
**Entry Point**: WiFi network selection
**Navigation From**: 
- Connect Device page

**Navigation To**:
- `/sensoconnect` - Via "Next Step" button
- Back to Connect Device via back navigation

**Backend Integration Notes**:
- Scan available WiFi networks
- Validate WiFi credentials
- Store network configuration
- Handle connection errors

#### 3.3 Senso Connect (`/sensoconnect`)
**Entry Point**: Device connection process
**Navigation From**: 
- WiFi Select page

**Navigation To**:
- `/sensodone` - Automatic navigation after 3 seconds
- Back to WiFi Select via close button

**Backend Integration Notes**:
- Establish WiFi connection with device
- Authenticate with Senso device
- Configure device settings
- Monitor connection progress
- Handle connection failures

#### 3.4 Senso Done (`/sensodone`)
**Entry Point**: Setup completion confirmation
**Navigation From**: 
- Senso Connect page (automatic)

**Navigation To**:
- `/dashboard` - Via "Done" button

**Backend Integration Notes**:
- Register device to user account
- Sync initial plant data
- Backup device configuration
- Start monitoring services
- Track setup completion analytics

---

### 4. Instruction (`/instruction`)
**Entry Point**: Plant care instructions
**Navigation From**: 
- Dashboard plant card tap

**Navigation To**:
- Back to Dashboard via back button

**Backend Integration Notes**:
- Fetch plant details by ID
- Load specific care instructions
- Support multiple instruction types (watering, fertilizing, etc.)
- Track instruction views

---

## Navigation Parameters

### Current Implementation
All navigation currently uses simple `router.push('/route')` without parameters.

### Backend Integration Requirements

#### Plant Card → Instruction
```typescript
// TODO: Pass plant data as parameters
router.push({
  pathname: '/instruction',
  params: {
    plantId: plant.id,
    plantName: plant.name,
    instructionType: 'watering' // or 'fertilizing', 'repotting', etc.
  }
});
```

#### Device Setup Flow
```typescript
// TODO: Pass device and network data through setup flow
router.push({
  pathname: '/sensoconnect',
  params: {
    deviceId: selectedDevice.id,
    wifiSSID: selectedNetwork.ssid,
    wifiPassword: enteredPassword
  }
});
```

---

## Backend Service Integration Points

### 1. Dashboard Services
- `PlantService.getUserPlants()`
- `SensorService.getRealTimeData()`
- `TaskService.getTodaysTasks()`
- `NotificationService.getUnreadCount()`

### 2. Device Setup Services
- `DeviceService.scanForDevices()`
- `WiFiService.scanNetworks()`
- `DeviceService.connectToDevice()`
- `DeviceService.registerDevice()`

### 3. Instruction Services
- `PlantService.getPlantDetails(plantId)`
- `InstructionService.getInstructions(plantId, type)`
- `AnalyticsService.trackInstructionView()`

### 4. Notification Services
- `NotificationService.getNotifications()`
- `NotificationService.markAsRead()`
- `NotificationService.deleteNotification()`

---

## Error Handling & Navigation

### Connection Failures
- WiFi connection fails → Stay on `/wifiselect` with error message
- Device connection fails → Stay on `/sensoconnect` with retry option
- Setup incomplete → Prevent navigation from `/sensodone`

### Network Issues
- API failures → Show error states on current screen
- Offline mode → Use cached data where possible
- Retry mechanisms → Implement exponential backoff

---

## Deep Linking Support

### Future Implementation
```typescript
// Plant instruction deep link
senso://instruction?plantId=123&type=watering

// Device setup deep link
senso://setup?deviceId=abc123

// Notification deep link
senso://notification?id=456
```

---

## Testing Navigation

### Current Test Flow
1. Start at Dashboard
2. Tap plant card → Instruction page
3. Tap plus button → Connect Device flow
4. Complete setup flow → Return to Dashboard
5. Tap notification bell → Notifications page

### Backend Testing Requirements
- Mock API responses for all services
- Test offline scenarios
- Validate parameter passing
- Test error state navigation
- Verify deep link handling

---

## Notes for Backend Implementation

1. **State Management**: Consider using React Query or similar for API state management
2. **Authentication**: Add user authentication before accessing any screens
3. **Caching**: Implement proper caching for plant data and instructions
4. **Real-time Updates**: Use WebSocket connections for live sensor data
5. **Push Notifications**: Integrate with notification services for care reminders
6. **Analytics**: Track user navigation patterns and feature usage
7. **Error Boundaries**: Implement error boundaries for graceful failure handling
8. **Loading States**: Add loading indicators for all API calls
9. **Offline Support**: Cache critical data for offline functionality
10. **Security**: Validate all navigation parameters and API inputs