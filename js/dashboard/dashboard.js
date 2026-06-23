import { getSession }
from "../auth/session.js";

import { loadStatistics }
from "./statistics.js";

import { loadRecentJobs }
from "./recent-jobs.js";

const user = getSession();

if(user){

document.getElementById(
"userName"
).innerText =
user.full_name ||
user.username;

if(user.profile_photo){

document.getElementById(
"userAvatar"
).src =
user.profile_photo;

}

}

loadStatistics();
loadRecentJobs();
