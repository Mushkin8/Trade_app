import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("http://https://trade-app-sx75.onrender.com/logout", {
      withCredentials: true,
    });

    navigate("/login");
  };

  return (
    <div className="home_page">
      <h2>Dashboard Loaded ✅</h2>
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
};

export default Home;