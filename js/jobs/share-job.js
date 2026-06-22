export function shareJob(jobId){

const url =
window.location.origin +
"/pages/job-detail.html?id=" +
jobId;

navigator.share({

title:"SiraLink Job",
url

});

}