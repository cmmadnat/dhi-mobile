import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationStackProp } from 'react-navigation-stack';


export interface LatLng {
  lat: number; lng: number;
}
export interface PatientLocationProps {
  location?: LatLng
  navigation: NavigationStackProp;
  reload: () => void
}
const PatientLocation = ({ reload, location, navigation }: PatientLocationProps) => {
  return (<View>
    <Button title='ดูตำแหน่งบ้าน' icon={<FontAwesome name='map-marker' size={18} style={{ marginRight: 5 }} color='white' />} onPress={() => {
      navigation.navigate('pickLocation', {
        reload,
        lat: (location ? location.lat : null), lng: (location ? location.lng : null)
      });
    }} />
    {
      location &&
      <MapView showsUserLocation={true} style={styles.mapStyle} region={{
        latitude: location.lat, longitude: location.lng, latitudeDelta: 2,
        longitudeDelta: 2,
      }}>
        <Marker
          coordinate={{ latitude: location.lat, longitude: location.lng }}
          title={"บ้านคนไข้"}
          description={"ที่ตั้งบ้านคนไข้"}
        />
      </MapView>
    }
    {
      !location && <Text style={{ textAlign: 'center', marginTop: 10 }}>ไม่มีตำแหน่งบ้านคนไข้</Text>
    }

  </View>);
};

const styles = StyleSheet.create({
  mapStyle: {
    marginTop: 10,
    width: Dimensions.get('window').width - 60,
    height: 200
  },
});

export default PatientLocation

