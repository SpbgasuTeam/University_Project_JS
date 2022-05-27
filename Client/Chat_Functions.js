const My_ID=localStorage.getItem('ID_Sender');
const add_contact = document.getElementById("add_contact");
const send_btn = document.getElementById("send_btn");

const login = (ID_Sender,Password) =>{
    localStorage.setItem('ID_Sender', ID_Sender);
    localStorage.setItem("Password", Password);
    document.location.href = "chat.html";
}
const request = (type, path, data, fun) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open(type, `http://localhost:80/${path}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if (xhr.status !== 200) {
            return;
        }
        const response = xhr.response;
        fun(response);
    };

    xhr.onerror = () => {
        alert(`Ошибка соединения`);
    };
    xhr.send(JSON.stringify(data));
}
request("POST", "Get_Dialogs", {My_ID}, (response) => {
    if (response == null) {
        alert('Error!');
    } else {
        response.forEach(element => {
            New_Dialog_by_start(element.ID_Sender ,  element.ID_Getter);

        })
    }
});
request("POST", "Get_list_users", {My_ID}, (response) => {
    if (response == null) {
        alert('Error!');
    } else {
        response.forEach(element => {
            Write_list_users(element);
        })
    }
});
if(localStorage.getItem('ID_Getter')){
    ID_Getter = localStorage.getItem('ID_Getter');
    ID_Sender = My_ID;
    request("POST", "Read", {ID_Sender,ID_Getter }, (response) => {
        if(response == null) {
            alert('Error!');
        }else{
            var deleteElement = document.getElementById("chat_ul").querySelectorAll('li');
            for (let i = 0; i < deleteElement.length; i++) {
                deleteElement[i].remove();
            }
            response.forEach(element=>{
                Write_Msgs(element)
            })
        }
    });
}
document.getElementById("User_Name").value = My_ID;
if(My_ID.length>10) {
    document.getElementById("User_Name").value = My_ID.slice(0, 9) + "...";
}
function Write_list_users(User_ID){
    if(User_ID.length > 10){
        User_ID = User_ID.slice(0,9) + "...";
    }
    const list_chats = document.getElementById("list_users");
    const li = document.createElement("li");
    const a_friend = document.createElement("div");
    const head_portrait = document.createElement("div");
    const head_text = document.createElement("div");
    head_text.textContent = User_ID;

    head_text.classList.add("head_text");
    head_portrait.classList.add("head_portrait");
    a_friend.classList.add("a_friend");

    head_portrait.appendChild(head_text);
    a_friend.appendChild(head_portrait);
    li.appendChild(a_friend);
    list_chats.appendChild(li);
}
function Write_Msgs(Msgs){
    const msgtime = Msgs.Time;
    const ID_Sender =  Msgs.ID_Sender;
    const Text = Msgs.Text;

    const chat_ul = document.getElementById("chat_ul");
    const li = document.createElement("li");
    const msg = document.createElement("div");
    const contdate = document.createElement("div");
    const conttext = document.createElement("div");
    const contname = document.createElement("div");
    const conthead = document.createElement("div");

    contdate.textContent = msgtime;
    conttext.textContent = Text;
    if(ID_Sender.length>10){
        contname.textContent = "Отправитель: " + ID_Sender.slice(0, 9) + "...";
    }else{
        contname.textContent = "Отправитель: " +ID_Sender;
    }

    conthead.classList.add("head");
    contdate.classList.add("date");
    conttext.classList.add("text");
    contname.classList.add("name");
    msg.classList.add("msg");

    conthead.appendChild(contdate);
    conthead.appendChild(contname);
    msg.appendChild(conthead);
    msg.appendChild(conttext);
    li.appendChild(msg);
    chat_ul.appendChild(li);
    document.getElementById("chat_ul").scrollTo(0, document.getElementById("chat_ul").scrollHeight);

}
function New_Dialog_by_start(ID_Sender,ID_Getter){
    const list_chats = document.getElementById("list_chats");
    const li = document.createElement("li");
    const a_friend = document.createElement("div");
    const head_portrait = document.createElement("div");
    const head_text = document.createElement("div");
    if(ID_Getter.length > 9){
        head_text.textContent = ID_Getter.slice(0,8) + "...";
    }else {
        head_text.textContent = ID_Getter;
    }

    head_text.classList.add("head_text");
    head_portrait.classList.add("head_portrait");
    a_friend.classList.add("a_friend");

    head_portrait.appendChild(head_text);
    a_friend.appendChild(head_portrait);
    li.appendChild(a_friend);
    list_chats.appendChild(li);

    a_friend.addEventListener('click', event => {
        const ID_Getter = a_friend.getElementsByClassName("head_portrait")[0].getElementsByClassName("head_text")[0].textContent;
        localStorage.setItem('ID_Getter', ID_Getter);

        request("POST", "Read", {ID_Sender, ID_Getter}, (response) => {
            if(response == null) {
                alert('Error!');
            }else{
                var deleteElement = document.getElementById("chat_ul").querySelectorAll('li');
                for (let i = 0; i < deleteElement.length; i++) {
                    deleteElement[i].remove();
                }
                response.forEach(element=>{
                    Write_Msgs(element)
                })
            }
        });
        /*document.getElementById("chat_ul").scrollTo(0, document.getElementById("chat_ul").scrollHeight);*/
    });
}
function New_Dialog(ID_Sender,ID_Getter){

    const list_chats = document.getElementById("list_chats");
    const li = document.createElement("li");
    const a_friend = document.createElement("div");
    const head_portrait = document.createElement("div");
    const head_text = document.createElement("div");
    head_text.textContent = ID_Getter;

    head_text.classList.add("head_text");
    head_portrait.classList.add("head_portrait");
    a_friend.classList.add("a_friend");

    head_portrait.appendChild(head_text);
    a_friend.appendChild(head_portrait);
    li.appendChild(a_friend);
    list_chats.appendChild(li);
    request("POST", "Read", {ID_Sender, ID_Getter}, (response) => {
        if(response == null) {
            alert('Error!');
        }else{
            response.forEach(element=>{

                Write_Msgs(element)
            })
        }
    });


    a_friend.addEventListener('click', event => {
        const ID_Getter = a_friend.getElementsByClassName("head_portrait")[0].getElementsByClassName("head_text")[0].textContent;
        //alert(ID_Getter);
        localStorage.setItem('ID_Getter', ID_Getter);
        request("POST", "Read", {ID_Sender, ID_Getter}, (response) => {
            if(response == null) {
                alert('Error!');
            }else{
                var deleteElement = document.getElementById("chat_ul").querySelectorAll('li');
                for (let i = 0; i < deleteElement.length; i++) {
                    deleteElement[i].remove();
                }
                response.forEach(element=>{
                    //alert(element.ID_Sender + " " + element.Text + " " + element.Time);
                    Write_Msgs(element)
                })
            }
        });
        /*document.getElementById("chat_ul").scrollTo(0, document.getElementById("chat_ul").scrollHeight);*/
    });
}
function Exit(){
    document.location.href = "registration.html";
    localStorage.clear();
}

document.addEventListener( 'keydown', event => {
    if( event.code === 'Enter' ) {
        document.getElementById("send_btn").click();
        event.preventDefault();
        }
});

send_btn.addEventListener("click", ()=>{

    if(document.getElementById("send_txt").value.replace(/\s+/g, ' ').trim() && localStorage.getItem('ID_Getter')) {
        const date = new Date();
        const msgtime = date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + "." + date.getMonth().toString() + "." +  date.getFullYear().toString();
        const ID_Sender = localStorage.getItem('ID_Sender');
        const ID_Getter = localStorage.getItem('ID_Getter');

        const Text = document.getElementById("send_txt").value;

        const chat_ul = document.getElementById("chat_ul");
        const li = document.createElement("li");
        const msg = document.createElement("div");
        const contdate = document.createElement("div");
        const conttext = document.createElement("div");
        const contname = document.createElement("div");
        const conthead = document.createElement("div");

        contdate.textContent = msgtime;
        conttext.textContent = Text;
        if(ID_Sender.length>10){
            contname.textContent = "Отправитель: " + ID_Sender.slice(0, 9) + "...";
        }else{
            contname.textContent = "Отправитель: " +ID_Sender;
        }

        conthead.classList.add("head");
        contdate.classList.add("date");
        conttext.classList.add("text");
        contname.classList.add("name");
        msg.classList.add("msg");

        conthead.appendChild(contdate);
        conthead.appendChild(contname);
        msg.appendChild(conthead);
        msg.appendChild(conttext);
        li.appendChild(msg);
        chat_ul.appendChild(li);
        let Time = msgtime;

        request("POST", "New_MSG", {ID_Sender, ID_Getter, Text, Time}, (response) => {
        });
        document.getElementById("chat_ul").scrollTo(0, document.getElementById("chat_ul").scrollHeight);
    }
    document.getElementById("send_txt").value = "";
})

add_contact.addEventListener("click", ()=>{
    if(!document.getElementById("add_btn_id")) {
        const main_list_chats = document.getElementById("main_list_chats");
        const str = document.createElement("input");
        const btn = document.createElement("input");

        btn.id = "add_btn_id";
        str.id = "add_str_id";
        btn.type = "button";
        btn.value = "Добавить";
        str.classList.add("search_online_add");
        btn.classList.add("search_online_add");
        main_list_chats.appendChild(str);
        main_list_chats.appendChild(btn);
        document.getElementById("main_list_chats").scrollTo(0, document.getElementById("main_list_chats").scrollHeight);

        btn.addEventListener("click", () => {
            const ID_Getter = str.value;
            if(ID_Getter) {
                const ID_Sender = localStorage.getItem('ID_Sender');

                request("POST", "New_Dialog", {ID_Sender, ID_Getter}, (response) => {
                    if (response == 'Wrong_ID') {
                        alert('Wrong_ID')
                    } else if (response == 'Error!') {
                        alert('This dialog already in!')
                    } else {
                        localStorage.setItem('ID_Getter', response);
                        const ID_Sender = localStorage.getItem('ID_Sender');
                        New_Dialog(ID_Sender, ID_Getter)
                    }
                })

                str.remove();
                btn.remove();
            }
        });
    }
})

document.getElementById("form").addEventListener("submit",(e)=>{
    e.preventDefault();
})

setInterval(function() {
    if(!localStorage.getItem("ID_Sender")){
        Exit();
    }

}, 1);

