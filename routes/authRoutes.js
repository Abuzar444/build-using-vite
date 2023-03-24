import express from "express";
const router = express.Router();
import { rateLimit } from 'express-rate-limit';

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logoutUser
} from "../controllers/AuthControllers.js";

import authenticatedUser from "../middleware/auth.js"
import testUser from "../middleware/testUser.js"

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: `Too many request from this IP address, Please try again after 15 minutes`
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/updateUser").patch(authenticatedUser, testUser, updateUser);
router.route("/getCurrentUser").get(authenticatedUser, getCurrentUser);
router.route("/logout").get(logoutUser);

export default router