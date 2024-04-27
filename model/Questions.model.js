const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    question: { type: String, required: true },
    options: { type: Object, required: true },
    answer: { type: String, required: true },
    level: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

// Define the models
const QuestionModel = mongoose.model("Question", questionSchema);

module.exports = {
  QuestionModel,
};
