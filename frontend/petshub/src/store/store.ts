import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const persistConfig = {
    key: "root",
    whitelist: ["tokenReducer"],
    blacklist: ["testReducer", "tripReducer"],
    storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
});


const persistor = persistStore(store);
//persistor.purge();

export { store, persistor };
