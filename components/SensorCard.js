import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SensorCards = ({ title, value, unit }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.divider}/>{/* Divider */}
      <Text style={styles.value}>
        {value} {unit}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 6,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: "center", 
    justifyContent: "center", 
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center", 
  },
  divider: {
    height: 1,
    width: "80%", 
    backgroundColor: "#ccc",
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    color: "#007BFF",
    textAlign: "center", 
  },
});

export default SensorCards;
