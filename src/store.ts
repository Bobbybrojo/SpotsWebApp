import { configureStore } from "@reduxjs/toolkit";

import accountReducer from "./Spots/Account/reducer";

const store = configureStore({
  reducer: {
    accountReducer,
  },
});
export default store;
