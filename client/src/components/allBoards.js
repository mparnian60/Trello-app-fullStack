import getAllBoards from '../api/Trello/allBoardsAPI.js';
import newBoardBtn from './newBoard.js';


const drawallBordsToDom = async (boards) =>{

    const boardList = await getAllBoards();

    let eachBoard = "";

    boardList.forEach((board) => {
        eachBoard = eachBoard + `<button type="button" class="btn btn-outline-secondary eachBoard" id=${board._id}>${board.name}</button>`
    });  

    $('#app').children().remove();
    $('#app').append(eachBoard);

    $('.eachBoard').on('click',(e)=>{
        page.redirect(`/boardDetails/${e.target.id}`)
    })

}


export default drawallBordsToDom;
