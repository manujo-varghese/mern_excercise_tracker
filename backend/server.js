const express = require('express');
const cros = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

app.use(cros());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Mongodb database connection established successfully");
})

const exercisesRouter = require('./routes/excercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
   console.log(`Server is running on port :${port}`);
});