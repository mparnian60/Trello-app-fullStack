import signUp from './sigUp.js';
import login from './logIn.js'

const homeDesign = () =>{

    $('#boardDetails').children().remove();
    
    // $('body').css({
    //     'background-image': 'url("./images/goodquality.jpg")'
    // })
    login();


   
}

export default homeDesign;