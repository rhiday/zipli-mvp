import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Switch, ScrollView, Platform, KeyboardAvoidingView } from "react-native";
import { Button } from "../components/ui/Button";
import { BackButton } from "../components/ui/BackButton";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goToRequestSent } from "../app/navigation/navigation";

/**
 * DonorSignUpScreen - Screen for donors to sign up with their details
 */
export default function DonorSignUpScreen() {
  const insets = useSafeAreaInsets();
  
  // Form state
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    address: '',
    instructions: '',
  });
  
  const [isRecurring, setIsRecurring] = useState(false);
  const [hasReadInstructions, setHasReadInstructions] = useState(false);

  const handleSubmit = () => {
    // This would be replaced with actual API call to backend
    const formSubmission = {
      ...formData,
      isRecurring
    };
    
    console.log('Form submitted:', formSubmission);
    
    // In a real implementation, we would make an API call here
    // and then navigate on success
    
    // Navigate to success screen
    goToRequestSent();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <BackButton text="Back" />
        <Text style={styles.headerTitle}>Donor</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Organization Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name of organisation</Text>
          <TextInput
            style={styles.input}
            value={formData.organizationName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, organizationName: text }))}
            placeholder="Enter organization name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Contact Person */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact person</Text>
          <TextInput
            style={styles.input}
            value={formData.contactPerson}
            onChangeText={(text) => setFormData(prev => ({ ...prev, contactPerson: text }))}
            placeholder="Enter contact person name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Address with Search Icon */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address of organisation</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={formData.address}
              onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
              placeholder="Enter address"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Instructions for driver</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.instructions}
            onChangeText={(text) => setFormData(prev => ({ ...prev, instructions: text }))}
            placeholder="Enter instructions"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Recurring Toggle */}
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Recurring donation</Text>
          <Switch
            value={isRecurring}
            onValueChange={setIsRecurring}
            trackColor={{ false: '#ccc', true: '#0A522D' }}
            thumbColor={'#fff'}
          />
        </View>

        {/* Checkbox for Instructions */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setHasReadInstructions(!hasReadInstructions)}
          >
            {hasReadInstructions && (
              <Ionicons name="checkmark" size={18} color="#0A522D" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I have read and commit to the food donation{' '}
            <Text style={styles.link}>instructions</Text> by the Finnish Food Authority
          </Text>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Send for approval"
            onPress={handleSubmit}
            disabled={!hasReadInstructions}
          />
        </View>
        
        {/* Bottom padding to ensure everything is visible */}
        <View style={{ height: insets.bottom + 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A522D',
  },
  headerSpacer: {
    width: 50,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ffd5d5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffe5e5',
  },
  searchContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ffd5d5',
    borderRadius: 8,
    backgroundColor: '#ffe5e5',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  searchIcon: {
    padding: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 16,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#0A522D',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#0000FF',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginVertical: 20,
  },
}); 