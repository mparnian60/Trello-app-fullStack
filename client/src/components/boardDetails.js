import boardDetails from '../api/Trello/boardDetailsAPI.js';
import newListAPI from '../api/Trello/newListAPI.js';
import newCardAPI from '../api/Trello/newCardAPI.js';
import dragAndDrop from '../components/dragAndDrop.js';


let boardId = "";
let listId = "";

const printCard = (cardDetails) => {
    // console.log('card details up', cardDetails);
    return `
    <div class='ui-widget-content draggable' data-cardid=${cardDetails._id} data-listid=${cardDetails.listId._id}>
    <li class="list-group-item">${cardDetails.name}</li>
    </div>
    `
}

const drawCardDetailsToDom = async (listId) => {
    const cardDetails = await boardDetails.getCardDetails(listId);
    // console.log('cardDetails', cardDetails);

    let cardDetailsInToDom = ""

    cardDetails.forEach((card) => {
        // console.log('each card', card)
        const eachcard = printCard(card);
        // console.log(eachcard);
        cardDetailsInToDom = cardDetailsInToDom + eachcard;
    })
    // console.log("cardDetailsInToDom", cardDetailsInToDom);

    return cardDetailsInToDom;
}

const printList = async (listDetails) => {

    const printCardsInToList = await drawCardDetailsToDom(listDetails._id)
    // console.log('printCardsInToList',printCardsInToList)

    // console.log('list details', listDetails);


    return `
       <div class="col-sm table droppable" data-column=${listDetails._id}>
          <div class='dropZone'>
              <div class="card">
                  <div class="card-header">
                  ${listDetails.name}
                  </div class='ulOutside'>
                  <ul  id ='list${listDetails._id}' class="list-group list-group-flush">
                    ${printCardsInToList}
                  </ul>
              </div>
              <div class="input-group">
                  <input type="text" id='dataEntry${listDetails._id}' class="form-control" placeholder="Add a card" aria-label="Recipient's username" aria-describedby="button-addon2">
                  <div class="input-group-append">
                  <button class="btn btn-outline-success addItem" type="button" id="button-addonCard" data-column=${listDetails._id}>Add</button>
                  </div>
              </div>
          </div>
      </div>
    `
}

const drawListDetailsToDom = async (boardId) => {
    const listDetails = await boardDetails.getListDetails(boardId);
    // console.log('list details 2', listDetails);

    let listDetailsInToDom = ""

    if (listDetails) {
        //promise.all means finish all previous promises before printList loop
        await Promise.all(listDetails.map(async (list) => {
            const eachList = await printList(list)
            // console.log('eachlist', eachList)
            listDetailsInToDom = listDetailsInToDom + eachList;

        }))
    }

    // console.log('listDetailsInToDom', listDetailsInToDom)



    return listDetailsInToDom;
}



const drawBoardDetailsToDom = async (ctx, next) => {

    boardId = ctx.params.id;

    //get board details
    const boardDetail = await boardDetails.getBoardDetails(ctx.params.id);

    //get list details
    const listDetailsToDom = await drawListDetailsToDom(ctx.params.id);
    // console.log('dom', listDetailsToDom);

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

       `);

    $('#boardDetails').empty();
    $('#boardDetails').append(`

    ${listDetailsToDom}

    `);

       dragAndDrop();
}

//Add new list
$(document).on('click', '#button-addon', async (e) => {
    e.preventDefault();

    const listData = {
        name: $("#listNameEntry").val(),
        boardId //this is equal to boardId: boardId , first one is key and the secind one is the variable.
    };

    console.log(listData);
    await newListAPI(listData);
    page.redirect(`/boardDetails/${ boardId }`)

});

//Add new card
$(document).on('click', '#button-addonCard', async (e) => {
    e.preventDefault();

    const cardData = {
        name: $(`#dataEntry${ e.target.dataset.column }`).val(),
        listId: e.target.dataset.column
    };

    console.log(cardData);
    await newCardAPI(cardData);
    page.redirect(`/boardDetails/${ boardId }`)

});


export default drawBoardDetailsToDom;


