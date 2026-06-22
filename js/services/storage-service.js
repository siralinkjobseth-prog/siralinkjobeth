/* ==================================
   SiraLink Storage Service
================================== */

class StorageService {
    constructor() {
        this.buckets = {
            cvs: "cvs",
            certificates: "certificates",
            profiles: "profile-pictures",
            logos: "company-logos",
            banners: "banners"
        };
    }

    generateFileName(file) {
        const ext = file.name.split(".").pop();
        const timestamp = Date.now();
        const random = Math.random()
            .toString(36)
            .substring(2, 10);

        return `${timestamp}_${random}.${ext}`;
    }

    async uploadFile(bucket, file, folder = "") {
        try {

            const fileName =
                this.generateFileName(file);

            const filePath =
                folder
                ? `${folder}/${fileName}`
                : fileName;

            const { data, error } =
                await supabase.storage
                .from(bucket)
                .upload(filePath, file, {
                    upsert: false
                });

            if (error) throw error;

            const {
                data: publicUrlData
            } = supabase.storage
                .from(bucket)
                .getPublicUrl(filePath);

            return {
                success: true,
                path: data.path,
                url: publicUrlData.publicUrl
            };

        } catch (error) {

            console.error(error);

            return {
                success: false,
                error: error.message
            };

        }
    }

    async uploadCV(file) {
        return await this.uploadFile(
            this.buckets.cvs,
            file,
            "users"
        );
    }

    async uploadCertificate(file) {
        return await this.uploadFile(
            this.buckets.certificates,
            file,
            "users"
        );
    }

    async uploadProfilePicture(file) {
        return await this.uploadFile(
            this.buckets.profiles,
            file,
            "profiles"
        );
    }

    async uploadCompanyLogo(file) {
        return await this.uploadFile(
            this.buckets.logos,
            file,
            "companies"
        );
    }

    async uploadBanner(file) {
        return await this.uploadFile(
            this.buckets.banners,
            file,
            "banners"
        );
    }

    async deleteFile(bucket, path) {
        try {

            const { error } =
                await supabase.storage
                .from(bucket)
                .remove([path]);

            if (error) throw error;

            return true;

        } catch (error) {

            console.error(error);
            return false;

        }
    }

    async getPublicUrl(bucket, path) {
        try {

            const {
                data
            } = supabase.storage
                .from(bucket)
                .getPublicUrl(path);

            return data.publicUrl;

        } catch (error) {

            console.error(error);
            return null;

        }
    }

    async listFiles(bucket, folder = "") {
        try {

            const { data, error } =
                await supabase.storage
                .from(bucket)
                .list(folder);

            if (error) throw error;

            return data || [];

        } catch (error) {

            console.error(error);
            return [];

        }
    }

    async fileExists(bucket, path) {
        try {

            const folder =
                path.substring(
                    0,
                    path.lastIndexOf("/")
                );

            const filename =
                path.substring(
                    path.lastIndexOf("/") + 1
                );

            const files =
                await this.listFiles(
                    bucket,
                    folder
                );

            return files.some(
                file => file.name === filename
            );

        } catch {

            return false;

        }
    }

    async getBucketStats(bucket) {
        try {

            const files =
                await this.listFiles(bucket);

            return {
                totalFiles: files.length,
                bucket
            };

        } catch (error) {

            console.error(error);

            return {
                totalFiles: 0,
                bucket
            };

        }
    }

    validateImage(file) {

        const allowed = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp"
        ];

        return allowed.includes(file.type);
    }

    validateDocument(file) {

        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        return allowed.includes(file.type);
    }

    formatFileSize(bytes) {

        if (bytes < 1024)
            return bytes + " B";

        if (bytes < 1024 * 1024)
            return (
                (bytes / 1024).toFixed(2) +
                " KB"
            );

        return (
            (bytes / (1024 * 1024))
            .toFixed(2) + " MB"
        );
    }
}

window.storageService =
    new StorageService();