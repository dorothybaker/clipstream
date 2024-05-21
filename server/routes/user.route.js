import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  getMe,
  subscribeAndUnsubscribe,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/me", protectRoute, getMe);
userRouter.post("/subscribe/:id", protectRoute, subscribeAndUnsubscribe);

export default userRouter;
