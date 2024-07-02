import { connect } from "react-redux";

function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

// "balance" is the same as the prop name we defined in the mapStateToProps function
function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// This function receives the state object from the Redux store as an argument
function mapStateToProps(state) {
  return {
    balance: state.account.balance, // inside of the object we define the name of the prop that our component should receive, we can use the entire state object or just a part of it
  };
}

export default connect(mapStateToProps) (BalanceDisplay);
// connect(mapStateToProps) this function returns a new function whose argument is the component we want to connect to the Redux store. Therefore BalanceDisplay component will be the argument of that newwly returned function.
// This new function is basicly a new component and that new component will have the "balance" prop. Therefore we'll have to accept that prop in the BalanceDisplay component.
