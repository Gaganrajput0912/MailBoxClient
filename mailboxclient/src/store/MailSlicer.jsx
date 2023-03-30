import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allMails: [],
};

const mailSlice = createSlice({
  initialState: initialState,
  name: 'mail',
  reducers: {
    setMail(state, action) {
      state.allMails = action.payload;
    },
    deleteMail(state, action) {
      state.allMails = state.allMails.filter((mail) => mail.id !== action.payload);
    },
  },
});

export const mailActions = mailSlice.actions;
export default mailSlice;
