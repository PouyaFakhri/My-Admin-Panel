import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        index
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace ={false}/>
          ) : (
            <Navigate to="/login" replace ={false} />
          )
        }
      />
      <Route
        path="dashboard"
        element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace ={false} />}
      />
      <Route
        path="login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace ={false} /> : <Login />}
      />
      <Route
        path="register"
        element={isAuthenticated ? <Navigate to="/dashboard" replace ={false} /> : <Register />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
