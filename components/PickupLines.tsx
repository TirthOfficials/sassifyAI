import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears! ✨",
  "Do you have a map? I keep getting lost in your eyes! 🗺️",
  "Is your name Google? Because you've got everything I've been searching for! 🔍",
  "Are you a camera? Because every time I look at you, I smile! 📸",
  "Do you like science? Because we've got great chemistry! ⚗️",
  "Are you a parking ticket? Because you've got FINE written all over you! 🎫",
  "Is your name Wi-Fi? Because I'm really feeling a connection! 📶",
  "Do you like coffee? Because I like you a latte! ☕",
  "Are you French? Because Eiffel for you! 🗼",
  "Is this the Hogwarts Express? Because platform 9 and 3/4 isn't the only thing that's magical here! ⚡"
];

export default function PickupLines() {
  const [currentLine, setCurrentLine] = useState(pickupLines[0]);

  const getRandomLine = () => {
    const randomIndex = Math.floor(Math.random() * pickupLines.length);
    setCurrentLine(pickupLines[randomIndex]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Need a conversation starter?</Text>
      <View style={styles.card}>
        <Text style={styles.lineText}>{currentLine}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={getRandomLine}>
        <Text style={styles.buttonText}>Get Another Line 💫</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  lineText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#7B61FF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
}); 