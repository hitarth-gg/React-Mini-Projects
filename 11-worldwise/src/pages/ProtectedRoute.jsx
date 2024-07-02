import React, { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!isAuthenticated) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate]
  );

  return isAuthenticated ? children : null; // here we are checking if the user is authenticated or not because the useEffect will redirect the user to the login page if the user is not authenticated but it will not stop the rendering of the children components so we need to check if the user is authenticated or not and if the user is not authenticated then we will return null so that the children components will not be rendered
}
