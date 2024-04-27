const mongoose = require("mongoose");

const newsSchema = mongoose.Schema(
  {
    type: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

// Define the models
const NewsModel = mongoose.model("News", newsSchema);

module.exports = {
  NewsModel,
};
