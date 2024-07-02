import React from 'react'
import Button from './Button';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  return (
      <Button
          type={"back"}
          onClick={(e) => {
            e.preventDefault(); // we do this because the button is inside a form and we do not want the form to submit when we click the back button
            navigate(-1); // '-x' means go back 'x' step in the history, we can also pass a string to navigate to a specific route
          }}
        >
          &larr; Back
        </Button>
  )
}

