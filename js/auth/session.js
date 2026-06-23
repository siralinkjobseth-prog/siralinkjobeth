export function saveSession(user){

    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );
}

export function getSession(){

    return JSON.parse(
        localStorage.getItem("user")
    );
}

export function isLoggedIn(){

    return !!localStorage.getItem("user");
}

export function logout(){

    localStorage.removeItem("user");

    window.location.href =
    "../index.html";
}
