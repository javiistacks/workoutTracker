const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    day: { type: Date, default: new Date().setDate(new Date().getDate()) },
    exercises: Array,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

WorkoutSchema.virtual("totalDuration").get(function () {
  let sum = 0;
  for (let i = 0; i < this.exercises.length; i++) {
    sum += this.exercises[i].duration;
  }
  return sum;
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;