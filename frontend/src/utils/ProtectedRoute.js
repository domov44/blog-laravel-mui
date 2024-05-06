// ProtectedRoute.js
import React, { useState, useEffect } from 'react';
import Router from 'next/router';

function ProtectedRoute({ children, allowedRoles }) {
  const [authStatus, setAuthStatus] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = "1";
      setUserRole(role);
      setAuthStatus(role ? 'Authenticated' : 'NotAuthenticated');
    };

    fetchUserRole();
  }, []);

  if (
    authStatus === 'Authenticated' &&
    checkRole(userRole, allowedRoles)
  ) {
    return children;
  } else if (authStatus === 'NotAuthenticated') {
    Router.push('/se-connecter')
  } else {
    return <div>En cours de vérification...</div>;
  }
}

export default ProtectedRoute;