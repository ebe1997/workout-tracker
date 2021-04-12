const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const WorkoutModule = require("./routes/workout.route");

const app = express();
const port = 8009;

const url =
  "mongodb+srv://lizzy2020:hello@cluster0.cystd.mongodb.net/Cluster0?retryWrites=true&w=majority";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("Connected to DB"))
  .catch((err) => console.log(err.message));

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/stats", (req, res) => {
  res.sendFile(__dirname + "/public/stats.html");
});

app.get("/exercise", (req, res) => {
  res.sendFile(__dirname + "/public/exercise.html");
});

app.use("/api/", WorkoutModule);

app.listen(port, () => {
  console.log(`app running on ${port}`);
});
