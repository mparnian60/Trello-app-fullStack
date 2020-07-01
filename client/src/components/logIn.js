import logInAPI from '../api/user/logInAPI.js'


const login = (ctx, next) => {

    $('#boardDetails').children().remove();
    $('#app').empty();
    /*template*/
    $('#app').append(`
    <div id='login'>
        <div id='loginHeader'>
            <h1>Log In</h1>
        </div>
        <div>
            <form id="form-login">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" class="form-control" id="username" 
                                    placeholder="username..." name="username">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" 
                            id="password" name="password" placeholder="password...">
                </div>
                <button type="submit" class="btn btn-secondary">Log In</button>
            </form>
            <div id='loginFooter'>
                <h6>Not Registered?  <a href="/signup">Creat account</a></h6>
            </div>
        </div>
    </div>
    `);


    $("#form-login").submit(async (e) => {
        e.preventDefault();

        const userData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        console.log(userData);
        const userLoginData = await logInAPI(userData);
        console.log('userdata', userLoginData);
    
        //store User data into local storage
        const JSONstring = JSON.stringify(userLoginData);
        window.localStorage.setItem('User-Data', JSONstring);
        
        page.redirect('/boards');
        // $('#boardDetails').empty();
    });

}

export default login;