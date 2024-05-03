const express = require("express");
const { SliderSchema } = require("../model/Slider.model");
const path = require("path");
const fs = require("fs");
const { imageUpload } = require("../helper/imageUpload");
const SliderRouter = express.Router();

SliderRouter.use(express.json());

SliderRouter.post("/add-Slider", async (req, res) => {
  try {
    const { image } = req.files;
    if (req?.files) {
      storePath = imageUpload(req.files, "slider", "image");
    }
    if (!image) {
      return res.status(400).json({ message: "Images are required" });
    }
    const news = new SliderSchema({
      image: storePath,
    });
    await news.save();
    res.status(200).json({ message: "Slider Image added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
SliderRouter.get("/", async (req, res) => {
  try {
    const result = await SliderSchema.find();
    res.status(200).json({
      data: result,
      message: "Slider Images found successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, status: false });
  }
});
SliderRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SliderSchema.findById(id);
    if (!result) {
      return res.status(404).json({ message: "News not found" });
    }
    await result.deleteOne();

    res.status(200).json({
      message: "Slider Images deleted successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, status: false });
  }
});
module.exports = {
  SliderRouter,
};
