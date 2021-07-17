import React from 'react';
import {Image, View, TouchableOpacity, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Welcome from '../screens/Welcome';
import Home from '../screens/Home';
import DrawerContent from './DrawerContent';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import Camera from '../screens/Camera';
import CameraView from '../screens/CameraView';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const MainStack = ({navigation}) => (
  <Stack.Navigator
    mode="modal"
    screenOptions={{headerShown: true}}
    initialRouteName="Welcome">
    <Stack.Screen
      name="Welcome"
      component={Welcome}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerLeft: () => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 10,
            }}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                source={require('../assets/menu.png')}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          </View>
        ),
        headerTitle: 'Documents',
        headerRight: () => (
          <TouchableOpacity
            onPress={() => console.log('notfy')}
            style={{marginEnd: 10}}>
            <Image
              source={require('../assets/notification.png')}
              style={{width: 30, height: 35}}
            />
          </TouchableOpacity>
        ),
        headerShown: true,
      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="Settings"
      component={Settings}
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="Camera"
      component={Camera}
      options={{headerShown: true}}
    />
    <Stack.Screen
      name="CameraView"
      component={CameraView}
      options={{headerShown: true}}
    />
  </Stack.Navigator>
);

const AppStack = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MainStack} />
    </Drawer.Navigator>
  );
};

export default AppStack;
