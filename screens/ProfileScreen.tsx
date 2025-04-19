import React from 'react';
import { View, Text, StyleSheet, Image, Switch } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/emily.png')} style={styles.avatar} />
      <Text style={styles.name}>David Anderson</Text>
      <Text style={styles.email}>andrea@domainname.com</Text>

      <View style={styles.option}>
        <Text>🌙 Switch to Dark Mode</Text>
        <Switch />
      </View>
      <View style={styles.option}><Text>✏️ Edit Profile</Text></View>
      <View style={styles.option}><Text>🔖 My Favorites</Text></View>
      
      <View style={styles.appInfo}>
        <Text style={styles.appDescription}>
          Sassify - Your AI Girlfriend Experience 💝{'\n'}
          Connect with unique AI personalities for meaningful conversations and companionship.
        </Text>
      </View>
      
      <View style={styles.logout}><Text>🚪 Log Out</Text></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5
  },
  email: {
    color: '#666',
    marginBottom: 30
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  appInfo: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    width: '100%',
  },
  appDescription: {
    textAlign: 'center',
    color: '#444',
    lineHeight: 22,
  },
  logout: {
    marginTop: 30,
    paddingVertical: 15,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee'
  }
});

export default ProfileScreen;
