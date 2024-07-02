// createSlice has 3 main features: 1. it automatically creates actionCreators from our reducers, 2. it makes writing the reducers a lot easier because we no longer have to write the switch statement, and it automatically generates the action types for us, 3. we can mutate the states inside the reducers directly because it uses Immer Library under the hood to make the state immutable.
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account", // name of the slice
  initialState, // initial state
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    // By default these automatically created action creators will only accept one single argument, that then becomes "action.payload"
      // We could also have passed the argument as an object when calling the action creator

    // requestLoan(state, action) {
    //   if (state.loan > 0) return;
    //   state.loan = action.payload.amount;
    //   state.loanPurpose = action.payload.purpose; // => therefore loanPurpose is not a part of the payload
    //   state.balance += action.payload.amount;
    // },
    // to fix the above issue, we can use the prepare callback function
    requestLoan: {
      // The prepare callback function will be called with the arguments that were passed to the action creator.
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state) {
      state.loanPurpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    }

  },
});

console.log(accountSlice);
/* CONSOLE OUTPUT : 
  actions: {deposit: ƒ, withdraw: ƒ, requestLoan: ƒ, payLoan: ƒ}
  caseReducers: {deposit: ƒ, withdraw: ƒ, requestLoan: ƒ, payLoan: ƒ}
  getInitialState: ƒ ()
  name: "account"
  reducer: ƒ (state, action)
*/

// we will now export the deposit action creator from the accountSlice because we are using a custom reducer for the deposit action
export const { /* deposit, */ withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// CUSTOM REDUCER FOR DEPOSIT ACTION
// make sure that the name here is the same as the name of the action creator that we want to override, in this case "deposit". The action.type should also be the same as the action creator that we want to override.
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  // When we write a function instead of an object, Redux will know that this is a thunk function / async function which needs to be executed before the action is dispatched.
  // This function which redux will call internally will get two arguments: dispatch and getState (to get the current state)
  return async function (dispatch, getState) {
    dispatch({type: "account/convertingCurrency"}) // set the loading state to true

    // API Call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;

    // return action object
    dispatch({ type: "account/deposit", payload: converted }); // Only after the conversion is done, the action will be dispatched
  };
}
