import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "../../components/ui/Button"; // Updated import path

export default function RoleSelectionScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's create a profile for your organisation.</Text>
      <Text style={styles.subtitle}>Continue as:</Text>

      {/* Donor Section */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Donor</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Example</Text>
          <Text style={styles.tag}>Example of donor</Text>
          <Text style={styles.tag}>Example 2</Text>
          <Text style={styles.tag}>Example 3</Text>
        </View>
        <Button 
          title="Continue as donor" 
          onPress={() => router.push("/login")} // Changed to existing route for now
        />
      </View>

      {/* Recipient Section */}
      <View style={styles.roleContainer}>
        <Text style={styles.roleTitle}>Recipient</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tag}>Example</Text>
          <Text style={styles.tag}>Example of recipient</Text>
          <Text style={styles.tag}>Example 2</Text>
          <Text style={styles.tag}>Example 3</Text>
        </View>
        <Button 
          title="Continue as recipient" 
          onPress={() => router.push("/login")} // Changed to existing route for now
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  roleContainer: {
    backgroundColor: "#FDECEC",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 15,
  },
  tag: {
    backgroundColor: "#FFF",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: "500",
  },
}); 