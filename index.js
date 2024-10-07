const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/user')
const workoutsRoutes = require('./routes/workout');

//configs
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//mongodb connection string
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

//routes
app.use('/users',userRoutes);
app.use('/workouts', workoutsRoutes);

app.get('/', (req, res) => {
    res.send('Fitness API.');
});

//listen to port
app.listen(port, () => {
    console.log(`API now running on port: http://localhost:${port}`)
})
