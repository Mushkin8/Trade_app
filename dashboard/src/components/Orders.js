



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

 useEffect(() => {
  axios
    .get("http://localhost:3002/allOrders", {
      withCredentials: true, // ✅ FIX
    })
    .then((res) => {
      console.log("Orders:", res.data);
      setAllOrders(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
}, []);

  // 👇 show message only if empty
  if (allOrders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>
          <Link to={"/"} className="btn">
            Get started
          </Link>
        </div>
      </div>
    );
  }
  
  return (
  <div className="orders">
    <h3 className="title">Orders ({allOrders.length})</h3>

    <div className="order-table">
      <table>
        <thead>
          <tr>
            <th className="left">NAME</th>
            <th className="center">QTY</th>
            <th className="right">PRICE</th>
            <th className="right">MODE</th>
          </tr>
        </thead>

        <tbody>
          {allOrders.map((order) => (
            <tr key={order._id}>
              <td className="left">{order.name}</td>
              <td className="center">{order.qty}</td>
              <td className="right">₹{order.price}</td>
              <td
                className={`right ${
                  order.mode === "BUY" ? "profit" : "loss"
                }`}
              >
                {order.mode}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

 
  
};

export default Orders;