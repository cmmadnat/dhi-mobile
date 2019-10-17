import React, { useState } from 'react';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button, SafeAreaView, Linking, Share } from 'react-native';
import { Text, Button as ElementButton } from 'react-native-elements'
import { NavigationStackProp } from 'react-navigation-stack';
import superagent from 'superagent'
import { getCurrentPatient } from '../components/service/patient-service';
import { getToken } from '../components/service/login-service';
import { baseUrl } from '../components/service/constant';
import { useActionSheet } from '@expo/react-native-action-sheet'
import { FontAwesome } from '@expo/vector-icons';

const PickLocationScreen =
  ({ navigation }: { navigation: NavigationStackProp }) => {
    const [lat, setLat] = useState(navigation.getParam('lat'))
    const [lng, setLng] = useState(navigation.getParam('lng'))
    const { showActionSheetWithOptions } = useActionSheet();

    const _onOpenActionSheet = () => {
      // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
      const options = ['คัดลอกตำแหน่ง', 'เปิดด้วย Google Map', 'ยกเลิก'];
      const cancelButtonIndex = 2;

      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          // Do something here depending on the button index selected
          switch (buttonIndex) {
            case 0: Share.share({ message: `ตำแหน่งบ้านคนไข้ ที่ ${lat},${lng}` }); break;
            case 1: Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`)
          }
        },
      );
    };

    return (
      <SafeAreaView style={styles.container} >
        <MapView style={styles.mapStyle} onLongPress={(e: MapEvent) => {
          const coordinate = e.nativeEvent.coordinate;
          setLat(coordinate.latitude)
          setLng(coordinate.longitude)

          navigation.setParams({ lat: coordinate.latitude })
          navigation.setParams({ lng: coordinate.longitude })
        }} >
          {
            lat !== null && lng !== null &&
            <Marker coordinate={{ latitude: lat, longitude: lng }}
              title="ตำแหน่งบ้านคนไข้" ></Marker>
          }
        </MapView>
        <View style={{ height: 40, position: 'absolute', bottom: 40, alignItems: 'center', left: 0, right: 0, display: 'flex' }}>
          <Text style={{ backgroundColor: 'white', textAlign: 'center', width: 300 }}>กรุณากดค้างบนแผนที่บนตำแหน่งของบ้านคนไข้และกดบันทึกด้านขวาบนเพื่อบันทึก</Text>
        </View>
        <View style={{ height: 40, position: 'absolute', top: 100, alignItems: 'center', left: 0, right: 0, display: 'flex' }}>
          <ElementButton title='แชร์ที่อยู่หรือนำทาง' icon={<FontAwesome size={16} color={'white'} name='map' style={{ marginRight: 5 }}></FontAwesome>} onPress={_onOpenActionSheet}></ElementButton>
        </View>
      </SafeAreaView>
    );
  }
PickLocationScreen.navigationOptions = ({ navigation }) => ({
  headerRight: (
    <Button
      onPress={async () => {
        const lat = navigation.getParam('lat')
        const lng = navigation.getParam('lng')
        const reload = navigation.getParam('reload')

        setLocation(lat, lng).then(() => {
          alert('บันทึกตำแหน่งบ้านคนไข้เรียบร้อย')
          reload()
          navigation.goBack()
        })
      }}
      title="บันทึก"
    />
  )
})
const setLocation = async (lat: number, lng: number) => {

  const patient = await getCurrentPatient();
  const token = await getToken()
  const patientId = patient.id
  return superagent.post(`${baseUrl}/location/${patientId}`).type('form').send({
    lat: lat, lng: lng
  }).set('Authorization', 'Bearer ' + token)
}


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