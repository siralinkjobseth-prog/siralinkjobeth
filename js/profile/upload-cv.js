/* ==================================
   SiraLink CV Upload Module
================================== */

class CVUploader {
    constructor() {
        this.input =
            document.getElementById(
                "cvInput"
            );

        this.info =
            document.getElementById(
                "cvInfo"
            );

        this.preview =
            document.getElementById(
                "cvPreview"
            );

        this.init();
    }

    init() {

        if (this.input) {

            this.input.addEventListener(
                "change",
                (e) => {

                    const file =
                        e.target.files[0];

                    if (file) {
                        this.upload(file);
                    }

                }
            );

        }

        this.loadCV();
    }

    async upload(file) {

        try {

            if (
                !storageService.validateDocument(
                    file
                )
            ) {

                alert(
                    "Only PDF and DOC files are allowed."
                );

                return;
            }

            const result =
                await storageService
                .uploadCV(file);

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

            if (!user) return;

            await usersService
                .uploadCV(
                    user.id,
                    result.url
                );

            await this.loadCV();

            if (
                typeof profileCompletion !==
                "undefined"
            ) {
                profileCompletion.refresh();
            }

            alert(
                "CV uploaded successfully."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to upload CV."
            );

        }
    }

    async loadCV() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            if (
                user.cv_url
            ) {

                this.renderCV(
                    user.cv_url
                );

            } else {

                this.renderEmpty();

            }

        } catch (error) {

            console.error(error);

        }
    }

    renderCV(cvUrl) {

        if (this.info) {

            this.info.innerHTML = `
                <div class="cv-uploaded">
                    <p>
                        ✅ CV Uploaded Successfully
                    </p>

                    <a
                        href="${cvUrl}"
                        target="_blank"
                    >
                        View CV
                    </a>

                    <button
                        onclick="cvUploader.removeCV()"
                    >
                        Remove CV
                    </button>
                </div>
            `;
        }

        if (this.preview) {

            this.preview.innerHTML = `
                <iframe
                    src="${cvUrl}"
                    width="100%"
                    height="500"
                    frameborder="0">
                </iframe>
            `;
        }
    }

    renderEmpty() {

        if (this.info) {

            this.info.innerHTML = `
                <p>
                    No CV uploaded yet.
                </p>
            `;
        }

        if (this.preview) {

            this.preview.innerHTML = "";
        }
    }

    async removeCV() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            await usersService
                .updateUser(
                    user.id,
                    {
                        cv_url: null
                    }
                );

            this.renderEmpty();

            if (
                typeof profileCompletion !==
                "undefined"
            ) {
                profileCompletion.refresh();
            }

            alert(
                "CV removed successfully."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to remove CV."
            );

        }
    }

    async replaceCV(file) {

        await this.upload(file);

    }
}

const cvUploader =
    new CVUploader();