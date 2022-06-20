import mainReducer from 'reduxReducers/mainReducer';
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
    reducer: {
        main: mainReducer,
    },
})