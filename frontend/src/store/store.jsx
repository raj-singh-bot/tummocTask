import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

// export type  = typeof store.dispatch
export default store;
