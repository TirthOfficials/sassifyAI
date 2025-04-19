// import React from 'react';
// import { StyleSheet, Text, View, SafeAreaView, ScrollView, Linking } from 'react-native';
// import GirlfriendCard from '../components/GirlfriendCard';

// const girlfriends = [
//   {
//     id: 'blonde',
//     name: 'Emily',
//     title: 'Shy Blonde GF',
//     image: require('../assets/blonde.png'),
//   },
//   {
//     id: 'asian',
//     name: 'Angela',
//     title: 'Soft Asian GF',
//     image: require('../assets/asian.png'),
//   },
//   {
//     id: 'crazy',
//     name: 'Karen',
//     title: 'Wild Karen',
//     image: require('../assets/crazy.png'),
//   },
//   {
//     id: 'friend',
//     name: 'Alexis',
//     title: 'Just a Friend',
//     image: require('../assets/friend.png'),
//   },
// ];

// const Home: React.FC = () => {
//   const handleCall = (personaId: string) => {
//     // Call your backend first
//     fetch('http://<YOUR_BACKEND_IP>:8000/start-call', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         persona: personaId,
//         user_number: '+1YOUR_PHONE_NUMBER',
//       }),
//     });

//     // Then open phone dialer (user must press call)
//     Linking.openURL(`tel:+13158096969`);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.header}>CallHer.AI</Text>
//       <Text style={styles.subtext}>Choose who to talk to</Text>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
//         {girlfriends.map((gf) => (
//           <GirlfriendCard
//             key={gf.id}
//             name={gf.name}
//             title={gf.title}
//             image={gf.image}
//             onPress={() => handleCall(gf.id)}
//           />
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 60,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 28,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtext: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 20,
//   },
//   scrollContainer: {
//     paddingHorizontal: 10,
//   },
// });

// export default Home;

import React from 'react';
import BottomTabNavigator from '../navigation/BottomTabNavigator';

export default function App() {
  return <BottomTabNavigator />;
}
