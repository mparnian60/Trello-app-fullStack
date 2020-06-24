const express = require("express");
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router();


//new user
router.post('/new', async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10);
        const data = await User.create(req.body)
        res.send(data)
    } catch{
        res.status(400).send('Bad request');
    }
});


//login
router.post('/login', async (req, res) => {
    try {
        const data = await User.findOne({ username: req.body.username });
       
        if (data && await bcrypt.compare(req.body.password, data.password)) {

            //if user exist and password match, then create session 
            req.session.user = {
                username : data.username,
                id: data._id,
                loggedIn: true
            }

            res.status(200).send(req.session.user);

        }
    }catch{
        res.status(400).send('Enter valid username & password');
    }

})

//logout
router.get('/logout', async (req,res) =>{
    req.session.destroy(()=>{
        res.send('User logged out');
    })
})


module.exports = router;