const mongoose = require("mongoose");

const FreeCourseSchema = mongoose.Schema(
  {
    courseId: { type: Number, required: true },
    courseTitle: { type: String, required: true },
    title: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const FreeCourseModel = mongoose.model("freecourse", FreeCourseSchema);
module.exports = {
  FreeCourseModel,
};
