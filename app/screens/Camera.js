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
  ScrollView,
  Alert,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import {Formik} from 'formik';

function Camera({navigation}) {
  const [image, setImage] = useState(null);

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

  const savePhoto = async db => {
    const uri = image;

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file:///', '') : uri;
    console.log('filename', filename);
    console.log('uploadUri', uploadUri);
    await AsyncStorage.setItem('filename', db.name);
    CameraRoll.save(image, {type: 'photo', album: db.name})
      .then(() => upload(db))
      .catch(err => alert('Image not save', err));
  };

  const upload = val => {
    //function to make two option alert
    Alert.alert(
      //title
      'Successfully Added to Gallery',
      //body
      'Do you want to add more images to folder',
      [
        {
          text: 'Yes',
          onPress: () => navigation.replace('AddImage', val.name),
        },
        {
          text: 'Go Home',
          onPress: () => navigation.navigate('Home'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
      //clicking out side of alert will not cancel
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Title>Step 1: Open Camera</Title>
      <Button style={styles.btn} mode="contained" onPress={takePhotoFromCamera}>
        Open camera
      </Button>
      {image === null ? null : (
        <Image source={{uri: image}} style={{width: '100%', height: '75%'}} />
      )}
      {image === null ? null : (
        <Button style={styles.btn} mode="contained" onPress={toggleModal}>
          Save Document
        </Button>
      )}

      <Modal isVisible={isModalVisible}>
        <View style={styles.centeredView}>
          <Formik
            initialValues={{
              name: '',
            }}
            onSubmit={values => savePhoto(values)}
            validationSchema={yup.object().shape({
              name: yup
                .string()
                .min(4)
                .required('Please provide the name of folder'),
            })}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Save Document in Gallery</Text>
                <TextInput
                  placeholder="Enter the folder name"
                  placeholderTextColor="#ccc"
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={() => setFieldTouched('name')}
                  style={{color: '#000'}}
                />
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
                </View>
                {touched.name && errors.name && (
                  <Text style={{fontSize: 12, color: '#FF0D10'}}>
                    {errors.name}
                  </Text>
                )}
                <Button
                  style={[
                    styles.button,
                    {backgroundColor: '#2196F3', width: '70%', marginTop: 10},
                  ]}
                  mode="contained"
                  disabled={!isValid}
                  onPress={handleSubmit}>
                  Save Document
                </Button>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={toggleModal}>
                  <Text style={styles.textStyle}>close </Text>
                </Pressable>
              </View>
            )}
          </Formik>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingBottom: 50,
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
    alignSelf: 'center',
  },
});

export default Camera;
