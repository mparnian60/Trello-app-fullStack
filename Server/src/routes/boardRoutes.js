const express = require("express");
const List = require('../models/List');
const Board = require('../models/Board');
const Card = require('../models/Card');
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


//Delete a board
router.delete('/delete/:id', async(req,res) =>{
  try{

      const list = await List.find({boardId: req.params.id})

      for( let i=0; i<list.length;i++){
        await Card.deleteMany({ listId:list[i]._id });
      };

      await List.deleteMany({boardId: req.params.id});

      const deletedBoard = await Board.deleteOne({_id: req.params.id});


      console.log(deletedBoard);
      
      res.status(200).send(deletedBoard);
  }catch(e){
    console.log(e);
      res.status(400).send('bad request');
  } 
})


module.exports = router;