const mongoose = require("mongoose");

const courseDataSchema = mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
});

const paidCourseSchema = mongoose.Schema(
  {
    id: { type: Number, required: true },
    courseId: { type: Number, required: true },
    courseName: { type: String, required: true },
    courseDetails: [courseDataSchema],
  },
  {
    versionKey: false,
  }
);

// Define the models
const CourseDataModel = mongoose.model("CourseData", courseDataSchema);
const PaidCourseModel = mongoose.model("PaidCourse", paidCourseSchema);

module.exports = {
  PaidCourseModel,
  CourseDataModel,
};
