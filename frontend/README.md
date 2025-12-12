# Senso Plant Care - Complete Project Documentation

## 🌱 Overview
Senso Plant Care is a comprehensive React Native application for smart plant monitoring and care management. The app integrates AI-powered plant identification, IoT sensor monitoring, and personalized care recommendations.

## 🚀 Quick Start

### 1. Start Both Servers
```bash
# Option 1: Use the batch file (Windows) - from root directory
start-servers.bat

# Option 2: Manual start
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

### 2. Access the App
- **Backend API**: http://192.168.1.3:3000
- **Frontend Dev**: http://192.168.1.3:8081
- **Mobile**: Scan QR code with Expo Go app

## 📱 Mobile Testing

### iOS Testing
1. Install Expo Go from App Store
2. Scan QR code from terminal
3. App will load with backend connectivity

### Android Testing
1. Install Expo Go from Play Store
2. Scan QR code from terminal
3. App will load with backend connectivity

## 🔧 Network Configuration

### Current Setup
- **Backend**: Listens on `0.0.0.0:3000` (all network interfaces)
- **Frontend**: Connects to `192.168.1.3:3000`
- **CORS**: Configured for mobile development
- **Timeout**: 10 seconds for network requests

### Troubleshooting
If you get network errors:
1. Check your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update `.env` files with your IP address
3. Restart both servers
4. Ensure firewall allows connections on port 3000

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
│   ├── selectdevice.tsx   # Device selection
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
│   ├── deviceService.ts   # Device management
│   └── wifiService.ts     # WiFi connectivity
├── context/               # State Management
│   └── AppContext.tsx     # Global app state & auth
├── assets/                # Static assets & images
└── constants/             # App constants & configuration
```

### Backend Architecture
```
backend/
├── controllers/           # Route handlers
│   └── auth.controller.js # Authentication logic
├── middleware/            # Express middleware
│   └── auth.middleware.js # JWT authentication
├── models/                # Database models
│   └── auth.model.js      # User authentication model
├── config/                # Configuration files
│   └── db.js              # Database connection
├── index.js               # Server entry point
└── package.json           # Dependencies and scripts
```

## 🔧 Technology Stack

### Frontend Technologies
- **React Native**: Cross-platform mobile development
- **Expo SDK 54**: Development platform and tools
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation
- **AsyncStorage**: Local data persistence
- **Expo Camera**: Camera functionality
- **React Native Reanimated**: Smooth animations
- **React Native SVG**: Vector graphics

### Backend Technologies
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database
- **JWT**: JSON Web Tokens for authentication
- **bcrypt**: Password hashing
- **CORS**: Cross-origin resource sharing

## ✅ Features Working
- ✅ User Registration
- ✅ User Login  
- ✅ JWT Authentication
- ✅ Cross-platform (iOS/Android)
- ✅ Network connectivity
- ✅ Error handling
- ✅ Loading states
- ✅ Plant Dashboard
- ✅ Device Selection Flow
- ✅ Real-time Graph Components
- ✅ Notification System
- ✅ Plant Profile Management

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

## 🔄 Development Workflow
1. Make changes to code
2. App will hot reload automatically
3. Backend changes require server restart
4. Test on both iOS and Android devices

## 📱 Navigation Flow

### Main Navigation Flows
1. **App Launch** → Auth Check → Dashboard/Welcome
2. **Plant Addition** → Scanner → AI ID → Profile Creation → Dashboard
3. **Device Pairing** → Select Device → Connect → WiFi → Pairing → Completion → Dashboard
4. **Plant Management** → Dashboard → Plant Details → Care Instructions

## 🌐 Environment Configuration

### Development Environment
```env
# Frontend (.env)
EXPO_PUBLIC_API_BASE_URL=http://192.168.1.3:3000

# Backend (.env)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/senso-plant-care
JWT_SECRET=your-secret-key
```

## 🚀 Building APK for Android

### Prerequisites
- Node.js installed
- Expo account (free) - sign up at https://expo.dev

### Steps
1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure EAS (First time only)**
   ```bash
   cd frontend
   eas build:configure
   ```

4. **Build APK**
   ```bash
   eas build --platform android --profile preview
   ```

5. **Download APK**
   - After build completes, you'll get a download URL
   - Share the APK file with others

## 🔮 Future Enhancements

### AI Integration Ready
- **Gemini AI**: Plant identification and care recommendations
- **Plant.ID API**: Backup identification service
- **Health Analysis**: Disease detection and treatment suggestions

### IoT Integration Ready
- **Real-time Sensor Data**: WebSocket connections for live monitoring
- **Device Management**: Complete IoT device connectivity
- **Push Notifications**: Firebase/APNs setup

### Backend APIs Ready for Implementation
```typescript
GET    /api/plants           # Get user plants
POST   /api/plants           # Create plant profile
PUT    /api/plants/:id       # Update plant info
DELETE /api/plants/:id       # Delete plant
POST   /api/plants/identify  # AI plant identification
GET    /api/plants/:id/data  # Get plant sensor data
```

Ready for full app development! 🌱

---

## 📞 Support
For development questions or issues, refer to the inline code comments and TODO sections throughout the codebase.