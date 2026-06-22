/* ==================================
   SiraLink Notification Preferences
================================== */

class NotificationPreferences {
    constructor() {
        this.form =
            document.getElementById(
                "notificationPreferencesForm"
            );

        this.init();
    }

    init() {

        if (this.form) {

            this.form.addEventListener(
                "submit",
                (e) =>
                    this.savePreferences(e)
            );

        }

        this.loadPreferences();
    }

    async loadPreferences() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const preferences =
                user.notification_preferences || {};

            this.setCheckbox(
                "jobAlerts",
                preferences.jobAlerts
            );

            this.setCheckbox(
                "applicationUpdates",
                preferences.applicationUpdates
            );

            this.setCheckbox(
                "telegramNotifications",
                preferences.telegramNotifications
            );

            this.setCheckbox(
                "emailNotifications",
                preferences.emailNotifications
            );

            this.setCheckbox(
                "systemAnnouncements",
                preferences.systemAnnouncements
            );

            this.setCheckbox(
                "marketingMessages",
                preferences.marketingMessages
            );

        } catch (error) {

            console.error(
                "Load Preferences Error:",
                error
            );

        }
    }

    setCheckbox(id, value) {

        const element =
            document.getElementById(id);

        if (element) {
            element.checked =
                value ?? true;
        }
    }

    getCheckboxValue(id) {

        return document.getElementById(id)
            ?.checked || false;
    }

    async savePreferences(e) {

        e.preventDefault();

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const preferences = {

                jobAlerts:
                    this.getCheckboxValue(
                        "jobAlerts"
                    ),

                applicationUpdates:
                    this.getCheckboxValue(
                        "applicationUpdates"
                    ),

                telegramNotifications:
                    this.getCheckboxValue(
                        "telegramNotifications"
                    ),

                emailNotifications:
                    this.getCheckboxValue(
                        "emailNotifications"
                    ),

                systemAnnouncements:
                    this.getCheckboxValue(
                        "systemAnnouncements"
                    ),

                marketingMessages:
                    this.getCheckboxValue(
                        "marketingMessages"
                    )
            };

            await usersService
                .updateUser(
                    user.id,
                    {
                        notification_preferences:
                            preferences
                    }
                );

            alert(
                "Notification preferences saved successfully."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to save preferences."
            );

        }
    }

    async resetDefaults() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const defaults = {

                jobAlerts: true,
                applicationUpdates: true,
                telegramNotifications: true,
                emailNotifications: false,
                systemAnnouncements: true,
                marketingMessages: false
            };

            await usersService
                .updateUser(
                    user.id,
                    {
                        notification_preferences:
                            defaults
                    }
                );

            await this.loadPreferences();

            alert(
                "Preferences reset successfully."
            );

        } catch (error) {

            console.error(error);

        }
    }
}

const notificationPreferences =
    new NotificationPreferences();