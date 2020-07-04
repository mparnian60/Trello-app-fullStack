const updateCardDescriptionAPI = async (cardId, newName) => {

    try{

        const response = await fetch(`/api/card/updateCardDescription/${cardId}`, {
            method: 'PATCH',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify({
                name : newName
            }),
            
        });

        const data = await response.json();
        console.log(data);

        return data;

    } catch(e) {
        console.log(e);
    }

};

export default updateCardDescriptionAPI;