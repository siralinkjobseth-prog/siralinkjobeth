import { supabase }
from "../config/supabase.js";

export async function addDepartment(
name
){

await supabase
.from("departments")
.insert([{

name

}]);

}