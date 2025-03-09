import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/ui/Button';

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
  const router = useRouter();
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
    <View style={styles.container}>
      <Text style={styles.title}>Available Donations</Text>
      
      <View style={styles.actionCard}>
        <Text style={styles.cardTitle}>Find Food Near You</Text>
        <Text style={styles.cardDescription}>
          Search for available donations in your area
        </Text>
        <Button 
          title="Search Donations" 
          onPress={() => console.log('Search donations')}
        />
      </View>
      
      {loading ? (
        <Text style={styles.loadingText}>Loading available donations...</Text>
      ) : (
        <ScrollView style={styles.donationsList}>
          {availableDonations.map(donation => (
            <TouchableOpacity 
              key={donation.id} 
              style={styles.donationItem}
              onPress={() => console.log(`View donation ${donation.id}`)}
            >
              <View style={styles.donationImageContainer}>
                <Image 
                  source={{ uri: `${donation.imageUrl}/100x100` }} 
                  style={styles.donationImage}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.donationInfo}>
                <Text style={styles.donationName}>{donation.name}</Text>
                <Text style={styles.donationDescription} numberOfLines={2}>
                  {donation.description}
                </Text>
                <View style={styles.donationMeta}>
                  <Text style={styles.donorName}>{donation.donorName}</Text>
                  <Text style={styles.distance}>{donation.distance}</Text>
                </View>
                <Button 
                  title="Request" 
                  onPress={() => console.log(`Request donation ${donation.id}`)}
                />
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
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  donationImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 15,
  },
  donationImage: {
    width: '100%',
    height: '100%',
  },
  donationInfo: {
    flex: 1,
  },
  donationName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#0A522D',
  },
  donationDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  donationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  donorName: {
    fontSize: 14,
    color: '#666',
  },
  distance: {
    fontSize: 14,
    color: '#0A522D',
    fontWeight: '500',
  },
}); 