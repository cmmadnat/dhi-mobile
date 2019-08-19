import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  Button,
  TouchableOpacity
} from "react-native";
import { SearchBar } from "react-native-elements";
import { ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { debounce } from "lodash";
import {
  getPatient,
  Patient,
  searchPatient,
  setCurrentPatient
} from "../components/service/patient-service";
import { getHeaderInset } from "../components/header-inset";
import { logout } from "../components/service/login-service";

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
          setCurrentPatient(item);
          navigation.navigate("patientDetail");
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
        placeholder="ค้นหา ..."
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

HomeScreen.navigationOptions = ({ navigation }) => {
  return {
    title: "เลือกคนไข้",
    headerRight: (
      <TouchableOpacity
        onPress={async () => {
          await logout();
          navigation.navigate("AuthStack");
        }}
      >
        <MaterialCommunityIcons name="logout" size={30} />
      </TouchableOpacity>
    )
  };
};

export default HomeScreen;
