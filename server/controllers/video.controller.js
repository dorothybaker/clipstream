import User from "../models/user.model.js";
import Video from "../models/video.model.js";

export const likeAndDislikeVideo = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json("Video not found!");

    const videoLiked = video.likes.includes(userId);

    if (videoLiked) {
      await Video.updateOne({ _id: id }, { $pull: { likes: userId } });

      const updatedLikes = video.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      video.likes.push(userId);
      await video.save();

      const updatedLikes = video.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createVideo = async (req, res) => {
  const userId = req.user._id;
  const { title, description, thumbnail, videoUrl, tags } = req.body;

  try {
    const newVideo = new Video({
      userId,
      title,
      description,
      thumbnail,
      videoUrl,
      tags,
    });

    if (newVideo) {
      await newVideo.save();
      res.status(200).json(newVideo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id)
      .populate({ path: "userId", select: "-password" })
      .populate({ path: "comments.userId", select: "-password" });
    if (!video) return res.status(404).json("Video not found!");

    res.status(200).json(video);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const addView = async (req, res) => {
  const { id } = req.params;
  try {
    await Video.findByIdAndUpdate(
      id,
      {
        $inc: { views: 1 },
      },
      { new: true }
    );
    res.status(200).json("Views successfully incremented!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRandomVideos = async (req, res) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }]);

    await Video.populate(videos, { path: "userId", select: "-password" });

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTrending = async (req, res) => {
  try {
    const videos = await Video.find()
      .sort({ views: -1 })
      .populate({ path: "userId", select: "-password" });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSubscribing = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    const subscribedChannels = user.subscribingTo;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId }).populate({
          path: "userId",
          select: "-password",
        });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getRecommended = async (req, res) => {
  try {
    const videos = await Video.find()
      .limit(6)
      .populate({
        path: "userId",
        select: "-password",
      })
      .sort({ likes: -1 });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getSearch = async (req, res) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    })
      .limit(40)
      .populate({
        path: "userId",
        select: "-password",
      });
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createComment = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const { desc } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) return res.status(404).json("Video not found!");

    const comment = { userId: userId, desc };
    video.comments.push(comment);
    await video.save();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllComments = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate({
      path: "comments.userId",
      select: "-password",
    });

    const comments = video.comments;

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};
