import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './reducers/mainReducer'

export default configureStore({
    reducer: {
        main: mainReducer,
    },
})