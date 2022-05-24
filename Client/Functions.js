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
const login = (id,password) =>{
    localStorage.setItem("id", id);
    localStorage.setItem("password", password);
    document.location.href = "chat.html";
    /*document.getElementById("registration").classList.add("hidden");
    document.getElementById("authorisation").classList.add("hidden");
    document.getElementById("page").classList.remove("hidden");*/
}