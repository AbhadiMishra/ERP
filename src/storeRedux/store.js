import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices.js";

export const userStore = configureStore({
    reducer: {
        user: userReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
