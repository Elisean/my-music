import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../Store/Slices/authSlise";
import musicReducer from '../Store/Slices/musicListSlice';



export const store = configureStore({
    reducer: {
        auth: authSlice,
        music: musicReducer
    }, 
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

