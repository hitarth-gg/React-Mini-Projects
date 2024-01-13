import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';

import StarRating from "./StarRating";

/* ------------------------------------------------------ */

// If we want to use the "rating number" that was set using the star value
// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <>
//     <StarRating
//       maxRating={5}
//       color={"#900fff"}
//       size={30}
//       className={"test"}
//       defaultRating={3}
//       onSetRating={setMovieRating}
//     />
//     <p>This movie was rated {movieRating} stars </p>
//     </>
//   );
// }

/* ------------------------------------------------------ */

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode> {/* Strict mode renders the data twice only in development mode in order to check for any problems existing in out project */}
    <App />
    {/* <StarRating
      maxRating={5}
      color={"#fcc419"}
      size={48}
      className={"test"}
      messages={["Very Bad", "Bad", "Okay", "Good", "Amazing"]}
    />

    <StarRating
      maxRating={5}
      color={"#fc2419"}
      size={30}
      className={"test"}
      defaultRating={3}
    /> */}

    {/* <Test /> */}
  </React.StrictMode>
);
