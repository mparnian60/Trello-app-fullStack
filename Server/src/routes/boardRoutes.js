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
          req.body.owner = req.session.user.id;
        const newBoard = await Board.create(req.body);
        res.status(200).send(newBoard);
      }catch{
        res.status(400).send("Bad request");
      }
  })

  //get all Boards
router.get('/boards', async(req,res) =>{
  const boards = await Board.find({owner: req.session.user.id}).populate('lists');
  res.status(200).send(boards);
})


module.exports = router;