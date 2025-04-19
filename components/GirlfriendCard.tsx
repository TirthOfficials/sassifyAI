import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  name: string;
  title: string;
  image: any;
  onPress: () => void;
};

const GirlfriendCard: React.FC<Props> = ({ name, title, image, onPress }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.callText}>📞 Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 260,
    marginHorizontal: 10,
    borderRadius: 18,
    backgroundColor: '#f0e9ff',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: '#555',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#7f5af0',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  callText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GirlfriendCard;
