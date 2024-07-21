const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome to home page");
    } catch (error) {
        console.log(error);
    }
};
/*
const register = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const userExist = await User.findOne({ email: email });
      if (userExist) {
        return res.status(400).json({ msg: "Email already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userCreated = await User.create({ username, email, password: hashedPassword });
      res.status(201).json({
        msg: "Registration succes sful!",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ msg: "Internal server error", error });
    }
};*/
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    const userCreated = await User.create({ username, email, password });
    res.status(201).json({
      msg: "Registration successful!",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ msg: "Internal server error", error });
  }
};
const login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const userExist = await User.findOne({ email });
      if (!userExist) {
          return res.status(400).json({ message: "Invalid Credentials" });
      }
      
      //console.log('Stored hashed password:', userExist.password);
      //console.log('Password provided:', password);
      
      const isMatch = await bcrypt.compare(password, userExist.password);
      console.log('Password comparison result:', isMatch);

      if (isMatch) {
          res.status(200).json({
              msg: "Login success!",
              token: await userExist.generateToken(),
              userId: userExist._id.toString(),
          });
      } else {
          res.status(401).json({ message: "Invalid email or password" });
      }
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ msg: "Internal server error", error });
  }
};
module.exports = { home, register, login };
