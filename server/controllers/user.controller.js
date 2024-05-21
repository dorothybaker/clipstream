import User from "../models/user.model.js";

export const getMe = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json("User not found!");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const subscribeAndUnsubscribe = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const channel = await User.findById(id);
    const currentUser = await User.findById(userId);

    if (id.toString() === userId.toString()) {
      return res
        .status(400)
        .json("You can't subscribe/unsubscribe to yourself");
    }

    if (!channel || !currentUser)
      return res.status(404).json("User not found!");

    const subscribed = currentUser.subscribingTo.includes(id);

    if (subscribed) {
      // Unsubscribe to the channel
      await User.findByIdAndUpdate(id, { $pull: { subcribers: userId } });
      await User.findByIdAndUpdate(userId, { $pull: { subscribingTo: id } });

      res.status(200).json("Subscribed successfully!");
    } else {
      // Subscribe to the channel
      await User.findByIdAndUpdate(id, { $push: { subcribers: userId } });
      await User.findByIdAndUpdate(userId, { $push: { subscribingTo: id } });

      res.status(200).json("Unsubscribed successfully");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
