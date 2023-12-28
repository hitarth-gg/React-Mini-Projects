import { useState } from "react";


export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  
  
  
  
  function incrCount() {
    setCount((s) => s + step);
  }
  function decrCount() {
    setCount((s) => s - step);
  }
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  // console.log(date);
  

/* ------------------------------------------------------ */
  return (
    
    <div>
      <input id="steps" type="range" min={0} max={10} value={step} onChange={(e) => setStep(Number(e.target.value))}/>
      <label htmlFor="steps">Step: {step}</label>
      {/* <button onClick={decrStep}>-</button> */}
      {/* <span>Step: {step}</span> */}
      {/* <button onClick={incrStep}>+</button> */}

      <br></br>
      
      <button onClick={decrCount}>-</button>
      <span>Count: {count}</span>
      <button onClick={incrCount}>+</button>

      <div>
        {`Today is ${date.toDateString()}`} 
      </div>

    </div>
  );
}
