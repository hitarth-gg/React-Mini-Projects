import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

/* ------------------------------------------------------ */

export default function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}


function Steps() {
  //useState(1) -> returns an array with default value and a function, 1 is the default value of the step.
  // [step, setStep] -> this is destructuring of the returned array
  const [step, setStep] = useState(1); // 'use' functions are called React hooks and we can only call hooks like useState on the top level of the function.

  // const [test, setTest] = useState({name: "Hitarth"})
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1); // we should only update state using the setter function
  }

  function handleNext() {
    if (step < 3) setStep((s) => s + 1);
  }

  /* ------------------------------------------------------ */
  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>Open/Close</button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>

          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
  /* ------------------------------------------------------ */
}
