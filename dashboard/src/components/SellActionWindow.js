// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";

// import "./BuyActionWindow.css"; // ✅ reuse same CSS

// const SellActionWindow = ({ uid }) => {
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0.0);

//   const { closeSellWindow } = useContext(GeneralContext); // 🔥 use sell

//  const handleSellClick = async () => {
//   try {
//     const { data } = await axios.post(
//       "http://localhost:3002/newOrder",
//       {
//         name: uid,
//         qty: stockQuantity,
//         price: stockPrice,
//         mode: "SELL",
//         product: "CNC"
//       },
//       {
//         withCredentials:true,
//       }
//     );

//     if (!data.success) {
//       alert(data.message); // ❌ show error
//       return;
//     }

//     closeSellWindow();
//   } catch (err) {
//     console.error(err);
//     alert("Sell failed");
//   }
// };

//   const handleCancelClick = () => {
//     closeSellWindow();
//   };

//   return (
//     <div className="container" id="sell-window" draggable="true">
//       <div className="regular-order">
//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               onChange={(e) => setStockQuantity(e.target.value)}
//               value={stockQuantity}
//             />
//           </fieldset>

//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               name="price"
//               step="0.05"
//               onChange={(e) => setStockPrice(e.target.value)}
//               value={stockPrice}
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>Margin required ₹140.65</span>
//         <div>
//           <Link className="btn btn-red" onClick={handleSellClick}>
//             Sell
//           </Link>

//           <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellActionWindow;


import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);

  const [product, setProduct] = useState("CNC"); // ✅ FIX

  const { closeSellWindow } = useContext(GeneralContext);

  const handleSellClick = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3002/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),   // ✅ FIX
          price: Number(stockPrice),    // ✅ FIX
          mode: "SELL",
          product: product,             // ✅ FIX (dynamic)
        },
        {
          withCredentials: true,
        }
      );

      if (!data.success) {
        alert(data.message); // ✅ show error
        return;
      }

      closeSellWindow();
    } catch (err) {
      console.error(err);
      alert("Sell failed");
    }
  };

  const handleCancelClick = () => {
    closeSellWindow();
  };

  return (
    <div className="container" id="sell-window">
      <div className="regular-order">

        {/* ✅ PRODUCT TOGGLE (IMPORTANT) */}
        <div className="product-toggle">
          <button
            className={product === "CNC" ? "active-btn" : ""}
            onClick={() => setProduct("CNC")}
          >
            CNC
          </button>

          <button
            className={product === "MIS" ? "active-btn" : ""}
            onClick={() => setProduct("MIS")}
          >
            MIS
          </button>
        </div>

        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) =>
                setStockQuantity(Number(e.target.value))
              }
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) =>
                setStockPrice(Number(e.target.value))
              }
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Order Type: <b>{product}</b>
        </span>

        <div>
          <button className="btn btn-red" onClick={handleSellClick}>
            Sell
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;