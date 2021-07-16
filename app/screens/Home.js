import React from 'react';
import {
  View,
  StyleSheet,
  Alert,
  BackHandler,
  Image,
  Avatar,
  TouchableOpacity,
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

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
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
                onPress: () => console.log('Pressed star'),
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
    backgroundColor: '#fff',
  },
});

export default Home;
