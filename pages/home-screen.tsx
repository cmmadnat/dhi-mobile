import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import { Button, Icon, SearchBar } from "react-native-elements";
import { ListItem } from "react-native-elements";
//@ts-ignore
import Ionicons from "react-native-vector-icons/Ionicons";
import { debounce } from "lodash";
import {
  getPatient,
  Patient,
  searchPatient
} from "../components/service/patient-service";

const HomeScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  let searchP;
  useEffect(() => {
    if (list.length === 0) getPatient().then(data => setList(data));
  });

  const updateSearch = value => {
    setSearch(value);
    debounce(() => {
      searchPatient(value).then(data => setList(data));
    }, 1000)();
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SearchBar
        lightTheme
        placeholder="Type Here..."
        value={search}
        onChangeText={updateSearch}
      />
      <FlatList
        style={{ flex: 1 }}
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
