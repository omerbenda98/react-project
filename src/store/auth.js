import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  isBiz: false,
  payload: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (!action || !action.payload) {
        return;
      }

      state.isLoggedIn = true;
      state.payload = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.isAdmin = false;
      state.isBiz = false;
      state.payload = null;
    },
    isAdmin(state, action) {
      if (!action) {
        return;
      }

      if (action.payload === true) {
        state.isAdmin = action.payload;
        state.payload = action.payload;
      } else {
        state.isAdmin = false;
      }
    },
    isBiz(state, action) {
      if (action && action.payload) {
        state.isBiz = action.payload;
        state.payload = action.payload;
      } else {
        state.isBiz = false;
      }
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
