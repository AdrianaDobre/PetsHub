import * as actions from "../types";

const UserTripsState = {
    trips: [],
};

const tripReducer = (state = UserTripsState, action: any) => {
    switch (action.type) {
        case actions.SET_USER_TRIPS:
            console.log("in store", action.payload.userTrips);
            return {
                ...state,
                userTrips: action.payload.userTrips,
            };
        default:
            return state;
    }
};

export default tripReducer;
