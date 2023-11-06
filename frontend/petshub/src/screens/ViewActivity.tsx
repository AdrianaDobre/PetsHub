import { Flex, Text } from "native-base";
import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { tokenActionCreators as actionCreators } from "../store/actions/actionCreator";

const ViewActivity = ({ route, navigation, token, activity }: any) => {
    //[{"averageDuration": 20, "category": "Fun", "categoryId": "92451547-8f73-4fc6-89c1-644675b74899", "currency": "RON", "currencyId": 1, "dayItineraryId": "b54bca9d-0f1b-4f9d-b871-0fba224fee70", "description": "test", "googlePlaceId": "ChIJ4aQWg0SVVRIR75sBqjozhDo", "id": "8fecfd69-4480-49f7-a669-5595c4433824", "latitude": 33.886917,
    // "locationId": "5bf75fbf-740b-442b-be46-bb27a63ca0b6", "locationName": "Tunisia", "longitude": 9.537499, "name": "test2", "price": 20}]
    console.log("activity", activity);
    return (
        <Flex h={100}>
            <Text>{activity.averageDuration}</Text>
            <Text>{activity.category}</Text>
        </Flex>
    );
};

const styles = StyleSheet.create({});

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

export default connect(mapStateToProps, mapDispatchToProps)(ViewActivity);
