import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button } from "../components/ui/Button";
import { BackButton } from "../components/ui/BackButton";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goToDonorSignup, goToRecipientSignup } from "../app/navigation/navigation";

/**
 * RoleSelectionScreen - Screen for users to select their role
 * Either donor or recipient
 */
export default function RoleSelectionScreen() {
  const insets = useSafeAreaInsets();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const donorTypes = ["Restaurant", "Grocery Store", "Food Bank", "Community Garden"];
  const recipientTypes = ["Food Bank", "Shelter", "Community Center", "School Program"];

  // Handle role selection and navigation
  const handleRoleSelect = async (role: string) => {
    try {
      // Set the selected role
      setSelectedRole(role);
      
      // Navigate to signup with role
      if (role === 'donor') {
        // Navigate to the donor signup screen
        goToDonorSignup();
      } else {
        // Navigate to recipient signup screen
        goToRecipientSignup();
      }
      
    } catch (error) {
      console.error('Error selecting role:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton toHome={true} text="Home" />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Let's create a profile for your organisation.</Text>
        <Text style={styles.subtitle}>Continue as:</Text>

        {/* Donor Section */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleTitle}>Donor</Text>
          <View style={styles.radioContainer}>
            {donorTypes.map((type) => (
              <TouchableOpacity
                key={`donor-${type}`}
                style={[
                  styles.radioOption,
                  selectedRole === type && styles.radioSelected
                ]}
                onPress={() => handleRoleSelect(type)}
              >
                <View style={styles.radioButton}>
                  {selectedRole === type && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button 
            title="Continue as donor" 
            onPress={() => handleRoleSelect('donor')}
          />
        </View>

        {/* Recipient Section */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleTitle}>Recipient</Text>
          <View style={styles.radioContainer}>
            {recipientTypes.map((type) => (
              <TouchableOpacity
                key={`recipient-${type}`}
                style={[
                  styles.radioOption,
                  selectedRole === type && styles.radioSelected
                ]}
                onPress={() => handleRoleSelect(type)}
              >
                <View style={styles.radioButton}>
                  {selectedRole === type && <View style={styles.radioButtonSelected} />}
                </View>
                <Text style={styles.radioText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <Button 
            title="Continue as recipient" 
            onPress={() => handleRoleSelect('recipient')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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
  radioContainer: {
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    marginBottom: 8,
  },
  radioSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#0A522D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#0A522D",
  },
  radioText: {
    fontSize: 14,
    fontWeight: "500",
  },
}); 