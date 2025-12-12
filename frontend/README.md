# Senso Plant Care App - Complete Documentation

## 🌱 Overview
Senso Plant Care is a comprehensive React Native application for smart plant monitoring and care management. The app integrates AI-powered plant identification, IoT sensor monitoring, and personalized care recommendations.

## 📱 Project Structure

### Frontend Architecture
```
frontend/
├── app/                    # Pages/Screens (Expo Router)
│   ├── index.tsx          # Entry point with auth routing
│   ├── welcome.tsx        # Onboarding screen
│   ├── login.tsx          # User authentication
│   ├── signup.tsx         # User registration
│   ├── dashboard.tsx      # Main dashboard
│   ├── notifications.tsx  # Notification management
│   ├── scanner.tsx        # AI plant identification
│   ├── nameplant.tsx      # Plant profile creation
│   ├── myplants.tsx       # Plant collection view
│   ├── plantinfo.tsx      # Individual plant management
│   ├── instruction.tsx    # Plant care instructions
│   ├── connectdevice.tsx  # Device pairing initiation
│   ├── wifiselect.tsx     # WiFi network selection
│   ├── sensoconnect.tsx   # Device connection process
│   └── sensodone.tsx      # Setup completion
├── components/            # Reusable UI Components
│   ├── BottomNavigation.tsx
│   ├── NotificationCard.tsx
│   ├── PlantCard.tsx
│   ├── RealTimeGraph.tsx
│   └── TaskCard.tsx
├── services/              # API Service Layer
│   ├── api.ts             # Base API configuration
│   ├── authService.ts     # Authentication services
│   ├── deviceService.ts   # Device management
│   └── wifiService.ts     # WiFi connectivity
├── context/               # State Management
│   └── AppContext.tsx     # Global app state & auth
├── assets/                # Static assets & images
└── constants/             # App constants & configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- React Native development environment

### Installation

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

3. **Run on device/simulator**
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Scan QR code with Expo Go app

## 🔧 Technology Stack

### Frontend Technologies
- **React Native**: Cross-platform mobile development
- **Expo SDK 54**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation
- **React Query**: Server state management
- **AsyncStorage**: Local data persistence
- **Expo Camera**: Camera functionality
- **Expo Image Picker**: Image selection
- **React Native Reanimated**: Smooth animations
- **React Native SVG**: Vector graphics

### Backend Integration Ready
- **Authentication**: JWT-based auth system
- **Real-time Data**: WebSocket connections
- **AI Integration**: Gemini AI & Plant.ID APIs
- **Device Management**: IoT sensor connectivity
- **Push Notifications**: Firebase/APNs support

## 📋 Features Implemented

### ✅ Core Features
- **User Authentication**: Login, signup, logout with backend integration
- **Plant Dashboard**: Overview of all user plants
- **AI Plant Identification**: Camera-based plant recognition (UI ready)
- **Plant Profile Management**: Create and manage plant profiles
- **Device Connection Flow**: Complete IoT device pairing workflow
- **Notifications System**: In-app notification management
- **Real-time Monitoring**: Sensor data visualization (UI ready)
- **Care Instructions**: Personalized plant care guidance

### ✅ Navigation Flows
- **Onboarding Flow**: Welcome → Login/Signup → Dashboard
- **Plant Addition**: Scanner → AI Identification → Profile Creation
- **Device Pairing**: Connect → WiFi Setup → Pairing → Completion
- **Plant Management**: Dashboard → Plant Details → Care Instructions

### ✅ UI/UX Components
- **Bottom Navigation**: Seamless app navigation
- **Plant Cards**: Interactive plant status display
- **Task Cards**: Care task management
- **Notification Cards**: Alert and reminder system
- **Real-time Graphs**: Sensor data visualization

## 🔐 Authentication System

### Current Status: ✅ **IMPLEMENTED**
The authentication system is fully integrated with the backend:

```typescript
// Authentication Context
const { user, login, logout, isAuthenticated, isLoading } = useAuth();

