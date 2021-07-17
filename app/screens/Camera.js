import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {
  FAB,
  Portal,
  Provider,
  Card,
  Title,
  Paragraph,
  Modal,
  Button,
} from 'react-native-paper';
import CameraRoll from '@react-native-community/cameraroll';

function Camera(props) {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: '#fff',
    padding: 20,
    height: '50%',
    width: '100%',
    position: 'absolute',
    bottom: 0,
  };

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

  const savePhoto = () => {
    // CameraRoll.save(image, {type: 'photo', album: 'cameraScanner'})
    //   .then(() => alert('Document Saved in gallery'))
    //     .catch(err => alert('Image not save', err));
    const uri = image;

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file:///', '') : uri;
    console.log('filename', filename);
    console.log('uploadUri', uploadUri);
  };
  return (
    <View style={styles.container}>
      {image === null ? null : (
        <Image source={{uri: image}} style={{width: '100%', height: '70%'}} />
      )}

      <Button
        style={{marginVertical: 20}}
        mode="contained"
        onPress={takePhotoFromCamera}>
        Open camera
      </Button>
      <Button mode="contained" onPress={showModal}>
        Save photo
      </Button>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text style={{color: '#000'}}>
              Example Modal. Click outside this area to dismiss.
            </Text>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Camera;
