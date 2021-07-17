import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
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

function Camera(props) {
  const [image, setImage] = useState(null);
  const [txt, settxt] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
    const uri = image;

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file:///', '') : uri;
    console.log('filename', filename);
    console.log('uploadUri', uploadUri);

    CameraRoll.save(image, {type: 'photo', album: txt})
      .then(() => alert('Document Saved in gallery'))
      .catch(err => alert('Image not save', err));
  };
  return (
    <View style={styles.container}>
      <Button style={styles.btn} mode="contained" onPress={takePhotoFromCamera}>
        Open camera
      </Button>
      {image === null ? null : (
        <Image source={{uri: image}} style={{width: '100%', height: '70%'}} />
      )}

      <Button style={styles.btn} mode="contained" onPress={toggleModal}>
        Save Document
      </Button>
      <Modal isVisible={isModalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Save Document in Gallery</Text>
            <TextInput
              placeholder="Enter the file name"
              value={txt}
              onChangeText={text => settxt(text)}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
            </View>
            <Text>{txt}</Text>

            <Pressable
              style={[
                styles.button,
                {backgroundColor: '#2196F3', width: '70%', marginTop: 10},
              ]}
              onPress={savePhoto}>
              <Text style={styles.textStyle}>Save Document in Gallery</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={toggleModal}>
              <Text style={styles.textStyle}>close </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    height: '50%',
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    width: '50%',
    //   marginVertical: 20,
    position: 'absolute',
    bottom: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    marginVertical: 20,
    width: 200,
  },
});

export default Camera;
