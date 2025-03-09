import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';

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
    <View style={styles.container}>
      <Text style={styles.title}>Donor Dashboard</Text>
      
      <View style={styles.actionCard}>
        <Text style={styles.cardTitle}>Create New Donation</Text>
        <Text style={styles.cardDescription}>
          List food items you'd like to donate to those in need
        </Text>
        <Button 
          title="Create Donation" 
          onPress={() => console.log('Create donation')}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Your Donations</Text>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading donations...</Text>
      ) : (
        <ScrollView style={styles.donationsList}>
          {donations.map(donation => (
            <TouchableOpacity 
              key={donation.id} 
              style={styles.donationItem}
              onPress={() => console.log(`View donation ${donation.id}`)}
            >
              <Text style={styles.donationName}>{donation.name}</Text>
              <Text style={styles.donationDate}>Date: {donation.date}</Text>
              <View style={styles.statusContainer}>
                <Text style={[
                  styles.donationStatus,
                  donation.status === 'Completed' && styles.statusCompleted,
                  donation.status === 'In Progress' && styles.statusInProgress,
                  donation.status === 'Pending' && styles.statusPending,
                ]}>
                  {donation.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0A522D',
  },
  actionCard: {
    backgroundColor: '#F0F8F4',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#0A522D',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0A522D',
  },
  cardDescription: {
    marginBottom: 15,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
  donationsList: {
    flex: 1,
  },
  donationItem: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0A522D',
  },
  donationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  donationDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statusContainer: {
    alignItems: 'flex-start',
  },
  donationStatus: {
    fontSize: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  statusCompleted: {
    backgroundColor: '#D4EDDA',
    color: '#155724',
  },
  statusInProgress: {
    backgroundColor: '#FFF3CD',
    color: '#856404',
  },
  statusPending: {
    backgroundColor: '#F8D7DA',
    color: '#721C24',
  },
}); 