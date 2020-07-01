import logoutAPI from '../../api/user/logoutAPI.js'

const nav = (ctx, next) => {

    const userDetails = JSON.parse(window.localStorage.getItem("User-Data"));
    let logout = "";
    let userLogin = ""

    if(userDetails){
        logout = `
        <div>
            <button class="btn btn-outline my-2 my-sm-0" id='logout'>
                Log Out
            </button>
        </div>
        `
        userLogin = `<div id='userLogIn'>${userDetails.username}</div>`
    }

    /*template*/
    $('#nav').empty();
    $("#nav").append(`
    <nav class="navbar navbar-light bg-light" id='nav1'>
        <span class="navbar-brand mb-0 h1" id="span1">Trello</span>
    </nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse static-top" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/home">Home <span class="sr-only">(current)</span></a>
                <a class="nav-item nav-link active" href="/boards">Boards <span class="sr-only">(current)</span></a>
            </div>
        </div>
        <div>
                <button class="btn btn-outline my-2 my-sm-0" id='signup'>
                    <a href="/signup">Sign Up</a>
                </button>
        </div>
        <div>
                <button class="btn btn-outline my-2 my-sm-0" id='logIn'>
                    <a href="/login">Log In</a>
                </button>
        </div>

        ${logout}
        
        ${userLogin}
    
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