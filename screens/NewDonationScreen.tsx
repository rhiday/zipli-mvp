import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch, Platform, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { router } from 'expo-router';
import { goToCreateDonation } from "../app/navigation/navigation";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

// Define day type for type safety
type DayKey = 'M' | 'T' | 'W' | 'Th' | 'F' | 'S' | 'Su';

/**
 * NewDonationScreen - Screen for creating a new donation
 */
export default function NewDonationScreen() {
  const insets = useSafeAreaInsets();

  // Form state
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    quantity: '',
    expiryDate: new Date(),
    pickupAddress: '',
    notes: '',
  });

  // Photo state
  const [photos, setPhotos] = useState<string[]>([]);
  
  // For day selection
  const [selectedDays, setSelectedDays] = useState<Record<DayKey, boolean>>({
    M: false, 
    T: false, 
    W: false, 
    Th: false, 
    F: false, 
    S: false, 
    Su: false
  });
  
  const [timeWindow, setTimeWindow] = useState({
    start: '10',
    startMinute: '00',
    end: '16',
    endMinute: '00',
  });
  
  // UI state
  const [isPerishable, setIsPerishable] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Handle photo upload from gallery
  const handleUploadPhotos = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert("You need to allow access to your photos to upload them");
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: 5,
      });
      
      if (!result.canceled && result.assets.length > 0) {
        // Add new photos to the existing array
        const newPhotos = result.assets.map(asset => asset.uri);
        setPhotos([...photos, ...newPhotos]);
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
      alert("There was an error uploading your photos");
    }
  };

  // Handle camera capture
  const handleTakePhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
      
      if (!permissionResult.granted) {
        alert("You need to allow access to your camera to take photos");
        return;
      }
      
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets.length > 0) {
        // Add new photo to the existing array
        setPhotos([...photos, result.assets[0].uri]);
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      alert("There was an error taking your photo");
    }
  };

  // Toggle day selection
  const toggleDay = (day: DayKey) => {
    setSelectedDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Combine form data with photos and time window
    const donationData = {
      ...formData,
      photos,
      timeWindow: {
        start: `${timeWindow.start}:${timeWindow.startMinute}`,
        end: `${timeWindow.end}:${timeWindow.endMinute}`
      },
      availableDays: selectedDays,
      isPerishable,
    };
    
    console.log("Donation data:", donationData);
    
    // Navigate to the next step
    goToCreateDonation();
  };

  // Remove a photo
  const removePhoto = (index: number) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    setPhotos(newPhotos);
  };

  // Simple back handler
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New donation</Text>
        <View style={styles.emptySpace} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {/* Photo upload section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add photos</Text>
          
          <View style={styles.photoContainer}>
            {/* Display uploaded photos */}
            {photos.length > 0 && (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoList}>
                {photos.map((photo, index) => (
                  <View key={index} style={styles.photoItem}>
                    <Image source={{ uri: photo }} style={styles.photoThumbnail} />
                    <TouchableOpacity 
                      style={styles.removePhotoButton}
                      onPress={() => removePhoto(index)}
                    >
                      <Ionicons name="close-circle" size={22} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Photo upload options */}
            <View style={styles.photoButtonsContainer}>
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={handleUploadPhotos}
              >
                <Ionicons name="images-outline" size={22} color="#0A522D" />
                <Text style={styles.uploadButtonText}>Upload photos</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.uploadButton} 
                onPress={handleTakePhoto}
              >
                <Ionicons name="camera-outline" size={22} color="#0A522D" />
                <Text style={styles.uploadButtonText}>Take a photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Donation details section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Donation details</Text>

          {/* Item name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Item name</Text>
            <TextInput
              style={styles.input}
              value={formData.itemName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, itemName: text }))}
              placeholder="Enter what you're donating"
              placeholderTextColor="#999"
            />
          </View>

          {/* Description */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
              placeholder="Describe your donation (quantity, condition, etc.)"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Quantity */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              style={styles.input}
              value={formData.quantity}
              onChangeText={(text) => setFormData(prev => ({ ...prev, quantity: text }))}
              placeholder="Enter quantity"
              placeholderTextColor="#999"
              keyboardType="number-pad"
            />
          </View>

          {/* Perishable toggle */}
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Perishable item</Text>
            <Switch
              value={isPerishable}
              onValueChange={setIsPerishable}
              trackColor={{ false: '#ccc', true: '#0A522D' }}
              thumbColor={'#fff'}
            />
          </View>

          {/* Expiry date - only shown if perishable */}
          {isPerishable && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Expiry date</Text>
              <TouchableOpacity 
                style={styles.datePickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.datePickerButtonText}>
                  Select Date: {formData.expiryDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              
              {/* Date Picker */}
              {showDatePicker && (
                <DateTimePicker
                  value={formData.expiryDate}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setFormData(prev => ({ ...prev, expiryDate: selectedDate }));
                    }
                  }}
                />
              )}
            </View>
          )}
        </View>

        {/* Pickup details section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup details</Text>

          {/* Pickup address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pickup address</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={formData.pickupAddress}
                onChangeText={(text) => setFormData(prev => ({ ...prev, pickupAddress: text }))}
                placeholder="Enter pickup address"
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.searchIcon}>
                <Ionicons name="search" size={20} color="#333" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Pickup times */}
          <Text style={styles.subSectionTitle}>Available pickup days</Text>
          
          {/* Days Selection */}
          <View style={styles.daysContainer}>
            {(Object.keys(selectedDays) as DayKey[]).map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayButton, selectedDays[day] && styles.dayButtonSelected]}
                onPress={() => toggleDay(day)}
              >
                <Text style={[styles.dayButtonText, selectedDays[day] && styles.dayButtonTextSelected]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Range */}
          <Text style={styles.subSectionTitle}>Pickup time window</Text>
          <View style={styles.timeContainer}>
            <View style={styles.timePicker}>
              <TextInput
                style={styles.timeInput}
                value={timeWindow.start}
                onChangeText={(text) => setTimeWindow(prev => ({ ...prev, start: text }))}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.timeSeparator}>:</Text>
              <TextInput
                style={styles.timeInput}
                value={timeWindow.startMinute}
                onChangeText={(text) => setTimeWindow(prev => ({ ...prev, startMinute: text }))}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
            
            <Text style={styles.timeText}>-</Text>
            
            <View style={styles.timePicker}>
              <TextInput
                style={styles.timeInput}
                value={timeWindow.end}
                onChangeText={(text) => setTimeWindow(prev => ({ ...prev, end: text }))}
                keyboardType="number-pad"
                maxLength={2}
              />
              <Text style={styles.timeSeparator}>:</Text>
              <TextInput
                style={styles.timeInput}
                value={timeWindow.endMinute}
                onChangeText={(text) => setTimeWindow(prev => ({ ...prev, endMinute: text }))}
                keyboardType="number-pad"
                maxLength={2}
              />
            </View>
          </View>

          {/* Additional notes */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Special instructions</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.notes}
              onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
              placeholder="Enter any special instructions for pickup"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Create donation"
            onPress={handleSubmit}
          />
        </View>
        
        {/* Bottom padding for scrolling space */}
        <View style={{ height: 30 }} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0A522D",
  },
  backButton: {
    padding: 8,
  },
  emptySpace: {
    width: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#0A522D",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 16,
    marginBottom: 8,
  },
  photoContainer: {
    marginBottom: 16,
  },
  photoList: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  photoItem: {
    marginRight: 10,
    position: 'relative',
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removePhotoButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  photoButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  uploadButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0A522D",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadButtonText: {
    color: "#0A522D",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 6,
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingVertical: 4,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
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
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayButtonSelected: {
    backgroundColor: '#0A522D',
    borderColor: '#0A522D',
  },
  dayButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  dayButtonTextSelected: {
    color: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  timePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe5e5',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ffd5d5',
  },
  timeInput: {
    width: 30,
    textAlign: 'center',
    fontSize: 16,
  },
  timeSeparator: {
    fontSize: 16,
    marginHorizontal: 2,
  },
  timeText: {
    marginHorizontal: 12,
    fontSize: 18,
  },
  datePickerButton: {
    backgroundColor: '#ffe5e5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffd5d5',
  },
  datePickerButtonText: {
    color: '#333',
    fontSize: 16,
  },
  buttonContainer: {
    marginVertical: 20,
  }
}); 