const express = require("express");
const List = require('../models/List');
const Board = require('../models/Board')
const router = express.Router();

//middleware
router.use((req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("Please login");
    }
});

// new list
router.post('/new', async (req, res) => {
    try {
        const board = await Board.findOne({ userId: req.session.user.id ,_id: req.body.boardId})

        if(!board){
            res.status(400).send("Bad request");
        }else{
            const newList = await List.create(req.body);
            res.status(200).send(newList);
        }
        
    } catch{
        res.status(400).send("Bad request");
    }
})

//get all lists
router.get('/allLists/:boardId', async(req,res) =>{
    try{
        const boardLists = await List.find({boardId: req.params.boardId}).populate('boardId');
        console.log(boardLists);
        res.status(200).send(boardLists);
    }catch{
        res.status(400).send("Bad request");
    } 
})

//Delete all lists related to a board
router.delete('/delete/:boardId', async(req,res) =>{
    try{
        const list = await List.deleteMany({"boardId": req.params.id});
        console.log(list);
        res.status(200).send(list);
    }catch{
        res.status(400).send('bad request');
    } 
})

module.exports = router;