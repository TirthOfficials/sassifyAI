import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PersonaCard from '../components/PersonaCard';
import PickupLines from '../components/PickupLines';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.cardsContainer}>
        <PersonaCard 
          id="emily"
          name="Emily" 
          type="Shy Blonde GF" 
          image={require('../assets/emily.png')} 
          isPremium={false} 
        />
        <PersonaCard 
          id="angela"
          name="Angela" 
          type="Soft Asian GF" 
          image={require('../assets/angela.png')} 
          isPremium={false} 
        />
        <PersonaCard 
          id="karen"
          name="Karen" 
          type="Crazy White GF" 
          image={require('../assets/karen.png')} 
          isPremium 
        />
        <PersonaCard 
          id="alexis"
          name="Alexis" 
          type="Supportive Friend" 
          image={require('../assets/alexis.png')} 
          isPremium={false} 
        />
      </ScrollView>
      <PickupLines />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cardsContainer: {
    paddingVertical: 40,
    paddingHorizontal: 10,
  }
});

export default HomeScreen;
