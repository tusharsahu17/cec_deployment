const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    title: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const CourseModel = mongoose.model("course", courseSchema);
module.exports = {
  CourseModel,
};
