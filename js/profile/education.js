/* ==================================
   SiraLink Education Module
================================== */

class EducationManager {
    constructor() {
        this.form =
            document.getElementById(
                "educationForm"
            );

        this.list =
            document.getElementById(
                "educationList"
            );

        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener(
                "submit",
                (e) =>
                    this.saveEducation(e)
            );
        }

        this.loadEducation();
    }

    async loadEducation() {
        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const educationLevel =
                document.getElementById(
                    "educationLevel"
                );

            const institution =
                document.getElementById(
                    "institution"
                );

            const fieldOfStudy =
                document.getElementById(
                    "fieldOfStudy"
                );

            const graduationYear =
                document.getElementById(
                    "graduationYear"
                );

            if (
                educationLevel
            ) {
                educationLevel.value =
                    user.education_level ||
                    "";
            }

            if (
                institution
            ) {
                institution.value =
                    user.institution ||
                    "";
            }

            if (
                fieldOfStudy
            ) {
                fieldOfStudy.value =
                    user.field_of_study ||
                    "";
            }

            if (
                graduationYear
            ) {
                graduationYear.value =
                    user.graduation_year ||
                    "";
            }

            this.render(
                user
            );

        } catch (error) {

            console.error(
                error
            );

        }
    }

    async saveEducation(
        e
    ) {

        e.preventDefault();

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const updates = {
                education_level:
                    document.getElementById(
                        "educationLevel"
                    )?.value || "",

                institution:
                    document.getElementById(
                        "institution"
                    )?.value || "",

                field_of_study:
                    document.getElementById(
                        "fieldOfStudy"
                    )?.value || "",

                graduation_year:
                    parseInt(
                        document.getElementById(
                            "graduationYear"
                        )?.value || 0
                    )
            };

            await usersService
                .updateUser(
                    user.id,
                    updates
                );

            alert(
                "Education information saved successfully."
            );

            await this.loadEducation();

            if (
                typeof profileCompletion !==
                "undefined"
            ) {
                profileCompletion
                    .refresh();
            }

        } catch (error) {

            console.error(
                error
            );

            alert(
                "Failed to save education information."
            );

        }
    }

    render(
        user
    ) {

        if (
            !this.list
        ) return;

        this.list.innerHTML = `
            <div class="education-card">
                <h4>
                    ${
                        user.education_level ||
                        "Not Provided"
                    }
                </h4>

                <p>
                    ${
                        user.institution ||
                        "-"
                    }
                </p>

                <p>
                    ${
                        user.field_of_study ||
                        "-"
                    }
                </p>

                <p>
                    Graduation:
                    ${
                        user.graduation_year ||
                        "-"
                    }
                </p>
            </div>
        `;
    }
}

const educationManager =
    new EducationManager();