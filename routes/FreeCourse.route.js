const express = require("express");
const FreeCourseRouter = express.Router();
const { FreeCourseModel } = require("../model/FreeCourse.model");
FreeCourseRouter.use(express.json());

FreeCourseRouter.post("/create", async (req, res) => {
  try {
    const course = new FreeCourseModel(req.body);
    await course.save();
    res.status(200).send({ msg: "new free Course has been created" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
FreeCourseRouter.get("/", async (req, res) => {
  try {
    const result = await FreeCourseModel.find();
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
module.exports = {
  FreeCourseRouter,
};
