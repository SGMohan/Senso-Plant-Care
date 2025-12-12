# How to Build APK for Senso Plant Care

## Prerequisites
- Node.js installed
- Expo account (free) - sign up at https://expo.dev
- Git (optional but recommended)

## Step-by-Step Instructions

### 1. Install EAS CLI
Open terminal in the `frontend` folder and run:
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```
Enter your Expo account credentials (create one at https://expo.dev if needed)

### 3. Configure EAS (First time only)
```bash
eas build:configure
```
This will use the `eas.json` file already created.

### 4. Build APK for Android
```bash
eas build --platform android --profile preview
```

**What happens:**
- EAS will upload your project to their cloud servers
- Build the APK (takes 10-20 minutes)
- Provide a download link when complete

### 5. Download Your APK
- After build completes, you'll get a URL
- Open the URL in your browser
- Click "Download" to get the `.apk` file

### 6. Share with Your Friend
- Send the `.apk` file via email, Google Drive, Dropbox, etc.
- Your friend needs to:
  1. Enable "Install from Unknown Sources" on their Android phone
  2. Download and install the APK file

---

## Alternative: Quick Development Build (Faster, but requires Expo Go)

If you just want to test quickly, you can use Expo Go:

### 1. Start the development server
```bash
cd frontend
npm start
```

### 2. Share the QR code
- Scan QR code with Expo Go app (available on Play Store)
- Or send the connection URL to your friend

**Note:** This requires your friend to have Expo Go installed and both devices on the same network.

---

## Troubleshooting

### Build fails?
- Make sure all dependencies are installed: `npm install`
- Check that `app.json` has valid configuration
- Ensure you're logged in: `eas whoami`

### Need to update the app?
- Change version in `app.json`: `"version": "1.0.1"`
- Run build again: `eas build --platform android --profile preview`

### Want a smaller APK?
- Use `--profile production` instead of `preview` (creates optimized build)

---

## File Locations
- APK will be downloaded to your Downloads folder
- Build logs available at: https://expo.dev/accounts/[your-username]/builds




