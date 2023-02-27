import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState:{
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers:{
        loginStart:(state)=>{
            state.isFetching=true
        },
        loginSuccess:(state, action)=>{
            state.isFetching=false;
            state.currentUser=action.payload  //only this will be acted upon in the Login.jsx page
        },
        loginFailure:(state)=>{
            state.isFetching=false
            state.error=true
        }
    }
})

export const {loginStart, loginSuccess, loginFailure} = userSlice.actions
export default userSlice.reducer;

//Errything gets transfered to store.js.....thats jus protocal