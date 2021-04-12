const Mongoose = require("mongoose");

const WorkoutSchema = new Mongoose.Schema({
  day: { type: Date, default: Date.now },
  totalDuration: Number,
  exercises: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Exercise",
    },
  ],
});

const Workout = Mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
