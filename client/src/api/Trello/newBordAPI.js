let data;

const newBoardAPI = async (boardData) => {

    try{

        const response = await fetch('/api/board/new', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(boardData)
        });

        data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

    return data;

};

export default newBoardAPI;
