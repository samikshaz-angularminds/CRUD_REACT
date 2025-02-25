
function getToken(){
    if (localStorage.key("token")) {
        return localStorage.getItem("token")  
    }
    return false;
}

function removeToken() {
    if(localStorage.key("token")){
        localStorage.removeItem("token");
        return true;
    }

    return false;
}


export  {getToken,removeToken};
