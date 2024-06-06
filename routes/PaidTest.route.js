// Create Question
const express = require("express");
const PaidTestRouter = express.Router();
const {
  PaidQuestionModel,
  TestSeriesModel,
} = require("../model/PaidQuestion.model");
const { UserModel } = require("../model/User.model");
PaidTestRouter.use(express.json());

//----------------------------------- Create Question------------------------------------------
PaidTestRouter.post("/questions", async (req, res) => {
  const { question, options, correctAnswer, level } = req.body;
  try {
    const newQuestion = new PaidQuestionModel({
      question,
      options,
      correctAnswer,
      level,
    });
    await newQuestion.save();
    res.status(201).send(newQuestion);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Create Test Series
PaidTestRouter.post("/testseries", async (req, res) => {
  const { title, description, topic, price, questions } = req.body;
  try {
    const newTestSeries = new TestSeriesModel({
      title,
      description,
      topic,
      price,
      questions,
    });
    await newTestSeries.save();
    res.status(201).send(newTestSeries);
  } catch (err) {
    res.status(400).send(err);
  }
});

//------------------------------------Get all Test Series--------------------------------------
PaidTestRouter.get("/testseries", async (req, res) => {
  try {
    const testSeries = await TestSeriesModel.find().populate("questions");
    res.status(200).send({ data: testSeries, status: true });
  } catch (err) {
    res.status(500).send(err);
  }
});
PaidTestRouter.get("/testseriesById/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const user = await UserModel.findOne({ _id });
    if (!user) {
      return res.status(404).send({ message: "User not found", status: false });
    }
    const testSeries = await TestSeriesModel.find({
      _id: { $in: user.testSeries },
    });
    res.status(200).send({ data: testSeries, status: true });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
});
PaidTestRouter.get("/get-test-questions/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit 10 if not provided
    const skip = (page - 1) * limit;

    // Find the test series by its ID
    const testSeries = await TestSeriesModel.findById(_id).populate({
      path: "questions",
      options: {
        skip: skip,
        limit: limit,
      },
    });

    console.log("Test Series:", testSeries); // Log test series to check if it's fetched correctly

    // Check if the test series exists
    if (!testSeries) {
      return res
        .status(404)
        .send({ message: "Test series not found", status: false });
    }

    // Get the total count of questions for pagination
    const totalQuestions = testSeries.questions.length;

    console.log("Total Questions:", totalQuestions); // Log totalQuestions to check its value

    // Respond with the paginated questions data and total count
    res.status(200).send({
      data: testSeries.questions,
      total: totalQuestions,
      page: page,
      limit: limit,
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal Server Error", status: false });
  }
});
// Get all Questions
PaidTestRouter.get("/questions", async (req, res) => {
  try {
    const questions = await PaidQuestionModel.find();
    res.status(200).send(questions);
  } catch (err) {
    res.status(500).send(err);
  }
});

// -------------------------------------Update a Question--------------------------------------
PaidTestRouter.put("/questions/:id", async (req, res) => {
  try {
    const updatedQuestion = await PaidQuestionModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedQuestion);
  } catch (err) {
    res.status(400).send(err);
  }
});
// Update a Test Series
PaidTestRouter.put("/testseries/:id", async (req, res) => {
  try {
    const updatedTestSeries = await TestSeriesModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).send(updatedTestSeries);
  } catch (err) {
    res.status(400).send(err);
  }
});

//---------------------------------- Delete a Question-----------------------------------------
PaidTestRouter.delete("/questions/:id", async (req, res) => {
  try {
    await PaidQuestionModel.findByIdAndDelete(req.params.id);
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).send(err);
  }
});
// Delete a Test Series
PaidTestRouter.delete("/testseries/:id", async (req, res) => {
  try {
    await TestSeriesModel.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  PaidTestRouter,
};
