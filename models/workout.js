const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workout = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type:String,
        required:"Type is required"
      },
      name: {
        type:String
      },
      duration:{
        type:Number
      },
      weight: {
        type:Number
      },
      reps: {
        type:Number
      },
      sets: {
        type:Number
      },
      distance:{
        type:Number
      }
    }
  ]
}, { toJSON: { virtuals: true } });

workout.virtual("totalDuration").get(function(){
  return this.exercises.reduce((total,exercise)=>{
    return total + exercise.duration;
  },0)
})




const Workout = mongoose.model("workout", workout);

module.exports = Workout;
