const express = require('express');
const session = require('express-session');
require('../mongo');
const app = express();
const port = 3000;


//routers
const userRouter = require('./routes/userRoutes');
const boardRouter = require('./routes/boardRoutes');
const listRouter = require('./routes/listRoutes');
const cardRouter = require('./routes/cardRoutes');


//middleware
app.use(express.json()); //parse JSON body
app.use(session({
    secret: "puffy window lion", //a random string do not copy this value or your stuff will get hacked
    resave: false,
    saveUninitialized: false 
}))


app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/list", listRouter);
app.use("/card", cardRouter);



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
