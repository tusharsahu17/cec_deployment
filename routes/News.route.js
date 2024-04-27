const express = require("express");
const { NewsModel } = require("../model/News.model");
const path = require("path");
const fs = require("fs");
const { imageUpload } = require("../helper/imageUpload");
const NewsRouter = express.Router();

NewsRouter.use(express.json());

// Endpoint to create news with image upload
NewsRouter.post("/create", async (req, res) => {
  try {
    const { type, title, description } = req.body;
    const { image } = req.files;

    if (req?.files) {
      storePath = imageUpload(req.files, "news", "image");
    }

    // Check if all required fields are provided
    if (!type || !title || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save news details to the database
    const news = new NewsModel({
      type,
      title,
      description,
      image: storePath,
    });
    await news.save();

    res.status(200).json({ message: "News added successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to retrieve all news
NewsRouter.get("/", async (req, res) => {
  try {
    const result = await NewsModel.find();
    res.status(200).json({
      data: result,
      message: "News found successfully",
      status: true,
    });
  } catch (err) {
    res.status(400).json({ message: err.message, status: false });
  }
});
NewsRouter.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description } = req.body;

    // Check if the news exists
    const news = await NewsModel.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Update news details
    news.type = type || news.type;
    news.title = title || news.title;
    news.description = description || news.description;

    await news.save();

    res.status(200).json({ message: "News updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to delete news by ID
NewsRouter.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the news exists
    const news = await NewsModel.findById(id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    // Delete news from database
    await news.deleteOne();

    res.status(200).json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  NewsRouter,
};
