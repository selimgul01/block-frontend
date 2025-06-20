import {configureStore} from "@reduxjs/toolkit"
import  postSlice  from "./posts/postSlice"
import modalSlice  from "./posts/modalSlice"
import  authSlice  from "./auth/authSlice"


export const store = configureStore({
    reducer:{
        posts:postSlice,
        modal:modalSlice,
        auth: authSlice
    }
})