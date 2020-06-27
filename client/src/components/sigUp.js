import signUpAPI from '../api/user/signUpAPI.js';

const signup = (ctx, next) => {
    /*template*/
    $('#app').empty();
       $('#app').append(`
        <div>
            <h1>Sign Up</h1>
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
   
   
       $("#form-login").submit( async (e) => {
           e.preventDefault();
   
           const userData = {
               username: $("#username").val(),
               password: $("#password").val()
           };
   
           console.log(userData);
           await signUpAPI(userData).catch((e)=>{
            console.log("error",e);
           });
           page.redirect('/boards');
       });
   
   }

   export default signup;