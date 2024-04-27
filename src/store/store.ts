
import { configureStore } from '@reduxjs/toolkit';

// We import the reducers here
import userReducer from './userSlice';
import loadingScreenReducer from './loadingScreenSlice';
import pageReducer from './pageSlice';
import saveImageReducer from './saveImageSlice';

// Store is configured here
const store = configureStore({
    reducer: {
        user: userReducer,
        loadingScreen: loadingScreenReducer,
        page: pageReducer,
        saveImage: saveImageReducer
    },
});

export default store;
