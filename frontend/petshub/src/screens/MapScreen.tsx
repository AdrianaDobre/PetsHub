import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import { Badge, Button, Flex, Text, Tooltip } from "native-base";
import { default as React, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Callout, Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { GOOGLE_API_KEY } from "../secrets";
import { NETWORK_IP } from "../util/constant";

const MapScreen = ({ navigation }: any) => {
    const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
        latitude: 11,
        longitude: 60,
    });

    let ref: any = useRef(null);

    const [locationsOfInterest, setLocationsOfInterest] = useState<
        {
            title: string;
            place_id: string;
            location: { latitude: number; longitude: number };
        }[]
    >([]);

    const mapRef = useRef(null);

    const onRegionChange = (region: any) => {
        //console.log(region);
    };

    const showLocationsOfInterest = () => {
        return locationsOfInterest.map((item, index) => {
            return <Marker key={index} coordinate={item.location} title={item.title} />;
        });
    };
    const showLocationsOfInterestText = () => {
        return locationsOfInterest.map((item, index) => {
            return (
                <Tooltip
                    label={item.title}
                    openDelay={500}
                    bg="indigo.500"
                    _text={{
                        color: "#fff",
                    }}
                    key={index}
                >
                    <Badge key={index}>{item.title.substring(0, 10)}</Badge>
                </Tooltip>
            );
        });
    };

    const takeSnapshotAndShare = async () => {
        console.log("intrat");
        const aux: any = mapRef.current;
        const snapshot = aux
            ? await aux.takeSnapshot({
                  width: 300,
                  height: 300,
                  result: "base64",
              })
            : alert("An error occured");
        //console.log(snapshot);
        const uri = FileSystem.documentDirectory + "snapshot.png";
        await FileSystem.writeAsStringAsync(uri, snapshot, { encoding: FileSystem.EncodingType.Base64 });
        await shareAsync(uri);
    };

    const manageGoogleResultData = (data: any, details: any) => {
        console.log(data.place_id);
        setLocationsOfInterest([
            ...locationsOfInterest,
            {
                title: data.description,
                place_id: data.place_id,
                location: {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                },
            },
        ]);
    };

    const calculateLocationsOrder = async () => {
        let origins: any = [];

        locationsOfInterest.map((locationOfInterest: any) => {
            origins.push({
                lat: locationOfInterest.location.latitude,
                lng: locationOfInterest.location.longitude,
            });
        });
        console.log("clicked", locationsOfInterest);
        const test = origins.map((coord: any) => `${coord.lat},${coord.lng}`).join("|");

        const response = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${test}&destinations=${test}&units=imperial&key=${GOOGLE_API_KEY}`,
            {}
        );

        const data = await response.json();
        console.log("response", data.rows);
        let matrix: any = [];
        let lineData: any = [];

        if (data.status === "OK") {
            data.rows.forEach((line: any) => {
                line.elements.forEach((element: any) => {
                    console.log("element", element);
                    //TODO de modificat sa ia si ora in calcul
                    const time = parseFloat(element.duration.text.match(/\d+(\.\d+)?/)[0]); // can handle numbers with or without a decimal part.
                    lineData.push(time);
                });
                matrix.push(lineData);
                lineData = [];
            });

            await getOptimalOrderLocations(matrix);
        } else {
            console.log("Error:", data.status);
        }
    };

    async function getOptimalOrderLocations(matrix: any) {
        console.log(matrix);
        console.log(JSON.stringify({ matrix: matrix }));
        const response = await fetch(`http://${NETWORK_IP}:7262/getOptimalOrderLocations`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ matrix: matrix }),
        });

        if (response.ok) {
        } else if (response.status === 412) {
            alert("error");
        }
    }

    return (
        <SafeAreaView>
            <GooglePlacesAutocomplete
                placeholder="Type a place"
                onPress={(data, details = null) => {
                    manageGoogleResultData(data, details);
                }}
                ref={ref}
                query={{ key: GOOGLE_API_KEY }}
                fetchDetails={true}
                onFail={(error) => console.log(error)}
                onNotFound={() => console.log("no results")}
                renderRightButton={() => (
                    <TouchableOpacity
                        onPress={() => {
                            ref.current?.setAddressText("");
                        }}
                        style={styles.clearButton}
                    >
                        <Text>X</Text>
                    </TouchableOpacity>
                )}
                styles={{
                    container: {
                        flex: 0,
                    },
                    description: {
                        color: "#000",
                        fontSize: 16,
                    },
                    predefinedPlacesDescription: {
                        color: "#3caf50",
                    },
                }}
            />

            <Flex style={styles.overlayBox} flex-direction="row-reverse">
                {showLocationsOfInterestText()}
                <Button variant={"ghost"} onPress={() => calculateLocationsOrder()}>
                    Calculate path
                </Button>
            </Flex>
            <MapView
                ref={mapRef}
                style={styles.map}
                onRegionChange={onRegionChange}
                /*initialRegion={}*/
            >
                {showLocationsOfInterest()}
                <Marker
                    draggable
                    pinColor="blue"
                    coordinate={draggableMarkerCoord}
                    onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
                />
                <Marker pinColor="yellow" coordinate={{ latitude: 11, longitude: 59 }}>
                    <Callout>
                        <Text>Here</Text>
                        <Button onPress={() => takeSnapshotAndShare()}>Take Snapshot and Share</Button>
                    </Callout>
                </Marker>
            </MapView>
        </SafeAreaView>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    map: {
        height: "100%",
        width: "100%",
    },
    overlayBox: {
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    clearButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
});
