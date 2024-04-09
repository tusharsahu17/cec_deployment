const express = require("express");
const PaidCourseRouter = express.Router();
const {
  PaidCourseModel,
  CourseDataModel,
} = require("../model/PaidCourse.model");
PaidCourseRouter.use(express.json());

PaidCourseRouter.post("/create", async (req, res) => {
  try {
    const { courseId, courseDetails } = req.body;

    // Check if the course with given courseId exists
    const existingCourse = await PaidCourseModel.findOne({ courseId });

    if (existingCourse) {
      // If course exists, update its courseDetails array
      existingCourse.courseDetails.push(...courseDetails);
      await existingCourse.save();
      res.status(200).send({ msg: "Course details have been updated" });
    } else {
      // If course doesn't exist, create a new one
      const course = new PaidCourseModel(req.body);
      await course.save();
      res.status(200).send({ msg: "New course has been created" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

PaidCourseRouter.get("/", async (req, res) => {
  try {
    const result = await PaidCourseModel.find();
    if (result) {
      res.status(200).send({
        data: result,
        message: "Free Course found Successfully",
        status: true,
      });
    } else {
      res.status(200).send({
        message: "Free Course cannot be found Successfully",
        status: false,
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
PaidCourseRouter.delete(
  "/delete/:courseId/:courseDetailId",
  async (req, res) => {
    try {
      const { courseId, courseDetailId } = req.params;

      // Find the paid course by courseId
      const paidCourse = await PaidCourseModel.findOne({ courseId });

      if (!paidCourse) {
        return res.status(404).send({ msg: "Course not found" });
      }

      // Find the index of the course detail to remove
      const indexToRemove = paidCourse.courseDetails.findIndex(
        (detail) => detail.id === parseInt(courseDetailId)
      );

      if (indexToRemove === -1) {
        return res.status(404).send({ msg: "Course detail not found" });
      }

      // Remove the course detail from the array
      paidCourse.courseDetails.splice(indexToRemove, 1);

      // Save the updated paid course
      await paidCourse.save();

      res.status(200).send({ msg: "Course detail has been deleted" });
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  }
);

module.exports = {
  PaidCourseRouter,
};
