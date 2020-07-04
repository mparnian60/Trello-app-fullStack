import boardDetails from '../api/Trello/boardDetailsAPI.js';
import newListAPI from '../api/Trello/newListAPI.js';
import newCardAPI from '../api/Trello/newCardAPI.js';
import dragAndDrop from '../components/dragAndDrop.js';
import deleteCardAPI from '../api/Trello/deleteCardAPI.js';
import updateCardDescriptionAPI from '../api/Trello/updateCardDescriptionAPI.js';


let boardId = "";
let listId = "";

const printCard = (cardDetails) => {
    // console.log('card details up', cardDetails);
    return `
    <div class='ui-widget-content draggable' data-cardid=${cardDetails._id} data-listid=${cardDetails.listId._id}>
        <li class="list-group-item"><input class="cardInput" data-cardid=${cardDetails._id} value=${cardDetails.name}></input>
        <button class="btn btn-outline-danger addItem" type="button" id="button-editCard" data-column=${cardDetails._id}>delete</button>
        </li>
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
       <div class="droppable" data-column=${listDetails._id}>
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
    let listDetails = await boardDetails.getListDetails(boardId);

    console.log(listDetails);

    //sort name of lits alphabetically
    listDetails = listDetails.sort((a,b)=>{
        if(a.name < b.name){
            return -1;
        }
        if(a.name > b.name){
            return 1;
        }

        return 0;

    })
    // console.log('list details 2', listDetails);

    let listDetailsInToDom = ""

    if (listDetails) {

        //add lists to Dom

        for (let i=0; i<listDetails.length; i++){
            const eachList = await printList(listDetails[i])
            listDetailsInToDom = listDetailsInToDom + eachList;
        }
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
    page.redirect(`/boardDetails/${boardId}`)

});

//Add new card
$(document).on('click', '#button-addonCard', async (e) => {
    e.preventDefault();

    const cardData = {
        name: $(`#dataEntry${e.target.dataset.column}`).val(),
        listId: e.target.dataset.column
    };

    console.log(cardData);
    await newCardAPI(cardData);
    page.redirect(`/boardDetails/${boardId}`)

});

//delete cards

$(document).on('click', '#button-editCard', async (e) => {
    // console.log(e);
    e.preventDefault();
    // console.log(e.target.dataset.column);
    
    await deleteCardAPI(e.target.dataset.column);

    $(`[data-cardid=${e.target.dataset.column}]`).remove();
});

//Update card description

// $(document).on('click', '.cardInput', async (e) => {

//     e.preventDefault();

//     const cardId = e.target.dataset.cardid;
//     console.log(cardId);

//     $('.cardInput').blur(async(e)=>{
//         const newDescription = e.target.value;
//         // console.log(newDescription);

//         await updateCardDescriptionAPI(cardId,newDescription);

//     });
   
// });



export default drawBoardDetailsToDom;


