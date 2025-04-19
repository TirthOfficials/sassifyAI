import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  Home: undefined;
  Payment: undefined;
  Profile: undefined;
  Favorites: undefined;
};

type NavigationProp = BottomTabNavigationProp<RootStackParamList>;

type PersonaCardProps = {
  name: string;
  type: string;
  image: any;
  isPremium: boolean;
  id: string;
};

export default function PersonaCard({ name, type, image, isPremium, id }: PersonaCardProps) {
  const navigation = useNavigation<NavigationProp>();
  const [isFavorite, setIsFavorite] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      checkIfFavorite();
    }
  }, [isFocused]);

  const checkIfFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const favList = JSON.parse(favorites);
        setIsFavorite(favList.includes(id));
      }
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  const toggleFavorite = async () => {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      let favList = favorites ? JSON.parse(favorites) : [];
      
      if (isFavorite) {
        favList = favList.filter((favId: string) => favId !== id);
      } else {
        favList.push(id);
      }
      
      await AsyncStorage.setItem('favorites', JSON.stringify(favList));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleCall = () => {
    if (isPremium) {
      navigation.navigate('Payment');
    } else {
      Linking.openURL('tel:+13158096969');
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.favoriteButton} 
        onPress={toggleFavorite}
      >
        <Ionicons 
          name={isFavorite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavorite ? "#FF69B4" : "#666"} 
        />
      </TouchableOpacity>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.sub}>{type}</Text>
      {isPremium && <Text style={styles.premium}>Premium 💎</Text>}
      <TouchableOpacity 
        style={[styles.button, isPremium && styles.premiumButton]} 
        onPress={handleCall}
      >
        <Text style={styles.btnText}>{isPremium ? '💎 Unlock' : '📞 Call'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EEE6FF',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 10,
    width: 170,
    height: 240,
    position: 'relative'
  },
  favoriteButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 5
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10
  },
  sub: {
    color: '#555',
    fontSize: 12
  },
  premium: {
    color: '#FF69B4',
    fontSize: 12,
    marginTop: 3
  },
  button: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 30,
    marginTop: 10
  },
  premiumButton: {
    backgroundColor: '#FF69B4',
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  }
});
