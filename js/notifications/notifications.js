/* ==================================
   SiraLink Notifications Page
================================== */

async function loadNotifications() {

    const container =
        document.getElementById(
            "notificationList"
        );

    const counter =
        document.getElementById(
            "counter"
        );

    const emptyState =
        document.getElementById(
            "emptyState"
        );

    try {

        const user =
            await usersService
            .getCurrentUser();

        if (!user) {

            container.innerHTML =
                "<p>Please login first.</p>";

            return;
        }

        const notifications =
            await notificationsService
            .getUserNotifications(
                user.id
            );

        container.innerHTML = "";

        if (
            !notifications ||
            notifications.length === 0
        ) {

            counter.innerText =
                "0 Unread";

            emptyState.style.display =
                "block";

            return;
        }

        emptyState.style.display =
            "none";

        const unreadCount =
            notifications.filter(
                item => !item.is_read
            ).length;

        counter.innerText =
            unreadCount +
            " Unread";

        notifications.forEach(item => {

            let icon = "🔔";

            if (
                item.type ===
                "job"
            ) {
                icon = "💼";
            }

            if (
                item.type ===
                "success"
            ) {
                icon = "✅";
            }

            if (
                item.type ===
                "system"
            ) {
                icon = "📢";
            }

            container.innerHTML += `

            <div
            class="notification-card
            ${
                item.is_read
                    ? ""
                    : "unread"
            }">

                <div class="icon">
                    ${icon}
                </div>

                <div
                class="notification-content">

                    <div
                    class="notification-title">

                        ${item.title}

                    </div>

                    <div
                    class="notification-message">

                        ${item.message}

                    </div>

                    <div
                    class="notification-time">

                        ${new Date(
                            item.created_at
                        ).toLocaleString()}

                    </div>

                </div>

            </div>

            `;

        });

    } catch (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty">
                Failed to load notifications.
            </div>
        `;
    }
}

async function markAllAsRead() {

    try {

        const user =
            await usersService
            .getCurrentUser();

        if (!user) return;

        await notificationsService
            .markAllAsRead(
                user.id
            );

        await loadNotifications();

        alert(
            "All notifications marked as read."
        );

    } catch (error) {

        console.error(error);

    }
}

document
.getElementById(
"markAllBtn"
)
?.addEventListener(
"click",
markAllAsRead
);

document.addEventListener(
"DOMContentLoaded",
loadNotifications
);
