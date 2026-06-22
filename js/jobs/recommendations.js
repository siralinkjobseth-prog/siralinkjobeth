import { supabase }
from "../config/supabase.js";

export async function getRecommendations(){

const {data}
=
await supabase
.from("ai_matches")
.select("*")
.limit(10);

return data;

}