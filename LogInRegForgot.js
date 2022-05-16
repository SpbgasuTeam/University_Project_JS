let emailMap =new Map;

function regTabFun(){
    event.preventDefault();

    document.getElementById("register").style.visibility="visible";
    document.getElementById("login").style.visibility="hidden";
    document.getElementById("forgot").style.visibility="hidden";

    document.getElementById("rt").style.backgroundColor="rgb(12, 132, 189)";
    document.getElementById("lt").style.backgroundColor="rgba(11, 177, 224, 0.82)";
}
function loginTabFun(){
    event.preventDefault();

    document.getElementById("register").style.visibility="hidden";
    document.getElementById("login").style.visibility="visible";
    document.getElementById("forgot").style.visibility="hidden";

    document.getElementById("lt").style.backgroundColor="rgb(12, 132, 189)";
    document.getElementById("rt").style.backgroundColor="rgba(11, 177, 224, 0.82)";
}
function forTabFun(){
    event.preventDefault();

    document.getElementById("register").style.visibility="hidden";
    document.getElementById("login").style.visibility="hidden";
    document.getElementById("forgot").style.visibility="visible";

    document.getElementById("rt").style.backgroundColor="rgba(11, 177, 224, 0.82)";
    document.getElementById("lt").style.backgroundColor="rgba(11, 177, 224, 0.82)";

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
        alert("Пароли не совпадают. Попробуйте ещё раз");
        return;
    }
    else if(emailMap.get(email) == null){
        emailMap.set(email, password);

        alert(email + "  Спасибо!\nРегистрация прошла успешно");

        document.getElementById("re").value ="";
        document.getElementById("rp").value="";
        document.getElementById("rrp").value="";
        loginTabFun();
    }
    else{
        alert(email + " уже занят.");
        return ;
    }
}
function login(){
    event.preventDefault();

    var email = document.getElementById("se").value;
    var password = document.getElementById("sp").value;

    var i = emailMap.get(email);

    if(emailMap.get(email) == null){
        if (email == ""){
            alert("Введите Email");
            return ;
        }
        alert("Пользователь не найден");
        return ;
    }
    else if(emailMap.get(email) != password){
        if (password == ""){
            alert("Введите пароль");
            return ;
        }
        alert("Неверный пароль");
        return ;
    }
    else {
        alert("Добро пожаловать, " + email + "!");

        document.getElementById("se").value ="";
        document.getElementById("sp").value="";
        return ;
    }

}
function forgot(){
    event.preventDefault();

    var email = document.getElementById("fe").value;

    if(emailMap.get(email) == null){
        if (email == ""){
            alert("Введите Email");
            return ;
        }
        alert("Пользователь не найден");
        return ;
    }

    alert("Ваш пароль: " + emailMap.get(email));
    document.getElementById("fe").value ="";
}