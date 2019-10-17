import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
  Text,
  Dimensions
} from "react-native";
import { Button, Icon, Image, registerCustomIconType } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';

import * as Permissions from "expo-permissions";
import * as Sharing from 'expo-sharing'; // Import the library

import ImageView from "react-native-image-view";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import Prompt from 'rn-prompt'
import superagent from 'superagent'


import { getToken, baseUrl } from "./service/login-service";
import { MaterialIcons } from "@expo/vector-icons";
const { width } = Dimensions.get('window');


const YOUR_SERVER_URL = baseUrl + "/photo/upload"

const styles = StyleSheet.create({
  library: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: 'flex-start',
    flexDirection: "row"
  },
  imageStyle: {
    width: width / 3 - 35,
    height: 100,
    marginBottom: 10
    , marginRight: 10
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  box: {
    flex: 1,
    padding: 5
  },
  footer: {
    display: 'flex',
    width,
    height: 100,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  shareButton: {
    flex: 1,
    marginLeft: 15,
  },
  footerButton: {
    flex: 1,
    marginRight: 15,
  },
  footerText: {
    fontSize: 16, flex: 2,
    color: '#FFF',
    textAlign: 'center'
  },

});

interface PhotoPickProps {
  patientId: number
}
const PhotoPick = ({ patientId }: PhotoPickProps) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false)
  const [result, setResult] = useState(null)
  const [location, setLocation] = useState(null)
  const [token, setToken] = useState('')
  const [photos, setPhotos] = useState()
  const [imageIndex, setImageIndex] = useState(0)

  const getPhotosCheck = async () => {
    const token = await getToken()
    getPhotos(patientId, token).then(data => {
      console.log('get phto')
      const p = data.body.map(it => {
        const path1 = it.path.split('/')
        const path2 = it.path.split('\\')
        const rawFileName = path1.length === 1 ? path2[path2.length - 1] : path1[path1.length - 1]
        return ({ id: it.id, description: it.description, uri: baseUrl + '/patient_photo/' + rawFileName });
      })
      setPhotos(p)
    }
    ).catch(e => { })
  }
  useEffect(() => {

    if (patientId && !photos) getPhotosCheck()

  })
  useEffect(() => {
    const check = async () => {
      const tokenString = await getToken()
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { status: status2 } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status2 === "granted" && status === "granted");
      setToken(tokenString)

      if (Platform.OS === 'android' && !Constants.isDevice) {
        this.setState({
          errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
        });
      } else {
        _getLocationAsync();
      }
    }

    check()
  });

  return (
    <SafeAreaView style={{ display: "flex" }}>
      <View style={styles.container}>
        <View style={styles.box}>
          <Button
            onPress={async () => {

              if (!hasCameraPermission) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                const { status: status2 } = await Permissions.askAsync(Permissions.CAMERA);
                setHasCameraPermission(status2 === "granted" && status === "granted");
              }

              let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images
              });
              if (result.cancelled) {
                return;
              }
              else if (result.cancelled === false) {
                // ImagePicker saves the taken photo to disk and returns a local URI to it
                const token = await getToken()
                let location = await Location.getCurrentPositionAsync({});
                setPromptVisible(true)
                setResult(result)
                setLocation(location)
              }
            }}

            icon={
              <Icon
                name="add-a-photo"
                type="material-icons"
                size={30}
                color="white"
              />
            }
          ></Button>
        </View>
        <View style={styles.box}>
          <Button
            onPress={async () => {
              if (!hasCameraPermission) {
                const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                const { status: status2 } = await Permissions.askAsync(Permissions.CAMERA);
                setHasCameraPermission(status2 === "granted" && status === "granted");
              }
              const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
              });
              if (!result.cancelled) {
                let location = await Location.getCurrentPositionAsync({});
                setPromptVisible(true)
                setResult(result)
                setLocation(location)
              }
            }}
            icon={
              <Icon
                name="photo-library"
                size={30}
                type="material-icons"
                color="white"
              />
            }
          ></Button>
        </View>
      </View>
      <View style={styles.library}>
        {photos ? photos.map((it, index) => (
          <TouchableOpacity
            key={it.id}
            onPress={() => {
              setImageIndex(index)
              setIsImageViewVisible(true);
            }}
          >
            <Image
              source={it}
              style={styles.imageStyle}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        )) : []}
      </View>
      <ImageView
        images={photos ? photos.map(it => ({ source: it, description: it.description, id: it.id })) : []}
        imageIndex={imageIndex}
        isVisible={isImageViewVisible}
        onClose={() => {
          setIsImageViewVisible(false);
        }}
        renderFooter={(currentImage) => {
          const title = currentImage.description
          return (<View style={styles.footer}>
            <TouchableOpacity style={styles.shareButton} onPress={() => sharePhoto(currentImage)}>
              <MaterialIcons name='share' size={32} color="white"></MaterialIcons>
            </TouchableOpacity>
            <Text style={styles.footerText}>{title}</Text>
            <TouchableOpacity style={styles.footerButton} onPress={confirmDelete(setIsImageViewVisible, currentImage, token, getPhotosCheck)}>
              <MaterialIcons name='delete' size={32} color="white" style={{ alignSelf: 'flex-end' }}></MaterialIcons>
            </TouchableOpacity>
          </View>);
        }}
      />
      <Prompt
        title="กรอกรายละเอียดภาพ"
        placeholder="พิมพ์รายละเอียดของภาพถ่าย"
        visible={promptVisible}
        onCancel={() => {
          setPromptVisible(false)
        }}
        onSubmit={(value) => {
          setPromptVisible(false)
          upload(result, location, value, patientId, token).then(data => {
            getPhotosCheck()
          }).then().catch(e => console.error(e))
        }} />
    </SafeAreaView>
  );
};
export default PhotoPick;
const sharePhoto = (image) => {

  FileSystem.downloadAsync(
    image.source.uri,
    FileSystem.cacheDirectory + 'small.jpg'
  )
    .then(({ uri }) => {
      Sharing.shareAsync(uri)
    })
    .catch(error => {
      console.error(error);
    });
}
function confirmDelete(setIsImageViewVisible: React.Dispatch<React.SetStateAction<boolean>>, currentImage: any, token: string, getPhotosCheck: () => Promise<void>) {
  return async () => {
    // Works on both iOS and Android
    Alert.alert('ลบรูป', 'ยืนยันการลบรูป', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK', onPress: async () => {
          setIsImageViewVisible(false);
          await deletePhoto(currentImage.id, token);
          await getPhotosCheck();
        }
      },
    ], { cancelable: false });
  };
}

