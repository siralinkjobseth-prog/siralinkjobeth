/* ==================================
   SiraLink Profile Completion
================================== */

class ProfileCompletion {
    constructor() {
        this.progressBar =
            document.getElementById(
                "profileProgressBar"
            );

        this.progressText =
            document.getElementById(
                "profileProgressText"
            );

        this.checklist =
            document.getElementById(
                "profileChecklist"
            );
    }

    async calculate() {
        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return 0;

            const checks = [
                !!user.full_name,
                !!user.email,
                !!user.phone,
                !!user.gender,
                !!user.department,
                !!user.education_level,
                !!user.experience_years,
                !!user.profile_picture,
                !!user.cv_url
            ];

            const completed =
                checks.filter(Boolean).length;

            const percentage =
                Math.round(
                    (
                        completed /
                        checks.length
                    ) * 100
                );

            await usersService
                .updateUser(
                    user.id,
                    {
                        profile_completion:
                            percentage
                    }
                );

            this.render(
                percentage,
                checks
            );

            return percentage;

        } catch (error) {

            console.error(
                "Completion Error:",
                error
            );

            return 0;

        }
    }

    render(
        percentage,
        checks
    ) {

        if (
            this.progressBar
        ) {
            this.progressBar.style.width =
                `${percentage}%`;
        }

        if (
            this.progressText
        ) {
            this.progressText.textContent =
                `${percentage}% Completed`;
        }

        if (
            this.checklist
        ) {

            const items = [
                "Full Name",
                "Email",
                "Phone Number",
                "Gender",
                "Department",
                "Education",
                "Experience",
                "Profile Picture",
                "CV Upload"
            ];

            this.checklist.innerHTML =
                items
                .map(
                    (
                        item,
                        index
                    ) => `
                    <div class="completion-item">
                        <span>
                            ${
                                checks[
                                    index
                                ]
                                ? "✅"
                                : "⭕"
                            }
                        </span>
                        <span>${item}</span>
                    </div>
                `
                )
                .join("");
        }
    }

    async refresh() {
        return await this.calculate();
    }

    getStatus(
        percentage
    ) {

        if (
            percentage >= 90
        )
            return "Excellent";

        if (
            percentage >= 70
        )
            return "Good";

        if (
            percentage >= 50
        )
            return "Average";

        return "Incomplete";
    }

    async showStatus() {

        const percentage =
            await this.calculate();

        const status =
            this.getStatus(
                percentage
            );

        const statusElement =
            document.getElementById(
                "profileStatus"
            );

        if (
            statusElement
        ) {
            statusElement.textContent =
                status;
        }
    }
}

const profileCompletion =
    new ProfileCompletion();

document.addEventListener(
    "DOMContentLoaded",
    () => {
        profileCompletion
            .showStatus();
    }
);