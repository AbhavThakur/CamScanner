import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

import CameraRoll from '@react-native-community/cameraroll';
const CameraView = ({navigation}) => {
  const [albumList, setAlbumList] = useState([]);
  const [imageList, setImageList] = useState([]);

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = async () => {
    const result = await CameraRoll.getAlbums({assetType: 'Photos'});
    setAlbumList(result);
  };

  const getPhotosByAlbum = async albumName => {
    const result = await CameraRoll.getPhotos({
      first: 10,
      groupName: albumName,
      assetType: 'Photos',
      include: ['fileSize', 'filename', 'imageSize', 'location'],
    });
    const list = [];
    result.edges.forEach(item => {
      list.push(item.node.image.uri);
    });
    console.log(list);
    setImageList(list);
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <Text style={{marginBottom: 10}}>Select the Album you want to see</Text>
        {albumList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                getPhotosByAlbum(item.title);
              }}
              style={{
                marginBottom: 10,
                borderWidth: 0.5,
                width: Dimensions.get('window').width * 0.95,
                padding: 5,
                flexDirection: 'row',
              }}>
              <Text>Album Name : </Text>
              <Text style={{color: 'red'}}>{item.title}</Text>
              <Text> Number of Photos : </Text>
              <Text style={{color: 'red'}}>{item.count}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <ScrollView horizontal={true}>
          {imageList.length > 0 &&
            imageList.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ShowImage', {
                      url: item,
                    })
                  }
                  key={index}
                  style={{
                    marginBottom: 20,
                    borderWidth: 1,
                    width: 400,
                    height: 300,
                    marginHorizontal: 8,
                  }}>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: item}}
                  />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

export default CameraView;
