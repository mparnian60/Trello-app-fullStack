import getAllBoards from '../api/Trello/allBoardsAPI.js';
import newBoardAPI from '../api/Trello/newBordAPI.js'
import deleteBoardAPI from '../api/Trello/deletedBoardAPI.js';
import deleteCardAPI from '../api/Trello/deleteCardAPI.js'

let newBoardDiv;

//create new board
const newBoard = (ctx, next) => {

    newBoardDiv = ` 
        <button type="button" class="btn btn-outline-secondary" data-toggle="modal" data-target=#exampleModal id='createNewBoard'>
            +<br/>Create new board
        </button>

        <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Create New Board</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">Board name</label>
                  <input type="text" class="form-control" id="newBoard-name" placeholder="Add board title">
                </div>
              </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" id="createNewBoardModal" data-dismiss="modal">Create new board</button>
                </div>
              </div>
            </div>
          </div>
        `


}

const drawNewBoardToDom = ()=>{
    $('#createNewBoard').on('click', async (e) => {
        e.preventDefault();

        console.log('new board clicked');

        $('#createNewBoardModal').on('click',async (e) => {
            e.preventDefault();

            const boardName = $('#newBoard-name').val();
            console.log(boardName);

            const boardData = {
                name: boardName
            };

            const newBoardData = await newBoardAPI(boardData);
            // console.log('id',data._id);
            await drawallBordsToDom();
            page.redirect(`/boardDetails/${newBoardData._id}`);
        })


    });
}

//see all board as a button
const drawallBordsToDom = async (boards) => {

    const boardList = await getAllBoards();

    let eachBoard = "";

    boardList.forEach((board) => {
        eachBoard = eachBoard + `<button type="button" class="btn btn-outline-secondary eachBoard" id=${board._id}>${board.name}</button>`
    });

    $('#app').children().remove();
    $('#boardDetails').children().remove();
    $('#app').prepend(newBoardDiv);
    $('#app').append(eachBoard);

    drawNewBoardToDom()

    $('.eachBoard').on('click', (e) => {
        page.redirect(`/boardDetails/${e.target.id}`)
    })

}

//see all board in a list and be able to delete a list
const boardList = async (board) => {

    const allBoardList = await getAllBoards();

    let eachBoardList = `
        <div class="list-group-item list-group-item-action active" id="boardListHeader">
            List of Boards
        </div>`;

    allBoardList.forEach((board) => {

        eachBoardList = eachBoardList +
            `
        <div class="card" id="boardListAll">
            <div class="card-body">
                <div class="list-group .d-inline-block list1" id='boardNameDiv'>
                <a href='/boardDetails/${board._id}' class="list-group-item list-group-item-action boardList" data-boardid=${board._id}>${board.name}</a>
                <button class="btn btn-outline-danger button-deleteBoard deleteBoard" id="deleteBoard" type="button" data-boardid=${board._id}>delete</button>
                </div>
            </div> 
        </div>
    `
    });

    $('#app').children().remove();
    $('#boardDetails').children().remove();
    $('#app').append(eachBoardList);

    $('.deleteBoard').on('click', async (e) => {

        console.log(e);

        console.log('e.target.dataset.board', e.target.dataset.boardid)

        await deleteBoardAPI(e.target.dataset.boardid);

        $(`[data-boardid=${e.target.dataset.boardid}]`).remove();
    })

}


export { drawallBordsToDom, newBoard, boardList };
