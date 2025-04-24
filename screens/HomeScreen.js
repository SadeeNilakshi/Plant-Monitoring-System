import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import SensorCards from '../components/SensorCard'; 

export default function HomeScreen({ navigation }) {
  const [sensorData, setSensorData] = useState({
    temperature: 0,
    humidity: 0,
    soil_moisture: 0,
  });

  useEffect(() => {
    
    const fetchSensorData = async () => {
      try {
        const response = await fetch ('http://192.168.8.103:8080/PlantSystem/api/sensors/data');
        const data = await response.json();
        setSensorData({
          temperature: data.temperature,
          humidity: data.humidity,
          soil_moisture: data.soil_moisture,
        });
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchSensorData(); 

   
    const timer = setInterval(fetchSensorData, 5000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/plant.png')} 
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Plant Monitoring System</Text>

      {/* Sensor Cards displaying live data */}
      <SensorCards title="Temperature" value={sensorData.temperature} unit="°C" />
      <SensorCards title="Humidity" value={sensorData.humidity} unit="%" />
      <SensorCards title="Soil Moisture" value={sensorData.soil_moisture}/>

      {/* Navigation Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('LiveData')}
      >
        <Text style={styles.buttonText}>View Live Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2B2D42',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  image: {
    width: 150,
    height: 150,
  },
});
