import React, { useEffect, useRef, useState } from 'react';

import { Actionsheet, Button, Image, View, Text, useDisclose, Flex, Avatar, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import { useSelector } from 'react-redux';
import { isUserAuthenticatedSelector } from '../selectors/auth';
import { NETWORK_IP } from '../util/constant';
import { useNavigation } from '@react-navigation/native';
import Routes from '../navigation/routes';

const Map = ({ }) => {
  const mapRef = useRef(null);
  const navigation = useNavigation();
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

  const getPetImagePath = (petType) => {
    let petImagePath = null;
    switch (petType.toLowerCase()) {
      case 'dog':
        petImagePath = require('../../assets/dog.jpg');
        break;
      case 'cat':
        petImagePath = require('../../assets/cat.jpg');
        break;
      // Add more cases for other pet types as needed
      default:
        // Default image if the pet type is not recognized
        petImagePath = require('../../assets/dog.jpg');
        break;
    }

    return petImagePath;
  }

  useEffect(() => {
    const getProducts = async () => {
      try {

        const response = await fetch(
          `http://${NETWORK_IP}:7262/User/listOfPetSittersOnTheMap`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();

          console.log(data)
          if (data.length > 0) {
            setActivitiesOnMap(data)
            //setLocationToCenter({...locationToCenter, latitude: data[0].latitude, longitude: data[0].longitude})

          }
        }


      } catch (error) {
      }



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
            latitude: activity.locationLatitude,

            longitude: activity.locationLongitude,
          }}
          //draggable

          //coordinate={draggableMarkerCoord}

          //onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}

          onPress={() => {
            setLocationToCenter({
              name: activity.title,

              latitude: activity.locationLatitude,

              longitude: activity.locationLongitude,

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
          {activitiesOnMap.filter((a) => a.locationLatitude === locationToCenter.latitude && a.locationLongitude === locationToCenter.longitude).map((a) => {
            return (
              <Pressable onPress={() => { 
                const product = {
                  id: a.listingId,
                  title: a.title,
                  petType: a.petType,
                  creatorName: a.name,
                  description: a.description,
                  price: a.price,
                  time: a.time
                }
                onClose();
                navigation.navigate(Routes.PRODUCT, { product });
              }}>

                <Flex
                  my='1'
                  mx='2'
                  height='130px'
                  bg='#F5F5F5'
                  px='5'
                  py='2'
                  borderRadius={'xl'}
                  direction='row'
                  alignItems='center'
                  justifyContent={'space-between'}
                  w={'100%'}
                >
                  <Image
                    mr='2'
                    alt={`mini-photo`}
                    height='80px'
                    width='80px'
                    bg='muted.200'
                    borderRadius='xl'
                    source={getPetImagePath(a.petType)}
                  />

                  <Flex gap={1} justifyContent='center' alignItems={'center'}>

                    <Flex direction="row" alignItems={'center'} gap={2}>
                      <Text fontWeight={'bold'} color='grey.500' fontSize={'sm'}>{a.title.length > 30 ? `${a.title.substring(0, 30)}...` : a.title}</Text>
                    </Flex>
                    <Flex direction={'row'} alignItems={'center'} gap={2}>
                      <Avatar
                        bg='#02463D'
                        mr='1'
                        size='xs'
                        source={{
                          uri: 'https://bit.ly/broken-link',
                        }}
                      >
                        {`${a.name.split(' ')[0][0]}${a.name.split(' ')[1][0]}`}
                      </Avatar>
                      <Text color='grey.500' fontSize={'sm'}>{`${a.name}`}</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Pressable>
            )
          })}
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
