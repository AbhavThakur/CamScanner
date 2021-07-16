import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';

function Welcome({navigation}) {
  setTimeout(() => {
    navigation.navigate('Home'); // Stack Name
  }, 1500);

  return (
    <View style={styles.container}>
      <LottieView autoPlay loop source={require('../assets/scan.json')} />
      <Text style={styles.txt}>Welcome</Text>
      <Text style={styles.txt1}>To</Text>
      <Text style={styles.txt1}>CamScanner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  txt: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 70,
    marginLeft: 15,
  },
  txt1: {
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export default Welcome;
