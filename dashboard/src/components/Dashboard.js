import React from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";

import TopBar from "./TopBar";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="dashboard-container">
      
      {/* ✅ TOP BAR */}
      <TopBar />

      {/* ✅ WATCHLIST */}
      <GeneralContextProvider>
        <WatchList />
      </GeneralContextProvider>

      {/* ✅ MAIN CONTENT */}
      <div className="content">
        <Routes>
          {/* 🔥 DEFAULT DASHBOARD */}
          <Route path="" element={<Summary />} />

          {/* 🔥 CHILD ROUTES */}
          <Route path="orders" element={<Orders />} />
          <Route path="holdings" element={<Holdings />} />
          <Route path="positions" element={<Positions />} />
          <Route path="funds" element={<Funds />} />
          <Route path="apps" element={<Apps />} />
        </Routes>
      </div>

      {/* ✅ MOBILE NAVIGATION */}
      <div className="mobile-tabs">
        <button
          className={location.pathname.includes("holdings") ? "active" : ""}
          onClick={() => navigate("/dashboard/holdings")}
        >
          Holdings
        </button>

        <button
          className={location.pathname.includes("positions") ? "active" : ""}
          onClick={() => navigate("/dashboard/positions")}
        >
          Positions
        </button>

        <button
          className={location.pathname.includes("orders") ? "active" : ""}
          onClick={() => navigate("/dashboard/orders")}
        >
          Orders
        </button>
      </div>
    </div>
  );
};

export default Dashboard;



