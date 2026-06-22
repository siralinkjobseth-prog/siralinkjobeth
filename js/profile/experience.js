/* ==================================
   SiraLink Experience Module
================================== */

class ExperienceManager {
    constructor() {
        this.form =
            document.getElementById(
                "experienceForm"
            );

        this.list =
            document.getElementById(
                "experienceList"
            );

        this.init();
    }

    init() {

        if (this.form) {
            this.form.addEventListener(
                "submit",
                (e) =>
                    this.saveExperience(e)
            );
        }

        this.loadExperience();
    }

    async loadExperience() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const yearsField =
                document.getElementById(
                    "experienceYears"
                );

            const companyField =
                document.getElementById(
                    "companyName"
                );

            const positionField =
                document.getElementById(
                    "jobPosition"
                );

            const skillsField =
                document.getElementById(
                    "skills"
                );

            if (yearsField) {
                yearsField.value =
                    user.experience_years || "";
            }

            if (companyField) {
                companyField.value =
                    user.company_name || "";
            }

            if (positionField) {
                positionField.value =
                    user.job_position || "";
            }

            if (skillsField) {
                skillsField.value =
                    Array.isArray(user.skills)
                        ? user.skills.join(", ")
                        : (user.skills || "");
            }

            this.render(user);

        } catch (error) {

            console.error(
                "Load Experience Error:",
                error
            );

        }
    }

    async saveExperience(e) {

        e.preventDefault();

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const skillsText =
                document.getElementById(
                    "skills"
                )?.value || "";

            const updates = {
                experience_years:
                    parseInt(
                        document.getElementById(
                            "experienceYears"
                        )?.value || 0
                    ),

                company_name:
                    document.getElementById(
                        "companyName"
                    )?.value || "",

                job_position:
                    document.getElementById(
                        "jobPosition"
                    )?.value || "",

                skills:
                    skillsText
                        .split(",")
                        .map(skill =>
                            skill.trim()
                        )
                        .filter(Boolean)
            };

            await usersService
                .updateUser(
                    user.id,
                    updates
                );

            alert(
                "Experience saved successfully."
            );

            await this.loadExperience();

            if (
                typeof profileCompletion !==
                "undefined"
            ) {
                profileCompletion.refresh();
            }

        } catch (error) {

            console.error(error);

            alert(
                "Failed to save experience."
            );

        }
    }

    render(user) {

        if (!this.list) return;

        const skills =
            Array.isArray(user.skills)
                ? user.skills
                : [];

        this.list.innerHTML = `
            <div class="experience-card">

                <h4>
                    ${user.job_position || "Not Provided"}
                </h4>

                <p>
                    Company:
                    ${user.company_name || "-"}
                </p>

                <p>
                    Experience:
                    ${user.experience_years || 0}
                    Years
                </p>

                <div class="skills-list">
                    ${skills.map(skill => `
                        <span class="skill-badge">
                            ${skill}
                        </span>
                    `).join("")}
                </div>

            </div>
        `;
    }
}

const experienceManager =
    new ExperienceManager();