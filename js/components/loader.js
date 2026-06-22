// =========================
// SiraLink Loader Component
// =========================

class Loader {

constructor() {
this.createLoader();
}

createLoader() {

if (
document.getElementById(
"siralinkLoader"
)
) return;

const loader =
document.createElement("div");

loader.id =
"siralinkLoader";

loader.innerHTML = `

<div class="loader-container">

<div class="loader-spinner"></div>

<p class="loader-text">
Loading...
</p>

</div>

`;

document.body.appendChild(
loader
);

}

show(message = "Loading...") {

const loader =
document.getElementById(
"siralinkLoader"
);

const text =
loader.querySelector(
".loader-text"
);

text.textContent =
message;

loader.style.display =
"flex";

}

hide() {

const loader =
document.getElementById(
"siralinkLoader"
);

loader.style.display =
"none";

}

}

const loader =
new Loader();