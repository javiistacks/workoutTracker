const db = require("../models");

module.exports = function (app) {
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
       .then(dbWorkout => { res.json(dbWorkout) })
       .catch(err => { console.log(err); });
  });

  app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).sort(({ date: 1 }))
      .then(dbWorkout => { res.json(dbWorkout) })
      .catch(err => { console.log(err); });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.Workout.find().sort(({ date: 1 }))
      .then(dbWorkout => { res.json(dbWorkout) })
      .catch(err => { console.log(err); });
  });

  app.put("/api/workouts/:id", ({ body, params }, res) => {
    db.Workout.findByIdAndUpdate(params.id,
        { $push: { exercises: body}},
        { new: true, runValidators: true }
      )
        .then(dbWorkout => {res.json(dbWorkout);})
        .catch(err => { console.log(err); });
  });
};