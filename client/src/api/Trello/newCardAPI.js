const newCardAPI = async (cardData) => {

    try{

        const response = await fetch('/api/card/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(cardData)
        });

        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};

export default newCardAPI;