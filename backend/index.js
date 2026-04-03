



// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

// const authRoute = require("./Routes/AuthRoute");

// const { HoldingsModel } = require("./model/HoldingsModel");
// const { PositionsModel } = require("./model/PositionsModel");
// const { OrdersModel } = require("./model/OrdersModel");
// const User = require("./Models/UserModel");

// const PORT = process.env.PORT || 3002;
// const uri = process.env.MONGO_URL;

// const app = express();

// // ================= MIDDLEWARE =================
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001"],
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(cookieParser());

// // ================= AUTH ROUTES =================
// app.use("/", authRoute);

// // ================= VERIFY =================
// app.post("/verify", (req, res) => {
//   const token = req.cookies.token;

//   if (!token) return res.json({ status: false });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     res.json({ status: true, user: decoded.id });
//   } catch {
//     res.json({ status: false });
//   }
// });

// // ================= HELPER =================
// const getUserId = (req) => {
//   const token = req.cookies.token;
//   if (!token) throw new Error("No token");

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   return decoded.id;
// };

// // ================= USER =================
// app.get("/me", async (req, res) => {
//   try {
//     const userId = getUserId(req);

//     const user = await User.findById(userId).select("username email");

//     res.json({
//       username: user.username,
//       email: user.email,
//     });
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// // ================= LOGOUT =================
// app.post("/logout", (req, res) => {
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "lax",
//   });

//   res.json({ success: true });
// });

// // ================= HOLDINGS =================
// app.get("/allHoldings", async (req, res) => {
//   try {
//     const userId = getUserId(req);
//     const holdings = await HoldingsModel.find({ user: userId });
//     res.json(holdings);
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// // ================= POSITIONS =================
// app.get("/allPositions", async (req, res) => {
//   try {
//     const userId = getUserId(req);
//     const positions = await PositionsModel.find({ user: userId });
//     res.json(positions);
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// // ================= ORDERS =================
// app.get("/allOrders", async (req, res) => {
//   try {
//     const userId = getUserId(req);
//     const orders = await OrdersModel.find({ user: userId });
//     res.json(orders);
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// // ================= NEW ORDER =================
// app.post("/newOrder", async (req, res) => {
//   try {
//     const userId = getUserId(req);
//     const { name, qty, price, mode, product } = req.body;

//     const quantity = Number(qty);
//     const stockPrice = Number(price);

//     // ===== BUY =====
//     if (mode === "BUY") {

//       // CNC → HOLDINGS
//       if (product === "CNC") {
//         let stock = await HoldingsModel.findOne({ name, user: userId });

//         if (stock) {
//           const totalQty = stock.qty + quantity;
//           const totalCost = stock.avg * stock.qty + stockPrice * quantity;

//           stock.avg = totalCost / totalQty;
//           stock.qty = totalQty;

//           await stock.save();
//         } else {
//           await HoldingsModel.create({
//             name,
//             qty: quantity,
//             avg: stockPrice,
//             price: stockPrice,
//             net: "0%",
//             day: "0%",
//             user: userId,
//           });
//         }
//       }

//       // MIS → POSITIONS
//       if (product === "MIS") {
//         let position = await PositionsModel.findOne({
//           name,
//           user: userId,
//         });

//         if (position) {
//           position.qty += quantity;
//           await position.save();
//         } else {
//           await PositionsModel.create({
//             product: "MIS",
//             name,
//             qty: quantity,
//             avg: stockPrice,
//             price: stockPrice,
//             net: "0%",
//             day: "0%",
//             isLoss: false,
//             user: userId,
//           });
//         }
//       }
//     }

//     // ===== SELL (FINAL FIX) =====
//     if (mode === "SELL") {

//       // 🔴 CNC SELL
//       if (product === "CNC") {
//         let holding = await HoldingsModel.findOne({
//           name,
//           user: userId,
//         });

//         if (!holding) {
//           return res.json({
//             success: false,
//             message: "No CNC holdings to sell",
//           });
//         }

//         if (quantity > holding.qty) {
//           return res.json({
//             success: false,
//             message: `Only ${holding.qty} shares available`,
//           });
//         }

//         holding.qty -= quantity;

//         if (holding.qty === 0) {
//           await HoldingsModel.deleteOne({ name, user: userId });
//         } else {
//           await holding.save();
//         }
//       }

//       // 🔴 MIS SELL
//       if (product === "MIS") {
//         let position = await PositionsModel.findOne({
//           name,
//           user: userId,
//         });

//         if (!position) {
//           return res.json({
//             success: false,
//             message: "No MIS position to sell",
//           });
//         }

//         if (quantity > position.qty) {
//           return res.json({
//             success: false,
//             message: `Only ${position.qty} shares available`,
//           });
//         }

//         position.qty -= quantity;

//         if (position.qty === 0) {
//           await PositionsModel.deleteOne({ name, user: userId });
//         } else {
//           await position.save();
//         }
//       }
//     }

