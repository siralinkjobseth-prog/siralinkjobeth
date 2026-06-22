import { supabase }
from "../config/supabase.js";

export async function updateJob(
id,
data
){

await supabase
.from("jobs")
.update(data)
.eq("id",id);

alert(
"Job Updated"
);

}