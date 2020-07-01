import {newBoardAPI, data} from '../api/Trello/newBordAPI.js'


const newBoard = (ctx, next) => {
 /*template*/
 $('#app').empty();
    $('#app').append(`
    
        <button type="button" class="btn btn-outline-secondary" id='createNewBoard'>Create new board</button>
    
    `);


    $(document).on('click','#createNewBoard',async (e) => {
        e.preventDefault();

        console.log('new board clicked');

        const boardNameNew = prompt('Add board Name');

        // console.log(boardNameNew);

        const boardData = {
            name: boardNameNew
        };

        
        await newBoardAPI(boardData);
        // console.log('id',data._id);
        page.redirect(`/boardDetails/${data._id}`);
    });

}

export default newBoard;