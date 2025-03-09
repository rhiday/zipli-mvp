import { useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Platform } from "react-native";
import supabase from "../lib/supabase";
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    console.log("Login button pressed");
    
    // Validate form
    if (!email || !password) {
      Alert.alert("Missing Fields", "Please enter both email and password");
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      console.log("Attempting to sign in with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        console.error("Login error:", error.message);
        Alert.alert("Login Failed", error.message);
        setIsLoggingIn(false);
        return;
      }

      console.log("Sign in successful, fetching user data");
      // 🔹 Fetch user data to check their role
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        console.error("User data fetch error:", userError?.message);
        Alert.alert("Error", "Failed to fetch user data.");
        setIsLoggingIn(false);
        return;
      }

      console.log("User data:", userData.user);
      const role = userData.user.user_metadata?.role;
      console.log("User role:", role);
      
      // Store the user role in AsyncStorage for use throughout the app
      if (role) {
        await AsyncStorage.setItem('userRole', role);
        console.log("Role saved to AsyncStorage:", role);
      }
      
      // Navigate to the main tabs screen
      console.log("Navigating to tabs screen");
      router.replace("/(tabs)");
      
      // Show a welcome message indicating successful login
      Alert.alert(
        "Login Successful", 
        `Welcome ${role ? `(${role})` : ""}! You are now logged in.`
      );
    } catch (err) {
      console.error("Unexpected login error:", err);
      Alert.alert("Login Error", "An unexpected error occurred during login.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Email Required", "Please enter your email address first");
      return;
    }

    setIsResettingPassword(true);

    try {
      // Create the redirect URL based on the platform
      let redirectUrl;
      if (Platform.OS === 'web') {
        // For web, use the window.location.origin
        redirectUrl = `${window.location.origin}/reset-password`;
      } else {
        // For mobile, use a deep link format that your app can handle
        // This requires setting up deep linking in your app
        redirectUrl = 'zipli://reset-password';
      }

      console.log("Sending password reset to:", email, "with redirectUrl:", redirectUrl);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl,
      });

      if (error) throw error;

      Alert.alert(
        "Password Reset Email Sent",
        "Check your email for a password reset link. Click the link to reset your password."
      );
    } catch (error: any) {
      console.error('Error sending reset password email:', error);
      Alert.alert(
        "Failed to Send Reset Email",
        error.message || "An error occurred. Please try again."
      );
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
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
        style={styles.forgotPasswordLink} 
        onPress={handleForgotPassword} 
        disabled={isResettingPassword}
      >
        <Text style={styles.linkText}>
          {isResettingPassword ? "Sending reset email..." : "Forgot your password?"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, isLoggingIn && styles.buttonDisabled]} 
        onPress={handleLogin}
        disabled={isLoggingIn || !email || !password}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push("/signup")}>
          <Text style={styles.linkText}>Sign Up</Text>
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
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
}); 