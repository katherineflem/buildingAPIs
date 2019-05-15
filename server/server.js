const express = require('express')
const cors = require('cors');
const apiRouter = require('./routes')//the routes folder]
const morgan = require('morgan')

let app = express();//request starts here

//can pass in things that requesters cant see and edit
app.use(cors());
app.use(morgan('dev'));

//what you use when you have jqery or ajax
app.use(express.urlencoded({ extended: false }))//you will want this when workgin with jquery

//is there a body, yes, so express.json kicks on and creates a body attached the the request
app.use(express.json());//same as bodyparser just built into express

app.use(express.static('client'))

app.use('/api', apiRouter)//want to use apiRouter logic on a path called api

app.listen(3000)

