const Mongoose = require("mongoose");

const Workout = require("../models/Workout.models");
const Exercise = require("../models/Exercise.models");

const CreateWorkout = async (req, res) => {
  try {
    const workout = await Workout.create(req.body);
    res.json(workout);
  } catch (err) {
    console.log(err);
  }
};

const FetchWorkouts = async (req, res) => {
  const workouts = await Workout.aggregate([
    {
      $lookup: {
        from: "exercises",
        localField: "exercises",
        foreignField: "_id",
        as: "exercises",
      },
    },
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercise.duration",
        },
      },
    },
  ]);
  res.json(workouts);
};

const UpdateWorkout = async (req, res) => {
  const exercise = await Exercise.create(req.body);
  const workout = await Workout.findById(req.params.id).populate("exercises");
  workout.exercises.push(exercise._id);
  let updatedWorkout = await workout.save();
  res.json(updatedWorkout);
};

const FetchWorkoutStats = async (req, res) => {
  const workouts = await Workout.aggregate([
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 7,
    },
    {
      $lookup: {
        from: "exercises",
        localField: "exercises",
        foreignField: "_id",
        as: "exercises",
      },
    },
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ]);

  res.json(workouts);
};

module.exports = {
  FetchWorkoutStats,
  FetchWorkouts,
  UpdateWorkout,
  CreateWorkout,
};
