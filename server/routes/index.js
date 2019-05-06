//index.js will import all the different routes and create one route 
//which will be imported into server.js
const express = require('express');
const chirpsRouter = require('./chirper')//importing the chirper file
const usersRouter = require('./users')

//creating a new router
let router = express.Router();

// whatever you put here is what you are going to pass back to the server.js
router.use('/chirps', chirpsRouter);
router.use('/users', usersRouter)

module.exports= router;

// now go to server.js and import this main router