let data;

const logInAPI = async (userData) => {

    try{

        const response = await fetch('/api/user/login', {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'                
              },
            body: JSON.stringify(userData)
        });

        data = await response.json();
        console.log(data);

        return data;

    } catch(e) {
        console.log(e);
    }

};

export default logInAPI;