import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView } from "react-native";
import supabase from "../lib/supabase";
import { useRouter, useLocalSearchParams } from 'expo-router';

// Define __DEV__ type for TypeScript
declare const __DEV__: boolean;

export default function ResetPasswordScreen() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [email, setEmail] = useState("");
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [hash, setHash] = useState<string | null>(null);
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    // Extract hash/token from URL or params
    const extractTokenFromParams = async () => {
      try {
        // Log what params we received for debugging
        const paramsReceived = JSON.stringify(params);
        setDebugInfo(`Params received: ${paramsReceived}\n`);

        // Check for token in different possible locations
        if (params.type === 'recovery' && params.access_token) {
          setHash(params.access_token as string);
          setDebugInfo(prev => prev + `Found access_token in params\n`);
        } else if (params.token) {
          setHash(params.token as string);
          setDebugInfo(prev => prev + `Found token in params\n`);
        } else {
          // For web, try to get from URL
          if (Platform.OS === 'web') {
            const urlParams = new URLSearchParams(window.location.search);
            const tokenFromUrl = urlParams.get('token') || urlParams.get('access_token');
            
            if (tokenFromUrl) {
              setHash(tokenFromUrl);
              setDebugInfo(prev => prev + `Found token in URL: ${tokenFromUrl}\n`);
            } else {
              // Check URL hash
              const hashParams = new URLSearchParams(window.location.hash.substring(1));
              const tokenFromHash = hashParams.get('token') || hashParams.get('access_token');
              
              if (tokenFromHash) {
                setHash(tokenFromHash);
                setDebugInfo(prev => prev + `Found token in URL hash: ${tokenFromHash}\n`);
              } else {
                setDebugInfo(prev => prev + `No token found in URL or params\n`);
                // If no token is found, allow manual reset
                setShowEmailInput(true);
              }
            }
          } else {
            setDebugInfo(prev => prev + `No token found in params on mobile\n`);
            // On mobile, if we didn't get a token in the deep link
            setShowEmailInput(true);
          }
        }
      } catch (error) {
        console.error("Error extracting token:", error);
        setDebugInfo(prev => prev + `Error extracting token: ${error}\n`);
        setShowEmailInput(true);
      }
    };

    extractTokenFromParams();
  }, [params]);

  const handleResetPassword = async () => {
    // Validate passwords
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // If we have a hash/token
      if (hash) {
        // Use the recovery token to update the password
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (error) throw error;

        Alert.alert(
          "Success",
          "Your password has been updated successfully!",
          [{ text: "Login", onPress: () => router.replace("/login") }]
        );
      } else if (showEmailInput && email) {
        // If user is manually resetting without a token
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        
        if (error) throw error;
        
        Alert.alert(
          "Password Reset Email Sent",
          "Check your email for a password reset link. Click the link to reset your password.",
          [{ text: "OK", onPress: () => router.replace("/login") }]
        );
      } else {
        // If no hash/token and no email
        Alert.alert(
          "Error",
          "No reset token found. Please request a new password reset email.",
          [{ text: "Go to Login", onPress: () => router.replace("/login") }]
        );
      }
    } catch (error: any) {
      console.error('Error resetting password:', error);
      setDebugInfo(prev => prev + `Error during reset: ${error.message}\n`);
      Alert.alert("Reset Failed", error.message || "Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render based on whether we have a token
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>
      
      {!showEmailInput && hash ? (
        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter new password"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm new password"
              secureTextEntry
              style={styles.input}
            />
          </View>

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleResetPassword}
            disabled={loading || !newPassword || !confirmPassword}
          >
            <Text style={styles.buttonText}>
              {loading ? "Updating Password..." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.message}>
            Enter your email address to receive a password reset link.
          </Text>
          
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

          <TouchableOpacity 
            style={[styles.button, loading && styles.buttonDisabled]} 
            onPress={handleResetPassword}
            disabled={loading || !email}
          >
            <Text style={styles.buttonText}>
              {loading ? "Sending Email..." : "Send Reset Link"}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Debug information section - useful for troubleshooting */}
      {__DEV__ && debugInfo ? (
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Debug Info</Text>
          <Text style={styles.debugText}>{debugInfo}</Text>
          <Text style={styles.debugText}>Has token: {hash ? 'Yes' : 'No'}</Text>
          <Text style={styles.debugText}>Platform: {Platform.OS}</Text>
        </View>
      ) : null}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Remember your password?</Text>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.linkText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
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
  debugContainer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  debugTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  debugText: {
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
}); 