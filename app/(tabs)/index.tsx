import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import supabase from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Define a type for donation objects
interface Donation {
  id: string;
  food_image_url: string;
  detected_food: string[];
  estimated_portions: number;
  estimated_shelf_life: string;
  created_at: string;
}

export default function HomeScreen() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user's role from AsyncStorage
    const getUserRole = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        setUserRole(role);
      } catch (error) {
        console.error('Error getting user role:', error);
      }
    };

    getUserRole();
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching donations:', error);
        setError('Failed to load donations. Please try again later.');
      } else {
        setDonations(data || []);
        setError(null);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10 }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
        <Text>Please check your connection and try again.</Text>
      </View>
    );
  }

  // Render different dashboards based on user role
  if (userRole === 'donor') {
    return <DonorDashboard donations={donations} />;
  } else if (userRole === 'recipient') {
    return <RecipientDashboard donations={donations} />;
  } else {
    // Default dashboard if role is not set
    return <DefaultDashboard donations={donations} />;
  }
}

// Donor Dashboard Component
function DonorDashboard({ donations }: { donations: Donation[] }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Donor Dashboard</Text>
      <Text style={{ fontSize: 16, color: 'green', marginBottom: 20 }}>Welcome to your donor dashboard!</Text>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Your Recent Donations</Text>
      {donations.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>You haven't made any donations yet.</Text>
        </View>
      ) : (
        <FlatList
          data={donations}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
              {item.food_image_url ? (
                <Image 
                  source={{ uri: item.food_image_url }} 
                  style={{ width: '100%', height: 200, borderRadius: 10 }}
                />
              ) : (
                <View style={{ width: '100%', height: 200, borderRadius: 10, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No image available</Text>
                </View>
              )}
              <Text style={{ fontSize: 18, marginTop: 5 }}>
                {Array.isArray(item.detected_food) ? item.detected_food.join(', ') : item.detected_food || 'Unknown food'}
              </Text>
              <Text style={{ color: 'gray' }}>Portions: {item.estimated_portions || 'Unknown'}</Text>
              <Text style={{ color: 'gray' }}>Shelf Life: {item.estimated_shelf_life || 'Unknown'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// Recipient Dashboard Component
function RecipientDashboard({ donations }: { donations: Donation[] }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Recipient Dashboard</Text>
      <Text style={{ fontSize: 16, color: 'blue', marginBottom: 20 }}>Welcome to your recipient dashboard!</Text>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Available Donations</Text>
      {donations.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No donations are currently available.</Text>
        </View>
      ) : (
        <FlatList
          data={donations}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
              {item.food_image_url ? (
                <Image 
                  source={{ uri: item.food_image_url }} 
                  style={{ width: '100%', height: 200, borderRadius: 10 }}
                />
              ) : (
                <View style={{ width: '100%', height: 200, borderRadius: 10, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No image available</Text>
                </View>
              )}
              <Text style={{ fontSize: 18, marginTop: 5 }}>
                {Array.isArray(item.detected_food) ? item.detected_food.join(', ') : item.detected_food || 'Unknown food'}
              </Text>
              <Text style={{ color: 'gray' }}>Portions: {item.estimated_portions || 'Unknown'}</Text>
              <Text style={{ color: 'gray' }}>Shelf Life: {item.estimated_shelf_life || 'Unknown'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// Default Dashboard Component (for users without a specific role)
function DefaultDashboard({ donations }: { donations: Donation[] }) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10 }}>Welcome to Zipli</Text>
      
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Recent Donations</Text>
      {donations.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No donations found. Be the first to donate!</Text>
        </View>
      ) : (
        <FlatList
          data={donations}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
              {item.food_image_url ? (
                <Image 
                  source={{ uri: item.food_image_url }} 
                  style={{ width: '100%', height: 200, borderRadius: 10 }}
                />
              ) : (
                <View style={{ width: '100%', height: 200, borderRadius: 10, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center' }}>
                  <Text>No image available</Text>
                </View>
              )}
              <Text style={{ fontSize: 18, marginTop: 5 }}>
                {Array.isArray(item.detected_food) ? item.detected_food.join(', ') : item.detected_food || 'Unknown food'}
              </Text>
              <Text style={{ color: 'gray' }}>Portions: {item.estimated_portions || 'Unknown'}</Text>
              <Text style={{ color: 'gray' }}>Shelf Life: {item.estimated_shelf_life || 'Unknown'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
