const logoutAPI = async (userData) => {

    try{

        const response = await fetch('/api/user/logout', {
            method: 'GET',
            mode: 'cors',
            credentials: 'same-origin',
        });

        const data = await response.json();
        console.log(data);

    } catch(e) {
        console.log(e);
    }

};

export default logoutAPI;