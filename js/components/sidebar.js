// =========================
// SiraLink Sidebar Component
// =========================

class Sidebar {

constructor() {
this.init();
}

init() {

const sidebar =
document.getElementById("sidebar");

if (!sidebar) return;

sidebar.innerHTML = `

<aside class="sidebar">

<div class="sidebar-header">

<img
src="../assets/images/branding/logo.png"
alt="SiraLink"
height="40">

</div>

<ul class="sidebar-menu">

<li>
<a href="../pages/admin/dashboard.html">
Dashboard
</a>
</li>

<li>
<a href="../pages/admin/jobs.html">
Jobs
</a>
</li>

<li>
<a href="../pages/admin/users.html">
Users
</a>
</li>

<li>
<a href="../pages/admin/analytics.html">
Analytics
</a>
</li>

<li>
<a href="../pages/admin/notifications.html">
Notifications
</a>
</li>

<li>
<a href="../pages/admin/broadcasts.html">
Broadcasts
</a>
</li>

<li>
<a href="../pages/admin/departments.html">
Departments
</a>
</li>

<li>
<a href="../pages/admin/settings.html">
Settings
</a>
</li>

</ul>

</aside>

`;

}

}

document.addEventListener(
"DOMContentLoaded",
() => {
new Sidebar();
}
);