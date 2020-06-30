import newListAPI from '../api/Trello/newListAPI.js';

const newList = (ctx, next) => {
    console.log('ctx',ctx);
 /*template*/
    $('#app').append(`
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
 `);


    $(document).on('submit','#button-addon',(e) => {
        e.preventDefault();

        console.log('new list clicked');

        const listData = {
            name: $("#listNameEntry").val(),
        };

        console.log(listData);
        newListAPI(listData);

    });

}

export default newList;