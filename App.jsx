import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import WelcomeScreen from './src/screens/Welcome.screen';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// })

export default function App() {
  return (
    <View>
      <WelcomeScreen />
      <StatusBar />
    </View>
  );
}
