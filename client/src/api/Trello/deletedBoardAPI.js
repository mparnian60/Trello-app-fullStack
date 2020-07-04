const deleteBoardAPI = async (id) => {

    let data;

    try{

        const response = await fetch(`/api/board/delete/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin',
        });

        data = await response.json();
        console.log(data);

        return data;

    } catch(e) {
        console.log(e);
    } 

};

export default deleteBoardAPI;