import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, StatusBar } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (list.length === 0) getPatient().then(data => setList(data));
  });

  const updateSearch = value => {
    setSearch(value);
    debounce(() => {
      searchPatient(value).then(data => setList(data));
    }, 1000)();
  };
  const renderItem = ({ item }: { item: Patient }) => {
    const subtitle = `${item.gender} - บัตรประชาชน ${item.PatientCID}`;
    return (
      <ListItem
        onPress={() => {
          navigation.navigate("pickSurvey");
        }}
        title={item.Name}
        subtitle={subtitle}
      />
    );
  };
  return (
    <View style={{ flex: 1 }}>
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
    </View>
  );
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
    title: "เลือกคนไข้"
  };
};

export default HomeScreen;
