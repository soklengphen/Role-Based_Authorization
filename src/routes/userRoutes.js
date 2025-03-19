const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");

const router = express.Router();

// Only admin can access this router
router.get("/admin", verifyToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "admin dashboard" });
});

// Both admin and manager can access this router
router.get(
  "/manager",
  verifyToken,
  authorizeRoles("manager", "admin"),
  (req, res) => {
    res.json({ message: "manager dashboard" });
  }
);

// all can access this router
router.get(
  "/user",
  verifyToken,
  authorizeRoles("admin", "manager", "user"),
  (req, res) => {
    res.json({ message: "user dashboard" });
  }
);

module.exports = router;
