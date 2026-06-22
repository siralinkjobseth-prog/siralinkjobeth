// =========================
// SiraLink Job Card Component
// =========================

class JobCard {

static create(job) {

return `

<div class="job-card">

<div class="job-card-header">

<img
src="${
job.logo ||
'../assets/images/default-avatar.png'
}"
alt="Company Logo"
class="company-logo">

<div>

<h3 class="job-title">
${job.title}
</h3>

<p class="company-name">
${job.company}
</p>

</div>

</div>

<div class="job-card-body">

<p class="job-location">
📍 ${job.location}
</p>

<p class="job-type">
💼 ${job.type}
</p>

<p class="job-salary">
💰 ${job.salary}
</p>

<p class="job-description">
${job.description}
</p>

</div>

<div class="job-card-footer">

<button
class="btn-apply"
onclick="applyJob('${job.id}')">
Apply
</button>

<button
class="btn-save"
onclick="saveJob('${job.id}')">
Save
</button>

</div>

</div>

`;

}

}

// =========================
// Example Functions
// =========================

function applyJob(jobId){

console.log(
"Apply Job:",
jobId
);

/*

await supabase
.from("applications")
.insert([{
job_id: jobId
}]);

*/

alert("Application submitted.");

}

function saveJob(jobId){

console.log(
"Save Job:",
jobId
);

/*

await supabase
.from("saved_jobs")
.insert([{
job_id: jobId
}]);

*/

alert("Job saved.");

}

// =========================
// Render Jobs Helper
// =========================

function renderJobs(
containerId,
jobs
){

const container =
document.getElementById(
containerId
);

if(!container) return;

container.innerHTML =
jobs.map(job =>
JobCard.create(job)
).join("");

}