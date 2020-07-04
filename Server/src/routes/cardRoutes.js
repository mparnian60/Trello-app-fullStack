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
        // console.log(listCards);
        res.status(200).send(listCards);
    }catch{
        res.status(400).send("Bad request");
    } 
})

//update card position in drage & drop
router.patch('/updateIdDragDrop/:id', async(req,res) =>{
    try{
        const card = await Card.findByIdAndUpdate({_id:req.params.id}, {listId: req.body.listId}, {new:true});
        // console.log(card);
        res.status(200).send(card);
    }catch{
        res.status(400).send("Bad request");
    } 
})

//Delete a card
router.delete('/delete/:id', async(req,res) =>{
    try{
        const card = await Card.findByIdAndDelete(req.params.id);
        // console.log(card);
        res.status(200).send(card);
    }catch{
        res.status(400).send('bad request');
    } 
})

//update card Name
router.patch('/updateCardDescription/:id', async(req,res) =>{
    try{
        const card = await Card.findByIdAndUpdate({_id:req.params.id}, {name: req.body.name}, {new:true});
        // console.log(card);
        res.status(200).send(card);
    }catch{
        res.status(400).send("Bad request");
    } 
})

module.exports = router;