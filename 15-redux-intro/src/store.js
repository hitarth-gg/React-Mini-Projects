import accountReducer from "./features/accounts/accountSLice";
import customerReducer from "./features/customers/customerSlice";

import { configureStore } from "@reduxjs/toolkit";
// configureTools basically wraps createStore and combineReducers, and also adds default middleware like thunk and devTools

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
