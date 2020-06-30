const newListAPI = async (listData) => {

    try{

        const response = await fetch('/api/list/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(listData)
        });

        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};

export default newListAPI;