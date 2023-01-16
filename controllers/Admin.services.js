const User = require("../models/User.model.js");
const Book = require("../models/Book.model.js");
const ResponseWrapper = require("../helpers/ResponseWrapper.js");

module.exports = {
  getAllStudents: async (req, res, next) => {
    try {
      const students = await User.find({ IsAdmin: false });
      res
        .status(200)
        .json(ResponseWrapper(true, "All students fetched", students));
    } catch (err) {
      next(err);
    }
  },

  getAllAdmin: async (req, res, next) => {
    try {
      const students = await User.find({ IsAdmin: true });
      res
        .status(200)
        .json(ResponseWrapper(true, "All admins fetched", students));
    } catch (err) {
      next(err);
    }
  },

  addBook: async (req, res, next) => {
    try {
      const result = req.body;
      const newBook = new Book(result);
      const savedBook = await newBook.save();
      res.status(200).json(ResponseWrapper(true, "New book added", savedBook));
    } catch (err) {
      next(err);
    }
  },
};
