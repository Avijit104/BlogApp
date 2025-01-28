import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin : false,
    userData: null
}

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login: (state, action) => {
            state.isLogin = true
            state.userData = action.payload
        },
        logout: (state, action) => {
            console.log("logoutslicce")
            state.isLogin = false
            state.userData = null
        }
    }
})


export const {login, logout} = AuthSlice.actions
export default AuthSlice.reducer