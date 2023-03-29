import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogin: false,
  idToken: localStorage.getItem("idToken"),
  isLoginPage: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      localStorage.setItem("idToken", action.payload);
      state.isLogin = true;
      state.idToken = action.payload;
    },
    logout(state) {
      localStorage.removeItem("idToken");
      state.isLogin = false;
      state.idToken = null;
    },
    loginPage(state) {
      state.isLoginPage = true;
    },
    signupPage(state) {
      state.isLoginPage = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
