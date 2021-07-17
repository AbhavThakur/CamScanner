import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Dimensions,
} from 'react-native';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

function ShowImage(props) {
  console.log(props.route.params.url);
  return (
    <View>
      <ImageBackground
        source={{uri: props.route.params.url}}
        style={{height: height, width: width}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ShowImage;
