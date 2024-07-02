import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  // we are usint the useEffect here and not in App.js because useEffect will get executed whenever this component mounts, so the timer will also start when this component mounts. If we had used it in App.js then the timer would've started at an unwanted time.
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id); // removing the setInterval after component unmounts
    },
    [dispatch]
  );

  return (
    <div className="timer">{` ${mins < 10 ? "0" : ""}${mins} : ${
      seconds < 10 ? "0" : ""
    }${seconds}`}</div>
  );
}

export default Timer;
