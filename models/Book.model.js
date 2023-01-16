const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  Name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    default: "----Not available----",
  },
  Category: {
    type: String,
    enum: [
      "Romance",
      "Technology",
      "Computer Science",
      "Management",
      "Electronics",
      "Physics",
      "Chemistry",
      "Mathematics",
      "Fiction",
      "Philosophy",
      "Language",
      "Arts",
      "Other",
    ],
    required: true,
  },
  Copies: {
    type: Number,
    min: 1,
    max: 1000,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
