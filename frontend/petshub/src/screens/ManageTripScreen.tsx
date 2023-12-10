import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { Box, Button, Center, Flex, Heading, Icon, IconButton, ScrollView, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import DashedLine from "react-native-dashed-line";
import { connect } from "react-redux";
import { tokenActionCreators as actionCreators } from "../store/actions/actionCreator";
import { NETWORK_IP } from "../util/constant";
import ViewActivity from "./ViewActivity";

const ManageTripScreen = ({ route, navigation, token }: any) => {
    const [tripData, setTripData] = useState({
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        dayItineraries: [
            {
                activities: "",
                date: "",
            },
        ],
    });
    const [viewDayActivitiesId, setViewDayActivities] = useState(null);
    const [dayActivities, setDayActivities] = useState([]);

    const { tripId } = route.params;

    useEffect(() => {
        const fetchData = async () => {
            try {
                getTripData(tripId);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    const getTripData = async (tripId: string) => {
        const response = await fetch(`http://${NETWORK_IP}:7262/Trip/get-trip-data?tripId=${tripId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        setTripData(data);
    };

    const deleteDayItinerary = async (id: string) => {
        console.log("delete", id);
        try {
            let response = await fetch(`http://${NETWORK_IP}:7262/DayItinerary/delete?id=${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log("delete error", error);
        }

        await getTripData(tripId);
    };

    const getDayActivitiesData = async (id: string) => {
        console.log("id", id);
        let response = await fetch(`http://${NETWORK_IP}:7262/DayItinerary/get-day-activities?id=${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data);
        setDayActivities(data);
    };

    function getDatesBetween(startDate: string, endDate: string) {
        let dateArray = [];

        var currentDate = moment(startDate);
        var end = moment(endDate);

        while (currentDate <= end) {
            dateArray.push(currentDate.format("YYYY-MM-DD"));
            currentDate.add(1, "days");
        }

        return dateArray;
    }

    const datesBetween = getDatesBetween(tripData?.startDate, tripData?.endDate);

    return (
        <ScrollView bgColor={"white"}>
            {/* <Flex h={"30%"}>
                <Image source={require("../../assets/images/balloons.png")} alt="manageTrip" />
            </Flex> */}
            <Flex
               
                overflow={"hidden"}
                bgColor={"white"}
                borderColor={"white"}
                borderWidth={2}
                borderRadius={"3xl"}
            >
                <Center>
                    <Box
                        _dark={{
                            bg: "coolGray.800",
                        }}
                        _light={{
                            bg: "white",
                        }}
                        flex="1"
                        safeAreaTop
                        maxW="400px"
                        w="100%"
                    >
                        <Flex direction="row" alignItems={"center"}>
                            <Heading p="4" pb="3" size="lg">
                                Manage trip - {tripData?.title}
                            </Heading>
                        </Flex>
                        <Flex direction="column">
                            {tripData?.dayItineraries.map((dayItinerary: any) => {
                                return (
                                    <Flex bg="white" safeArea flex="1" key={dayItinerary.id}>
                                        <Box pl="4" pr="5" py="2">
                                            <Flex direction={"row"} width={"100%"} mt={"2"}>
                                                <DashedLine
                                                    axis="vertical"
                                                    dashColor="black"
                                                    dashStyle={{ marginRight: 5, marginLeft: 10, borderRadius: 5 }}
                                                    dashThickness={4}
                                                    dashGap={5}
                                                    dashLength={3}
                                                />

                                                <Box px="4" textAlign={"justify"} mr={10}>
                                                    <Flex direction="column">
                                                        <Flex direction="row">
                                                            <Icon
                                                                as={<MaterialIcons name="calendar-today" />}
                                                                size={5}
                                                                color="muted.400"
                                                            />
                                                            <Text ml="2">
                                                                {moment(dayItinerary.date).format("DD/MM/YYYY")}
                                                            </Text>
                                                        </Flex>
                                                        <Flex direction="row" mt="2">
                                                            <Icon
                                                                as={<MaterialIcons name="description" />}
                                                                size={5}
                                                                color="muted.400"
                                                            />
                                                            <Text ml="2">{dayItinerary?.description}</Text>
                                                        </Flex>
                                                        <Flex direction="row" mt="2">
                                                            <Icon
                                                                as={<MaterialIcons name="location-pin" />}
                                                                size={5}
                                                                color="muted.400"
                                                            />
                                                            <Text ml="2">{dayItinerary?.locationName}</Text>
                                                        </Flex>
                                                        {/* <Flex direction="row" mt="2">
                                                            <Icon
                                                                as={<MaterialIcons name="local-activity" />}
                                                                size={5}
                                                                color="muted.400"
                                                            />
                                                            <Text ml="2">{dayItinerary?.activities}</Text>
                                                        </Flex> */}
                                                    </Flex>
                                                </Box>
                                            </Flex>
                                            <Flex alignItems={"flex-end"}>
                                                <IconButton
                                                    variant={"ghost"}
                                                    borderRadius={"full"}
                                                    colorScheme={"violet.300"}
                                                    onPress={() => deleteDayItinerary(dayItinerary.id)}
                                                    icon={
                                                        <Icon
                                                            as={<MaterialIcons name="delete" />}
                                                            size={5}
                                                            color="darkText"
                                                        />
                                                    }
                                                ></IconButton>
                                                <Button onPress={() => getDayActivitiesData(dayItinerary.id)}>
                                                    View Activities
                                                </Button>
                                                <Button onPress={() => navigation.navigate("Add-Day-Activity", {dayItinerary})}>
                                                    Add activity
                                                </Button>
                                            </Flex>
                                        </Box>
                                    </Flex>
                                );
                            })}
                        </Flex>
                        <Flex>
                            {/* <ManageDayActivitiesScreen dayItineraryId={viewDayActivitiesId} /> */}
                            {dayActivities.map((activity: any, index) => {
                                return <ViewActivity activity={activity} key={index} />;
                            })}
                        </Flex>

                        <Flex direction="row" alignSelf={"center"} mt={"4"}>
                            <Button
                                rounded="full"
                                w="25%"
                                bgColor="violet.700"
                                variant="outline"
                                onPress={() => navigation.navigate("Create-Day-Itinerary", { tripId })}
                                borderWidth="1"
                                _text={{
                                    color: "white",
                                    fontWeight: "bold",
                                    textAlign: "center",
                                }}
                            >
                                Add day
                            </Button>
                        </Flex>
                    </Box>
                </Center>
            </Flex>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        fontSize: 32,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        paddingVertical: 50,
    },
    titleContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttons: {
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "light.100",
    },
    buttonText: {
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
    clearButton: {
        position: "absolute",
        top: 10,
        right: 10,
    },
});

const mapStateToProps = (state: any) => {
    return {
        email: state.tokenReducer.email,
        token: state.tokenReducer.token,
        userTrips: state.tripReducer.userTrips,
    };
};
const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch,
        setToken: (email: string, token: string, expiration: any) => {
            dispatch(actionCreators.setToken(email, token, expiration));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTripScreen);
