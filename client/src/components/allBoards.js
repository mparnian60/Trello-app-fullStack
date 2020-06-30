import getAllBoards from '../api/Trello/allBoardsAPI.js';
import newBoard from './newBoard.js';

const drawallBordsToDom = async (boards) =>{

    const boardList = await getAllBoards();

    let eachBoard = "";

    boardList.forEach((board) => {
        eachBoard = eachBoard + `<button type="button" class="btn btn-outline-secondary eachBoard" id=${board._id}>${board.name}</button>`
    });  

    $('#boardDetails').empty();
    $('#boardDetails').append(eachBoard);


    redirectToBoardSheet();
}

const redirectToBoardSheet = (board) =>{
    $(document).on('click','.eachBoard',(e)=>{
        e.preventDefault();
        page.redirect(`/boardDetails/${e.target.id}`);
    })
}  

export default drawallBordsToDom;
