// =========================
// SiraLink Stat Card Component
// =========================

class StatCard {

static create(data){

return `

<div class="stat-card">

<div class="stat-icon">
${data.icon || "📊"}
</div>

<div class="stat-content">

<h3 class="stat-number">
${data.value}
</h3>

<p class="stat-title">
${data.title}
</p>

</div>

</div>

`;

}

}

// =========================
// Render Stats Helper
// =========================

function renderStats(
containerId,
stats
){

const container =
document.getElementById(
containerId
);

if(!container) return;

container.innerHTML =
stats.map(stat =>
StatCard.create(stat)
).join("");

}

// =========================
// Example Data
// =========================

const dashboardStats = [

{
title:"Total Users",
value:"1,250",
icon:"👥"
},

{
title:"Jobs Posted",
value:"185",
icon:"💼"
},

{
title:"Applications",
value:"3,240",
icon:"📄"
},

{
title:"Departments",
value:"12",
icon:"🏢"
}

];

/*

Example:

renderStats(
"statsContainer",
dashboardStats
);

*/