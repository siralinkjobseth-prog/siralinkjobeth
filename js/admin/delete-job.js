import { supabase }
from "../config/supabase.js";

export async function deleteJob(id){

const confirmDelete =
confirm(
"Delete Job?"
);

if(!confirmDelete)
return;

await supabase
.from("jobs")
.delete()
.eq("id",id);

alert(
"Job Deleted"
);

}