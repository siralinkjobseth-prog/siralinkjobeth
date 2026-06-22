// =========================
// SiraLink Navbar Component
// =========================

class Navbar {

constructor() {
this.render();
}

render() {

const navbar = document.getElementById("navbar");

if (!navbar) return;

navbar.innerHTML = `

<nav class="navbar">

<div class="navbar-logo">
<a href="../home.html">
<img
src="../assets/images/branding/logo.png"
alt="SiraLink Logo"
height="40">
</a>
</div>

<ul class="navbar-links">

<li>
<a href="../pages/home.html">
Home
</a>
</li>

<li>
<a href="../pages/jobs.html">
Jobs
</a>
</li>

<li>
<a href="../pages/saved-jobs.html">
Saved Jobs
</a>
</li>

<li>
<a href="../pages/notifications.html">
Notifications
</a>
</li>

<li>
<a href="../pages/profile.html">
Profile
</a>
</li>

</ul>

<div class="navbar-user">

<img
id="userAvatar"
src="../assets/images/default-avatar.png"
alt="User Avatar"
class="user-avatar">

</div>

</nav>

`;

this.loadUser();

}

async loadUser() {

try {

const userData =
localStorage.getItem("siralink_user");

if (!userData) return;

const user =
JSON.parse(userData);

const avatar =
document.getElementById("userAvatar");

if (
avatar &&
user.avatar_url
) {
avatar.src =
user.avatar_url;
}

} catch (error) {

console.error(
"Navbar User Error:",
error
);

}

}

}

document.addEventListener(
"DOMContentLoaded",
() => {
new Navbar();
}
);