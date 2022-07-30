import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, loggedIn, ...props }) => {
  return (
        
  loggedIn ? [ children ] : <Navigate to="/signin" />
        
)}

export default ProtectedRoute;