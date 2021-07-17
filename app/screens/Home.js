import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  BackHandler,
  Image,
  Avatar,
  TouchableOpacity,
  Platform,
  Linking,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {
  FAB,
  Portal,
  Provider,
  Card,
  Title,
  Paragraph,
  Modal,
  Text,
  Button,
} from 'react-native-paper';

function Home({navigation}) {
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

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

  const {open} = state;
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit app?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => backHandler.remove();
    }, []),
  );
  const openPhotos = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('photos-redirect://');
        break;
      case 'android':
        Linking.openURL('content://media/internal/images/media/');
        break;
      default:
        console.log('Could not open gallery app');
    }
  };
  const cloud = () => {
    switch (Platform.OS) {
      case 'ios':
        Linking.openURL('https://www.filestack.com/');
        break;
      case 'android':
        Linking.openURL('https://www.filestack.com/');
        break;
      default:
        console.log('Could not open gallery app');
    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Welcome!</Title>
          <Paragraph>Scan and Upload Documents</Paragraph>
        </Card.Content>
      </Card>
      <Card.Title
        title="Documents"
        subtitle="Date"
        left={props => (
          <Image
            source={require('../assets/doc.png')}
            style={{width: 40, height: 40}}
          />
        )}
        right={props => (
          <TouchableOpacity onPress={showModal}>
            <Image
              source={require('../assets/menuv.png')}
              style={{width: 40, height: 40}}
            />
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 50,
        }}>
        <TouchableOpacity
          style={styles.imgcontainer}
          onPress={() => navigation.navigate('Camera')}>
          <Image source={require('../assets/camera.png')} style={styles.img} />
          <Text>Open camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imgcontainer}
          onPress={() => navigation.navigate('CameraView')}>
          <Image source={require('../assets/pic.png')} style={styles.img} />
          <Text>View Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imgcontainer} onPress={openPhotos}>
          <Image source={require('../assets/gallery.png')} style={styles.img} />
          <Text>Open Gallery</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.cloud} onPress={cloud}>
        <Image source={require('../assets/cloud.png')} style={styles.img} />
        <Text>Upload on Cloud</Text>
      </TouchableOpacity>

      <Provider>
        <Portal>
          <FAB.Group
            open={open}
            icon={
              open ? (
                <Image source={require('../assets/camera.png')} />
              ) : (
                <Image source={require('../assets/plus.png')} />
              )
            }
            actions={[
              {
                icon: <Image source={require('../assets/plus.png')} />,
                onPress: () => console.log('Pressed add'),
              },
              {
                icon: <Image source={require('../assets/doc.png')} />,
                label: 'Documents',
                onPress: () => navigation.navigate('CameraView'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
      <Provider>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <Text style={{color: '#000'}}>
              Latest features coming soon 🔜🔜🔜
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
    backgroundColor: '#fff',
  },
  img: {
    width: 40,
    height: 40,
  },
  imgcontainer: {
    alignItems: 'center',
  },
  cloud: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

export default Home;
