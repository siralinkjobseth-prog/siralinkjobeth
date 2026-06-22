import { supabase }
from "../config/supabase.js";

export async function
loadRecentJobs(){

const {data}
=
await supabase
.from("jobs")
.select("*")
.order("created_at",
{ascending:false})
.limit(5);

const container =
document.getElementById(
"recentJobs"
);

container.innerHTML = "";

data.forEach(job => {

container.innerHTML += `

<div class="job-card">

<h4>${job.title}</h4>

<p>${job.company_name}</p>

<p>${job.location}</p>

</div>

`;

});

}