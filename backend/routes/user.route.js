import express from "express";

import {
  register,
  login,
  logout,
  updateProfile,
  getUserProfile
} from "../controllers/user.controller.js";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);

router.route("/login").post(login);

router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated, getUserProfile);

// FIXED ROUTE
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateProfile);

export default router;