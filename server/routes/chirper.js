const express = require('express');
const chirpStore = require('../utils/chirpstore')

//create a router
let router = express.Router();

//insert request
router.get('/:id?', (req, res) => { //the ? allows an option for the id parameter
    let id = req.params.id
    if (id) { //if there is an id
        res.json(chirpStore.GetChirp(id)); //send back a chirp with that id
    } else {
        res.send(chirpStore.GetChirps()) //if no id send back all the chirps
    }
});

router.post('/', (req, res) => {
    chirpStore.CreateChirp(req.body);
    res.sendStatus(200)
})

router.put('/:id', (req, res) => {
    let id = req.params.id
    let chirp= req.body
    res.send(chirpStore.UpdateChirp(id, chirp))
})

router.delete('/:id', (req,res)=>{
    let id = req.params.id
    res.send(chirpStore.DeleteChirp(id))
})
// let updateChirp = (id, chirp) => {
//     chirps[id] = chirp;
//     writeChirps();
// }
//put and delete

module.exports = router;

//now we import this into our index.js

//app.method(path, handler)
//app is an instance of express like router or your express function in a variable
//method is get, post, put, or delete(https request)
//path is a path on the server
//handler is the function executed when the route is matched

//how can we test this:
//can create an app in client folder using index.html and jquery etc
//or we can use postman 