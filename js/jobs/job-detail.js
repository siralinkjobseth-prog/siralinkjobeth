import { supabase } from "../config/supabase.js";

const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");

const container = document.getElementById("jobDetail");
const applyBtn = document.getElementById("applyBtn");
const saveBtn = document.getElementById("saveBtn");
const shareBtn = document.getElementById("shareBtn");

let currentJob = null;

async function loadJob(){

try{

const { data, error } = await supabase
.from("jobs")
.select("*")
.eq("id", jobId)
.single();

if(error) throw error;

currentJob = data;

container.innerHTML = `

<div class="job-card"><img
src="${data.company_logo || '../assets/images/companies/default-company.png'}"
class="company-logo">

<h2 class="job-title">
${data.title}
</h2><p class="company-name">
${data.company_name || "Company"}
</p><div class="job-meta"><span class="badge">
📍 ${data.location || "N/A"}
</span><span class="badge">
🎓 ${data.education_level || "N/A"}
</span><span class="badge">
💼 ${data.experience || "N/A"}
</span><span class="badge">
💰 ${data.salary || "Negotiable"}
</span></div><div class="section"><h3>Job Description</h3><p>
${data.description || "No description available"}
</p></div><div class="section"><h3>Requirements</h3><p>
${data.requirements || "Not specified"}
</p></div></div>`;

}catch(err){

container.innerHTML = `

<div class="job-card"><h2>
Job Not Found
</h2><p>
Unable to load this job.
</p></div>`;

console.error(err);

}

}

applyBtn.addEventListener(
"click",
()=>{

if(!currentJob) return;

alert(
"Application feature coming soon."
);

}
);

// የSave button ተግባር እዚህ ተጨምሯል
async function saveJob(){

try{

const user = await usersService.getCurrentUser();

if(!user){

alert("Please login first");

return;
}

const saved = await savedJobsService.saveJob(user.id, jobId);

if(saved){

alert("Job saved successfully");

saveBtn.innerText = "✓ Saved";

}

}catch(error){

console.error(error);

alert("Failed to save job");

}

}

if(saveBtn){

saveBtn.addEventListener("click", saveJob);

}

shareBtn.addEventListener(
"click",
async ()=>{

const url = window.location.href;

if(navigator.share){

await navigator.share({

title: currentJob?.title || "Job",

text: "Check this job on SiraLink",

url

});

}else{

navigator.clipboard.writeText(url);

alert("Link copied.");

}

}
);

loadJob();