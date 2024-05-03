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
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1; // Set default limit or the number of items per page
  const skipIndex = (page - 1) * limit;
  try {
    // Finding all questions with pagination
    const result = await QuestionModel.find()
      .sort({ _id: 1 })
      .limit(limit)
      .skip(skipIndex)
      .exec();

    const count = await QuestionModel.countDocuments();

    res.status(200).send({
      data: result,
      status: true,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = {
  QuestionRouter,
};
