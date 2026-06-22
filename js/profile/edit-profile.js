import { supabase }
from "../config/supabase.js";

let currentUser = null;

const form =
document.getElementById(
"editProfileForm"
);

const profileInput =
document.getElementById(
"profilePicture"
);

const cvInput =
document.getElementById(
"cvFile"
);

const profilePreview =
document.getElementById(
"profilePreview"
);

const cvFileName =
document.getElementById(
"cvFileName"
);

const successMessage =
document.getElementById(
"successMessage"
);

/* =========================
   Load User Profile
========================= */

async function loadProfile(){

try{

currentUser =
await usersService
.getCurrentUser();

if(!currentUser) return;

document.getElementById(
"fullName"
).value =
currentUser.full_name || "";

document.getElementById(
"email"
).value =
currentUser.email || "";

document.getElementById(
"phone"
).value =
currentUser.phone || "";

document.getElementById(
"gender"
).value =
currentUser.gender || "";

document.getElementById(
"department"
).value =
currentUser.department || "";

document.getElementById(
"educationLevel"
).value =
currentUser.education_level || "";

document.getElementById(
"experienceYears"
).value =
currentUser.experience_years || 0;

document.getElementById(
"location"
).value =
currentUser.location || "";

if(
currentUser.profile_picture
){
profilePreview.src =
currentUser.profile_picture;
}

if(currentUser.cv_url){

const file =
currentUser.cv_url
.split("/")
.pop();

cvFileName.textContent =
file;

}

}catch(error){

console.error(error);

}

}

/* =========================
   Preview Profile Picture
========================= */

profileInput?.addEventListener(
"change",
e=>{

const file =
e.target.files[0];

if(!file) return;

const reader =
new FileReader();

reader.onload =
function(event){

profilePreview.src =
event.target.result;

};

reader.readAsDataURL(
file
);

}
);

/* =========================
   CV Name Preview
========================= */

cvInput?.addEventListener(
"change",
e=>{

const file =
e.target.files[0];

if(!file) return;

cvFileName.textContent =
file.name;

}
);

/* =========================
   Upload Profile Picture
========================= */

async function uploadProfilePicture(
file
){

if(!file) return null;

const fileName =
`profile-${Date.now()}-${file.name}`;

const { error } =
await supabase.storage
.from(
"profile-pictures"
)
.upload(
fileName,
file,
{
upsert:true
}
);

if(error){

console.error(error);

return null;

}

const {
data
}
=
supabase.storage
.from(
"profile-pictures"
)
.getPublicUrl(
fileName
);

return data.publicUrl;

}

/* =========================
   Upload CV
========================= */

async function uploadCV(
file
){

if(!file) return null;

const fileName =
`cv-${Date.now()}-${file.name}`;

const { error } =
await supabase.storage
.from(
"cv-files"
)
.upload(
fileName,
file,
{
upsert:true
}
);

if(error){

console.error(error);

return null;

}

const {
data
}
=
supabase.storage
.from(
"cv-files"
)
.getPublicUrl(
fileName
);

return data.publicUrl;

}

/* =========================
   Save Profile
========================= */

form?.addEventListener(
"submit",
async e=>{

e.preventDefault();

try{

let profileUrl =
currentUser
?.profile_picture ||
null;

let cvUrl =
currentUser
?.cv_url ||
null;

/* upload image */

const imageFile =
profileInput.files[0];

if(imageFile){

profileUrl =
await uploadProfilePicture(
imageFile
);

}

/* upload cv */

const cvFile =
cvInput.files[0];

if(cvFile){

cvUrl =
await uploadCV(
cvFile
);

}

const updates = {

full_name:
document.getElementById(
"fullName"
).value,

email:
document.getElementById(
"email"
).value,

phone:
document.getElementById(
"phone"
).value,

gender:
document.getElementById(
"gender"
).value,

department:
document.getElementById(
"department"
).value,

education_level:
document.getElementById(
"educationLevel"
).value,

experience_years:
parseInt(
document.getElementById(
"experienceYears"
).value
) || 0,

location:
document.getElementById(
"location"
).value,

profile_picture:
profileUrl,

cv_url:
cvUrl

};

await usersService
.updateUser(
currentUser.id,
updates
);

await usersService
.updateProfileCompletion(
currentUser.id
);

successMessage
.style.display =
"block";

window.scrollTo({
top:0,
behavior:"smooth"
});

setTimeout(()=>{

successMessage
.style.display =
"none";

},3000);

}catch(error){

console.error(error);

alert(
"Failed to update profile."
);

}

}
);

/* =========================
   Init
========================= */

document.addEventListener(
"DOMContentLoaded",
async ()=>{

await loadProfile();

}
);