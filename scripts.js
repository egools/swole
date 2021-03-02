function newCircuit(num) {
  return {
    name: "circuit " + num,
    reps: 1,
    workouts: [newWorkout(1)],
  };
}

function newWorkout(num) {
  return {
    name: "workout " + num,
    duration: 30,
  };
}

var app = new Vue({
  el: "#app",
  data: {
    routine: [],
    workoutStarted: false,
    workoutFinished: false,
    currentCircuit: 0,
    currentRep: 0,
    currentWorkout: 0,
    timer: 0.0,
  },
  mounted: function () {
    this.routine.push(newCircuit(this.routine.length + 1));
  },
  methods: {
    addCircuit: function () {
      this.routine.push(newCircuit(this.routine.length + 1));
    },
    removeCircuit: function (index) {
      this.routine.splice(index, 1);
    },
    addWorkout: function (num) {
      let workout = newWorkout(this.routine[num].workouts.length + 1);
      this.routine[num].workouts.push(workout);
    },
    removeWorkout: function (circuitIndex, workoutIndex) {
      this.routine[circuitIndex].workouts.splice(workoutIndex, 1);
    },
    startWorkout: function () {
      this.workoutStarted = true;
      let t = setInterval(() => {
        this.timer += 0.01;
      }, 10);
      setTimeout(() => {
        this.currentWorkout++;
        if (
          this.currentWorkout >=
          this.routine[this.currentCircuit].workouts.length
        ) {
          this.currentWorkout = 0;
          this.currentRep++;
          if (this.currentRep >= this.routine[this.currentCircuit].reps) {
            this.currentRep = 0;
            this.currentCircuit++;
            if (this.currentCircuit >= this.routine.length) {
              this.workoutFinished = true;
            }
          }
        }
        clearInterval(t);
        this.timer = 0.0;
        if (!this.workoutFinished) {
          this.startWorkout();
        }
      }, this.routine[this.currentCircuit].workouts[this.currentWorkout].duration * 1000);
    },
  },
});
