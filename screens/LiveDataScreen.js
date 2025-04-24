import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const LiveDataScreen = () => {
  const [data, setData] = useState({
    temperature: 0,
    humidity: 0,
    soil_moisture: 0
  });

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.8.103:8080/PlantSystem/api/sensors/data');
        const sensorData = await response.json();
        setData({
          temperature: sensorData.temperature,
          humidity: sensorData.humidity,
          soil_moisture: sensorData.soil_moisture
        });
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData(); // Fetch data once when the component mounts

    
    const timer = setInterval(fetchData, 5000);

    return () => clearInterval(timer); 
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/plant.png')} 
          style={styles.image}
        />
      </View>
      
      <Text style={styles.title}>Live Data</Text>
      <Text style={styles.text}>Temperature: {data.temperature.toFixed(2)}°C</Text>
      <Text style={styles.text}>Humidity: {data.humidity.toFixed(2)}%</Text>
      <Text style={styles.text}>Soil Moisture: {data.soil_moisture.toFixed(2)}</Text>

      {/* Chart for visualization */}
      <LineChart
        data={{
          labels: ['Temperature', 'Humidity', 'Soil Moisture'],
          datasets: [
            {
              data: [data.temperature, data.humidity, data.soil_moisture]
            }
          ]
        }}
        width={325} 
        height={245}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#013220',
          backgroundGradientTo: '#39ff14',
          decimalPlaces: 2, 
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
    padding: 20,             
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center', 
  },
  text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5, 
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
    width: 275, 
    height: 275, 
    borderRadius: 10, 
  },
});

export default LiveDataScreen;
