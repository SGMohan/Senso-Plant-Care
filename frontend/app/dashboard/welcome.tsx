import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { connectImage1 } from "../../assets/images";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/auth/signup');
  };

  const handleHaveAccount = () => {
    router.push('/auth/login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={connectImage1} style={styles.welcomeImage} resizeMode="contain" />
        </View>

        <View style={styles.contentContainer}>
          <Text variant="h2" weight="semibold" style={styles.welcomeTitle}>Welcome to Senso</Text>
          <Text variant="body" style={styles.welcomeSubtitle}>
            Monitor and care for your plants with smart sensor technology
          </Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.buttonContainer}>
          <Button 
            title="Get Started" 
            onPress={handleGetStarted} 
            variant="primary" 
          />
          
          <Button 
            title="I Have an Account" 
            onPress={handleHaveAccount} 
            variant="outline" 
          />
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
    marginBottom: 16,
    textAlign: "center",
  },
  welcomeSubtitle: {
    textAlign: "center",
    color: "#6b8a7a",
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: 40,
    gap: 16,
  },
});
