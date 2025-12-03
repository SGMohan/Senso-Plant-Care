# Backend Integration Guide

## Overview
This document outlines how to properly connect the backend with the frontend for the Senso Plant Care application. Each file has been prepared with TODO comments and service structures for seamless backend integration.

## Project Structure

### Frontend Architecture
```
frontend/
├── app/                    # Pages/Screens
├── components/             # Reusable UI Components
├── services/              # API Service Layer
├── assets/                # Static Data & Images
└── BACKEND_INTEGRATION.md # This guide
```

## Backend Integration Process

### 1. Authentication Flow
**Files to integrate:**
- `app/welcome.tsx` - Auto-login check, social auth
- `app/login.tsx` - User authentication, biometric login
- `app/signup.tsx` - User registration, email validation
- `services/authService.ts` - Complete auth API layer

**Integration Steps:**
1. Replace mock functions with real API endpoints
2. Implement token storage with AsyncStorage
3. Add error handling and validation
4. Set up social authentication providers
5. Configure biometric authentication

### 2. Dashboard & Plant Management
**Files to integrate:**
- `app/dashboard/index.tsx` - Real-time plant data, WebSocket
- `services/plantService.ts` - Plant CRUD operations
- `components/PlantCard.tsx` - Dynamic plant metrics
- `components/TaskCard.tsx` - Task management

**Integration Steps:**
1. Replace static plant data with API calls
2. Implement WebSocket for real-time sensor data
3. Add plant CRUD operations
4. Set up task management system
5. Implement data caching and offline support

### 3. Notifications System
**Files to integrate:**
- `app/notifications.tsx` - Notification management
- `services/notificationService.ts` - Notification API
- `components/NotificationCard.tsx` - Dynamic notifications

**Integration Steps:**
1. Replace static notifications with API data
2. Implement push notifications
3. Add notification actions (mark as read, delete)
4. Set up real-time notification updates

### 4. Device Connection
**Files to integrate:**
- `app/connectdevice.tsx` - Device pairing flow
- `services/deviceService.ts` - Device management API

**Integration Steps:**
1. Implement Bluetooth/WiFi device scanning
2. Add device pairing and connection logic
3. Set up device status monitoring
4. Implement device settings management

## Service Layer Architecture

### API Services Structure
```typescript
services/
├── authService.ts         # Authentication & user management
├── plantService.ts        # Plant data & operations
├── deviceService.ts       # Device connection & management
├── notificationService.ts # Notification handling
└── apiClient.ts          # Base API configuration
```

### Key Integration Points

#### 1. API Client Setup
```typescript
// services/apiClient.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});
```

#### 2. Authentication Headers
```typescript
// Automatic token injection
apiClient.interceptors.request.use((config) => {
  const token = AsyncStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

#### 3. Error Handling
```typescript
// Global error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      router.replace('/login');
    }
    return Promise.reject(error);
  }
);
```

## Data Flow Architecture

### 1. State Management
- **React Query** for server state management
- **AsyncStorage** for local data persistence
- **Context API** for global app state

### 2. Real-time Updates
- **WebSocket** connections for live sensor data
- **Push notifications** for alerts
- **Background sync** for offline support

### 3. Caching Strategy
- **Query caching** with React Query
- **Image caching** for plant photos
- **Offline data** storage for core functionality

## Backend Technologies Integration

### Expected Backend Stack
- **API Framework:** Node.js/Express, Python/Django, or similar
- **Database:** PostgreSQL/MongoDB for data storage
- **Real-time:** WebSocket/Socket.io for live updates
- **Authentication:** JWT tokens, OAuth providers
- **File Storage:** AWS S3/CloudFront for images
- **Push Notifications:** Firebase/APNs
- **IoT Integration:** MQTT for sensor data

### API Endpoints Structure
```
Authentication:
POST /api/auth/login
POST /api/auth/register
POST /api/auth/refresh
GET  /api/auth/me

Plants:
GET    /api/plants
POST   /api/plants
PUT    /api/plants/:id
DELETE /api/plants/:id
GET    /api/plants/:id/metrics

Devices:
GET  /api/devices
POST /api/devices/scan
POST /api/devices/:id/connect
GET  /api/devices/:id/status

Notifications:
GET    /api/notifications
PATCH  /api/notifications/:id/read
DELETE /api/notifications/:id
```

## Implementation Checklist

### Phase 1: Core Authentication
- [ ] Set up API client with base configuration
- [ ] Implement login/signup API integration
- [ ] Add token management and refresh logic
- [ ] Set up error handling and validation

### Phase 2: Data Integration
- [ ] Replace static data with API calls
- [ ] Implement React Query for state management
- [ ] Add loading states and error handling
- [ ] Set up data caching strategies

### Phase 3: Real-time Features
- [ ] Implement WebSocket connections
- [ ] Add push notification handling
- [ ] Set up background data sync
- [ ] Implement offline support

### Phase 4: Device Integration
- [ ] Add Bluetooth/WiFi scanning
- [ ] Implement device pairing flow
- [ ] Set up sensor data streaming
- [ ] Add device management features

## Environment Configuration

### Required Environment Variables
```env
EXPO_PUBLIC_API_URL=https://api.sensoplantcare.com
EXPO_PUBLIC_WS_URL=wss://ws.sensoplantcare.com
EXPO_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
EXPO_PUBLIC_FACEBOOK_APP_ID=your_facebook_app_id
```

### Development vs Production
- **Development:** Local API server, mock data fallbacks
- **Staging:** Test API server, real data with test accounts
- **Production:** Live API server, full functionality

## Testing Strategy

### Integration Testing
- API endpoint testing with mock servers
- Component testing with mock data
- End-to-end user flow testing
- Device connection testing

### Error Scenarios
- Network connectivity issues
- API server downtime
- Authentication failures
- Device connection problems

## Security Considerations

### Data Protection
- Secure token storage with AsyncStorage
- API request encryption (HTTPS)
- Sensitive data handling
- User privacy compliance

### Authentication Security
- JWT token expiration handling
- Secure password requirements
- Biometric authentication setup
- Social login security

## Next Steps

1. **Backend API Development:** Create the backend services
2. **API Documentation:** Document all endpoints and data structures
3. **Integration Testing:** Test each service integration
4. **Performance Optimization:** Optimize API calls and caching
5. **Security Audit:** Review security implementations
6. **Production Deployment:** Deploy and monitor the integrated system

---

**Note:** All files in this project are prepared with TODO comments and service structures. Simply uncomment the backend integration code and replace the mock functions with real API calls when the backend is ready.