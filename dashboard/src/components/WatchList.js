


// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";

// import GeneralContext from "./GeneralContext";

// import { Tooltip, Grow } from "@mui/material";
// import {
//   BarChartOutlined,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   MoreHoriz,
// } from "@mui/icons-material";

// import { watchlist } from "../data/data";
// import { DoughnutChart } from "./DoughnoutChart";

// const labels = watchlist.map((subArray) => subArray["name"]);

// const WatchList = () => {
//   const [holdings, setHoldings] = useState([]); // ✅ NEW

//    useEffect(() => {
//   axios
//     .get("http://https://trade-app-sx75.onrender.com/allHoldings", {
//       withCredentials: true, // ✅ FIX
//     })
//     .then((res) => setHoldings(res.data))
//     .catch((err) => console.log(err));
// }, []);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Price",
//         data: watchlist.map((stock) => stock.price),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.5)",
//           "rgba(54, 162, 235, 0.5)",
//           "rgba(255, 206, 86, 0.5)",
//           "rgba(75, 192, 192, 0.5)",
//           "rgba(153, 102, 255, 0.5)",
//           "rgba(255, 159, 64, 0.5)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//           "rgba(75, 192, 192, 1)",
//           "rgba(153, 102, 255, 1)",
//           "rgba(255, 159, 64, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
//           className="search"
//         />
//         <span className="counts"> {watchlist.length} / 50</span>
//       </div>

//       <ul className="list">
//         {watchlist.map((stock, index) => {
//           return (
//             <WatchListItem
//               stock={stock}
//               key={index}
//               holdings={holdings} // ✅ PASS
//             />
//           );
//         })}
//       </ul>

//       <DoughnutChart data={data} />
//     </div>
//   );
// };

// export default WatchList;

// // ================= ITEM =================

// const WatchListItem = ({ stock, holdings }) => {
//   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

//   return (
//     <li
//       onMouseEnter={() => setShowWatchlistActions(true)}
//       onMouseLeave={() => setShowWatchlistActions(false)}
//     >
//       <div className="item">
//         <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
//         <div className="itemInfo">
//           <span className="percent">{stock.percent}</span>
//           {stock.isDown ? (
//             <KeyboardArrowDown className="down" />
//           ) : (
//             <KeyboardArrowUp className="down" />
//           )}
//           <span className="price">{stock.price}</span>
//         </div>
//       </div>

//       {showWatchlistActions && (
//         <WatchListActions uid={stock.name} holdings={holdings} />
//       )}
//     </li>
//   );
// };

// // ================= ACTIONS =================

// const WatchListActions = ({ uid, holdings }) => {
//   const generalContext = useContext(GeneralContext);

//   const handleBuyClick = () => {
//     generalContext.openBuyWindow(uid);
//   };

//   const handleSellClick = () => {
//     generalContext.openSellWindow(uid);
//   };

//   // ✅ CHECK IF STOCK EXISTS
//   const hasStock = (name) => {
//     return holdings.some((stock) => stock.name === name);
//   };

//   return (
//     <span className="actions">
//       <span>
//         {/* BUY */}
//         <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
//           <button className="buy" onClick={handleBuyClick}>
//             Buy
//           </button>
//         </Tooltip>

//         {/* SELL (ONLY IF OWNED) */}
//         {hasStock(uid) && (
//           <Tooltip
//             title="Sell (S)"
//             placement="top"
//             arrow
//             TransitionComponent={Grow}
//           >
//             <button className="sell" onClick={handleSellClick}>
//               Sell
//             </button>
//           </Tooltip>
//         )}

//         {/* ANALYTICS */}
//         <Tooltip
//           title="Analytics (A)"
//           placement="top"
//           arrow
//           TransitionComponent={Grow}
//         >
//           <button className="action">
//             <BarChartOutlined className="icon" />
//           </button>
//         </Tooltip>

//         {/* MORE */}
//         <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
//           <button className="action">
//             <MoreHoriz className="icon" />
//           </button>
//         </Tooltip>
//       </span>
//     </span>
//   );
// };




import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const labels = watchlist.map((subArray) => subArray["name"]);

const WatchList = () => {
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]); // 🔥 NEW

  useEffect(() => {
    axios
      .get("http://https://trade-app-sx75.onrender.com/allHoldings", {
        withCredentials: true,
      })
      .then((res) => setHoldings(res.data));

    axios
      .get("http://https://trade-app-sx75.onrender.com/allPositions", {
        withCredentials: true,
      })
      .then((res) => setPositions(res.data));
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Price",
        data: watchlist.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search eg: infy, bse..."
          className="search"
        />
        <span className="counts">{watchlist.length} / 50</span>
      </div>

      <ul className="list">
        {watchlist.map((stock, index) => (
          <WatchListItem
            key={index}
            stock={stock}
            holdings={holdings}
            positions={positions} // ✅ PASS
          />
        ))}
      </ul>

      <DoughnutChart data={data} />
    </div>
  );
};

export default WatchList;

/////////////////////////////////////////////////////

const WatchListItem = ({ stock, holdings, positions }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>

      {showActions && (
        <WatchListActions
          uid={stock.name}
          holdings={holdings}
          positions={positions}
        />
      )}
    </li>
  );
};

/////////////////////////////////////////////////////

const WatchListActions = ({ uid, holdings, positions }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = () => {
    generalContext.openBuyWindow(uid);
  };

  const handleSellClick = () => {
    generalContext.openSellWindow(uid);
  };

  // 🔥 CHECK CNC (HOLDINGS)
  const inHoldings = holdings.find((s) => s.name === uid);

  // 🔥 CHECK MIS (POSITIONS)
  const inPositions = positions.find((s) => s.name === uid);

  return (
    <span className="actions">
      <span>
        {/* BUY */}
        <Tooltip title="Buy" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>

        {/* CNC SELL */}
          
         {inHoldings && (
  <Tooltip title="Sell CNC" arrow TransitionComponent={Grow}>
    <button className="sell" onClick={handleSellClick}>
      Sell
    </button>
  </Tooltip>
)}

{inPositions && (
  <Tooltip title="Sell MIS" arrow TransitionComponent={Grow}>
    <button className="mis-sell" onClick={handleSellClick}>
      Sell
    </button>
  </Tooltip>
)} 

        {/* ANALYTICS */}
        <Tooltip title="Analytics" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined />
          </button>
        </Tooltip>

        {/* MORE */}
        <Tooltip title="More" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
