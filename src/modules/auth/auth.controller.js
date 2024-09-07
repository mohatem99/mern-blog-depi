import User from "../../db/models.js/auth.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const newUser = await User.create({ name, password: hashPassword, email });
    res.status(201).json({
      message: "success",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    next(error);
  }
};

export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
