
const My_ID=localStorage.getItem('ID_Sender');
const add_contact = document.getElementById("add_contact");
const send_btn = document.getElementById("send_btn");


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
    alert(response);
    if (response == null) {
        alert('Error!');
    } else {
        //alert(response);
        response.forEach(element => {
             alert(element.ID_Sender +  element.ID_Getter);

        })
    }
});

const login = (ID_Sender,Password) =>{
    localStorage.setItem('ID_Sender', ID_Sender);
    localStorage.setItem("Password", Password);
    document.location.href = "chat.html";
}
function Write_Msgs(Msgs){
    //alert(element.ID_Sender + " " + element.Text + " " + element.Time);
    //const date = new Date();
    const msgtime = Msgs.Time;
    const ID_Sender = Msgs.ID_Sender;
    //const ID_Getter = //Msgs.ID_Sender;

    //alert("ID_Sender " + localStorage.getItem('ID_Sender'));

    const Text = Msgs.Text;

    //document.getElementById("send_txt").value = "";

    const chat_ul = document.getElementById("chat_ul");
    const li = document.createElement("li");
    const msg = document.createElement("div");
    const contdate = document.createElement("div");
    const conttext = document.createElement("div");
    const contname = document.createElement("div");
    const conthead = document.createElement("div");

    contdate.textContent = msgtime;
    conttext.textContent = Text;
    contname.textContent = ID_Sender;

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
    //let Time = msgtime;

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
                alert(element.ID_Sender + " " + element.Text + " " + element.Time);

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
    });
}

send_btn.addEventListener("click", ()=>{
    const date = new Date();
    const msgtime = date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + "." + date.getMonth().toString() + "." +  date.getFullYear().toString();
    const ID_Sender = localStorage.getItem('ID_Sender');
    const ID_Getter = localStorage.getItem('ID_Getter');
    //alert("ID_Sender " + localStorage.getItem('ID_Sender'));

    const Text = document.getElementById("send_txt").value;
    document.getElementById("send_txt").value = "";

    const chat_ul = document.getElementById("chat_ul");
    const li = document.createElement("li");
    const msg = document.createElement("div");
    const contdate = document.createElement("div");
    const conttext = document.createElement("div");
    const contname = document.createElement("div");
    const conthead = document.createElement("div");

    contdate.textContent = msgtime;
    conttext.textContent = Text;
    contname.textContent = ID_Sender;

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
        //alert(response);
    });
})
/*document.querySelectorAll('.a_friend').forEach(item => {
    item.addEventListener('click', event => {
        //alert("клик");
        const ID_Sender = localStorage.getItem('ID_Sender');

        //const ID_Getter = item.head_text.value
        //alert(item.textContent)
        localStorage.setItem('ID_Getter',item.textContent);
        //alert('Doog')
        const ID_Getter = localStorage.getItem('ID_Getter');
        request("POST", "Read", {ID_Sender, ID_Getter}, (response) => {
            //функция для вывода сообщений на веб
            if(response == null) {
                alert('Error!');
            }else{
                response.forEach(element=>{
                    alert(element.ID_Sender + " " + element.Text + " " + element.Time);

                })
            }
        });
    });
})*/
add_contact.addEventListener("click", ()=>{

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

    btn.addEventListener("click", ()=>{


        const ID_Getter = str.value;
        const ID_Sender = localStorage.getItem('ID_Sender');
        //alert(ID_Getter +" "+ ID_Sender)

        request("POST", "New_Dialog", {ID_Sender, ID_Getter}, (response) => {
            if(response == 'Wrong_ID'){
                alert('Wrong_ID')
            }
            else if(response == 'Error!'){
                alert('This dialog already in!')
            }else{
                localStorage.setItem('ID_Getter', response);
                const ID_Sender = localStorage.getItem('ID_Sender');
                New_Dialog(ID_Sender,ID_Getter)
            }
        })

        str.remove();
        btn.remove();
    });



})
