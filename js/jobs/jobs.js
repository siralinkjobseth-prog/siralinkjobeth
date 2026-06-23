import { supabase }
from "../config/supabase.js";

import { loadFilters }
from "./filters.js";

const container =
document.getElementById(
"jobsContainer"
);

async function loadJobs(){

const {data}
=
await supabase
.from("jobs")
.select("*")
.eq("is_active",true)
.order("created_at",
{ascending:false});

container.innerHTML="";

data.forEach(job=>{

container.innerHTML += `

<div class="job-card">

<h3>${job.title}</h3>

<p>${job.company_name}</p>

<p>${job.location}</p>

<p>${job.education_level}</p>

<button
onclick="
location.href=
'job-detail.html?id=${job.id}'
">

View Job

</button>

</div>

`;

});

}

loadFilters();
loadJobs();
