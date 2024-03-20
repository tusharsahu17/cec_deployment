const express = require("express");
const { NotesModel } = require("../model/Notes.model");
const noteRouter = express.Router();

noteRouter.post("/create", async (req, res) => {
  try {
    const note = new NotesModel(req.body);
    await note.save();
    res.status(200).send({ msg: "new notes has been created" });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

noteRouter.get("/", async (req, res) => {
  const { title, authorId } = req.body;
  try {
    const result = await NotesModel.find({ authorId: authorId });
    if (result) {
      res
        .status(200)
        .send({ data: result, message: "Notes Found Sucessfully" });
    } else {
      res.status(200).send({ message: "Notes cannot be Found Successfully" });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
  //logic
});
noteRouter.patch("/update/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await NotesModel.findOne({ _id: noteId });
  try {
    if (req.body.authorId !== note.authorId) {
      res.status(200).send({ message: "Unauthorised" });
    }
    const result = await NotesModel.findByIdAndUpdate(
      { _id: noteId },
      req.body
    );
    res.status(200).send({ message: "Updated successfully", data: result });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
noteRouter.delete("/delete/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const note = await NotesModel.findOneAndDelete({ _id: noteId });
  try {
    if (req.body.authorId !== note.authorId) {
      res.status(400).send({ message: "Unauthorised" });
    } else {
      res.status(200).send({ message: "deleted successfully" });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});
module.exports = {
  noteRouter,
};
