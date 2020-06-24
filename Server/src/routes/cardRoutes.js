const express = require("express");
const Board = require('../models/Board')
const List = require('../models/List');
const Card = require('../models/Board')
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
            console.log('list', list);
        // const list = await Board.find({"lists._id": {$eq: req.body.listId}});
        // console.log('list',list);
        
        if(!list){
            res.status(400).send("Bad request");
        }else{
            console.log('after else')
            req.body.owner = list._id;
            console.log('req.body', req.body)
            const newCard = await Card.create(req.body);
            console.log(newCard);
            list.cards.push(newCard);
            console.log(list.cards);
            const result = await list.save();
            res.status(200).send(result);
        }
        
    } catch{
        res.status(400).send("Bad request");
    }
})

module.exports = router;