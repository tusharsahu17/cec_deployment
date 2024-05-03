const express = require("express");
const path = require("path");
const fileURLToPath = require("url");

const { auth } = require("./middleware/auth.middleware");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.routes");
const { noteRouter } = require("./routes/Notes.route");
const { courseRouter } = require("./routes/Course.route");
const { PaidCourseRouter } = require("./routes/PaidCourse.route");
const { QuestionRouter } = require("./routes/Questions.route");
const { NewsRouter } = require("./routes/News.route");
const { PaidTestRouter } = require("./routes/PaidTest.route");

const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());
const fileUpload = require("express-fileupload");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
  })
);
app.use(express.static("public"));

app.use("/users", userRouter);
//protected
// app.use(auth);
app.use("/notes", noteRouter);
app.use("/course", courseRouter);
app.use("/paidCourse", PaidCourseRouter);
app.use("/question", QuestionRouter);
app.use("/news", NewsRouter);
app.use("/paid-test-series", PaidTestRouter);

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
