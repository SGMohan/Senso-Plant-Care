import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { connectImage1 } from "../assets";

// Authentication is handled by AppContext

export default function WelcomeScreen() {
  // TODO: Backend Integration - Check if user is already logged in
  // const { data: authStatus, isLoading } = useQuery({
  //   queryKey: ['authStatus'],
  //   queryFn: checkAuthStatus
  // });
  
  // useEffect(() => {
  //   // Auto-redirect if user is already authenticated
  //   if (authStatus?.isAuthenticated) {
  //     router.replace('/dashboard');
  //   }
  // }, [authStatus]);

  const handleGetStarted = () => {
    // TODO: Backend Integration - Track user journey analytics
    // trackEvent('welcome_get_started_clicked');
    router.push('/signup');
  };

  const handleHaveAccount = () => {
    // TODO: Backend Integration - Track user journey analytics
    // trackEvent('welcome_login_clicked');
    router.push('/login');
  };

  // TODO: Backend Integration - Handle deep links and social auth
  const handleSocialLogin = (provider: 'google' | 'apple' | 'facebook') => {
    // initiateSocialAuth(provider);
    console.log('Social login:', provider);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo/Image */}
        <View style={styles.imageContainer}>
          <Image source={connectImage1} style={styles.welcomeImage} resizeMode="contain" />
        </View>

        {/* Welcome Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>Welcome to Senso</Text>
          <Text style={styles.welcomeSubtitle}>
            Monitor and care for your plants with smart sensor technology
          </Text>
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={handleHaveAccount}>
            <Text style={styles.secondaryButtonText}>I Have an Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f4f0",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f4f0",
    paddingHorizontal: 24,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
    paddingBottom: 40,
  },
  welcomeImage: {
    width: 250,
    height: 250,
  },
  contentContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1a3c2a",
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "Inter",
  },
  welcomeSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6b8a7a",
    lineHeight: 24,
    textAlign: "center",
    fontFamily: "Inter",
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#2d5a3d",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    elevation: 3,
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    fontFamily: "Roboto",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#2d5a3d",
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#2d5a3d",
    fontFamily: "Roboto",
  },
});