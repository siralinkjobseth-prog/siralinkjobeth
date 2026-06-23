// =========================
// SiraLink Footer Component
// =========================

class Footer {

constructor() {
this.render();
}

render() {

const footer =
document.getElementById(
"footer"
);

if (!footer) return;

footer.innerHTML = `

<footer class="siralink-footer">

<div class="footer-container">

<div class="footer-brand">

<img
src="../assets/images/branding/logo.png"
alt="SiraLink"
height="45">

<p>
Find jobs faster with SiraLink.
Connect job seekers and employers.
</p>

</div>

<div class="footer-links">

<div>

<h4>Company</h4>

<ul>
<li>
<a href="../pages/about.html">
About
</a>
</li>

<li>
<a href="../pages/support.html">
Support
</a>
</li>

<li>
<a href="#">
Privacy Policy
</a>
</li>

<li>
<a href="#">
Terms of Service
</a>
</li>
</ul>

</div>

<div>

<h4>Jobs</h4>

<ul>
<li>
<a href="../pages/jobs.html">
Browse Jobs
</a>
</li>

<li>
<a href="../pages/saved-jobs.html">
Saved Jobs
</a>
</li>

<li>
<a href="#">
Career Advice
</a>
</li>
</ul>

</div>

<div>

<h4>Account</h4>

<ul>
<li>
<a href="../pages/profile.html">
Profile
</a>
</li>

<li>
<a href="../pages/settings.html">
Settings
</a>
</li>

<li>
<a href="../pages/notifications.html">
Notifications
</a>
</li>
</ul>

</div>

</div>

</div>

<div class="footer-bottom">

<p>
© ${new Date().getFullYear()}
SiraLink.
All Rights Reserved.
</p>

</div>

</footer>

`;

}

}

document.addEventListener(
"DOMContentLoaded",
() => {
new Footer();
}
);
