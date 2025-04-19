import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💳</Text>
      <Text style={styles.price}>$ 6.9</Text>
      <TextInput placeholder="Card number" style={styles.input} />
      <View style={styles.row}>
        <TextInput placeholder="MM/YY" style={styles.inputHalf} />
        <TextInput placeholder="CVC" style={styles.inputHalf} />
      </View>
      <TouchableOpacity style={styles.payButton}><Text style={styles.payText}>Pay</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 30, alignItems: 'center' },
  title: { fontSize: 60 }, price: { fontSize: 24, marginVertical: 20 },
  input: { backgroundColor: '#eee', width: '100%', padding: 10, marginVertical: 10, borderRadius: 10 },
  row: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  inputHalf: { backgroundColor: '#eee', width: '48%', padding: 10, borderRadius: 10 },
  payButton: { backgroundColor: '#7B61FF', paddingHorizontal: 50, paddingVertical: 10, marginTop: 20, borderRadius: 30 },
  payText: { color: '#fff', fontWeight: 'bold' }
});

export default PaymentScreen;
