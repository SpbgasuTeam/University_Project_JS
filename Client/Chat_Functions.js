const request = (type, path, data, fun) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "json";

    xhr.open(type, `https://localhost:80/${path}`);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = () => {
        if(xhr.status !== 200){
            return;
        }
        const response = xhr.response;
        fun(response);
    };

    xhr.onerror = () => {
        alert("Ошибка соединения");
    };
    xhr.send(JSON.stringify(data));
}


const send_btn = document.getElementById("send_btn");
send_btn.addEventListener("click", ()=>{
    const date = new Date();
    const msgtime = date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + "." + date.getMonth().toString() + "." +  date.getFullYear().toString();
    const ID_Sender = "ID_Sender";
    const ID_Getter = "ID_Getter";
    const Text = "sdfghjklertyuio";

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

    /*request("POST", "New_MSG", {ID_Sender, ID_Getter, Text, msgtime}, (response) => {
        alert(response);
    });*/
})

document.querySelectorAll('.a_friend').forEach(item => {
    item.addEventListener('click', event => {
        alert("клик");
        const ID_Sender = "1";
        const ID_Getter = "2";
        request("GET", "add_friend", {ID_Sender, ID_Getter}, (response) => {
            //функция для вывода сообщений на вебморду
            alert(response);
        });
    });
})


const add_contact = document.getElementById("add_contact");
add_contact.addEventListener("click", ()=>{
    const ID_Getter = "ID_Getter";

    /*request("POST", "New_MSG", {ID_Sender, ID_Getter, Text, msgtime}, (response) => {
        alert(response);
    });*/

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

})
