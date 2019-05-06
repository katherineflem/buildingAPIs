const express= require('express');

//create a router
let router= express.Router();

//insert request
router.get('/', (req,res) =>{
    res.send('users')
});

module.exports = router;

//now we import this into our index.js