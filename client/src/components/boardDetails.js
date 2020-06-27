import boardDetails from '../api/Trello/boardDetailsAPI.js';
// import getListDetails from '../api/Trello/boardDetailsAPI.js'

const printList = (listDetails) => {
    console.log('list details',listDetails);
    return `
       <div class="col-sm table droppable" data-column=${listDetails._id}>
          <div class='dropZone'>
              <div class="card">
                  <div class="card-header">
                  ${listDetails.name}
                  </div class='ulOutside'>
                  <ul  id ='list${listDetails._id}' class="list-group list-group-flush">
                  
                  </ul>
              </div>
              <div class="input-group">
                  <input type="text" id='dataEntry${listDetails._id}' class="form-control" placeholder="Add a card" aria-label="Recipient's username" aria-describedby="button-addon2">
                  <div class="input-group-append">
                  <button class="btn btn-outline-success addItem" type="button" data-column=${listDetails._id}>Add</button>
                  </div>
              </div>
          </div>
      </div>
    `
}

const drawListDetailsToDom = async (boardId) => {
    const listDetails = await boardDetails.getListDetails(boardId);
    console.log(listDetails);

    let listDetailsInToDom = ""

    listDetails.forEach((list) => {
        const eachList = printList(list)
        listDetailsInToDom = listDetailsInToDom + eachList;
    })

    console.log(listDetailsInToDom);

    return listDetailsInToDom;
}

const drawBoardDetailsToDom = async (ctx, next) => {
    console.log(ctx);
    const boardDetail = await boardDetails.getBoardDetails(ctx.params.id);

    const listDetailsToDom = await drawListDetailsToDom(ctx.params.id);
    console.log('dom', listDetailsToDom);

    /*template*/
    $('#app').empty();
    $('#app').append(`
       
        <div>
            <div class="input-group" style="width: 18rem;" id='mainEntry'>
                <input type="text" id='listNameEntry' class="form-control" placeholder="Enter list Title"
                    aria-label="Recipient's username" aria-describedby="button-addon2">
                <div class="input-group-append">
               <button class="btn btn-outline-success" type="submit" id="button-addon">Add list</button>
                </div>
            </div>
            <div class="input-group-prepend">
                <span class="input-group-text board-name" id="basic-addon1">${boardDetail.name}</span>
            </div>
        </div>

        ${listDetailsToDom}

       `);
}

export default drawBoardDetailsToDom;

