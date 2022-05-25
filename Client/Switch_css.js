function switch_Mode() {

    let button = document.getElementById("switchMode")

    let theme = document.getElementById("theme")
    if (theme.getAttribute("href") == "for_chat.css") {
        theme.href = "dark.css";
        button.value ="Светлая тема"
    } else {
        theme.href = "for_chat.css"
        button.value ="Темная тема"
    }
}