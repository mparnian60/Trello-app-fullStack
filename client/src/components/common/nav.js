const nav = (ctx, next) => {
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
            <form class="form-inline my-2 my-lg-0">
                <button class="btn btn-outline my-2 my-sm-0" id='logout' type="submit">
                    <a href="/login">Log Out</a>
                </button>
            </form>
        </div>
    
    </nav>
    `)

    next();
}

export default nav;