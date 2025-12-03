import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/welcome" />;
}

// COMMENTED OUT WELCOME SCREEN FOR DASHBOARD PREVIEW
// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   Modal,
// } from "react-native";
// import { useState } from "react";
// import LoginComponent from "../components/LoginComponent";
// import SignUpComponent from "../components/SignUpComponent";

// /**
//  * WelcomeScreen component - displays welcome interface with login/signup options
//  * @returns {JSX.Element} The welcome screen component
//  */
// export default function WelcomeScreen() {
//   const [loginVisible, setLoginVisible] = useState(false);
//   const [signUpVisible, setSignUpVisible] = useState(false);

//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.welcomeTitle}>Welcome Senso!</Text>
//         <Text style={styles.welcomeSubtitle}>
//           Your smart plant companion for healthier, happier plants.
//         </Text>
//         <View style={styles.imageContainer}>
//           // amazonq-ignore-next-line
//           <Image
//             source={require("../assets/welcome-plant.png")}
//             style={styles.welcomeImage}
//             resizeMode="cover"
//             fadeDuration={0}
//           />
//         </View>
//       </View>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.primaryButton}
//           onPress={() => setSignUpVisible(true)}
//         >
//           <Text style={styles.primaryButtonText}>Get Started</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.secondaryButton}
//           onPress={() => setLoginVisible(true)}
//         >
//           <Text style={styles.secondaryButtonText}>I have an account</Text>
//         </TouchableOpacity>
//       </View>
//       <Modal visible={loginVisible} animationType="slide" presentationStyle="pageSheet">
//         <LoginComponent
//           onCancel={() => setLoginVisible(false)}
//           onSwitchToSignUp={() => {
//             setLoginVisible(false);
//             setSignUpVisible(true);
//           }}
//         />
//       </Modal>
//       <Modal visible={signUpVisible} animationType="slide" presentationStyle="pageSheet">
//         <SignUpComponent
//           onCancel={() => setSignUpVisible(false)}
//           onSwitchToLogin={() => {
//             setSignUpVisible(false);
//             setLoginVisible(true);
//           }}
//         />
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f8faf8", paddingHorizontal: 24, paddingBottom: 40 },
//   content: { flex: 1, justifyContent: "center" },
//   welcomeTitle: { fontSize: 32, fontWeight: "700", color: "#1a3c2a", textAlign: "center", lineHeight: 40, marginBottom: 16 },
//   welcomeSubtitle: { fontSize: 16, color: "#6b8a7a", textAlign: "center", lineHeight: 22, marginBottom: 40 },
//   imageContainer: { alignItems: "center", height: 200, marginTop: 40, marginBottom: 40 },
//   welcomeImage: { width: 300, height: 200, borderRadius: 16 },
//   buttonContainer: { gap: 12 },
//   primaryButton: { backgroundColor: "#2d5a3d", paddingVertical: 16, borderRadius: 12, alignItems: "center" },
//   primaryButtonText: { color: "white", fontSize: 18, fontWeight: "500" },
//   secondaryButton: { backgroundColor: "transparent", paddingVertical: 16, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: "#2d5a3d" },
//   secondaryButtonText: { color: "#2d5a3d", fontSize: 16, fontWeight: "500" },
// });

// export default DashboardScreen;

