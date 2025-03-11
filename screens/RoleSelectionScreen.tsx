import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
  const [selectedDonorType, setSelectedDonorType] = useState<string | null>(null);
  const [selectedRecipientType, setSelectedRecipientType] = useState<string | null>(null);

  const donorTypes = ["Restaurant", "Grocery Store", "Food Bank", "Community Garden"];
  const recipientTypes = ["Food Bank", "Shelter", "Community Center", "School Program"];

  // Handle role selection and navigate to signup form
  const handleRoleSelection = async (role: 'donor' | 'recipient') => {
    try {
      setIsSelecting(true);
      
      // Get the selected organization type
      const orgType = role === 'donor' ? selectedDonorType : selectedRecipientType;
      
      if (!orgType) {
        // If no organization type selected, show an error or use a default
        console.error(`No ${role} type selected`);
        return;
      }
      
      // Navigate to signup with role and organization type
      router.push({
        pathname: "/signup",
        params: { role, organizationType: orgType }
      });
      
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
        <View style={styles.radioContainer}>
          {donorTypes.map((type) => (
            <TouchableOpacity
              key={`donor-${type}`}
              style={[
                styles.radioOption,
                selectedDonorType === type && styles.radioSelected
              ]}
              onPress={() => setSelectedDonorType(type)}
            >
              <View style={styles.radioButton}>
                {selectedDonorType === type && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Button 
          title="Continue as donor" 
          onPress={() => handleRoleSelection('donor')}
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
                selectedRecipientType === type && styles.radioSelected
              ]}
              onPress={() => setSelectedRecipientType(type)}
            >
              <View style={styles.radioButton}>
                {selectedRecipientType === type && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioText}>{type}</Text>
            </TouchableOpacity>
          ))}
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