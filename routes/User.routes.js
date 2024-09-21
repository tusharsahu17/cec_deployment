const express = require("express");
const userRouter = express.Router();
const { UserModel } = require("../model/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

userRouter.post("/register", async (req, res) => {
  const { email, pass, name, age } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      const user = new UserModel({ name, age, email, pass: hash, userType: 'user' });
      await user.save();
      res
        .status(200)
        .send({ msg: "New User has been registered", status: true });
    });
  } catch (err) {
    res.status(400).send({ err: err.msg, status: false });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(pass, user.pass, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { authorId: user._id, author: user.name },
            "node"
          );
          res
            .status(200)
            .send({ msg: "Login SuccessFull", token: token, userId: user._id });
        } else {
          res.status(200).send({ msg: "Wrong Credentials!!!" });
        }
      });
    } else {
      res.status(200).send({ msg: "Wrong Credentials!!!" });
    }
  } catch (err) {
    res.status(400).send({ err: err.msg });
  }
});

module.exports = {
  userRouter,
};
