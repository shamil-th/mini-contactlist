import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './features/todo/contactsSlice';

const store = configureStore({
    reducer:{
        contacts :  contactsReducer,
    },
});

export default store;
