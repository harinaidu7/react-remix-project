// app/store/index.js

import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './search/searchSlice';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export default store;
