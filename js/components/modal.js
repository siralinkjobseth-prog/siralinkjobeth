// =========================
// SiraLink Modal Component
// =========================

class Modal {

constructor() {
this.createModal();
}

createModal() {

if (
document.getElementById(
"siralinkModal"
)
) return;

const modal =
document.createElement("div");

modal.id =
"siralinkModal";

modal.innerHTML = `

<div class="modal-overlay">

<div class="modal-box">

<div class="modal-header">

<h2 id="modalTitle">
Modal Title
</h2>

<button
class="modal-close"
id="modalCloseBtn">
&times;
</button>

</div>

<div
class="modal-body"
id="modalBody">

Modal Content

</div>

<div
class="modal-footer"
id="modalFooter">

<button
class="modal-btn"
id="modalOkBtn">
OK
</button>

</div>

</div>

</div>

`;

document.body.appendChild(
modal
);

this.attachEvents();

}

attachEvents() {

document
.getElementById(
"modalCloseBtn"
)
.addEventListener(
"click",
() => this.close()
);

document
.getElementById(
"modalOkBtn"
)
.addEventListener(
"click",
() => this.close()
);

window.addEventListener(
"click",
(e) => {

const modal =
document.getElementById(
"siralinkModal"
);

if(
e.target === modal
){
this.close();
}

}
);

}

open(
title,
content,
showFooter = true
){

const modal =
document.getElementById(
"siralinkModal"
);

document.getElementById(
"modalTitle"
).textContent = title;

document.getElementById(
"modalBody"
).innerHTML = content;

document.getElementById(
"modalFooter"
).style.display =
showFooter
? "block"
: "none";

modal.style.display =
"flex";

}

close(){

document.getElementById(
"siralinkModal"
).style.display =
"none";

}

}

const modal =
new Modal();