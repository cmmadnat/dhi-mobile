import React, { useState } from 'react';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import { Text } from 'react-native-elements'
import { NavigationStackProp } from 'react-navigation-stack';


const PickLocationScreen =
  ({ navigation }: { navigation: NavigationStackProp }) => {
    const [lat, setLat] = useState(0.0)
    const [lng, setLng] = useState(0.0)

    return (
      <View style={styles.container} >
        <MapView style={styles.mapStyle} onLongPress={(e: MapEvent) => {
          const coordinate = e.nativeEvent.coordinate;
          setLat(coordinate.latitude)
          setLng(coordinate.longitude)

          navigation.setParams({ lat: coordinate.latitude })
          navigation.setParams({ lng: coordinate.longitude })
        }} >
          {
            lat !== 0.0 && lng !== 0.0 &&
            <Marker coordinate={{ latitude: lat, longitude: lng }}
              title="ตำแหน่งบ้านคนไข้" ></Marker>
          }
        </MapView>
        <View style={{ height: 40, position: 'absolute', bottom: 40, alignItems: 'center', left: 0, right: 0, display: 'flex' }}>
          <Text style={{ backgroundColor: 'white', textAlign: 'center', width: 300 }}>กรุณากดค้างบนแผนที่บนตำแหน่งของบ้านคนไข้และกดบันทึกด้านขวาบนเพื่อบันทึก</Text>
        </View>
      </View >
    );
  }
PickLocationScreen.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <Button
      onPress={() => {
        const lat = navigation.getParam('lat')
        const lng = navigation.getParam('lng')
        alert('lat' + lat + 'lng' + lng)
      }}
      title="บันทึก"
    />
  )
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapStyle: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
export default PickLocationScreen