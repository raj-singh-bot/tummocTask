const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const Authentication = require("./routes/AuthRoute");
const passport = require("./Auth");
const session = require("express-session");
const authGoogle = require("./routes/GoogleAuthRoute");
const UserDetail = require("./models/userDetails");
const User = require("./models/userModel");

connectDB();
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SECRET_KEY,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.json());
app.use("/auth", Authentication);
app.use("/api", authGoogle);

app.post("/", (req, res) => {
  const { user, city } = req.body;
  console.log(user, city);

  const userDetail = new UserDetail({
    user: user,
    city: city,
  });

  userDetail.save((error, data) => {
    if (error) return res.status(400).json({ error });
    if (data) {
      return res.status(200).json({ data });
    }
  });
});
//populate
app.get("/", (req, res) => {
  UserDetail.find({})
    .populate("user")
    .exec(function (err, data) {
      if (err) return res.status(400).json({ err });
      res.json(data);
    });
});

//aggregation
app.get("/aggregation", (req, res) => {
  UserDetail.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "data",
      },
    },
  ]).exec(function (err, data) {
    if (err) return res.status(400).json(err.message);
    res.json(data);
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
