import * as actions from "../types";

let todoId = 0;

export const addTodo = () => ({
    type: actions.ADD_TODO,
    payload: {
        id: ++todoId,
    },
});

export const tokenActionCreators = {
    setToken: (email: string, token: string, expirationDate: any, name: any, phoneNumber: any) => ({
        type: actions.SET_TOKEN,
        payload: { email, token, expirationDate, name, phoneNumber },
    }),
    logout: () => ({ type: actions.LOGOUT }),
};

export const tripActionCreators = {
    setUserTrips: (userTrips: any) => ({
        type: actions.SET_USER_TRIPS,
        payload: { userTrips },
    }),
};
