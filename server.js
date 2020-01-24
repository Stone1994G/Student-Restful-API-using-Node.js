require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//let uri = await mongod.getConnectionString();
//uri = uri.replace('localhost', '127.0.0.1');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }); // useUnifiedTopology
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.error("Connected to Database"));

app.use(express.json());
//Will call other file named routes
const studentsRouter = require('./routes/students')
app.use('/students', studentsRouter)
// To Set up server must type in: npm run devStart
app.listen(4500, () => console.log('Server Started!!'));
