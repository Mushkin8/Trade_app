



// import React, { useState, useContext } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import GeneralContext from "./GeneralContext";

// import "./BuyActionWindow.css";

// const BuyActionWindow = ({ uid }) => {
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [stockPrice, setStockPrice] = useState(0);

//   const [product, setProduct] = useState("CNC");

//   const { closeBuyWindow } = useContext(GeneralContext);

//   const handleBuyClick = async () => {
//     try {
//       const { data } = await axios.post(
//         "http://https://trade-app-sx75.onrender.com/newOrder",
//         {
//           name: uid,
//           qty: Number(stockQuantity),     // ✅ FIX
//           price: Number(stockPrice),      // ✅ FIX
//           mode: "BUY",
//           product: product,
//         },
//         { withCredentials: true }
//       );

//       if (!data.success) {
//         alert(data.message);
//         return;
//       }

//       closeBuyWindow();
//     } catch (err) {
//       console.error(err);
//       alert("Buy failed");
//     }
//   };

//   const handleCancelClick = () => {
//     closeBuyWindow();
//   };

//   return (
//     <div className="container" id="buy-window">
//       <div className="regular-order">

//         {/* ✅ PRODUCT TOGGLE */}
//         <div className="product-toggle">
//           <button
//             className={product === "CNC" ? "active-btn" : ""}
//             onClick={() => setProduct("CNC")}
//           >
//             CNC
//           </button>

//           <button
//             className={product === "MIS" ? "active-btn" : ""}
//             onClick={() => setProduct("MIS")}
//           >
//             MIS
//           </button>
//         </div>

//         <div className="inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               value={stockQuantity}
//               min="1"
//               onChange={(e) =>
//                 setStockQuantity(Number(e.target.value))
//               }
//             />
//           </fieldset>

//           <fieldset>
//             <legend>Price</legend>
//             <input
//               type="number"
//               step="0.05"
//               value={stockPrice}
//               onChange={(e) =>
//                 setStockPrice(Number(e.target.value))
//               }
//             />
//           </fieldset>
//         </div>
//       </div>

//       <div className="buttons">
//         <span>
//           Order Type: <b>{product}</b>
//         </span>

//         <div>
//           <button className="btn btn-blue" onClick={handleBuyClick}>
//             Buy
//           </button>

//           <button className="btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;



import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0);
  const [product, setProduct] = useState("CNC");

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      const { data } = await axios.post(
        "https://trade-app-sx75.onrender.com/newOrder",
        {
          name: uid,
          qty: Number(stockQuantity),
          price: Number(stockPrice),
          mode: "BUY",
          product: product,
        },
        {
          withCredentials: true,
        }
      );

      if (!data.success) {
        alert(data.message);
        return;
      }

      closeBuyWindow();
    } catch (err) {
      console.error(err);
      alert("Buy failed");
    }
  };

  const handleCancelClick = () => {
    closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window">
      <div className="regular-order">

        {/* PRODUCT TOGGLE */}
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

        {/* INPUTS */}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              value={stockQuantity}
              min="1"
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

      {/* ACTION BUTTONS */}
      <div className="buttons">
        <span>
          Order Type: <b>{product}</b>
        </span>

        <div>
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>

          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;