import signUpAPI from '../api/user/signUpAPI.js';

const signup = (ctx, next) => {

    $('#boardDetails').children().remove();
    $('#app').empty();
    /*template*/
       $('#app').append(`
       <div id='login'>
        <div id='loginHeader'>
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
                <button type="submit" class="btn btn-secondary">Sign Up</button>
            </form>
        </div>
    </div>
    `);
   
   
       $("#form-login").submit( async (e) => {
           e.preventDefault();
   
           const userData = {
               username: $("#username").val(),
               password: $("#password").val()
           };
   
           console.log(userData);
           const userSignUpData = await signUpAPI(userData);
           console.log('userdata', userSignUpData);

           if(userSignUpData){
            page.redirect('/home');
           }else{
            // console.log('userdata', userSignUpData.status());
               alert('username already exists');
               
           }

           
       });
   
   }

   export default signup;