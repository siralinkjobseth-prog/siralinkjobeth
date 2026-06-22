// =========================
// SiraLink Notification Card
// =========================

class NotificationCard {

static create(notification){

return `

<div class="
notification-card
${notification.read
? 'notification-read'
: 'notification-unread'}
">

<div class="
notification-icon
${notification.type || 'system-alert'}
">

${NotificationCard.getIcon(
notification.type
)}

</div>

<div class="notification-content">

<h3 class="notification-title">
${notification.title}
</h3>

<p class="notification-message">
${notification.message}
</p>

<p class="notification-time">
${notification.time}
</p>

<div class="notification-actions">

<button
class="btn-notification btn-view"
onclick="
viewNotification(
'${notification.id}'
)
">
View
</button>

<button
class="btn-notification btn-delete"
onclick="
deleteNotification(
'${notification.id}'
)
">
Delete
</button>

</div>

</div>

</div>

`;

}

static getIcon(type){

switch(type){

case "job":
return "💼";

case "success":
return "✅";

case "warning":
return "⚠️";

case "system":
return "🔔";

default:
return "📢";

}

}

}

// =========================
// View Notification
// =========================

function viewNotification(id){

console.log(
"View Notification:",
id
);

/*

Future:

window.location.href =
"notification-detail.html?id="
+ id;

*/

alert(
"Notification Opened"
);

}

// =========================
// Delete Notification
// =========================

function deleteNotification(id){

const confirmed =
confirm(
"Delete notification?"
);

if(!confirmed) return;

const card =
document.querySelector(
`[data-id="${id}"]`
);

if(card){
card.remove();
}

alert(
"Notification Deleted"
);

/*

Future Supabase:

await supabase
.from("notifications")
.delete()
.eq("id",id);

*/

}

// =========================
// Render Notifications
// =========================

function renderNotifications(
containerId,
notifications
){

const container =
document.getElementById(
containerId
);

if(!container) return;

container.innerHTML =
notifications.map(item =>

`<div data-id="${item.id}">
${NotificationCard.create(item)}
</div>`

).join("");

}

// =========================
// Example Data
// =========================

const sampleNotifications = [

{
id:1,
title:"New Job Match",
message:
"A new Software Engineer job matches your profile.",
time:"2 minutes ago",
type:"job",
read:false
},

{
id:2,
title:"Application Approved",
message:
"Your application was shortlisted.",
time:"1 hour ago",
type:"success",
read:false
},

{
id:3,
title:"System Update",
message:
"New features have been added.",
time:"Yesterday",
type:"system",
read:true
}

];

/*

Example:

renderNotifications(
"notificationsContainer",
sampleNotifications
);

*/