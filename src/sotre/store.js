import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from './authSlice'

const store = configureStore({
    reducer: AuthSlice
})


export default store