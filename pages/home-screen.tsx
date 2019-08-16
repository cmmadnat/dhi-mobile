import React from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { ListItem } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";

const list = [
  {
    name: "Amy Farha",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
    subtitle: "Vice President"
  },
  {
    name: "Chris Jackson",
    avatar_url:
      "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
    subtitle: "Vice Chairman"
  }
];
const list2 = [
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list,
  ...list
];

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={list2}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const renderItem = ({ item }) => (
  <ListItem
    title={item.name}
    subtitle={item.subtitle}
    leftAvatar={{ source: { uri: item.avatar_url } }}
  />
);

const keyExtractor = (item, index) => index.toString();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    tabBarIcon: ({ tintColor }) => {
      return <Ionicons name={`md-home`} size={25} color={tintColor} />;
    },
    tabBarColor: "#ff66ff"
  };
};

export default HomeScreen;