//     // ===== SAVE ORDER =====
//     await OrdersModel.create({
//       name,
//       qty: quantity,
//       price: stockPrice,
//       mode,
//       product,
//       user: userId,
//     });

//     res.json({
//       success: true,
//       message: "Order executed successfully",
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Order failed",
//     });
//   }
// });

// // ================= DB =================
// mongoose
//   .connect(uri)
//   .then(() => {
//     console.log("✅ DB connected");

//     app.listen(PORT, () => {
//       console.log("🚀 Server running on port " + PORT);
//     });
//   })
//   .catch((err) => {
//     console.error("❌ DB error:", err);
//   });





require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const authRoute = require("./Routes/AuthRoute");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const User = require("./Models/UserModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://trade-app-sooty.vercel.app",
      "https://trade-app-git-main-mushkinshahabaz8-1191s-projects.vercel.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// ================= AUTH ROUTES =================
app.use("/", authRoute);

// ================= VERIFY =================
app.post("/verify", (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.json({ status: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ status: true, user: decoded.id });
  } catch {
    res.json({ status: false });
  }
});

// ================= HELPER =================
const getUserId = (req) => {
  const token = req.cookies.token;
  if (!token) throw new Error("No token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// ================= USER =================
app.get("/me", async (req, res) => {
  try {
    const userId = getUserId(req);

    const user = await User.findById(userId).select("username email");

    res.json({
      username: user.username,
      email: user.email,
    });
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// ================= LOGOUT =================
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ success: true });
});

// ================= HOLDINGS =================
app.get("/allHoldings", async (req, res) => {
  try {
    const userId = getUserId(req);
    const holdings = await HoldingsModel.find({ user: userId });
    res.json(holdings);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// ================= POSITIONS =================
app.get("/allPositions", async (req, res) => {
  try {
    const userId = getUserId(req);
    const positions = await PositionsModel.find({ user: userId });
    res.json(positions);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// ================= ORDERS =================
app.get("/allOrders", async (req, res) => {
  try {
    const userId = getUserId(req);
    const orders = await OrdersModel.find({ user: userId });
    res.json(orders);
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// ================= NEW ORDER =================
app.post("/newOrder", async (req, res) => {
  try {
    const userId = getUserId(req);
    const { name, qty, price, mode, product } = req.body;

    const quantity = Number(qty);
    const stockPrice = Number(price);

    // ===== BUY =====
    if (mode === "BUY") {

      if (product === "CNC") {
        let stock = await HoldingsModel.findOne({ name, user: userId });

        if (stock) {
          const totalQty = stock.qty + quantity;
          const totalCost = stock.avg * stock.qty + stockPrice * quantity;

          stock.avg = totalCost / totalQty;
          stock.qty = totalQty;

          await stock.save();
        } else {
          await HoldingsModel.create({
            name,
            qty: quantity,
            avg: stockPrice,
            price: stockPrice,
            net: "0%",
            day: "0%",
            user: userId,
          });
        }
      }

      if (product === "MIS") {
        let position = await PositionsModel.findOne({
          name,
          user: userId,
        });

        if (position) {
          position.qty += quantity;
          await position.save();
        } else {
          await PositionsModel.create({
            product: "MIS",
            name,
            qty: quantity,
            avg: stockPrice,
            price: stockPrice,
            net: "0%",
            day: "0%",
            isLoss: false,
            user: userId,
          });
        }
      }
    }

    // ===== SELL =====
    if (mode === "SELL") {

      if (product === "CNC") {
        let holding = await HoldingsModel.findOne({
          name,
          user: userId,
        });

        if (!holding) {
          return res.json({
            success: false,
            message: "No CNC holdings to sell",
          });
        }

        if (quantity > holding.qty) {
          return res.json({
            success: false,
            message: `Only ${holding.qty} shares available`,
          });
        }

        holding.qty -= quantity;

        if (holding.qty === 0) {
          await HoldingsModel.deleteOne({ name, user: userId });
        } else {
          await holding.save();
        }
      }

      if (product === "MIS") {
        let position = await PositionsModel.findOne({
          name,
          user: userId,
        });

        if (!position) {
          return res.json({
            success: false,
            message: "No MIS position to sell",
          });
        }

        if (quantity > position.qty) {
          return res.json({
            success: false,
            message: `Only ${position.qty} shares available`,
          });
        }

        position.qty -= quantity;

        if (position.qty === 0) {
          await PositionsModel.deleteOne({ name, user: userId });
        } else {
          await position.save();
        }
      }
    }

    // ===== SAVE ORDER =====
    await OrdersModel.create({
      name,
      qty: quantity,
      price: stockPrice,
      mode,
      product,
      user: userId,
    });

    res.json({
      success: true,
      message: "Order executed successfully",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
});

// ================= DB =================
mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ DB connected");

    app.listen(PORT, () => {
      console.log("🚀 Server running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
  });