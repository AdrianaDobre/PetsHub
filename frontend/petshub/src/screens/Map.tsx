import React, { useEffect, useRef, useState } from 'react';

import { Actionsheet , Button, Image,  View, Text, useDisclose, Flex } from 'native-base';
import {  StyleSheet } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from '../selectors/auth';
import { NETWORK_IP } from '../util/constant';

const Map = ({}) => {
  const mapRef = useRef(null);
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  const token = useSelector(isUserAuthenticatedSelector);
  const [activitiesOnMap, setActivitiesOnMap] = useState([]);
  const [locationToCenter, setLocationToCenter] = useState<{
    name: string;

    latitude: number;

    longitude: number;

    latitudeDelta: number;

    longitudeDelta: number;
}>({
  name: 'me',

  latitude: 44.4268,
  longitude: 26.1025,
  latitudeDelta: 0.04,
  longitudeDelta: 0.04,
});

useEffect(() => {
  const getProducts = async () => {
    // try {
      
    //     const response = await fetch(
    //         `http://${NETWORK_IP}:7262/Product/getProductsOnMap`,
    //         {
    //           method: "GET",
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //         }
    //     );
    //     if(response.ok){
    //       const data = await response.json();

       
    //     setActivitiesOnMap(data.products)
    //     setLocationToCenter({...locationToCenter, latitude: data.latitude, longitude: data.lonfitude})
    //     }

        
    // } catch (error) {
    // }

    setActivitiesOnMap([{
      name: "Test",
      latitude: 45,
      longitude: 22,
    },
    {
      name: "Test2",
      latitude: 44.52,
      longitude: 23.12,
    }])

  };
  getProducts();
}, [])
const showLocationsOfInterest = () => {
  const toViewOnMap: any = [];
  console.log("activitiesOnMap", activitiesOnMap);

  activitiesOnMap?.forEach((activity) => {
      toViewOnMap.push(activity);
  })

 // console.log("VIEW ON MAP", toViewOnMap);
  return toViewOnMap.map((activity: any, index: number) => {
      return (
          <Marker
              key={index}
              coordinate={{
                  latitude: activity.latitude,

                  longitude: activity.longitude,
              }}
              //draggable

              //coordinate={draggableMarkerCoord}

              //onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}

              onPress={() => {
                  setLocationToCenter({
                      name: activity.name,

                      latitude: activity.latitude,

                      longitude: activity.longitude,

                      latitudeDelta: 0.04,

                      longitudeDelta: 0.04,
                  });
                  onOpen();
              }}
              //title={activity.name}
          >
              
          </Marker>
      );
  });
};

  return (
  <View mb={50}>
    <Actionsheet isOpen={isOpen} onClose={onClose}>
  <Actionsheet.Content>
 
  </Actionsheet.Content>
</Actionsheet>
    <MapView
                    ref={mapRef}
                    showsUserLocation={true}
    showsMyLocationButton={true}
                    style={styles.map}
                    //onRegionChange={() => console.log("change")}

                    region={locationToCenter}
                    initialRegion={{
                        latitude: 44.4268,

                        longitude: 26.1025,

                        latitudeDelta: 0.04,

                        longitudeDelta: 0.04,
                    }}
                >
                    {showLocationsOfInterest()}
                    
                </MapView>
  </View>);
};

const styles = StyleSheet.create({
  map: {
      height: "100%",
      width: "100%",
  }
});

export default Map;
