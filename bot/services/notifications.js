import { createClient }
from "@supabase/supabase-js";

import { sendJobAlert }
from "../handlers/notifications.js";

const supabase =
createClient(

process.env.SUPABASE_URL,

process.env.SUPABASE_SERVICE_KEY

);

export async function notifyUsers(
job
){

const { data: users }
=
await supabase
.from("users")
.select("*")
.eq(
"department",
job.department
);

for(const user of users){

await sendJobAlert(

user.telegram_id,

job

);

}

}