const deleteCardAPI = async (id) => {

    try{

        const response = await fetch(`/api/card/delete/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'same-origin',
        });

        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};

export default deleteCardAPI;