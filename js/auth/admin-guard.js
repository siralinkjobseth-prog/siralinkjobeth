import { getSession }
from "./session.js";

export async function protectAdminPage(){

    const user = getSession();

    if(!user){

        window.location.href =
        "../../index.html";

        return;
    }

    if(!user.is_admin){

        alert("Access Denied");

        window.location.href =
        "../home.html";
    }
}