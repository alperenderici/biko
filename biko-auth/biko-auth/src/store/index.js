import {configureStore} from '@reduxjs/toolkit';
import auth from './auth';

const store = configureStore({
    reducer: {
        // Add your reducers here
        auth,
    },
});

export default store;
