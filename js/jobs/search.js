export function searchJobs(){

const keyword =
document.getElementById(
"searchInput"
).value.toLowerCase();

const cards =
document.querySelectorAll(
".job-card"
);

cards.forEach(card=>{

const text =
card.innerText.toLowerCase();

card.style.display =
text.includes(keyword)
? "block"
: "none";

});

}