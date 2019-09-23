import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Button, Icon, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import ImageView from "react-native-image-view";

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
      setHasCameraPermission(status === "granted");
    };
    check();
  });
  const openCamera = () => {};
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
            onPress={() => {
              ImagePicker.launchCameraAsync({
                allowsEditing: true,
                mediaTypes: ImagePicker.MediaTypeOptions.Images
              });
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
            onPress={() => {
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
        {[1, 2, 3, 4, 5, 6].map(() => (
          <TouchableOpacity
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
