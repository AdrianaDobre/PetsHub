import * as actions from "../types";

const AuthenticationState = {
    email: "",
    token: "",
    expiration: "",
    name: "",
    phoneNumber: ""
};

const tokenReducer = (state = AuthenticationState, action: any) => {
    switch (action.type) {
        case actions.SET_TOKEN:
            return {
                ...state,
                email: action.payload.email,
                token: action.payload.token,
                expiration: action.payload.expirationDate,
                name: action.payload.name,
                phoneNumber: action.payload.phoneNumber,
            };
        case actions.LOGOUT:
            //storage.removeItem("persist:root");
            return AuthenticationState;
        default:
            return state;
    }
};

export default tokenReducer;
