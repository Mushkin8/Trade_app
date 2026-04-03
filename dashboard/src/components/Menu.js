import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ✅ Fetch user
  useEffect(() => {
    axios
      .get("https://trade-app-sx75.onrender.com/me", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => {});
  }, []);

  // ✅ Logout
  const handleLogout = () => {
  axios.post("https://trade-app-sx75.onrender.com/logout", {}, {
    withCredentials: true
  })
  .then(() => {
    navigate("/login");
  })
  .catch((err) => console.error(err));
};

  const isActive = (path) => location.pathname === path;

  return (
    <div className="menu-container">
      <img src="logo.png" alt="logo" style={{ width: "50px" }} />

      {/* RIGHT SIDE */}
      <div className="menus">
        
        {/* NAV LINKS */}
        <ul>
          <li>
            <Link to="/dashboard">
              <p className={isActive("/dashboard") ? "menu selected" : "menu"}>
                Dashboard
              </p>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/orders">
              <p className={location.pathname.includes("orders") ? "menu selected" : "menu"}>
                Orders
              </p>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/holdings">
              <p className={location.pathname.includes("holdings") ? "menu selected" : "menu"}>
                Holdings
              </p>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/positions">
              <p className={location.pathname.includes("positions") ? "menu selected" : "menu"}>
                Positions
              </p>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/funds">
              <p className={location.pathname.includes("funds") ? "menu selected" : "menu"}>
                Funds
              </p>
            </Link>
          </li>

          <li>
            <Link to="/dashboard/apps">
              <p className={location.pathname.includes("apps") ? "menu selected" : "menu"}>
                Apps
              </p>
            </Link>
          </li>
        </ul>

        {/* PROFILE + LOGOUT */}
        <div className="profile-section">
          <div className="profile-info">
            <div className="avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>

            <span className="username">
              {user?.name || "User"}
            </span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Menu;