import { supabase }
from "../config/supabase.js";

export async function createBroadcast(
message
){

await supabase
.from("broadcasts")
.insert([{

message

}]);

alert(
"Broadcast Created"
);

}