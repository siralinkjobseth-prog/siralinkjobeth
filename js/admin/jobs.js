// ========================================
// SiraLink Admin Jobs Management
// js/admin/jobs.js
// ========================================

import { supabase } from "../config/supabase.js";

const jobsContainer = document.getElementById("jobsContainer");
const searchInput = document.getElementById("searchInput");
const totalJobs = document.getElementById("totalJobs");

let jobsData = [];

// =========================
// Load Jobs
// =========================

async function loadJobs() {
  try {
    jobsContainer.innerHTML = `
      <div class="loading">
        Loading jobs...
      </div>
    `;

    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    jobsData = data || [];

    totalJobs.textContent = jobsData.length;

    renderJobs(jobsData);

  } catch (err) {
    console.error(err);

    jobsContainer.innerHTML = `
      <div class="error">
        Failed to load jobs
      </div>
    `;
  }
}

// =========================
// Render Jobs
// =========================

function renderJobs(jobs) {

  if (!jobs.length) {
    jobsContainer.innerHTML = `
      <div class="empty">
        No jobs found
      </div>
    `;
    return;
  }

  jobsContainer.innerHTML = jobs.map(job => `
  
    <div class="job-card">

      <div class="job-header">
        <h3>${job.title || "Untitled Job"}</h3>
      </div>

      <div class="job-body">

        <p>
          <strong>Company:</strong>
          ${job.company_name || "-"}
        </p>

        <p>
          <strong>Department:</strong>
          ${job.department || "-"}
        </p>

        <p>
          <strong>Location:</strong>
          ${job.location || "-"}
        </p>

        <p>
          <strong>Education:</strong>
          ${job.education_level || "-"}
        </p>

        <p>
          <strong>Experience:</strong>
          ${job.experience || "-"}
        </p>

        <p>
          <strong>Deadline:</strong>
          ${job.deadline || "-"}
        </p>

      </div>

      <div class="job-actions">

        <button
          class="edit-btn"
          onclick="editJob('${job.id}')">
          Edit
        </button>

        <button
          class="delete-btn"
          onclick="deleteJob('${job.id}')">
          Delete
        </button>

      </div>

    </div>

  `).join("");
}

// =========================
// Search Jobs
// =========================

function searchJobs(keyword) {

  const filtered = jobsData.filter(job => {

    return (
      job.title?.toLowerCase().includes(keyword.toLowerCase()) ||
      job.company_name?.toLowerCase().includes(keyword.toLowerCase()) ||
      job.department?.toLowerCase().includes(keyword.toLowerCase())
    );

  });

  renderJobs(filtered);
}

// =========================
// Delete Job
// =========================

window.deleteJob = async function(jobId) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this job?"
  );

  if (!confirmDelete) return;

  try {

    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", jobId);

    if (error) throw error;

    alert("Job deleted successfully");

    loadJobs();

  } catch (err) {

    console.error(err);

    alert("Failed to delete job");

  }
};

// =========================
// Edit Job
// =========================

window.editJob = function(jobId) {

  window.location.href =
    `edit-job.html?id=${jobId}`;

};

// =========================
// Search Event
// =========================

if (searchInput) {

  searchInput.addEventListener("input", e => {

    searchJobs(e.target.value);

  });

}

// =========================
// Refresh Every 60 Seconds
// =========================

setInterval(() => {

  loadJobs();

}, 60000);

// =========================
// Init
// =========================

loadJobs();