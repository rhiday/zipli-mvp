import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../components/ui/Button";
import { useAppNavigation } from "../app/navigation/AppNavigator";

/**
 * RoleSelectionScreen - Screen for users to select their role
 * Either donor or recipient
 */
export default function RoleSelectionScreen() {
  const router = useRouter();
  const navigation = useAppNavigation();
  const [isSelecting, setIsSelecting] = useState(false);

  // Handle role selection and navigate to appropriate dashboard
  const handleRoleSelection = async (role: 'donor' | 'recipient') => {
    try {
      setIsSelecting(true);
      
      // In a real app, this would update the user's role in the database
      console.log(`Selected role: ${role}`);
      
      // Navigate using our central navigation utility
      if (role === 'donor') {
        navigation.navigateToDonorDashboard();
      } else {
        navigation.navigateToRecipientDashboard();
      }
    } catch (error) {
      console.error('Error selecting role:', error);
    } finally {
      setIsSelecting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's create a profile for your organisation.</Text>
      <Text style={styles.subtitle}>Continue as:</Text>

      {/* Donor Section */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Donor</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Restaurant</Text>
          <Text style={styles.tag}>Grocery Store</Text>
          <Text style={styles.tag}>Food Bank</Text>
          <Text style={styles.tag}>Community Garden</Text>
        </View>
        <Button 
          title="Continue as donor" 
          onPress={() => handleRoleSelection('donor')}
        />
      </View>

      {/* Recipient Section */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Recipient</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Food Bank</Text>
          <Text style={styles.tag}>Shelter</Text>
          <Text style={styles.tag}>Community Center</Text>
          <Text style={styles.tag}>School Program</Text>
        </View>
        <Button 
          title="Continue as recipient" 
          onPress={() => handleRoleSelection('recipient')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  roleContainer: {
    backgroundColor: "#FDECEC",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: "500",
  },
}); 