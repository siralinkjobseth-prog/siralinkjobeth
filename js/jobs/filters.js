import { supabase }
from "../config/supabase.js";

export async function loadFilters(){

const departments =
await supabase
.from("departments")
.select("*");

const locations =
await supabase
.from("locations")
.select("*");

const dep =
document.getElementById(
"departmentFilter"
);

const loc =
document.getElementById(
"locationFilter"
);

departments.data.forEach(item=>{

dep.innerHTML +=
`<option>${item.name}</option>`;

});

locations.data.forEach(item=>{

loc.innerHTML +=
`<option>${item.name}</option>`;

});

}