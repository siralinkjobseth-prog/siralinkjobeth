/* ==================================
   SiraLink Profile Main Controller
================================== */

class ProfileManager {

    constructor() {
        this.user = null;
    }

    async init() {

        try {

            await this.loadUser();

            if (!this.user) return;

            await this.loadProfile();

            await this.loadStats();

            this.initializeLogout();

            console.log(
                "Profile loaded successfully"
            );

        } catch (error) {

            console.error(
                "Profile Error:",
                error
            );

        }

    }

    async loadUser() {

        this.user =
            await usersService
            .getCurrentUser();

    }

    async loadProfile() {

        const user = this.user;

        document.getElementById(
            "profileFullName"
        ).textContent =
            user.full_name ||
            "User";

        const fullNameInfo =
            document.getElementById(
                "profileFullNameInfo"
            );

        if (fullNameInfo) {

            fullNameInfo.textContent =
                user.full_name ||
                "-";

        }

        const email =
            document.getElementById(
                "profileEmail"
            );

        if (email) {

            email.textContent =
                user.email ||
                "-";

        }

        document.getElementById(
            "profileDepartment"
        ).textContent =
            user.department ||
            "Job Seeker";

        const departmentInfo =
            document.getElementById(
                "profileDepartmentInfo"
            );

        if (departmentInfo) {

            departmentInfo.textContent =
                user.department ||
                "-";

        }

        const experience =
            document.getElementById(
                "profileExperience"
            );

        if (experience) {

            experience.textContent =
                `${user.experience_years || 0} Years`;

        }

        const education =
            document.getElementById(
                "profileEducation"
            );

        if (education) {

            education.textContent =
                user.education_level ||
                "-";

        }

        const avatar =
            document.getElementById(
                "profileAvatar"
            );

        if (
            avatar &&
            user.profile_picture
        ) {

            avatar.src =
                user.profile_picture;

        }

        const completion =
            user.profile_completion || 0;

        const completionText =
            document.getElementById(
                "profileCompletion"
            );

        if (completionText) {

            completionText.textContent =
                completion + "%";

        }

        const progressBar =
            document.getElementById(
                "progressBar"
            );

        if (progressBar) {

            progressBar.style.width =
                completion + "%";

        }

    }

    async loadStats() {

        try {

            const applications =
                await applicationsService
                .getUserApplications(
                    this.user.id
                );

            const notifications =
                await notificationsService
                .getUserNotifications(
                    this.user.id
                );

            const applicationsCount =
                document.getElementById(
                    "applicationsCount"
                );

            if (
                applicationsCount
            ) {

                applicationsCount.textContent =
                    applications.length;

            }

            const notificationsCount =
                document.getElementById(
                    "notificationsCount"
                );

            if (
                notificationsCount
            ) {

                notificationsCount.textContent =
                    notifications.length;

            }

            const savedJobsCount =
                document.getElementById(
                    "savedJobsCount"
                );

            if (
                savedJobsCount
            ) {

                const {
                    count
                } = await supabase
                    .from("saved_jobs")
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                    .eq(
                        "user_id",
                        this.user.id
                    );

                savedJobsCount.textContent =
                    count || 0;

            }

        } catch (error) {

            console.error(
                "Stats Error:",
                error
            );

        }

    }

    initializeLogout() {

        const logoutBtn =
            document.getElementById(
                "logoutBtn"
            );

        if (!logoutBtn) return;

        logoutBtn.addEventListener(
            "click",
            async () => {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );

                if (
                    !confirmLogout
                ) return;

                try {

                    await supabase.auth
                        .signOut();

                    localStorage.clear();

                    sessionStorage.clear();

                    window.location.href =
                        "../login.html";

                } catch (error) {

                    console.error(
                        error
                    );

                }

            }
        );

    }

    async refresh() {

        await this.loadUser();

        if (!this.user) return;

        await this.loadProfile();

        await this.loadStats();

    }

}

const profileManager =
    new ProfileManager();

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await profileManager.init();

    }
);

window.profileManager =
    profileManager;
