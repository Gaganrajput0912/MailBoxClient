import { configureStore } from "@reduxjs/toolkit";
import mailSlice from "./MailSlicer";
import authSlice from "./AuthSlicer";
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    mail: mailSlice.reducer,
  },
});

export default store;
