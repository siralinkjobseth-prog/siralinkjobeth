import { supabase }
from "../config/supabase.js";

import { telegramUser }
from "../config/telegram.js";

document
.getElementById("loginBtn")
.addEventListener(
"click",
async()=>{

const password =
document
.getElementById(
"password"
).value;

const {data}
=
await supabase
.from("admins")
.select("*")
.eq(
"telegram_id",
telegramUser.id
)
.eq(
"password_hash",
password
)
.eq(
"is_active",
true
)
.single();

if(!data){

alert(
"Invalid Credentials"
);

return;
}

localStorage.setItem(
"admin",
JSON.stringify(data)
);

window.location.href =
"dashboard.html";

});