import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";


//This is  global store
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
