import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = sessionStorage.getItem("authToken");

if (token) {
  // Set the default Axios headers if the token is available
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const initialState = {
  isLoggedIn: !!token,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.removeItem("authToken");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
