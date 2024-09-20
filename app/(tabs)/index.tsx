import { Image, View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useEffect, useState } from 'react';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

type Country = {
  name: {
    common: string;
  };
  capital?: string[]; // 'capital' é uma lista de strings, mas nem sempre está presente
  cca3: string;
};

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Erro ao buscar dados: ', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Países</Text>
      <FlatList
        data={countries}
        keyExtractor={(item) => item.cca3}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name.common}</Text>
            <Text>Capital: {item.capital ? item.capital[0] : 'N/A'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default App;
