import { supabase }
from "../config/supabase.js";

export async function
loadStatistics(){

const jobs =
await supabase
.from("jobs")
.select("*",{count:"exact",head:true});

const users =
await supabase
.from("users")
.select("*",{count:"exact",head:true});

document.getElementById(
"jobsCount"
).innerText =
jobs.count || 0;

document.getElementById(
"usersCount"
).innerText =
users.count || 0;

}