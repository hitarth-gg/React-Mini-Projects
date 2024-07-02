const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        // LATER
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state; // In redux it is advised to not throw an error if the action is not found but to return the state as is instead. This is to just return the original state if the action is not found.
  }
}

/* ------------------ Action Creators ------------------- */
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
export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}
export function payLoan() {
  return { type: "account/payLoan" };
}
/* ------------------------------------------------------ */
