const express = require("express");
const paidCourseRouter = express.Router();
const { PaidCourseModel } = require("../model/PaidCourse.model");
paidCourseRouter.use(express.json());

paidCourseRouter.post("/create", async (req, res) => {
  try {
    const course = new PaidCourseModel(req.body);
    await course.save();
    res.status(200).send({ msg: "new Paid Course has been created" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
// paidCourseRouter.get("/", async (req, res) => {
//   try {
//     const result = await PaidCourseModel.find();
//     if (result) {
//       res.status(200).send({
//         data: result,
//         message: "Course found Successfully",
//         status: true,
//       });
//     } else {
//       res.status(200).send({
//         message: "Course cannot be found Successfully",
//         status: false,
//       });
//     }
//   } catch (err) {
//     res.status(400).send({ message: err.message });
//   }
// });
module.exports = {
  paidCourseRouter,
};
