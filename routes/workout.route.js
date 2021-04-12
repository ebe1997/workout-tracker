const express = require("express");
const router = express.Router();
const {
  CreateWorkout,
  FetchWorkoutStats,
  FetchWorkouts,
  UpdateWorkout,
} = require("../controllers/workout.controller");

router.get("/workouts", FetchWorkouts);
router.post("/workouts", CreateWorkout);
router.put("/workouts/:id", UpdateWorkout);
router.get("/workouts/range", FetchWorkoutStats);

module.exports = router;
