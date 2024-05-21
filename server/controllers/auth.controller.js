import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, username, email, password, image } = req.body;

  try {
    const existingUsername = await User.findOne({ username });
    if (existingUsername)
      return res.status(400).json("Username (channel name) already exists!");

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json("Email address already exists!");

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new User({
      fullName,
      username,
      email,
      image,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);

      await newUser.save();
      res.status(201).json("User created successfully!");
    } else {
      res.status(400).json("Invalid user data provided!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json("Invalid email address or password!");

    const isCorrectPassword = bcrypt.compareSync(password, user.password || "");
    if (!isCorrectPassword)
      return res.status(400).json("Invalid email address or password!");

    generateToken(user._id, res);
    res.status(200).json("Logged in successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const signout = async (req, res) => {
  try {
    res.clearCookie("youtube");
    res.status(200).json("Logged out successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
};
