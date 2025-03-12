import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Button } from '../components/ui/Button';
import { BackButton } from "../components/ui/BackButton";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define types
interface DonationListing {
  id: number;
  name: string;
  description: string;
  donorName: string;
  distance: string;
  imageUrl: string;
}

/**
 * RecipientDashboard - Dashboard screen for recipient users
 * Shows available donations and request history
 */
export default function RecipientDashboard() {
  const [availableDonations, setAvailableDonations] = useState<DonationListing[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating data loading
  useEffect(() => {
    const loadDonations = async () => {
      try {
        // Simulate API call
        setLoading(true);
        
        // In a real app, this would be an API call
        const mockDonations: DonationListing[] = [
          { 
            id: 1, 
            name: 'Fresh Vegetables', 
            description: 'Assorted fresh vegetables including carrots, tomatoes, and lettuce',
            donorName: 'Community Garden',
            distance: '0.8 miles away',
            imageUrl: 'https://images.unsplash.com/photo-1607305387299-a3d9611cd469'
          },
          { 
            id: 2, 
            name: 'Bakery Items', 
            description: 'Bread, rolls, and pastries from today',
            donorName: 'Local Bakery',
            distance: '1.2 miles away',
            imageUrl: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec'
          },
          { 
            id: 3, 
            name: 'Canned Goods', 
            description: 'Various non-perishable items with long shelf life',
            donorName: 'Food Bank',
            distance: '2.5 miles away',
            imageUrl: 'https://images.unsplash.com/photo-1595981267035-7b04ca84a82d'
          },
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setAvailableDonations(mockDonations);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading donations:', error);
        setLoading(false);
      }
    };

    loadDonations();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton toHome={true} text="Home" />
        <Text style={styles.headerTitle}>Recipient Dashboard</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to your Recipient Dashboard</Text>
          <Text style={styles.subtitleText}>Find available donations and schedule pickups</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Scheduled Pickups</Text>
          
          {/* Scheduled pickups section content */}
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Find Available Donations"
            onPress={() => {
              // Navigate to available donations screen
              console.log("Find donations pressed");
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Donations Nearby</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#0A522D" />
          ) : availableDonations.length > 0 ? (
            availableDonations.map((donation) => (
              <View key={donation.id} style={styles.donationCard}>
                <View style={styles.donationHeader}>
                  <Text style={styles.donorName}>{donation.donorName}</Text>
                  <Text style={styles.donationDistance}>{donation.distance}</Text>
                </View>
                <Text style={styles.donationItems}>{donation.description}</Text>
                <View style={styles.donationFooter}>
                  <Text style={styles.donationTime}>Posted: {/* donation.timePosted */}</Text>
                  <Button
                    title="Request"
                    onPress={() => {
                      // Request this donation
                      console.log(`Requesting donation ${donation.id}`);
                    }}
                  />
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>No donations available nearby</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
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
    width: 50, // Ensures header title stays centered
  },
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  welcomeContainer: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A522D",
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    backgroundColor: "white",
    padding: 20,
    marginBottom: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionSection: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#0A522D",
  },
  donationCard: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  donationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  donorName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  donationDistance: {
    fontSize: 12,
    color: "#0A522D",
    backgroundColor: "#E6F7ED",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  donationItems: {
    fontSize: 14,
    color: "#555",
    marginBottom: 15,
  },
  donationFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  donationTime: {
    fontSize: 12,
    color: "#888",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
}); 