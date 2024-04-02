const express = require("express");
const courseRouter = express.Router();
const { CourseModel } = require("../model/Course.model");
courseRouter.use(express.json());

courseRouter.post("/create", async (req, res) => {
  try {
    const course = new CourseModel(req.body);
    await course.save();
    res.status(200).send({ msg: "new Course has been created" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
courseRouter.get("/", async (req, res) => {
  try {
    const result = await CourseModel.find();
    if (result) {
      res.status(200).send({
        data: result,
        message: "Course found Successfully",
        status: true,
      });
    } else {
      res.status(200).send({
        message: "Course cannot be found Successfully",
        status: false,
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});
module.exports = {
  courseRouter,
};
