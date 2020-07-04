page.configure({window:window});// bind to main window

//load navbar and append rest of the body
// $("body").prepend(nav);

//import components
import nav from './components/common/nav.js';
import signUp from './components/sigUp.js';
import login from './components/logIn.js';
import {newBoard, drawallBordsToDom, boardList} from './components/allBoards.js';
import drawBoardDetailsToDom from './components/boardDetails.js';
import homeDesign from './components/homeDesign.js'



const showPage = () =>{
    //configure routes

    page('/', () => {
       page.redirect('/home');
    });

    page('/home',nav,homeDesign);

    page('/boards',nav,()=>{
        newBoard();
        drawallBordsToDom();
    });

    page('/boardList',nav,boardList);

    page('/boardDetails/:id',nav,drawBoardDetailsToDom);

    page('/login',nav,login);

    page('/signup',nav,signUp);


    page({hashbang: true});

}

//jquery on ready
$(()=>{
    showPage();
})