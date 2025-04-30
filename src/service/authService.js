import bcrypt from "bcryptjs";
import User from "../modals/userModal.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerService = async (email, password, name) => {
  const hashPass = await bcrypt.hash(password, 10);
  const checkUser = await User.findOne({ email: email });
  if (checkUser) {
    throw new Error("user allrady exists plss login");
  }
  const newUser = await User.create({
    name,
    email,
    password: hashPass,
  });

  return newUser;
};

export const loginService = async (email, password) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("user not exists");
  }
  const checkpass = await bcrypt.compare(password, user.password);
  if (!checkpass) {
    throw new Error("password is incorrcet");
  }
  if (email === process.env.ADMIN_MAIL && password === process.env.ADMIN_PASS) {
    user.role = "admin";
    await user.save();
  }
  const payload = {
    _id: user._id,
    email: email,
  };
  const token = await jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });

  return {
    user,
    token,
  };
};
