import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentScreen from '../screens/PaymentScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarIcon: ({ color, size }) => <Ionicons name="grid" size={size} color={color} />
    }} />
    <Tab.Screen name="Favorites" component={FavoritesScreen} options={{
      tabBarIcon: ({ color, size }) => <Ionicons name="heart" size={size} color={color} />
    }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{
      tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
    }} />
    <Tab.Screen name="Payment" component={PaymentScreen} options={{
      tabBarIcon: ({ color, size }) => <Ionicons name="card" size={size} color={color} />
    }} />
  </Tab.Navigator>
);

export default BottomTabNavigator;
