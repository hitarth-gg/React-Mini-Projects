import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  // before when we were using Redux, we would dispatch an action on the store like this: store.dispatch({ type: "customer/create", payload: { fullName, nationalId } });
  // However that's not how we do it inside React.
  // Instead, we get access to the dispatch function from the store using the useDispatch hook

  const dispatch = useDispatch(); // useDispatch is a hook that returns the dispatch function from the Redux store, this dispatch works exactly the same as the store.dispatch

  function handleClick() {
    if (!fullName || !nationalId) return;
    dispatch(createCustomer(fullName, nationalId ));
  }

  return (
    <div>
      <h2>Create new customer</h2>
      <div className="inputs">
        <div>
          <label>Customer full name</label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>National ID</label>
          <input
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button onClick={handleClick}>Create new customer</button>
      </div>
    </div>
  );
}

export default Customer;
