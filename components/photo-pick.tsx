import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform
} from "react-native";
import { Button, Icon, Image, registerCustomIconType } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ImageView from "react-native-image-view";
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import Prompt from 'rn-prompt'


import { getToken } from "./service/login-service";


const YOUR_SERVER_URL = "http://localhost:8080/photo/upload"

const styles = StyleSheet.create({
  library: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginBottom: 10
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  box: {
    flex: 1,
    padding: 5
  }
});

const PhotoPick = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isImageViewVisible, setIsImageViewVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false)
  const [result, setResult] = useState(null)
  const [location, setLocation] = useState(null)
  const [token, setToken] = useState('')

  useEffect(() => {

    const _getLocationAsync = async () => {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        this.setState({
          errorMessage: 'Permission to access location was denied',
        });
      }

    };

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
  const openCamera = () => { };
  const image =
    "https://ichef.bbci.co.uk/news/320/cpsprodpb/3772/production/_108849141_48752688976_f4a356d82b_z.jpg";
  const images = [
    {
      source: {
        uri:
          "https://ichef.bbci.co.uk/news/320/cpsprodpb/3772/production/_108849141_48752688976_f4a356d82b_z.jpg"
      }
    },
    {
      source: {
        uri:
          "https://ichef.bbci.co.uk/news/320/cpsprodpb/3772/production/_108849141_48752688976_f4a356d82b_z.jpg"
      }
    },
    {
      source: {
        uri:
          "https://ichef.bbci.co.uk/news/320/cpsprodpb/3772/production/_108849141_48752688976_f4a356d82b_z.jpg"
      }
    }
  ];

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
        {[1, 2, 3, 4, 5, 6].map((it) => (
          <TouchableOpacity
            key={it}
            onPress={() => {
              setIsImageViewVisible(true);
            }}
          >
            <Image
              source={{ uri: image }}
              style={styles.imageStyle}
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        ))}
      </View>
      <ImageView
        images={images}
        imageIndex={0}
        isVisible={isImageViewVisible}
        onClose={() => {
          setIsImageViewVisible(false);
        }}
      />
      <Prompt
        title="Say something"
        placeholder="Start typing"
        defaultValue="Hello"
        visible={promptVisible}
        onCancel={() => {
          setPromptVisible(false)
        }}
        onSubmit={(value) => {
          upload(result, location, value, token).then(data => {
            setPromptVisible(false)
            return console.log(data);
          }).catch(e => console.error(e))
        }} />
    </SafeAreaView>
  );
};
export default PhotoPick;
function upload(result: any, location: Location.LocationData, description, token: string) {
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
  formData.append('patientId', '0.00')
  return fetch(YOUR_SERVER_URL, {
    method: 'POST',
    body: formData,
    headers: {
      'authorization': 'Bearer ' + token,
      'content-type': 'multipart/form-data',
    },
  });
}