// Backend Endpoints
POST /api/auth/login     # User login
POST /api/auth/register  # User registration
POST /api/auth/logout    # User logout
```

### Features
- **JWT Token Management**: Secure token storage with AsyncStorage
- **Auto-login**: Persistent authentication state
- **Error Handling**: Comprehensive error management
- **Loading States**: Smooth user experience during auth operations

## 🤖 AI Integration Points

### Gemini AI Integration (Ready for Backend)
Strategic AI integration points throughout the application:

#### Scanner (`app/scanner.tsx`)
```typescript
// GEMINI AI INTEGRATION READY:
// - Plant species identification via Gemini Vision API
// - Disease detection and health assessment
// - Personalized care recommendations
// - Custom care schedules generation
```

#### Plant Management (`app/plantinfo.tsx`)
```typescript
// GEMINI AI INTEGRATION READY:
// - Real-time sensor data analysis
// - Predictive plant health insights
// - Growth optimization recommendations
// - Environmental condition analysis
```

### Plant.ID API Integration (Fallback)
- **Documentation**: https://documenter.getpostman.com/view/24599534/2s93z5A4v2
- **Purpose**: Backup identification when Gemini AI fails
- **Features**: Plant identification, health assessment, disease detection

## 📊 Backend Integration Status

### ✅ Implemented
- **Authentication System**: Complete JWT-based auth
- **API Client Setup**: Base HTTP client with interceptors
- **Error Handling**: Global error management
- **Token Management**: Secure storage and refresh

### 🔄 Ready for Implementation
- **Plant Management APIs**: CRUD operations for plants
- **Device Management**: IoT device connectivity
- **Sensor Data Streaming**: Real-time WebSocket connections
- **AI Services**: Gemini AI and Plant.ID integration
- **Push Notifications**: Firebase/APNs setup
- **Image Storage**: AWS S3 or similar service

## 🔌 Backend API Structure

### Authentication Endpoints
```typescript
POST /api/auth/login      # User authentication
POST /api/auth/register   # User registration
POST /api/auth/refresh    # Token refresh
POST /api/auth/logout     # User logout
GET  /api/auth/status     # Authentication status
```

### Plant Management (Ready)
```typescript
GET    /api/plants           # Get user plants
POST   /api/plants           # Create plant profile
PUT    /api/plants/:id       # Update plant info
DELETE /api/plants/:id       # Delete plant
POST   /api/plants/identify  # AI plant identification
GET    /api/plants/:id/data  # Get plant sensor data
```

### Device Management (Ready)
```typescript
GET  /api/devices              # Get user devices
POST /api/devices/scan         # Scan for devices
POST /api/devices/connect      # Connect device
GET  /api/devices/:id/status   # Device status
POST /api/devices/:id/settings # Update device settings
```

### AI Integration (Ready)
```typescript
POST /api/ai/gemini/identify        # Gemini plant identification
POST /api/ai/gemini/recommendations # Care recommendations
POST /api/ai/gemini/health-analysis # Health assessment
POST /api/ai/plantid/identify       # Plant.ID fallback
```

## 🌐 Environment Configuration

### Development Environment
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000
EXPO_PUBLIC_WS_URL=ws://localhost:3001
EXPO_PUBLIC_AI_ENABLED=true
EXPO_PUBLIC_PLANT_ID_ENABLED=true
EXPO_PUBLIC_REALTIME_ENABLED=true
EXPO_PUBLIC_OFFLINE_ENABLED=true
```

### Production Environment
```env
EXPO_PUBLIC_API_BASE_URL=https://api.sensoplantcare.com
EXPO_PUBLIC_WS_URL=wss://ws.sensoplantcare.com
EXPO_PUBLIC_AI_ENABLED=true
EXPO_PUBLIC_PLANT_ID_ENABLED=true
EXPO_PUBLIC_REALTIME_ENABLED=true
EXPO_PUBLIC_OFFLINE_ENABLED=true
```

## 📱 Navigation Flow

### Main Navigation Flows
1. **App Launch** → Auth Check → Dashboard/Welcome
2. **Plant Addition** → Scanner → AI ID → Profile Creation → Dashboard
3. **Device Pairing** → Connect → WiFi → Pairing → Completion → Dashboard
4. **Plant Management** → Dashboard → Plant Details → Care Instructions

### Deep Linking Support (Future)
```typescript
// Plant instruction deep link
senso://instruction?plantId=123&type=watering

// Device setup deep link
senso://setup?deviceId=abc123

// Notification deep link
senso://notification?id=456
```

## 🧪 Testing

