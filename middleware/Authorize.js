const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const {
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
} = require("./JwtHelper.js");

module.exports = {
  Authorize: async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken) {
      if (!refreshToken) {
        return next(createError.Unauthorized());
      } else {
        const userId = await verifyRefreshToken(refreshToken);
        if (!userId) {
          return next(createError.Unauthorized());
        }
        const accessToken = await signAccessToken(userId);
        const refToken = await signRefreshToken(userId);
        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        res.cookie("refreshToken", refToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
        next();
      }
    }
    JWT.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
};
