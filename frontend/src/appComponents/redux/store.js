import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import mainReducer from './reducers/mainReducer';


const store = configureStore({
    reducer: {
        auth: authReducer,
        main: mainReducer
    },
  });
  
export default store;
