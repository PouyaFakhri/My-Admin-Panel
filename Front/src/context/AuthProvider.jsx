import { React, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        rtl
        pauseOnHover
        theme="colored"
      />
    </AuthContext.Provider>
  );
}

export default AuthProvider;
