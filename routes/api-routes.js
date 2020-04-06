const router = require("express").Router();
const db = require("../models");
const moment = require("moment");

router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(Workouts => {
        let Workout = Workouts[Workouts.length-1];
        res.json(Workouts);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  });


  router.post("/api/workouts", (req, res) => {
    db.Workout.create({})
      .then(Workout => {
        res.json(Workout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });


  
router.put("/api/workouts/:id", (req, res) => {
  
  db.Workout.findOneAndUpdate({_id:req.params.id}, {$push:{exercises:req.body}})
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

  router.get("/api/workouts/range", (req,res)=>{
    
    db.Workout.find({}).then( async workouts=>{
      let weekago = moment().subtract(7, 'days');
      let workOutsInLastweek = await workouts.filter(workout=>{return weekago.isBefore(workout.day)})
      res.send(workOutsInLastweek);
    })




  })

module.exports = router;
