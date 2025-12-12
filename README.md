# Senso Plant Care - Setup Guide

## 🚀 Quick Start

### 1. Start Both Servers
```bash
# Option 1: Use the batch file (Windows)
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

## ✅ Features Working
- ✅ User Registration
- ✅ User Login  
- ✅ JWT Authentication
- ✅ Cross-platform (iOS/Android)
- ✅ Network connectivity
- ✅ Error handling
- ✅ Loading states

## 🔄 Development Workflow
1. Make changes to code
2. App will hot reload automatically
3. Backend changes require server restart
4. Test on both iOS and Android devices

Ready for full app development! 🌱