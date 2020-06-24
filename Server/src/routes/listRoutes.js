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

//Update list name
// router.patch('/update', async(req,res) =>{
//     try{
//         const updatedList = await List.findByIdAndUpdate({owner: req.body.boardId},req.body,{new:true})
//         res.status(200).send(updatedList);
//     }catch{
//         res.status(400).send("Bad request");
//     }
// })

//remove list

module.exports = router;