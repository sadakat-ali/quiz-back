const mongoose = require("mongoose");

const Question = mongoose.model("Question", {
  question: {
    type: String,
    required: true,
    trim: true,
  },
  choice: {
    type: Array,
    required: true,
    trim: true,
  },
  correct: {
    type: String,
    required: true,
  },
});

module.exports = Question;
