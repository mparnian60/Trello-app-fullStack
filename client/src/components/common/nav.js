import logoutAPI from '../../api/user/logoutAPI.js';

const nav = (ctx, next) => {

    const userDetails = JSON.parse(window.localStorage.getItem("User-Data"));
    let signup = ""
    let login = "";
    let logout = "";
    let userLogin = ""

    //show just logout when user logged in
    if(userDetails){
        logout = `
        <div>
            <button class="btn btn-outline my-2 my-sm-0" id='logout'>
                Log Out
            </button>
        </div>
        `

        userLogin = `<div id='userLogIn'>${userDetails.username}</div>`

    }else{
        
        login = `
        <div>
                <button class="btn btn-outline my-2 my-sm-0" id='logIn'>
                    Log In
                </button>
        </div>
        `

        signup = `
        <div>
                <button class="btn btn-outline my-2 my-sm-0" id='logIn'>
                    Sign Up
                </button>
        </div>
        `
    }

    //show just l


    /*template*/
    $('#nav').empty();
    $("#nav").append(`
    <!-- Just an image -->
    <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="#">
    <img src="../../../images/trello-logo-blue.png" width="120" height="30" alt="" loading="lazy">
    </a>
    </nav>

    <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        ${userLogin}
  
        <div class="collapse navbar-collapse static-top" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/home">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" href="/boards">Boards <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" href="/boardList">Boards List<span class="sr-only">(current)</span></a>
            </div>
        </div>   

        ${signup}
        ${login}
        ${logout}
    
    </nav>
    `)

    $('#logout').on('click',()=>{
        logoutAPI();

        window.localStorage.removeItem('User-Data');

        $('#boardDetails').children().remove();
        alert('Log out successfuly');
        page.redirect('/home');
    })

    next();
}

export default nav;