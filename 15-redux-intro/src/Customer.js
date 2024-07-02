import { useSelector } from "react-redux";

function Customer() {
  // useSelector is a hook that allows you to extract data from the Redux store state
  // useSelector basically creates a subscription to the store, so whenever the store changes, it will force a re-render
  const customer = useSelector((state) => state.customer.fullName);

  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
