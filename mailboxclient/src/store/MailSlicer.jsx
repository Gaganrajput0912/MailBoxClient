import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import axios from "axios";
    const userEmail =
      localStorage.getItem("userEmail") || "abc@gmail.com";

const initialState = {
    allMails: [],
    sendedMail : []
};

export const fetchAllMails = createAsyncThunk('mail/fetchAllMails', async () => {
       const res = await axios.get(
         `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
         );
let s = []
        for (let key in res.data) {
          s.push({...res.data[key] , id : key})  
    }
    console.log(s)
    return s
})

export const deleteMail = createAsyncThunk('mail/deleteMail', async (id) => {
    console.log(id)
 await axios.delete(
   `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${
     userEmail.split("@")[0]
     }/${id}.json`)

      const res = await axios.get(
         `https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox/${userEmail.split('@')[0]}.json`
         );
let s = []
        for (let key in res.data) {
          s.push({...res.data[key] , id : key})  
    }
    console.log(s)
    return s


})

export const fetchSendedMail = createAsyncThunk('mail/sendedMail', async () => {
    const res = await axios.get(
"https://mailboxclient-c494d-default-rtdb.firebaseio.com/inbox.json"
   );
   let s = []
   for (let name in res.data) {
       for(let key in res.data[name]){
               if(res.data[name][key].senderMail== localStorage.getItem("userEmail") || 'jaimins365635')
           s.push({...res.data[name][key] , id : key , email : name+'@gmail.com'})
       }
}

return s
})

const mailSlice = createSlice({
    initialState: initialState,
    name: 'mail',
    reducers: {
        setMail(state, action) {
            state.allMails = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllMails.fulfilled, (state, action) => {
            state.allMails = action.payload
        })
        builder.addCase(deleteMail.fulfilled, (state,action) => {
            state.allMails = action.payload
        })
        builder.addCase(fetchSendedMail.fulfilled, (state, action) => {
            state.sendedMail = action.payload;
          });
    }
})
export const mailActions = mailSlice.actions
export default mailSlice