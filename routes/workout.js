const express = require('express');
const router = express.Router();
const { verifyUser } = require('../utils/auth');

//controllers
const workoutController = require('../controllers/workout');

//routes
router.get('/getMyWorkout', verifyUser, workoutController.getMyWorkout);
router.post('/addWorkout', verifyUser, workoutController.addWorkout);
router.patch('/updateWorkout/:workoutId', verifyUser, workoutController.updateWorkout);
router.delete('/deleteWorkout/:workoutId', verifyUser, workoutController.deleteWorkout);
router.patch('/completeWorkoutStatus/:workoutId', verifyUser, workoutController.completeWorkoutStatus);

module.exports = router;
