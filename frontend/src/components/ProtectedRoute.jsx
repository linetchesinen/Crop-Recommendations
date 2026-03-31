// src/components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth.js";

export default function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null); // null = loading, true/false = authenticated status

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();
      setAuth(result);
    };

    checkAuth();
  }, []);

  // While checking authentication, you can show a loader or null
  if (auth === null) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render children
  return children;
}