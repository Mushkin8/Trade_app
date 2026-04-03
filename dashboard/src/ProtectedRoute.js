import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .post("http://https://trade-app-sx75.onrender.com/verify", {}, { withCredentials: true })
      .then((res) => {
        console.log("VERIFY FRONTEND:", res.data); // ✅ debug
        setIsAuth(res.data.status);
      })
      .catch(() => {
        setIsAuth(false);
      });
  }, []);

  // ⛔ STOP flicker
  if (isAuth === null) return <h2>Loading...</h2>;

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;