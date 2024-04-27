const express = require("express");
const { auth } = require("./middleware/auth.middleware");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Notes.route");
const { courseRouter } = require("./routes/Course.route");
const { PaidCourseRouter } = require("./routes/PaidCourse.route");

const app = express();
const cors = require("cors");
const { QuestionRouter } = require("./routes/Questions.route");
require("dotenv").config();
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
//protected
// app.use(auth);
app.use("/notes", noteRouter);
app.use("/course", courseRouter);
app.use("/paidCourse", PaidCourseRouter);
app.use("/question", QuestionRouter);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connected to the DB");
  } catch (err) {
    console.log(err);
    console.log("cannot connect to the DB");
  }

  console.log(`server is running at ${process.env.port}`);
});
