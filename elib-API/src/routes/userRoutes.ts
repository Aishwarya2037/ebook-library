import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
// import { loginUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/books", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
  });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
