import { authenticateUser }
from "./auth/telegram-auth.js";

(async () => {

    const user =
    await authenticateUser();

    if(!user){

        alert(
        "Authentication Failed"
        );

        return;
    }

    setTimeout(() => {

        window.location.href =
        "pages/splash.html";

    },1500);

})();
