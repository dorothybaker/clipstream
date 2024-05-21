import { Router } from "express";
import { protectRoute } from "../utils/protectRoute.js";
import {
  addView,
  createComment,
  createVideo,
  getAllComments,
  getRecommended,
  getRandomVideos,
  getSearch,
  getSubscribing,
  getTrending,
  getVideo,
  likeAndDislikeVideo,
} from "../controllers/video.controller.js";

const videoRouter = Router();

videoRouter.get("/subscribing", protectRoute, getSubscribing);
videoRouter.get("/random", getRandomVideos);
videoRouter.get("/tags", getRecommended);
videoRouter.get("/trending", getTrending);
videoRouter.get("/search", getSearch);
videoRouter.get("/:id", getVideo);
videoRouter.get("/comments/:id", getAllComments);
videoRouter.post("/create", protectRoute, createVideo);
videoRouter.post("/like/:id", protectRoute, likeAndDislikeVideo);
videoRouter.post("/comment/:id", protectRoute, createComment);
videoRouter.put("/view/:id", addView);

export default videoRouter;
