import { supabase }
from "../config/supabase.js";

async function loadStats(){

const users =
await supabase
.from("users")
.select("*",
{
count:"exact",
head:true
});

const jobs =
await supabase
.from("jobs")
.select("*",
{
count:"exact",
head:true
});

document
.getElementById(
"totalUsers"
)
.innerText =
users.count || 0;

document
.getElementById(
"totalJobs"
)
.innerText =
jobs.count || 0;

}

loadStats();