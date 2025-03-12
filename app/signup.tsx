import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import supabase from "../lib/supabase";
import { useRouter } from 'expo-router';
import { BackButton } from "../components/ui/BackButton";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    // Validate form
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password");
      return;
    }
    
    setIsSigningUp(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Sign Up Failed", error.message);
      } else {
        Alert.alert("Success", "Check your email for confirmation!");
        // Navigate to role selection for additional information
        router.push('/role-selection');
      }
    } catch (err) {
      console.error("Unexpected signup error:", err);
      Alert.alert("Sign Up Error", "An unexpected error occurred during sign up.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <BackButton text="Back" />
      </View>
      
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, isSigningUp && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={isSigningUp || !email || !password}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>
            {isSigningUp ? "Signing Up..." : "Sign Up"}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>
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
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
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
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#A5C8F7',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 5,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  linkText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
  }
}); 