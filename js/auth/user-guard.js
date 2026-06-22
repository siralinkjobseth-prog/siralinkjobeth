import { isLoggedIn }
from "./session.js";

export function protectUserPage(){

    if(!isLoggedIn()){

        window.location.href =
        "../index.html";
    }
}