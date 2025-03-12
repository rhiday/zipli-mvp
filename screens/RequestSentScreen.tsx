import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { replaceWithDonorDashboard } from "../app/navigation/navigation";

/**
 * RequestSentScreen - Confirmation screen shown after form submission
 */
export default function RequestSentScreen() {
  const handleGoToDashboard = () => {
    // Navigate to the donor dashboard
    replaceWithDonorDashboard();
  };

  const handleSkipDemo = () => {
    // For the demo, navigate to the donor dashboard
    replaceWithDonorDashboard();
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark" size={60} color="#FFFFFF" />
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Request sent</Text>

        <Text style={styles.message}>
          To ensure maximum food safety standards, we check every food donor 
          and recipient manually. We will let you know if we need some additional info.
        </Text>

        <Text style={styles.processingTime}>
          Average processing time: 1 day
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Primary Action Button */}
        <Button 
          title="Go to Dashboard" 
          onPress={handleGoToDashboard} 
        />
        
        {/* Skip Demo Button */}
        <TouchableOpacity 
          style={styles.skipButton} 
          onPress={handleSkipDemo}
        >
          <Text style={styles.skipButtonText}>Skip through DEMO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#0A522D",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 30,
    lineHeight: 24,
  },
  processingTime: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 30,
  },
  skipButton: {
    padding: 16,
    alignItems: "center",
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: 16,
    color: "#666",
  },
}); 