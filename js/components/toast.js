// =========================
// SiraLink Toast Component
// =========================

class Toast {

constructor() {
this.createToastContainer();
}

createToastContainer() {

if (
document.getElementById(
"toastContainer"
)
) return;

const container =
document.createElement("div");

container.id =
"toastContainer";

document.body.appendChild(
container
);

}

show(
message,
type = "success",
duration = 3000
) {

const toast =
document.createElement("div");

toast.className =
`toast toast-${type}`;

let icon = "✅";

if(type === "error"){
icon = "❌";
}

if(type === "warning"){
icon = "⚠️";
}

if(type === "info"){
icon = "ℹ️";
}

toast.innerHTML = `

<div class="toast-content">

<span class="toast-icon">
${icon}
</span>

<span class="toast-message">
${message}
</span>

</div>

`;

document
.getElementById(
"toastContainer"
)
.appendChild(toast);

setTimeout(() => {

toast.classList.add(
"toast-hide"
);

setTimeout(() => {

toast.remove();

}, 300);

}, duration);

}

}

const toast =
new Toast();