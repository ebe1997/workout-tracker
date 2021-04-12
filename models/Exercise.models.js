const Mongoose = require("mongoose");

const ExerciseSchema = new Mongoose.Schema({
  type: String,
  "cardio-name": String,
  distance: Number,
  duration: Number,
  name: String,
  weight: Number,
  sets: Number,
  reps: Number,
  "resistance-duration": Number,
});

const Exercise = Mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;
