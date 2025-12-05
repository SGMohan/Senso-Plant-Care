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

## AI Integration & Backend Implementation

### AI Services Integration

#### 1. Gemini AI Integration
**Purpose**: AI-powered plant care recommendations and analysis
**Implementation**: 
- Plant health assessment
- Personalized care recommendations
- Disease/pest identification
- Growth optimization suggestions

**Integration Points**:
```typescript
// AI Recommendation Service
class GeminiAIService {
  async getPlantRecommendations(plantData: PlantData): Promise<AIRecommendation>
  async analyzePlantHealth(imageUrl: string, sensorData: SensorData): Promise<HealthAnalysis>
  async identifyPlantDisease(imageUrl: string): Promise<DiseaseIdentification>
  async generateCareSchedule(plantType: string, environment: Environment): Promise<CareSchedule>
}
```

#### 2. Plant.ID API Integration
**Documentation**: https://documenter.getpostman.com/view/24599534/2s93z5A4v2
**Pricing**: https://web.plant.id/pricing/
**Authentication**: OAuth 2.0

**Key Features**:
- Plant species identification
- Disease and pest detection
- Plant health assessment
- Care recommendations

**API Endpoints**:
```typescript
// Plant Identification
POST /v3/identification
{
  "images": ["base64_encoded_image"],
  "similar_images": true,
  "plant_details": ["common_names", "url", "description", "taxonomy"]
}

// Health Assessment
POST /v3/health_assessment
{
  "images": ["base64_encoded_image"],
  "plant_details": ["common_names", "url", "description"],
  "disease_details": ["common_names", "url", "description"]
}
```

**Service Implementation**:
```typescript
class PlantIDService {
  private apiKey: string;
  private baseUrl = 'https://api.plant.id/v3';
  
  async identifyPlant(imageBase64: string): Promise<PlantIdentification>
  async assessPlantHealth(imageBase64: string): Promise<HealthAssessment>
  async detectDisease(imageBase64: string): Promise<DiseaseDetection>
}
```

---

### Backend Architecture

#### 1. API Structure
```
/api
  /auth
    POST /login
    POST /register
    POST /refresh
    POST /logout
  /plants
    GET /plants
    POST /plants
    GET /plants/:id
    PUT /plants/:id
    DELETE /plants/:id
    POST /plants/:id/identify
    POST /plants/:id/health-check
  /devices
    GET /devices
    POST /devices/connect
    GET /devices/:id/data
    PUT /devices/:id/settings
  /ai
    POST /ai/recommendations
    POST /ai/analyze-image
    POST /ai/chat
  /notifications
    GET /notifications
    POST /notifications/mark-read
    DELETE /notifications/:id
```

#### 2. Database Schema
```sql
-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Plants
CREATE TABLE plants (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name VARCHAR NOT NULL,
  species VARCHAR,
  botanical_name VARCHAR,
  image_url VARCHAR,
  location VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Devices
CREATE TABLE devices (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  plant_id UUID REFERENCES plants(id),
  device_type VARCHAR NOT NULL,
  mac_address VARCHAR UNIQUE,
  wifi_ssid VARCHAR,
  status VARCHAR DEFAULT 'offline'
);

-- Sensor Data
CREATE TABLE sensor_readings (
  id UUID PRIMARY KEY,
  device_id UUID REFERENCES devices(id),
  temperature DECIMAL,
  humidity DECIMAL,
  soil_moisture DECIMAL,
  light_level DECIMAL,
  recorded_at TIMESTAMP DEFAULT NOW()
);

-- AI Recommendations
CREATE TABLE ai_recommendations (
  id UUID PRIMARY KEY,
  plant_id UUID REFERENCES plants(id),
  recommendation_type VARCHAR,
  content TEXT,
  confidence_score DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. Real-time Data Integration
```typescript
// WebSocket Service for Real-time Updates
class RealtimeService {
  private io: SocketIOServer;
  
  // Sensor data updates
  broadcastSensorData(deviceId: string, data: SensorData): void
  
  // Plant status updates
  broadcastPlantStatus(plantId: string, status: PlantStatus): void
  
  // AI recommendations
  broadcastAIRecommendation(userId: string, recommendation: AIRecommendation): void
}
```

---

### Data Migration Strategy

#### 1. Asset Management
**Current State**: Static images from `/assets` folder
**Target State**: Dynamic images from API responses

**Migration Plan**:
```typescript
// Before: Static asset usage
import { plantImages } from '../assets';
<Image source={plantImages.plant1} />

// After: Dynamic image loading
<Image source={{ uri: plant.imageUrl || defaultPlantImage }} />
```

#### 2. Data Source Transition
```typescript
// Phase 1: Hybrid approach (current dummy data + API)
const usePlantData = () => {
  const [plants, setPlants] = useState(dummyPlants);
  
  useEffect(() => {
    // Gradually replace with API calls
    if (API_ENABLED) {
      fetchPlantsFromAPI().then(setPlants);
    }
  }, []);
  
  return plants;
};

// Phase 2: Full API integration
const usePlantData = () => {
  return useQuery('plants', () => PlantService.getUserPlants());
};
```

---

### Environment Configuration

#### 1. Environment Variables
```env
# API Configuration
API_BASE_URL=https://api.sensoplantcare.com
PLANT_ID_API_KEY=your_plant_id_api_key
GEMINI_AI_API_KEY=your_gemini_api_key

# OAuth Configuration
OAUTH_CLIENT_ID=your_oauth_client_id
OAUTH_CLIENT_SECRET=your_oauth_client_secret
OAUTH_REDIRECT_URI=https://app.sensoplantcare.com/auth/callback

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/senso_db

# Redis (for caching)
REDIS_URL=redis://localhost:6379

# WebSocket
WS_PORT=3001
```

#### 2. Feature Flags
```typescript
const FeatureFlags = {
  AI_RECOMMENDATIONS: process.env.EXPO_PUBLIC_AI_ENABLED === 'true',
  PLANT_ID_INTEGRATION: process.env.EXPO_PUBLIC_PLANT_ID_ENABLED === 'true',
  REAL_TIME_SENSORS: process.env.EXPO_PUBLIC_REALTIME_ENABLED === 'true',
  OFFLINE_MODE: process.env.EXPO_PUBLIC_OFFLINE_ENABLED === 'true'
};
```

---

### Implementation Phases

#### Phase 1: Backend Foundation (Weeks 1-2)
- [ ] Set up Node.js/Express backend
- [ ] Implement authentication system
- [ ] Create database schema
- [ ] Basic CRUD operations for plants/devices

#### Phase 2: AI Integration (Weeks 3-4)
- [ ] Integrate Plant.ID API
- [ ] Implement Gemini AI service
- [ ] Create AI recommendation engine
- [ ] Add image processing pipeline

#### Phase 3: Real-time Features (Weeks 5-6)
- [ ] WebSocket implementation
- [ ] Sensor data streaming
- [ ] Push notifications
- [ ] Real-time plant monitoring

#### Phase 4: Frontend Integration (Weeks 7-8)
- [ ] Replace dummy data with API calls
- [ ] Implement loading states
- [ ] Add error handling
- [ ] Offline mode support

#### Phase 5: Testing & Optimization (Weeks 9-10)
- [ ] End-to-end testing
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

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
11. **AI Rate Limiting**: Implement proper rate limiting for AI API calls
12. **Image Optimization**: Compress and optimize images before API calls
13. **Data Privacy**: Ensure GDPR compliance for user data and images
14. **Cost Management**: Monitor AI API usage and implement cost controls