/* ==================================
   SiraLink Application History
================================== */

const container =
document.getElementById(
"applicationsContainer"
);

const emptyState =
document.getElementById(
"emptyState"
);

async function loadApplications() {

try {

const user =
await usersService
.getCurrentUser();

if (!user) {

container.innerHTML = `
<div style="text-align:center">
Please login first.
</div>
`;

return;

}

const applications =
await applicationsService
.getUserApplications(
user.id
);

if (
!applications ||
applications.length === 0
) {

container.innerHTML = "";

emptyState.style.display =
"block";

return;

}

container.innerHTML = "";

applications.forEach(app => {

const job =
app.jobs || {};

const status =
(
app.status ||
"pending"
).toLowerCase();

const appliedDate =
app.created_at
? new Date(
app.created_at
).toLocaleDateString()
: "-";

container.innerHTML += `

<div class="application-card">

<div class="job-title">
${job.title || "Job Title"}
</div>

<div class="company">
${job.company_name || "Company"}
</div>

<div class="meta">

<div class="date">
Applied:
${appliedDate}
</div>

<div class="status ${status}">
${status}
</div>

</div>

<button
class="btn"
onclick="
window.location.href=
'job-detail.html?id=${job.id}'
">

View Job

</button>

</div>

`;

});

} catch (error) {

console.error(
"Application History Error:",
error
);

container.innerHTML = `

<div style="
text-align:center;
color:red;
">

Failed to load applications.

</div>

`;

}

}

document.addEventListener(
"DOMContentLoaded",
loadApplications
);