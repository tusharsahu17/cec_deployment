// Create Question
const express = require("express");
const PaidTestRouter = express.Router();
const { PaidQuestionModel, TestSeriesModel } = require("../model/PaidQuestion.model");
PaidTestRouter.use(express.json());

//----------------------------------- Create Question------------------------------------------
PaidTestRouter.post('/questions', async (req, res) => {
    const { question, options, correctAnswer, level } = req.body;
    try {
        const newQuestion = new PaidQuestionModel({ question, options, correctAnswer, level });
        await newQuestion.save();
        res.status(201).send(newQuestion);
    } catch (err) {
        res.status(400).send(err);
    }
});
// Create Test Series
PaidTestRouter.post('/testseries', async (req, res) => {
    const { title, description, topic, price, questions } = req.body;
    try {
        const newTestSeries = new TestSeriesModel({ title, description, topic, price, questions });
        await newTestSeries.save();
        res.status(201).send(newTestSeries);
    } catch (err) {
        res.status(400).send(err);
    }
});



//------------------------------------Get all Test Series--------------------------------------
PaidTestRouter.get('/testseries', async (req, res) => {
    try {
        const testSeries = await TestSeriesModel.find().populate('questions');
        res.status(200).send({ data: testSeries, status: true });
    } catch (err) {
        res.status(500).send(err);
    }
});
// Get all Questions
PaidTestRouter.get('/questions', async (req, res) => {
    try {
        const questions = await PaidQuestionModel.find();
        res.status(200).send(questions);
    } catch (err) {
        res.status(500).send(err);
    }
});

// -------------------------------------Update a Question--------------------------------------
PaidTestRouter.put('/questions/:id', async (req, res) => {
    try {
        const updatedQuestion = await PaidQuestionModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send(updatedQuestion);
    } catch (err) {
        res.status(400).send(err);
    }
});
// Update a Test Series
PaidTestRouter.put('/testseries/:id', async (req, res) => {
    try {
        const updatedTestSeries = await TestSeriesModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send(updatedTestSeries);
    } catch (err) {
        res.status(400).send(err);
    }
});

//---------------------------------- Delete a Question-----------------------------------------
PaidTestRouter.delete('/questions/:id', async (req, res) => {
    try {
        await PaidQuestionModel.findByIdAndDelete(req.params.id);
        res.status(204).send(); // No Content
    } catch (err) {
        res.status(500).send(err);
    }
});
// Delete a Test Series
PaidTestRouter.delete('/testseries/:id', async (req, res) => {
    try {
        await TestSeriesModel.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    PaidTestRouter,
};
