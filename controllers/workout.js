const Workout = require('../models/workout');

module.exports.getMyWorkout = (req, res) => {
    try {
        Workout.find({})
        .then(workouts => {
            if (workouts.length === 0){
                return res.status(200).send({message: 'No Workouts Found'});
            }
            res.status(200).send({workouts: workouts});
        })
        .catch(error =>
             res.status(500).send({
                message: 'Error Logging in',
                error: error.message
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports.addWorkout = (req, res) => {
    try {
        const { name, duration } = req.body;

        if (!name || !duration) {
            res.status(400).send({ message: 'All fields are required'});
        }

        const newWorkout = new Workout({
            name: name,
            duration: duration,
            status: 'pending',
            dateAdded: new Date()
        })

        newWorkout.save()
        .then(workout => {
            res.status(201).send(workout)
        })
        .catch(error =>
            res.status(500).send({
                message: 'Error creating workout',
                error: error.message
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports.updateWorkout = (req, res) => {
    try {
        const { name, duration } = req.body;
        const { workoutId } = req.params;

        Workout.findByIdAndUpdate(workoutId, {name, duration}, { new: true })
        .then(updatedWorkout => {
            res.status(200).send({
                message: 'Workout updated successfully',
                updatedWorkout: updatedWorkout
            })
        })
        .catch(error =>
            res.status(500).send({
                message: 'Error creating workout',
                error: error.message
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports.deleteWorkout = (req, res) => {
    try {
        const { workoutId } = req.params

        Workout.findByIdAndDelete(workoutId)
        .then(deletedWorkout => {
            res.status(200).send({ message: 'Workout deleted successfully' });
        })
        .catch(error =>
            res.status(500).send({
                message: 'Error deleting workout',
                error: error.message
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports.completeWorkoutStatus = (req, res) => {
    try {
        const { workoutId } = req.params

        Workout.findByIdAndUpdate(workoutId, {status:'completed'},{new:true})
        .then(updatedWorkout => {
            res.status(200).send({
                message: 'Workout status updated successfully',
                updatedWorkout: updatedWorkout
            })
        })
        .catch(error =>
            res.status(500).send({
                message: 'Error deleting workout',
                error: error.message
            })
        );
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}
