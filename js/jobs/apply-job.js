import { supabase }
from "../config/supabase.js";

import { getSession }
from "../auth/session.js";

export async function applyJob(jobId){

const user =
getSession();

await supabase
.from("applications")
.insert([{

user_id:user.id,
job_id:jobId

}]);

alert(
"Application Submitted"
);

}