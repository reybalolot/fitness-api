const express = require('express');
const router = express.Router();

//controllers
const workoutController = require('../controllers/workout');

//routes
router.get('/getMyWorkout', workoutController.getMyWorkout);
router.post('/addWorkout', workoutController.addWorkout);
router.patch('/updateWorkout/:workoutId', workoutController.updateWorkout);
router.delete('/deleteWorkout/:workoutId', workoutController.deleteWorkout);
router.patch('/completeWorkoutStatus/:workoutId', workoutController.completeWorkoutStatus);

module.exports = router;
