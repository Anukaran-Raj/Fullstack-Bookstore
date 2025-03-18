import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // ✅ Decode token using jwtDecode
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          return { 
            username: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
            role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          };
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    return null;
  });

  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // ✅ Check token expiration
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < Date.now()) {
            setSessionExpired(true);
            logout();
          }
        } catch (error) {
          console.error("Invalid token during expiration check:", error);
          logout(); // Logout if token is corrupt
        }
      }
    };

    checkTokenExpiration(); // Check immediately on load
    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {sessionExpired && (
        <div className="session-expired-message">
          <p>Your session has expired. Please log in again.</p>
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
