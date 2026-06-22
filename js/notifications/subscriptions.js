/* ==================================
   SiraLink Notification Subscription
================================== */

class NotificationSubscription {
    constructor() {
        this.statusElement =
            document.getElementById(
                "subscriptionStatus"
            );

        this.subscribeBtn =
            document.getElementById(
                "subscribeBtn"
            );

        this.unsubscribeBtn =
            document.getElementById(
                "unsubscribeBtn"
            );

        this.init();
    }

    async init() {

        await this.loadStatus();

        this.bindEvents();
    }

    bindEvents() {

        if (this.subscribeBtn) {

            this.subscribeBtn
                .addEventListener(
                    "click",
                    () =>
                        this.subscribe()
                );

        }

        if (this.unsubscribeBtn) {

            this.unsubscribeBtn
                .addEventListener(
                    "click",
                    () =>
                        this.unsubscribe()
                );

        }
    }

    async loadStatus() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            const subscribed =
                user.notifications_subscribed ?? true;

            this.updateUI(
                subscribed
            );

        } catch (error) {

            console.error(
                "Subscription Status Error:",
                error
            );

        }
    }

    updateUI(subscribed) {

        if (this.statusElement) {

            this.statusElement.textContent =
                subscribed
                    ? "Subscribed"
                    : "Unsubscribed";

        }

        if (this.subscribeBtn) {

            this.subscribeBtn.disabled =
                subscribed;

        }

        if (this.unsubscribeBtn) {

            this.unsubscribeBtn.disabled =
                !subscribed;

        }
    }

    async subscribe() {

        try {

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            await usersService
                .updateUser(
                    user.id,
                    {
                        notifications_subscribed: true
                    }
                );

            this.updateUI(
                true
            );

            await notificationsService
                .sendToUser(
                    user.id,
                    "Subscription Activated",
                    "You will now receive notifications from SiraLink.",
                    "subscription"
                );

            alert(
                "Successfully subscribed."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Subscription failed."
            );

        }
    }

    async unsubscribe() {

        try {

            const confirmed =
                confirm(
                    "Are you sure you want to unsubscribe from notifications?"
                );

            if (!confirmed)
                return;

            const user =
                await usersService
                .getCurrentUser();

            if (!user) return;

            await usersService
                .updateUser(
                    user.id,
                    {
                        notifications_subscribed: false
                    }
                );

            this.updateUI(
                false
            );

            alert(
                "You have unsubscribed from notifications."
            );

        } catch (error) {

            console.error(error);

            alert(
                "Failed to unsubscribe."
            );

        }
    }

    async toggle() {

        const user =
            await usersService
            .getCurrentUser();

        if (!user) return;

        if (
            user.notifications_subscribed
        ) {

            await this.unsubscribe();

        } else {

            await this.subscribe();

        }
    }
}

const notificationSubscription =
    new NotificationSubscription();