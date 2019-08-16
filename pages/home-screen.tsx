import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { ListItem } from "react-native-elements";

import { debounce } from "lodash";
import {
  getPatient,
  Patient,
  searchPatient
} from "../components/service/patient-service";
import { getHeaderInset } from "../components/header-inset";

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
    <ScrollView style={{ flex: 1 }} {...getHeaderInset()}>
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
    </ScrollView>
  );
};

const keyExtractor = (item, index) => index.toString();

HomeScreen.navigationOptions = () => {
  return {
    title: "เลือกคนไข้"
  };
};

export default HomeScreen;
