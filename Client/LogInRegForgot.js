
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

    var ID = document.getElementById("ID_mb").value;
    var password = document.getElementById("Pa_mb").value;
    var passwordRetype = document.getElementById("PaR_mb").value;
    var name = document.getElementById("Name_mb").value;

        if (name == ""){
            alert("Введите Имя");
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

        request("POST", "Register", {ID, name, Password}, (response) => {
            if (response === "Bad_ID") {
                alert("Такой пользователь уже зарегистрирован");
            } else {
                login(ID,password);
            }
        })
}
function login_In(){
    var ID = document.getElementById("se").value;
    var Password = document.getElementById("sp").value;


    request("POST", "Login", {ID,Password}, (response) => {
        if (response === "BAD_data") {
            alert("Неверные данные");
        } else {
            login(ID,Password);
        }
    })
}
function forgot(){
    var ID = document.getElementById("fe").value;

    request("POST", "Forgot", {ID}, (response) => {
        if (response === "BAD_ID") {
            alert('This ID not found');
        }else{
            //alert(response);
            alert("Ваш пароль: " + response.toString());
        }
    })

}
