import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { Button, Icon } from "react-native-elements";
import { ListItem } from "react-native-elements";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { getPatient, Patient } from "../components/service/patient-service";

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
  const [list, setList] = useState([]);
  useEffect(() => {
    getPatient().then(data => setList(data));
  });
  return (
    <SafeAreaView>
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const renderItem = ({ item }: { item: Patient }) => {
  const subtitle = `${item.gender} - บัตรประชาชน ${item.PatientCID}`;
  return <ListItem title={item.Name} subtitle={subtitle} />;
};

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
