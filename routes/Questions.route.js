const express = require("express");
const QuestionRouter = express.Router();
const { QuestionModel } = require("../model/Questions.model");
QuestionRouter.use(express.json());

QuestionRouter.post("/create", async (req, res) => {
  try {
    const data = new QuestionModel(req.body);
    await data.save();
    res.status(200).send({ msg: "Question has been created" });
    // }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

QuestionRouter.get("/", async (req, res) => {
  try {
    const result = await QuestionModel.find();
    res.status(200).send({
      data: result,
      message: "Free Course found Successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = {
  QuestionRouter,
};
