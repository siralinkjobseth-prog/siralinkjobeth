/* ==================================
   SiraLink Saved Jobs
================================== */

async function loadSavedJobs() {

    const container =
        document.getElementById(
            "jobsContainer"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    try {

        const user =
            await usersService
            .getCurrentUser();

        if (!user) {

            container.innerHTML = "";

            emptyState.style.display =
                "block";

            return;
        }

        const savedJobs =
            await savedJobsService
            .getUserSavedJobs(
                user.id
            );

        container.innerHTML = "";

        if (
            !savedJobs ||
            savedJobs.length === 0
        ) {

            emptyState.style.display =
                "block";

            return;
        }

        emptyState.style.display =
            "none";

        savedJobs.forEach(item => {

            const job =
                item.jobs || {};

            container.innerHTML += `

            <div class="job-card">

                <div class="company">
                    ${job.company_name || "Company"}
                </div>

                <div class="job-title">
                    ${job.title || "Job"}
                </div>

                <div class="details">

                    <span class="tag">
                        ${job.employment_type || "Full Time"}
                    </span>

                    <span class="tag">
                        ${job.location || "Ethiopia"}
                    </span>

                    <span class="tag">
                        ${job.department || "General"}
                    </span>

                </div>

                <div class="actions">

                    <button
                    class="btn apply-btn"
                    onclick="
                    location.href=
                    'job-detail.html?id=${job.id}'
                    ">

                    View Job

                    </button>

                    <button
                    class="btn remove-btn"
                    onclick="
                    removeSavedJob(
                        '${job.id}'
                    )
                    ">

                    Remove

                    </button>

                </div>

            </div>

            `;
        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-state">
                Failed to load saved jobs.
            </div>
        `;
    }
}

async function removeSavedJob(
    jobId
) {

    try {

        const user =
            await usersService
            .getCurrentUser();

        if (!user) return;

        await savedJobsService
        .unsaveJob(
            user.id,
            jobId
        );

        loadSavedJobs();

    } catch (error) {

        console.error(error);

        alert(
            "Failed to remove job"
        );

    }
}

document.addEventListener(
    "DOMContentLoaded",
    loadSavedJobs
);