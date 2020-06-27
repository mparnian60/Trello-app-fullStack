import newBoardAPI from '../api/Trello/newBordAPI.js'

const newBoard = (ctx, next) => {
 /*template*/
 $('#app').empty();
    $('#app').append(`
    
        <button type="button" class="btn btn-outline-secondary" id='createNewBoard'>Create new board</button>
    
    `);


    $(document).on('click','#createNewBoard',(e) => {
        e.preventDefault();

        console.log('new board clicked');

        const boardNameNew = prompt('Add board Name');

        console.log(boardNameNew);

        const boardData = {
            name: boardNameNew
        };

        console.log(boardData);
        newBoardAPI(boardData);
        page.redirect("/boardDetails");
    });

}

export default newBoard;