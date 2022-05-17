var emailArray=[];
var passwordArray=[];

var loginBox = document.getElementById("login");
var regBox = document.getElementById("register");
var forgetBox = document.getElementById("forgot");

var loginTab = document.getElementById("lt");
var regTab = document.getElementById("rt");

function regTabFun(){
    event.preventDefault();

    regBox.style.visibility="visible";
    loginBox.style.visibility="hidden";
    forgetBox.style.visibility="hidden";

    regTab.style.backgroundColor="rgb(12, 132, 189)";
    loginTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";
}
function loginTabFun(){
    event.preventDefault();

    regBox.style.visibility="hidden";
    loginBox.style.visibility="visible";
    forgetBox.style.visibility="hidden";

    loginTab.style.backgroundColor="rgb(12, 132, 189)";
    regTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";
}
function forTabFun(){
    event.preventDefault();

    regBox.style.visibility="hidden";
    loginBox.style.visibility="hidden";
    forgetBox.style.visibility="visible";

    regTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";
    loginTab.style.backgroundColor="rgba(11, 177, 224, 0.82)";

}


function register(){
    event.preventDefault();

    var email = document.getElementById("re").value;
    var password = document.getElementById("rp").value;
    var passwordRetype = document.getElementById("rrp").value;

    if (email == ""){
        alert("Введите Email");
        return ;
    }
    else if (password == ""){
        alert("Введите пароль");
        return ;
    }
    else if (passwordRetype == ""){
        alert("Повторите пароль");
        return ;
    }
    else if ( password != passwordRetype ){
        alert("Пароли не совпадают");
        return;
    }
    else if(emailArray.indexOf(email) == -1){
        emailArray.push(email);
        passwordArray.push(password);

        alert("Регистрация прошла успешно!\nПопробуйте зайти");

        document.getElementById("re").value ="";
        document.getElementById("rp").value="";
        document.getElementById("rrp").value="";
        loginTabFun();
    }
    else{
        alert(email + " уже зарегестрирован");
        return ;
    }
}
function login(){
    event.preventDefault();

    var email = document.getElementById("se").value;
    var password = document.getElementById("sp").value;

    var i = emailArray.indexOf(email);

    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Введите Email");
            return ;
        }
        alert("Email не зарегестрирован");
        return ;
    }
    else if(passwordArray[i] != password){
        if (password == ""){
            alert("Введите пароль");
            return ;
        }
        alert("Неверный пароль");
        return ;
    }
    else {
        alert(email + ", добро пожаловать в чат!");

        document.getElementById("se").value ="";
        document.getElementById("sp").value="";
        return ;
    }

}
function forgot(){
    event.preventDefault();

    var email = document.getElementById("fe").value;

    if(emailArray.indexOf(email) == -1){
        if (email == ""){
            alert("Введите Email");
            return ;
        }
        alert("Email не зарегестрирован");
        return ;
    }

    alert("Ваш пароль: " + passwordArray[emailArray.indexOf(email)]);
    document.getElementById("fe").value ="";
}