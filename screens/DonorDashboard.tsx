import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';
import { BackButton } from "../components/ui/BackButton";

// Define types
interface Donation {
  id: number;
  name: string;
  date: string;
  status: 'Completed' | 'In Progress' | 'Pending';
}

/**
 * DonorDashboard - Dashboard screen for donor users
 * Shows available donation options and history
 */
export default function DonorDashboard() {
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulating data loading
  useEffect(() => {
    const loadDonations = async () => {
      try {
        // Simulate API call
        setLoading(true);
        
        // In a real app, this would be an API call
        const mockDonations: Donation[] = [
          { id: 1, name: 'Fresh Vegetables', date: '2023-03-01', status: 'Completed' },
          { id: 2, name: 'Canned Goods', date: '2023-03-05', status: 'In Progress' },
          { id: 3, name: 'Bread and Pastries', date: '2023-03-10', status: 'Pending' },
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setDonations(mockDonations);
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
        <Text style={styles.headerTitle}>Donor Dashboard</Text>
        <View style={styles.headerSpacer} />
      </View>
      
      <ScrollView style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome to your Donor Dashboard</Text>
          <Text style={styles.subtitleText}>Manage your donations and see your impact</Text>
        </View>

        <View style={styles.actionSection}>
          <Button
            title="Create New Donation"
            onPress={() => {
              // Navigate to donation creation screen
              console.log("Create donation pressed");
            }}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Donations</Text>
          {donations.map((donation) => (
            <View key={donation.id} style={styles.donationCard}>
              <View style={styles.donationHeader}>
                <Text style={styles.donationDate}>{donation.date}</Text>
                <Text style={[
                  styles.donationStatus,
                  donation.status === "Completed" ? styles.statusCompleted : donation.status === "In Progress" ? styles.statusInProgress : styles.statusPending
                ]}>
                  {donation.status}
                </Text>
              </View>
              <Text style={styles.donationName}>{donation.name}</Text>
            </View>
          ))}

          {donations.length === 0 && (
            <Text style={styles.emptyMessage}>No upcoming donations scheduled</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation History</Text>
          {donations.map((donation) => (
            <View key={donation.id} style={styles.donationCard}>
              <View style={styles.donationHeader}>
                <Text style={styles.donationDate}>{donation.date}</Text>
                <Text style={[styles.donationStatus, styles.statusCompleted]}>
                  {donation.status}
                </Text>
              </View>
              <Text style={styles.donationName}>{donation.name}</Text>
            </View>
          ))}

          {donations.length === 0 && (
            <Text style={styles.emptyMessage}>No donation history yet</Text>
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
  actionSection: {
    padding: 20,
    backgroundColor: "white",
    marginBottom: 15,
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
    marginBottom: 10,
  },
  donationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  donationDate: {
    fontSize: 14,
    fontWeight: "500",
  },
  donationStatus: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusCompleted: {
    backgroundColor: "#E6F7ED",
    color: "#0A522D",
  },
  statusInProgress: {
    backgroundColor: "#FFF3CD",
    color: "#856404",
  },
  statusPending: {
    backgroundColor: "#F8D7DA",
    color: "#721C24",
  },
  donationName: {
    fontSize: 16,
    fontWeight: "600",
  },
  emptyMessage: {
    fontSize: 16,
    color: "#999",
    fontStyle: "italic",
    textAlign: "center",
    paddingVertical: 20,
  },
}); 