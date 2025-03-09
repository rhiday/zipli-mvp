import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import supabase from "../lib/supabase";
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("recipient"); // Default to recipient
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
        options: {
          data: { role },
        },
      });

      if (error) {
        Alert.alert("Sign Up Failed", error.message);
      } else {
        Alert.alert("Success", "Check your email for confirmation!");
        router.push('/login');
      }
    } catch (err) {
      console.error("Unexpected signup error:", err);
      Alert.alert("Sign Up Error", "An unexpected error occurred during sign up.");
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
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

      <Text style={styles.label}>Role</Text>
      <View style={styles.roleButtons}>
        <TouchableOpacity 
          style={[styles.roleButton, role === "donor" && styles.selectedRole]}
          onPress={() => setRole("donor")}
          activeOpacity={0.7}
        >
          <Text style={[styles.roleButtonText, role === "donor" && styles.selectedRoleText]}>
            I'm a Donor
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.roleButton, role === "recipient" && styles.selectedRole]}
          onPress={() => setRole("recipient")}
          activeOpacity={0.7}
        >
          <Text style={[styles.roleButtonText, role === "recipient" && styles.selectedRoleText]}>
            I'm a Recipient
          </Text>
        </TouchableOpacity>
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
  );
}

const styles = StyleSheet.create({
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
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  selectedRole: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  roleButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedRoleText: {
    color: 'white',
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