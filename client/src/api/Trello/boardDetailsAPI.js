const getBoardDetails = async(boardId) =>{

    try{

        const response = await fetch(`/api/board/boardDetails/${boardId}`,{
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

const getListDetails = async(boardId) =>{

    try{

        const response = await fetch(`/api/list/allLists/${boardId}`,{
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

const getCardDetails = async(listId) =>{

    try{

        const response = await fetch(`/api/card/allcards/${listId}`,{
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

export default {
    getBoardDetails, //shortcut for getBoardDetails : getBoardDetails when key pair value are the same
    getListDetails,
    getCardDetails
}