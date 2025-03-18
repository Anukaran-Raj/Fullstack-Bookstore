import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Check token expiration on component mount and set an interval
  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
        const currentTime = Date.now() / 1000; // Get current time in seconds

        if (decodedToken.exp < currentTime) {
          setSessionExpired(true); // Set session expired message
          logout(); // Logout if token is expired
        }
      }
    };

    checkTokenExpiration();
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
