const updateCardDragDropAPI = async (cardId, listId) => {

    try{

        const response = await fetch(`/api/card/updateIdDragDrop/${cardId}`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify({
                listId : listId
            }),
            
        });

        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};

export default updateCardDragDropAPI;