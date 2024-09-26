const express = require("express");
const { PyqSchema } = require("../model/Pyq.model");
const upload = require("../helper/pdfConfig");
const PyqRouter = express.Router();

// Route to upload a PDF file
PyqRouter.post("/postPyq", upload.single("file"), async (req, res) => {
    try {
        // Ensure the file and name are provided
        const { name } = req.body;

        if (!req.file || !name) {
            return res.status(400).json({ error: "File and name are required" });
        }

        const newFile = new PyqSchema({
            file: req.file.path,
            name: name,
        });

        await newFile.save();

        res.json({ message: "File uploaded successfully", file: req.file.path });
    } catch (error) {
        res.status(500).json({ error: "Failed to upload file" });
    }
});

// Route to fetch all PDFs
PyqRouter.get("/getPyq", async (req, res) => {
    try {
        const allFiles = await PyqSchema.find({});
        res.json({ message: "PDFs Fetched Successfully", files: allFiles, status: true });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch PDF files", status: false });
    }
});

module.exports = PyqRouter;