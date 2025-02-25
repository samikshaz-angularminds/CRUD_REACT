function saveToken(token) {
    localStorage.setItem("loginToken", token)
}

function getToken() {
    if (localStorage.key("loginToken")) return localStorage.getItem("loginToken")
    return false;
}

function removeToken() {
    if (localStorage.key("loginToken")) return localStorage.removeItem("loginToken")
    return false;
}

export { saveToken, getToken, removeToken };