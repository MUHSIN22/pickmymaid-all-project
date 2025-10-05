import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import maidReducer from './features/maid/maidSlice';
import jobReducer from './features/job/jobSlice';
import contactReducer from './features/contact/contactSlice';
import paymentReducer from './features/payment/paymentSlice';
import utilsReducer from './features/utilSlice/utileSlice';
import blogReducer from './features/blogs/blogsSlice'

// export reducers used in the app
export const makeStore = () => {
    return configureStore({
        reducer: {
          auth: authReducer,
          maid: maidReducer,
          job: jobReducer,
        contact: contactReducer,
          payment: paymentReducer,
          utils: utilsReducer,
          blogs: blogReducer
        },
      })
}; 

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
