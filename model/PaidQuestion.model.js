const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema(
  {
    option: { type: String, required: true }, // Option identifier (e.g., "A", "B", "C", "D")
    text: { type: String, required: true }    // Text of the option
  },
  {
    _id: false, // Avoid creating an _id for subdocuments
    versionKey: false
  }
);

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: [optionSchema], // Array of option objects
    correctAnswer: { type: String, required: true }, // Identifier of the correct option ("A", "B", "C", etc.)
    level: { type: String, required: true } // Difficulty level of the question
  },
  {
    versionKey: false
  }
);
const testSeriesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    topic: { type: String, required: true },
    price: { type: Number, required: true },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaidQuestion' }] // Array of references to `PaidQuestion` documents
  },
  {
    versionKey: false
  }
);

const TestSeriesModel = mongoose.model("TestSeries", testSeriesSchema);
const PaidQuestionModel = mongoose.model("PaidQuestion", questionSchema);
module.exports = {
  PaidQuestionModel,
  TestSeriesModel
};
