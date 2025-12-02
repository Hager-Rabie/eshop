import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice.js';
import cartSliceReducer from './slices/cartSlice.js';
import authSliceReducer from './slices/authSlice.js';
import searchProductSliceReducer from './slices/searchProductSlice.js';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer,
    search: searchProductSliceReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

export default store;
