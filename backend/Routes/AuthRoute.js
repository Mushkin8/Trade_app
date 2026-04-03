const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../Models/UserModel");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    // create user (password auto hashed by schema)
    const user = await User.create({
      username,
      email,
      password,
    });

    res.json({
      success: true,
      message: "Signup successful",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // send cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    res.json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
});


// ================= LOGOUT =================
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({ success: true });
});

module.exports = router;