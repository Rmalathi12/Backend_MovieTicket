const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  rating: { type: Number, default: 0 },
  genre: { type: String },
  watched: { type: Boolean, default: false },
});
module.exports = mongoose.model("Movie", movieSchema);
