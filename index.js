//express
const express = require("express");
const Question = require("./question");
const app = express();
const port = process.env.PORT || 3000;

//DB Connection
require("./db");

// Parsing Body of request
app.use(express.json());

//create
app.post("/quiz-api/create-question", async (req, res) => {
  const question = new Question(req.body);
  try {
    await question.save();
    res.status(201).send(question);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read
app.get("/quiz-api/read-questions", async (req, res) => {
  try {
    const questions = await Question.find({});
    if (!questions) {
      return res.status(404).send(`Questions Not found`);
    }
    res.status(200).send(questions);
  } catch (e) {
    res.status(500).send(e);
  }
});

//read question by id
app.get("/quiz-api/read-questions/:id", async (req, res) => {
  try {
    const questions = await Question.findById(req.params.id);
    if (!questions) {
      return res.status(404).send(`Questions Not found`);
    }
    res.status(200).send(questions);
  } catch (e) {
    res.status(500).send(e);
  }
});

//update
app.patch("/quiz-api/update-question/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const validFileds = ["question", "choice", "correct"];
  const isValidOperation = updates.every((update) =>
    validFileds.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid Updates!" });
  }

  try {
    //getting the question
    const question = await Question.findById(req.params.id);
    //checking if question exists
    if (!question) {
      return res.status(404).send("Task Not Found!");
    }
    //updating the question
    updates.forEach((update) => (question[update] = req.body[update]));
    //saving the question
    await question.save();
    //if every thing goes correctly
    return res.status(200).send(question);
  } catch (e) {
    return res.status(400).send(e);
  }
});

//delete
app.delete("/quiz-api/delete-question/:id", async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).send("Question Not Found!");
    }
    return res.status(200).send(question);
  } catch (e) {
    return res.status(500).send(e);
  }
});

app.listen(port, () => {
  console.log(`"Server is up on ${port}"`);
});
