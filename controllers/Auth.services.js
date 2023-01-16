const User = require("../models/User.model.js");
const JWT = require("jsonwebtoken");
const ResponseWrapper = require("../helpers/ResponseWrapper.js");

module.exports = {
  Register: async (req, res, next) => {
    try {
      const result = req.body;
      const alreadyExists = await User.findOne({ Email: result.Email });
      if (alreadyExists) {
        console.log(alreadyExists);
        res
          .status(401)
          .json(ResponseWrapper(false, "Email already in use.", null));
      }
      const user = new User(result);
      const savedUser = await user.save();
      res
        .status(200)
        .json(ResponseWrapper(true, "New user registered", savedUser));
    } catch (err) {
      next(err);
    }
  },

  Login: async (req, res, next) => {
    try {
      const result = req.body;
      const user = await User.findOne({ Email: result.Email });
      if (!user) {
        return res
          .status(401)
          .json(ResponseWrapper(false, "Incorrect email", null));
      } else {
        console.log(user);
        if (result.Password !== user.Password) {
          return res
            .status(401)
            .json(ResponseWrapper(false, "Incorrect password", null));
        }
        const token = JWT.sign(
          { _id: user._id, IsAdmin: user.IsAdmin },
          process.env.SECRET_KEY
        );
        res.header("accessToken", token);
        res.status(200).json(ResponseWrapper(true, "User logged in.", user));
      }
    } catch (err) {
      next(err);
    }
  },
};
