import updateCardDragDropAPI from '../api/Trello/updateCardDragDropAPI.js';

let listId = "";

function dragAndDrop(){
    $('.draggable').draggable();
    
    $('.draggable').draggable({ revert: true });
    $('.droppable').droppable({
      drop: async (event, ui) => {
        console.log('event',event);
        console.log('ui',ui);
        

        listId = event.target.dataset.column;
        console.log("event.target.dataset.column",event.target.dataset.column);
        const cardId = ui.draggable[0].dataset.cardid;
        console.log('ui.draggable.dataset.cardid',ui.draggable[0].dataset.cardid);

        $(`#list${listId}`).prepend(ui.draggable);
        
        const dragDropCard = await updateCardDragDropAPI(cardId,listId);
        console.log(dragDropCard);
  
      }
    });
}

export default dragAndDrop;