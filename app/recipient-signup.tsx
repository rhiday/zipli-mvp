import React from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Button } from '../components/ui/Button';
import { BackButton } from '../components/ui/BackButton';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goToRequestSent } from './navigation/navigation';

/**
 * RecipientSignUpScreen - Screen for recipients to sign up with their details
 */
export default function RecipientSignUpScreen() {
  const insets = useSafeAreaInsets();
  
  // Form state
  const [formData, setFormData] = React.useState({
    profileName: '',
    location: '',
    portions: '',
    needs: '',
  });
  
  const [hasFridge, setHasFridge] = React.useState(false);
  const [hasFreezer, setHasFreezer] = React.useState(false);
  const [canStoreLarge, setCanStoreLarge] = React.useState(false);
  const [canPickUp, setCanPickUp] = React.useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = React.useState(false);

  const handleSubmit = () => {
    // This would be replaced with actual API call to backend
    const formSubmission = {
      ...formData,
      hasFridge,
      hasFreezer,
      canStoreLarge,
      canPickUp,
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
          <Text style={styles.label}>Profile name</Text>
          <TextInput
            style={styles.input}
            value={formData.profileName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, profileName: text }))}
            placeholder="Enter your name or organization name"
            placeholderTextColor="#999"
          />
        </View>

        {/* Location */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              value={formData.location}
              onChangeText={(text) => setFormData(prev => ({ ...prev, location: text }))}
              placeholder="Enter your address"
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Ionicons name="search" size={20} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Portions */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>How many portions do you need?</Text>
          <TextInput
            style={styles.input}
            value={formData.portions}
            onChangeText={(text) => setFormData(prev => ({ ...prev, portions: text }))}
            placeholder="Enter number of portions"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />
        </View>

        {/* Specific Needs */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Specific needs or dietary restrictions</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.needs}
            onChangeText={(text) => setFormData(prev => ({ ...prev, needs: text }))}
            placeholder="Enter any specific needs"
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Storage Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Storage Options</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>I have a refrigerator</Text>
            <Switch
              value={hasFridge}
              onValueChange={setHasFridge}
              trackColor={{ false: '#ccc', true: '#0A522D' }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>I have a freezer</Text>
            <Switch
              value={hasFreezer}
              onValueChange={setHasFreezer}
              trackColor={{ false: '#ccc', true: '#0A522D' }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>I can store large items</Text>
            <Switch
              value={canStoreLarge}
              onValueChange={setCanStoreLarge}
              trackColor={{ false: '#ccc', true: '#0A522D' }}
              thumbColor={'#fff'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>I can pick up donations</Text>
            <Switch
              value={canPickUp}
              onValueChange={setCanPickUp}
              trackColor={{ false: '#ccc', true: '#0A522D' }}
              thumbColor={'#fff'}
            />
          </View>
        </View>

        {/* Terms Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setHasAcceptedTerms(!hasAcceptedTerms)}
          >
            {hasAcceptedTerms && (
              <Ionicons name="checkmark" size={18} color="#0A522D" />
            )}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I agree to the <Text style={styles.link}>terms and conditions</Text>
          </Text>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Submit"
            onPress={handleSubmit}
            disabled={!hasAcceptedTerms}
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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