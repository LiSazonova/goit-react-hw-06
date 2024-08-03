import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import initialContacts from '../components/contacts.json'
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key: 'contacts',
    storage,
    whitelist: ['items'],
};

const persistedReducer = persistReducer(persistConfig, contactsReducer);

const store = configureStore({
    reducer: {
        contacts: persistedReducer,
        filters: filtersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    preloadedState: {
        contacts: {
            items: JSON.parse(localStorage.getItem('contacts')) || initialContacts,
        },
    },
});

export const persistor = persistStore(store);
export default store;