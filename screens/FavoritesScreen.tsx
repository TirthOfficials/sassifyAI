import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PersonaCard from '../components/PersonaCard';

// Define the personas data
const allPersonas = {
  emily: {
    id: 'emily',
    name: 'Emily',
    type: 'Shy Blonde GF',
    image: require('../assets/emily.png'),
    isPremium: false
  },
  angela: {
    id: 'angela',
    name: 'Angela',
    type: 'Soft Asian GF',
    image: require('../assets/angela.png'),
    isPremium: false
  },
  karen: {
    id: 'karen',
    name: 'Karen',
    type: 'Crazy White GF',
    image: require('../assets/karen.png'),
    isPremium: true
  },
  alexis: {
    id: 'alexis',
    name: 'Alexis',
    type: 'Supportive Friend',
    image: require('../assets/alexis.png'),
    isPremium: false
  }
};

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favorites yet! 💝</Text>
        <Text style={styles.subText}>Click the heart icon on any persona to add them to your favorites.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Your Favorite AI Companions</Text>
        <View style={styles.cardsContainer}>
          {favorites.map(id => {
            const persona = allPersonas[id as keyof typeof allPersonas];
            if (!persona) return null;
            return (
              <PersonaCard
                key={persona.id}
                {...persona}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  }
});

export default FavoritesScreen;
