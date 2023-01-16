const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
require("./helpers/initMongodb.js");
const AuthRoute = require("./routes/Auth.route.js");
app.use("/auth", AuthRoute);
const AdminRoute = require("./routes/Admin.route.js");
app.use("/admin", AdminRoute);
const StudentRoute = require("./routes/Student.route.js");
app.use("/student", StudentRoute);
const rateLimiter = require("./helpers/RateLimiter.js");
app.use(rateLimiter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