function upload(result: any, location: Location.LocationData, description: string, patientId: number, token: string) {
  let localUri = result.uri;
  let filename = localUri.split('/').pop();
  // Infer the type of the image
  let match = /\.(\w+)$/.exec(filename);
  let type = match ? `image/${match[1]}` : `image`;
  // Upload the image using the fetch and FormData APIs
  let formData = new FormData();
  // Assume "photo" is the name of the form field the server expects
  // @ts-ignore
  formData.append('image', { uri: localUri, name: filename, type });
  formData.append('lat', location.coords.latitude + '')
  formData.append('lng', location.coords.longitude + '')
  formData.append('description', description)
  formData.append('patientId', patientId + '')
  return fetch(YOUR_SERVER_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'authorization': 'Bearer ' + token,
      'content-type': 'multipart/form-data',
    },
  });
}



const _getLocationAsync = async () => {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    this.setState({
      errorMessage: 'Permission to access location was denied',
    });
  }

};

const getPhotos = (patientId: number, token: string) => {
  return superagent.get(`${baseUrl}/photo/view?patientId=${patientId}`).set('Authorization', 'Bearer ' + token)
}
const deletePhoto = (photoId: number, token: string) => {

  return superagent.get(`${baseUrl}/photo/delete/${photoId}`).set('Authorization', 'Bearer ' + token)
}