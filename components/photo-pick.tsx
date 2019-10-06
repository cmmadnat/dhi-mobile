import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { Button, Icon, Image, registerCustomIconType } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ImageView from "react-native-image-view";
import { getToken } from "./service/login-service";

// const YOUR_SERVER_URL = "http://localhost:8080/photo/upload"
const YOUR_SERVER_URL = "http://192.168.101.39:8080/photo/upload"

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
  useEffect(() => {
    const check = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      const { status: status2 } = await Permissions.askAsync(Permissions.CAMERA);
      setHasCameraPermission(status2 === "granted" && status === "granted");
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
                upload(result, token).then(data => console.log(data)).catch(e => console.error(e))
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
              ImagePicker.launchImageLibraryAsync({
                allowsEditing: true
              });
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
    </SafeAreaView>
  );
};
export default PhotoPick;
function upload(result, token) {
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
  formData.append('lat', '0.00')
  formData.append('lng', '0.00')
  formData.append('description', '0.00')
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

