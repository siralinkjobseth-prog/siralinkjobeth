/* ==================================
   SiraLink Certificate Upload
================================== */

class CertificateUploader {
    constructor() {
        this.input =
            document.getElementById(
                "certificateInput"
            );

        this.list =
            document.getElementById(
                "certificateList"
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

        this.loadCertificates();
    }

    async upload(file) {

        try {

            if (
                !storageService.validateDocument(
                    file
                )
            ) {

                alert(
                    "Only PDF or DOC files are allowed."
                );

                return;
            }

            const result =
                await storageService
                .uploadCertificate(
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

            if (!user) return;

            let certificates =
                user.certificates || [];

            certificates.push({
                name: file.name,
                url: result.url,
                uploaded_at:
                    new Date()
                    .toISOString()
            });

            await usersService
                .updateUser(
                    user.id,
                    {
                        certificates
                    }
                );

            await this.loadCertificates();

            alert(
                "Certificate uploaded successfully."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Certificate upload failed."
            );

        }
    }

    async loadCertificates() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const certificates =
                user.certificates || [];

            this.render(
                certificates
            );

        } catch (error) {

            console.error(error);

        }
    }

    render(certificates) {

        if (!this.list) return;

        if (
            certificates.length === 0
        ) {

            this.list.innerHTML = `
                <p>No certificates uploaded.</p>
            `;

            return;
        }

        this.list.innerHTML =
            certificates
            .map(
                (
                    certificate,
                    index
                ) => `
                <div class="certificate-item">

                    <div>
                        <strong>
                            ${certificate.name}
                        </strong>
                    </div>

                    <div class="certificate-actions">

                        <a
                            href="${certificate.url}"
                            target="_blank"
                        >
                            View
                        </a>

                        <button
                            onclick="certificateUploader.deleteCertificate(${index})"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            `
            )
            .join("");
    }

    async deleteCertificate(index) {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            let certificates =
                user.certificates || [];

            certificates.splice(
                index,
                1
            );

            await usersService
                .updateUser(
                    user.id,
                    {
                        certificates
                    }
                );

            await this.loadCertificates();

        } catch (error) {

            console.error(error);

        }
    }
}

const certificateUploader =
    new CertificateUploader();