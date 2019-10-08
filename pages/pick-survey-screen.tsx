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

const PickSurveyScreen = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [initialList, setInitialList] = useState([]);
  useEffect(() => {
    const url = getUrl("หญิง", 20);
    if (initialList.length === 0)
      superagent
        .get(url)
        .then(data => data.body)
        .then(data => {
          setList(data);
          setInitialList(data);
        });
  });

  const updateSearch = value => {
    setSearch(value);
    debounce(() => {
      if (value.length !== 0) {
        const filteredList = initialList.filter(
          it => it.CateName.toLowerCase().search(value) !== -1
        );
        setList(filteredList);
      } else setList(initialList);
    }, 1000)();
  };
  const renderItem = ({ item }: { item: { CateName: string; id: number } }) => {
    return (
      <ListItem
        onPress={() => {
          console.log(item)
          navigation.navigate("pickSurvey2", {
            cateId: item.Cateid
          });
        }}
        title={item.CateName}
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
const baseUrl = "http://run.ict.mahidol.ac.th:443";
const getUrl = (patientGender, patientAge) => {
  let list = "0";
  if (patientGender == "หญิง" && patientAge >= 20 && patientAge <= 60) {
    //เพศหญิง 20-60
    list += ",29";
  }
  if (patientAge >= 3 && patientAge <= 13) {
    //age 3-13
    list += ",30";
  }
  if (patientAge >= 10 && patientAge <= 19) {
    //age 10-24
    list += ",2";
  }
  if (patientAge >= 20 && patientAge <= 60) {
    //age 20-60
    list += ",3";
  }
  if (patientAge >= 60) {
    //age 60++
    list += ",4";
  }
  return baseUrl + "/cate_list?list=" + list;
};

PickSurveyScreen.navigationOptions = () => {
  return {
    title: "เลือกแบบสอบถาม"
  };
};

export default PickSurveyScreen;
