/* ==================================
   SiraLink Personal Information
================================== */

class PersonalInfoManager {
    constructor() {
        this.form =
            document.getElementById(
                "personalInfoForm"
            );

        this.init();
    }

    init() {

        if (this.form) {
            this.form.addEventListener(
                "submit",
                (e) =>
                    this.savePersonalInfo(e)
            );
        }

        this.loadPersonalInfo();
    }

    async loadPersonalInfo() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            this.setValue(
                "firstName",
                user.first_name
            );

            this.setValue(
                "lastName",
                user.last_name
            );

            this.setValue(
                "fullName",
                user.full_name
            );

            this.setValue(
                "email",
                user.email
            );

            this.setValue(
                "phone",
                user.phone
            );

            this.setValue(
                "gender",
                user.gender
            );

            this.setValue(
                "birthYear",
                user.birth_year
            );

            this.setValue(
                "birthMonth",
                user.birth_month
            );

            this.setValue(
                "department",
                user.department
            );

            this.setValue(
                "telegramId",
                user.telegram_id
            );

            this.loadProfileImage(
                user.profile_picture
            );

        } catch (error) {

            console.error(
                "Load Personal Info Error:",
                error
            );

        }
    }

    setValue(
        id,
        value
    ) {

        const element =
            document.getElementById(id);

        if (element) {
            element.value =
                value || "";
        }
    }

    async savePersonalInfo(e) {

        e.preventDefault();

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const updates = {
                first_name:
                    document.getElementById(
                        "firstName"
                    )?.value || "",

                last_name:
                    document.getElementById(
                        "lastName"
                    )?.value || "",

                full_name:
                    document.getElementById(
                        "fullName"
                    )?.value || "",

                email:
                    document.getElementById(
                        "email"
                    )?.value || "",

                phone:
                    document.getElementById(
                        "phone"
                    )?.value || "",

                gender:
                    document.getElementById(
                        "gender"
                    )?.value || "",

                birth_year:
                    parseInt(
                        document.getElementById(
                            "birthYear"
                        )?.value || 0
                    ),

                birth_month:
                    parseInt(
                        document.getElementById(
                            "birthMonth"
                        )?.value || 0
                    ),

                department:
                    document.getElementById(
                        "department"
                    )?.value || ""
            };

            await usersService
                .updateUser(
                    user.id,
                    updates
                );

            alert(
                "Personal information updated successfully."
            );

            if (
                typeof profileCompletion !==
                "undefined"
            ) {
                profileCompletion.refresh();
            }

        } catch (error) {

            console.error(error);

            alert(
                "Failed to update profile."
            );

        }
    }

    loadProfileImage(
        imageUrl
    ) {

        const image =
            document.getElementById(
                "profileImage"
            );

        if (
            image &&
            imageUrl
        ) {
            image.src =
                imageUrl;
        }
    }

    async uploadProfilePicture(
        file
    ) {

        try {

            if (
                !storageService.validateImage(
                    file
                )
            ) {

                alert(
                    "Invalid image format."
                );

                return;
            }

            const result =
                await storageService
                .uploadProfilePicture(
                    file
                );

            if (
                !result.success
            ) {

                alert(
                    result.error
                );

                return;
            }

            const user =
                await usersService
                .getCurrentUser();

            await usersService
                .uploadProfilePicture(
                    user.id,
                    result.url
                );

            this.loadProfileImage(
                result.url
            );

            alert(
                "Profile picture uploaded successfully."
            );

        } catch (error) {

            console.error(error);

        }
    }
}

const personalInfoManager =
    new PersonalInfoManager();

document
    .getElementById(
        "profilePictureInput"
    )
    ?.addEventListener(
        "change",
        (e) => {

            const file =
                e.target.files[0];

            if (file) {

                personalInfoManager
                    .uploadProfilePicture(
                        file
                    );

            }

        }
    );