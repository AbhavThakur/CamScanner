import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

function Profile(props) {
  return (
    <View style={styles.container}>
      <Text>Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Profile;
