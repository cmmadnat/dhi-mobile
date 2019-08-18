import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, FlatList } from "react-native";
import { SearchBar } from "react-native-elements";
import { ListItem } from "react-native-elements";

import { debounce } from "lodash";
import superagent from "superagent";
import {
  getPatient,
  Patient,
  searchPatient
} from "../components/service/patient-service";
import { getHeaderInset } from "../components/header-inset";

const PickSurveyScreen2 = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const url = getUrl(28);
    if (list.length === 0)
      superagent
        .get(url)
        .then(data => data.body)
        .then(data => {
          setList(data);
        });
  });

  const updateSearch = value => {
    setSearch(value);
    debounce(() => {
      searchPatient(value).then(data => setList(data));
    }, 1000)();
  };
  const renderItem = ({ item }: { item: { name: string; id: number } }) => {
    return (
      <ListItem
        onPress={() => {
          navigation.navigate("showSurvey");
        }}
        title={item.name}
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
const baseUrl = "http://run.ict.mahidol.ac.th:443";
const getUrl = category => {
  return "http://run.ict.mahidol.ac.th:443/getActive?cateid=" + category;
};

PickSurveyScreen2.navigationOptions = () => {
  return {
    title: "เลือกแบบสอบถาม"
  };
};

export default PickSurveyScreen2;
