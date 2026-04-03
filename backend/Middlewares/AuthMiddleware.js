const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;

  console.log("TOKEN:", token); // 👈 ADD THIS

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    console.log("VERIFY ERROR:", err); // 👈 ADD
    console.log("VERIFY DATA:", data); // 👈 ADD

    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.id);

      if (user) {
        return res.json({ status: true, user: user.username });
      } else {
        return res.json({ status: false });
      }
    }
  });
};