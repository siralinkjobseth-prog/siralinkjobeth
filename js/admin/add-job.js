import { supabase }
from "../config/supabase.js";

import {
sendSmartNotification
}
from "./notifications.js";

export async function addJob(job){

const { data, error }
=
await supabase
.from("jobs")
.insert([job])
.select()
.single();

if(error){

alert(error.message);

return;
}

await sendSmartNotification(
data.id
);

alert(
"Job Posted Successfully"
);

}
