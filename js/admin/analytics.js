import { supabase }
from "../config/supabase.js";

export async function loadAnalytics(){

const users =
await supabase
.from("users")
.select("*");

const jobs =
await supabase
.from("jobs")
.select("*");

console.log(
users.data
);

console.log(
jobs.data
);

}