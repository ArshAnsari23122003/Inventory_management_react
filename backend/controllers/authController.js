// inventory-backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const adminUser = {
  email: "admin@example.com",
  password: bcrypt.hashSync("admin123", 10), // Hashed password
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email !== adminUser.email) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const validPass = await bcrypt.compare(password, adminUser.password);
  if (!validPass) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ token });
};
// ✅ This hardcodes an admin user (admin@example.com / admin123).  