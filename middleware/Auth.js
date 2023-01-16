const { response } = require("express");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/User.model.js");

const helper = async (userID) => {
  const user = await User.findById(userID);
  return user.IsAdmin;
};
module.exports = {
  Auth: (role) => {
    return async (req, res, next) => {
      const token = req.header("accessToken");
      if (!token) {
        return next(createError.Unauthorized("Token not provided"));
      }
      try {
        let infoId = null;
        JWT.verify(token, process.env.SECRET_KEY, (err, info) => {
          if (err) {
            return next(createError.Unauthorized());
          }
          infoId = info._id;
          // const adminStatus = await helper(info._id);
        });
        const adminStatus = await helper(infoId);
        if (
          (adminStatus && role === "Admin") ||
          (!adminStatus && role === "Student")
        ) {
          req.id = infoId;
          next();
        } else {
          return next(createError.Unauthorized());
        }
        // if (
        //   User.findById(decoded._id, (err, user) => {
        //     if (err) {
        //       next(createError.BadRequest());
        //       return user.IsAdmin;
        //     }
        //   })
        // ) {
        //   // req.User = decoded;
        //   next();
        // }
      } catch (err) {
        next(createError.Unauthorized());
      }
    };
  },
};
