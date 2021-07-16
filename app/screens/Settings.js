import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Settings(props) {
  return (
    <View style={styles.container}>
      <Text>settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Settings;
