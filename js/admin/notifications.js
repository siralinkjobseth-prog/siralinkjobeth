import { supabase }
from "../config/supabase.js";

export async function sendSmartNotification(
jobId
){

const { data, error }
=
await supabase.functions.invoke(
"profile-match",
{
body:{
job_id:jobId
}
}
);

if(error){

console.error(error);

return;
}

let totalSent = 0;

for(
const user
of data.matched
){

await supabase.functions.invoke(
"send-notification",
{
body:{

user_id:user.id,

job_id:jobId

}
}
);

totalSent++;

}

alert(

`Notification Sent Successfully

Sent To ${totalSent} Users`

);

}