import { supabase }
from "../config/supabase.js";

export async function getUsers(){

const {data}
=
await supabase
.from("users")
.select("*")
.order(
"created_at",
{
ascending:false
});

return data;

}