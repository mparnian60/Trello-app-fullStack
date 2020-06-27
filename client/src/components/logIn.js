import logInAPI from '../api/user/logInAPI.js'

const login = (ctx, next) => {
 /*template*/
 $('#app').empty();
    $('#app').append(`
    <div>
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
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
    `);


    $("#form-login").submit(async (e) => {
        e.preventDefault();

        const userData = {
            username: $("#username").val(),
            password: $("#password").val()
        };

        console.log(userData);
        logInAPI(userData);
        page.redirect('/boards');
    });

}

export default login;