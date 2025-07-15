import { createSlice } from "@reduxjs/toolkit";
const initialState={
    status:false,
    userData:null
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        logIn:(state,actiom)=>{
            state.status=true
            state.userData=actiom.payload.userData
        },
        logOut:(state)=>{
            state.status=false
            state.userData=null
        }
    }
})
export const {logIn,logOut} =authSlice.actions
export default authSlice.reducer