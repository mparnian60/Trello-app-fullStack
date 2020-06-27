const getAllBoards = async(boardData) =>{

    try{

        const response = await fetch('/api/board/boards',{
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin'
        });

        const data = await response.json();
        return data;

    }catch(e){
        console.log(e);
    }   
    
}

export default getAllBoards;