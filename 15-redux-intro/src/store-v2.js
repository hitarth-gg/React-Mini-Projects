import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import accountReducer from "./features/accounts/accountSLice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

// const store = createStore(rootReducer);
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
); // Using Thunk

export default store;
