const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  population: {
    type: Number,
    required: true,
  },
});

const UserDetailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  city: [citySchema],
});

mongoose.model("City", citySchema);
const UserDetail = mongoose.model("UserDetail", UserDetailSchema);
module.exports = UserDetail;
