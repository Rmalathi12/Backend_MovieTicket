const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/movies/summary", async (req, res) => {
  try {
    const totalCount = await Movie.aggregate([
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    res.json({ totalCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/movies", async (req, res) => {
  try {
    const newMovie = new Movie({
      title: req.body.title,
      rating: req.body.rating,
      genre: req.body.genre,
      watched: req.body.watched,
    });
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.put("/movies/:id", async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        rating: req.body.rating,
        genre: req.body.genre,
        watched: req.body.watched,
      },
      { new: true },
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.delete("/movies/:id", async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
