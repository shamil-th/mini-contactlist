import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './features/todo/contactsSlice';
// import { thunk } from "redux-thunk";
// import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const store = configureStore({
    reducer:{
        contacts :  contactsReducer,
    },
    // middleware:(getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// store.dispatch

export default store;
