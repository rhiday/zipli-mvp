import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Switch, ScrollView, Platform } from "react-native";
import { Button } from "../components/ui/Button";
import { BackButton } from "../components/ui/BackButton";
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goToRequestSent } from "../app/navigation/navigation";

/**
 * RecipientSignUpScreen - Screen for recipients to sign up with their details
 */
export default function RecipientSignUpScreen() {
  const insets = useSafeAreaInsets();
  
  // Form state
  const [formData, setFormData] = useState({
    profileName: '',
    location: '',
    needs: '',
    portions: '',
  });
  
  // Toggle switches state
  const [toggles, setToggles] = useState({
    canPickUp: false,
    hasFridge: false,
    hasFreezer: false,
    canStoreLarge: false,
  });
  
  const [hasReadInstructions, setHasReadInstructions] = useState(false);

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmit = () => {
    // This would be replaced with actual API call to backend
    const formSubmission = {
      ...formData,
      ...toggles,
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
        <Text style={styles.headerTitle}>Recipient</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Profile Name */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={formData.profileName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, profileName: text }))}
            placeholder="Name your profile"
            placeholderTextColor="#999"
          />
        </View>

        {/* Location with Search Icon */}
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
              placeholder="Your location"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Needs Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Describe your needs</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.needs}
            onChangeText={(text) => setFormData(prev => ({ ...prev, needs: text }))}
            placeholder="Amount
Day and time of deliveries
Any restrictions"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Toggle Switches */}
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Our organisation can pick up the items</Text>
          <Switch
            value={toggles.canPickUp}
            onValueChange={() => handleToggle('canPickUp')}
            trackColor={{ false: '#ccc', true: '#0A522D' }}
            thumbColor={'#fff'}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>We have a fridge to store food</Text>
          <Switch
            value={toggles.hasFridge}
            onValueChange={() => handleToggle('hasFridge')}
            trackColor={{ false: '#ccc', true: '#0A522D' }}
            thumbColor={'#fff'}
          />
        </View>

        {/* Portions Input - Only shown if they have a fridge */}
        {toggles.hasFridge && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={formData.portions}
              onChangeText={(text) => setFormData(prev => ({ ...prev, portions: text }))}
              placeholder="For how many portions?"
              placeholderTextColor="#999"
              keyboardType="number-pad"
            />
          </View>
        )}

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>We have a freezer to store food</Text>
          <Switch
            value={toggles.hasFreezer}
            onValueChange={() => handleToggle('hasFreezer')}
            trackColor={{ false: '#ccc', true: '#0A522D' }}
            thumbColor={'#fff'}
          />
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>We can store large donations</Text>
          <Switch
            value={toggles.canStoreLarge}
            onValueChange={() => handleToggle('canStoreLarge')}
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingVertical: 4,
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
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