const express = require("express");
const Board = require('../models/Board')
const List = require('../models/List');
const Card = require('../models/Card')
const router = express.Router();

//middleware
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Please login");
    }
});

// new card
router.post('/new', async (req, res) => {
    try {
        const list = await List.findById(req.body.listId);
        
        if(!list){
            res.status(400).send("Bad request");
        }else{
            const newCard = await Card.create(req.body);
            res.status(200).send(newCard);
        }
        
    } catch{
        res.status(400).send("Bad request");
    }
})

//get all cards
router.get('/allCards/:listId', async(req,res) =>{
    try{
        const listCards = await Card.find({listId:req.params.listId}).populate('listId');
        console.log(listCards);
        res.status(200).send(listCards);
    }catch{
        res.status(400).send("Bad request");
    } 
})

module.exports = router;