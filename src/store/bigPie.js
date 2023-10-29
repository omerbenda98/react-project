import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";

const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
  },
});

export default store;
