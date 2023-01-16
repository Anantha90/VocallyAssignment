const User = require("../models/User.model.js");
const Book = require("../models/Book.model.js");
const ResponseWrapper = require("../helpers/ResponseWrapper.js");

module.exports = {
  getStudent: async (req, res, next) => {
    try {
      const StudentID = req.id;
      const student = await User.findById(StudentID).populate({
        path: "BooksIssued",
        model: "Book",
      });
      res
        .status(200)
        .json(ResponseWrapper(true, "Student profile fetched", student));
    } catch (err) {
      next(err);
    }
  },
  issueBook: async (req, res, next) => {
    try {
      const StudentID = req.id;
      const BookID = req.params.BookID;
      const book = await Book.findById(BookID);
      if (!book) {
        res.status(401).json(ResponseWrapper(false, "Book not found", null));
      }
      if (book) {
        const copies = book.Copies;
        // console.log(copies);
        if (copies > 0) {
          await Book.findByIdAndUpdate(BookID, { Copies: copies - 1 });
          const student = await User.findByIdAndUpdate(StudentID, {
            $push: { BooksIssued: book },
          });
          res.status(200).json(ResponseWrapper(true, "Book issued", student));
        }
      }
    } catch (err) {
      next(err);
    }
  },
  returnBook: async (req, res, next) => {
    try {
      const StudentID = req.id;
      const BookID = req.params.BookID;
      const book = await Book.findById(BookID);
      if (!book) {
        res.status(401).json(ResponseWrapper(false, "Book not found", null));
      }
      if (book) {
        const copies = book.Copies;
        // console.log(copies);
        await Book.findByIdAndUpdate(BookID, { Copies: copies + 1 });
        const student = await User.findByIdAndUpdate(StudentID, {
          $pull: { BooksIssued: BookID },
        });
        res.status(200).json(ResponseWrapper(true, "Book issued", student));
      }
    } catch (err) {
      next(err);
    }
  },
};
