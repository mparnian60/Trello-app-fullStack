const express = require("express");
const Board = require('../models/Board');
const List = require('../models/List');
const router = express.Router();

//middleware
router.use((req, res, next) => {
    if(req.session.user){
        next();
    } else {
        res.status(401).send("Please login");
    }
  });

  //new board
  router.post('/new', async(req,res) =>{
      try{
          req.body.userId = req.session.user.id;
        const newBoard = await Board.create(req.body);
        res.status(200).send(newBoard);
      }catch{
        res.status(400).send("Bad request");
      }
  })

  //having two user for the same board
  router.post('/new', async(req,res) =>{
    try{
        req.body.userId = req.session.user.id;
      const newBoard = await Board.create(req.body);
      res.status(200).send(newBoard);
    }catch{
      res.status(400).send("Bad request");
    }
})

  //get all Boards
router.get('/boards', async(req,res) =>{
  const allBoards = await Board.find({userId: req.session.user.id});
  res.status(200).send(allBoards);
})

//get boardDetails by ID
router.get('/boardDetails/:id', async(req,res) =>{
  const boardDetails = await Board.findById(req.params.id);
  res.status(200).send(boardDetails);
})



module.exports = router;