import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { BackButton } from '../components/ui/BackButton';
import { Button } from '../components/ui/Button';

type DayKey = 'M' | 'T' | 'W' | 'Th' | 'F' | 'S' | 'Su';

export default function CreateDonationScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    organizationName: '',
    contactPerson: '',
    address: '',
    instructions: '',
  });
  
  const [selectedDays, setSelectedDays] = useState<Record<DayKey, boolean>>({
    M: false, T: false, W: false, Th: false, F: false, S: false, Su: false
  });
  
  const [timeWindow, setTimeWindow] = useState({
    start: '10:00',
    end: '16:00'
  });
  
  const [isRecurring, setIsRecurring] = useState(false);
  const [hasReadInstructions, setHasReadInstructions] = useState(false);

  const handleSubmit = () => {
    // TODO: Implement form submission
    console.log('Form submitted:', { formData, selectedDays, timeWindow, isRecurring });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton text="Back" />
        <Text style={styles.headerTitle}>Donor</Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name of organisation</Text>
          <TextInput
            style={styles.input}
            value={formData.organizationName}
            onChangeText={(text) => setFormData(prev => ({ ...prev, organizationName: text }))}
            placeholder="Enter organization name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contact person</Text>
          <TextInput
            style={styles.input}
            value={formData.contactPerson}
            onChangeText={(text) => setFormData(prev => ({ ...prev, contactPerson: text }))}
            placeholder="Enter contact person name"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address of organisation</Text>
          <TextInput
            style={styles.input}
            value={formData.address}
            onChangeText={(text) => setFormData(prev => ({ ...prev, address: text }))}
            placeholder="Enter address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Instructions for driver</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.instructions}
            onChangeText={(text) => setFormData(prev => ({ ...prev, instructions: text }))}
            placeholder="Enter instructions"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pickup times</Text>
          <View style={styles.daysContainer}>
            {(Object.entries(selectedDays) as [DayKey, boolean][]).map(([day, selected]) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayButton, selected && styles.dayButtonSelected]}
                onPress={() => setSelectedDays(prev => ({ ...prev, [day]: !prev[day] }))}
              >
                <Text style={[styles.dayButtonText, selected && styles.dayButtonTextSelected]}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.timeContainer}>
            <TextInput
              style={styles.timeInput}
              value={timeWindow.start}
              onChangeText={(text) => setTimeWindow(prev => ({ ...prev, start: text }))}
              placeholder="10:00"
            />
            <Text style={styles.timeText}>-</Text>
            <TextInput
              style={styles.timeInput}
              value={timeWindow.end}
              onChangeText={(text) => setTimeWindow(prev => ({ ...prev, end: text }))}
              placeholder="16:00"
            />
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Recurring time window for pickup</Text>
          <Switch
            value={isRecurring}
            onValueChange={setIsRecurring}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isRecurring ? '#f5dd4b' : '#f4f3f4'}
          />
        </View>

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setHasReadInstructions(!hasReadInstructions)}
          >
            <View style={[styles.checkboxBox, hasReadInstructions && styles.checkboxChecked]} />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I have read and commit to the food donation{' '}
            <Text style={styles.link}>instructions</Text> by the Finnish Food Authority
          </Text>
        </View>

        <Button
          title="Send for approval"
          onPress={handleSubmit}
          disabled={!hasReadInstructions}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A522D',
  },
  headerSpacer: {
    width: 50,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff5f5',
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
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dayButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
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
    marginTop: 12,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    width: 100,
    textAlign: 'center',
    backgroundColor: '#fff5f5',
  },
  timeText: {
    marginHorizontal: 12,
    fontSize: 18,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
    marginTop: 2,
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#0A522D',
    borderColor: '#0A522D',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#0A522D',
    textDecorationLine: 'underline',
  },
}); 