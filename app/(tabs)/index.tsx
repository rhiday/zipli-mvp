import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import supabase from '../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppNavigation } from '../navigation/AppNavigator';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';

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
  const navigation = useAppNavigation();
  const router = useRouter();

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

  // Function to navigate to role selection
  const goToRoleSelection = () => {
    navigation.navigateToRoleSelection();
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
    return <DefaultDashboard donations={donations} onSelectRole={goToRoleSelection} />;
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
function DefaultDashboard({ donations, onSelectRole }: { donations: Donation[], onSelectRole: () => void }) {
  return (
    <View style={styles.defaultContainer}>
      <View style={styles.welcomeContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ZIPLI</Text>
        </View>
        
        <Text style={styles.welcomeTitle}>Welcome to Zipli</Text>
        <Text style={styles.welcomeSubtitle}>
          Connecting surplus food with those who need it most
        </Text>
      </View>
      
      <View style={styles.roleSelectionCard}>
        <Text style={styles.roleCardTitle}>Choose Your Role</Text>
        <Text style={styles.roleCardDescription}>
          Select whether you want to donate food or receive donations. Join our community
          fighting food waste and hunger.
        </Text>
        <Button 
          title="Select Your Role" 
          onPress={onSelectRole}
        />
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Making food sharing simple</Text>
      </View>
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
  defaultContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0A522D',
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    maxWidth: 300,
  },
  roleSelectionCard: {
    width: '100%',
    maxWidth: 350,
    backgroundColor: '#F0F8F4',
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  roleCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0A522D',
    textAlign: 'center',
  },
  roleCardDescription: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    lineHeight: 22,
    color: '#444',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#0A522D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#555',
  },
});
