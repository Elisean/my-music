import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    ISAUTH: false
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action) => {
            state.ISAUTH = action.payload;
        }
    }
});


export const { setIsAuth } = authSlice.actions;

// Экспорт reducer
export default authSlice.reducer;