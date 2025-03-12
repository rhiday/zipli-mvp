import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { Button } from '../components/ui/Button';
import { BackButton } from "../components/ui/BackButton";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { goToNewDonation } from '../app/navigation/navigation';

/**
 * DonorDashboard - Dashboard screen for donor users
 * Shows available donation options and history
 */
export default function DonorDashboard() {
  const insets = useSafeAreaInsets();
  const [donations, setDonations] = useState([]);
  
  // Get current time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  const handleNewDonation = () => {
    // Navigate to donation creation screen
    goToNewDonation();
  };

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV file
    console.log("Export as CSV pressed");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Add Header with back button */}
      <View style={styles.header}>
        <BackButton toHome={true} text="Home" />
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        {/* Profile Circle Placeholder */}
        <View style={styles.profileContainer}>
          <View style={styles.profileCircle} />
        </View>

        {/* Greeting */}
        <Text style={styles.greeting}>{getGreeting()}</Text>
        
        {/* Active Donations Section */}
        <Text style={styles.sectionTitle}>Active donations</Text>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>You do not have any active donations</Text>
        </View>

        {/* New Donation Button */}
        <TouchableOpacity 
          style={styles.newDonationButton}
          onPress={handleNewDonation}
        >
          <Text style={styles.newDonationButtonText}>New donation</Text>
        </TouchableOpacity>

        {/* Donation History Section */}
        <Text style={styles.sectionTitle}>History of donations:</Text>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>History empty</Text>
        </View>

        {/* Export CSV Button */}
        <TouchableOpacity 
          style={styles.exportButton}
          onPress={handleExportCSV}
        >
          <Text style={styles.exportButtonText}>Export as CSV</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#aaaaaa",
  },
  greeting: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    color: "#999",
    marginBottom: 16,
  },
  emptyCard: {
    backgroundColor: "#FFF5F5",
    padding: 20,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 100,
  },
  emptyText: {
    fontSize: 18,
    color: "#333",
  },
  newDonationButton: {
    backgroundColor: "#0A522D",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginBottom: 40,
    alignSelf: "flex-start",
  },
  newDonationButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  exportButton: {
    borderWidth: 1,
    borderColor: "#0A522D",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "flex-start",
  },
  exportButtonText: {
    color: "#0A522D",
    fontSize: 18,
    fontWeight: "500",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  headerSpacer: {
    flex: 1,
  },
}); 