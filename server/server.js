const express = require ('express')
const cors = require('cors');
const apiRouter = require('./routes')//the routes folder
let app = express();

app.use(cors());
app.use(express.json());//same as bodyparser just built into express

app.use('/api', apiRouter)

app.listen(3000)