### Current Test Coverage
- **Navigation Flow Testing**: All major user journeys
- **Component Testing**: UI component functionality
- **Authentication Testing**: Login/signup flows

### Backend Testing Requirements
- **API Integration Testing**: Mock server responses
- **Error Scenario Testing**: Network failures, timeouts
- **Device Connection Testing**: Bluetooth/WiFi connectivity
- **Real-time Data Testing**: WebSocket connections

## 🔒 Security Features

### Implemented Security
- **JWT Token Management**: Secure authentication
- **AsyncStorage Encryption**: Secure local storage
- **API Request Validation**: Input sanitization
- **Error Boundary Protection**: Graceful error handling

### Future Security Enhancements
- **Biometric Authentication**: Fingerprint/Face ID
- **Social Login**: Google, Apple, Facebook OAuth
- **Device Security**: Hardware-level encryption
- **API Rate Limiting**: Request throttling

## 📈 Performance Optimization

### Current Optimizations
- **Image Optimization**: Compressed asset loading
- **Component Memoization**: React.memo usage
- **Lazy Loading**: Dynamic component imports
- **Efficient Navigation**: Expo Router optimization

### Future Optimizations
- **Data Caching**: React Query implementation
- **Background Sync**: Offline data synchronization
- **Image Caching**: Progressive image loading
- **Bundle Splitting**: Code splitting strategies

## 🚀 Deployment

### Development Deployment
```bash
# Start Expo development server
npm start

# Build for development
npx expo build:android
npx expo build:ios
```

### Production Deployment
```bash
# Build for production
npx expo build:android --release-channel production
npx expo build:ios --release-channel production

# Submit to app stores
npx expo submit:android
npx expo submit:ios
```

## 📚 Documentation Files

### Additional Documentation
- **BACKEND_INTEGRATION.md**: Detailed backend integration guide
- **BACKEND_STATUS_ANALYSIS.md**: Current integration status
- **README_AUTH_INTEGRATION.md**: Authentication implementation details
- **NAVIGATION_FLOW_IMPLEMENTATION.md**: Navigation flow documentation

## 🔄 Development Workflow

### Phase 1: Core Backend Integration (Weeks 1-2)
- [ ] Set up Node.js/Express backend with TypeScript
- [ ] Implement remaining authentication features
- [ ] Create PostgreSQL database schema
- [ ] Basic CRUD operations for plants and devices

### Phase 2: AI Integration (Weeks 3-4)
- [ ] Integrate Gemini AI Vision API
- [ ] Implement Plant.ID API as fallback
- [ ] Create AI orchestrator service
- [ ] Build plant identification pipeline

### Phase 3: Real-time Features (Weeks 5-6)
- [ ] Implement WebSocket connections
- [ ] Add real-time sensor data streaming
- [ ] Set up push notification system
- [ ] Device status monitoring

### Phase 4: Advanced Features (Weeks 7-8)
- [ ] Offline mode support
- [ ] Background data synchronization
- [ ] Performance optimization
- [ ] Security audit and testing

## 🤝 Contributing

### Development Guidelines
1. **Code Style**: Follow TypeScript and React Native best practices
2. **Component Structure**: Use functional components with hooks
3. **State Management**: Utilize React Query for server state
4. **Error Handling**: Implement comprehensive error boundaries
5. **Testing**: Write unit tests for critical functionality

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

## 📞 Support

### Technical Support
- **Documentation**: Comprehensive inline comments and README files
- **Error Handling**: Detailed error messages and logging
- **Development Tools**: Expo DevTools integration
- **Debugging**: React Native Debugger support

### Resources
- **Expo Documentation**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/docs/
- **TypeScript Guide**: https://www.typescriptlang.org/docs/
- **React Query Docs**: https://tanstack.com/query/latest

---

## 🎯 Current Status

**Frontend**: ✅ **COMPLETE** - Fully functional with backend auth integration
**Backend Integration**: 🔄 **IN PROGRESS** - Authentication complete, APIs ready for implementation
**AI Integration**: 📋 **READY** - UI prepared, backend integration points identified
**Device Management**: 📋 **READY** - Complete flow implemented, backend APIs needed
**Production Ready**: 🔄 **80% COMPLETE** - Core features implemented, advanced features pending

---

*Last Updated: December 2024*
*Version: 1.0.0*
*Status: Ready for Full Backend Integration*