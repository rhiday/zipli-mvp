import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { goToDonorSignup, goToRecipientSignup } from './navigation/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * RoleSelectionScreen - Allows users to select their role (donor or recipient)
 */
export default function RoleSelectionScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Your Role</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Choose how you'd like to use the app
        </Text>
        
        <TouchableOpacity 
          style={styles.roleButton} 
          onPress={goToDonorSignup}
        >
          <Text style={styles.roleButtonText}>I want to donate food</Text>
          <Text style={styles.roleButtonSubtext}>Register as a donor</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.roleButton} 
          onPress={goToRecipientSignup}
        >
          <Text style={styles.roleButtonText}>I need food</Text>
          <Text style={styles.roleButtonSubtext}>Register as a recipient</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A522D',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  roleButton: {
    width: '100%',
    padding: 20,
    backgroundColor: '#ffe5e5',
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffd5d5',
  },
  roleButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  roleButtonSubtext: {
    fontSize: 14,
    color: '#666',
  },
}); 