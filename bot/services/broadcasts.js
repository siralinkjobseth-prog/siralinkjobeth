import { createClient }
from "@supabase/supabase-js";

import { sendMessage }
from "./telegram-api.js";

const supabase =
createClient(

process.env.SUPABASE_URL,

process.env.SUPABASE_SERVICE_KEY

);

export async function sendBroadcast(
message
){

const { data: users }
=
await supabase
.from("users")
.select("*");

for(const user of users){

await sendMessage(

user.telegram_id,

message

);

}

}