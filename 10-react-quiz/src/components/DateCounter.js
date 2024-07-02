import { useReducer, useState } from "react";

function reducer(state, action) {
  console.log(state, action);

  switch (action.type) {
    case "dec":
      return { ...state, count: state.count - 1 }; // here we are destructuring the state object and then overwriting the count property
    case "inc":
      return { ...state, count: state.count + 1 };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return {count: 0, step: 0};
    default:
      throw new Error("Unknown action type");
  }

  // if (action.type === "inc") return state + action.payload;
  // if (action.type === "dec") return state - action.payload;
  // if (action.type === "setCount") return action.payload;
}

function DateCounter() {
  // const [count, setCount] = useState(0);

  /* const [count, dispatch] = useReducer(reducer, 0); */ // useReducer(function, initial state)
  // now when is the reducer function called ? This is where "dispatch" comes into play, "dispatch" function can also be used to update the state.

  const initialState = { count: 0, step: 0 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // const [step, setStep] = useState(1);

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: +1 });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    // dispatch(1); // this 1 is going to become the "action" in the reducer function
    dispatch({ type: "inc", payload: +1 });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value)); // when the input is empty, it will be 0
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    // instead of setting two states, we can now set both states at once using useReducer
    dispatch({type: "reset"});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
