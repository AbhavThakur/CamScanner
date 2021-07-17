import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Platform, Linking} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  FAB,
  Portal,
  Provider,
  Card,
  Title,
  Paragraph,
  Button,
  Divider,
} from 'react-native-paper';
import CameraRoll from '@react-native-community/cameraroll';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Addimage({route}) {
  const [image, setImage] = useState(null);

  const album = route.params;
  console.log(album);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 2000,
      compressImageMaxHeight: 2000,
      multiple: true,
      cropping: true,
      freeStyleCropEnabled: true,
      compressImageQuality: 1,
      cropperToolbarTitle: 'Edit Document',
      mediaType: 'photo',
      enableRotationGesture: true,
    }).then(img => {
      console.log(img);
      setImage(img.path);
    });
  };

  const savePhoto = async () => {
    CameraRoll.save(image, {type: 'photo', album: album})
      .then(() => alert('Document Saved in gallery'))
      .then(() => setImage(null))
      .catch(err => alert('Image not save', err));
  };

  const openPhotos = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media');
        break;
      default:
        console.log('Could not open gallery app');
    }
  };
  return (
    <View style={styles.container}>
      <Button style={styles.btn} mode="contained" onPress={takePhotoFromCamera}>
        Add Images
      </Button>
      {image === null ? null : (
        <Image source={{uri: image}} style={{width: '100%', height: '70%'}} />
      )}
      {image === null ? null : (
        <Button style={styles.btn} mode="contained" onPress={savePhoto}>
          Save Document
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btn: {
    marginVertical: 20,
    width: 200,
    alignSelf: 'center',
  },
});

export default Addimage;
