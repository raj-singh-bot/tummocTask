const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const Authentication = require("./routes/AuthRoute");
const passport = require("./Auth");
const session = require("express-session");
const authGoogle = require('./routes/GoogleAuthRoute')
 
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
app.use('/api', authGoogle)
app.get("/", (req, res) => {
  res.send("hello");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
