import { configureStore } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import authReducer from '../slice/authSlice'
import candidateReducer from '../slice/candidateSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        candidates: candidateReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(thunk)
})

export default store