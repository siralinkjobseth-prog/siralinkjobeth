/* ==================================
   SiraLink Notifications Service
================================== */

class NotificationsService {
    constructor() {
        this.table = "notifications";
    }

    async getAllNotifications() {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .order("created_at", {
                    ascending: false
                });

            if (error) throw error;

            return data || [];

        } catch (error) {

            console.error(error);
            return [];

        }
    }

    async getUserNotifications(userId) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .eq("user_id", userId)
                .order("created_at", {
                    ascending: false
                });

            if (error) throw error;

            return data || [];

        } catch (error) {

            console.error(error);
            return [];

        }
    }

    async getNotificationById(id) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .eq("id", id)
                .single();

            if (error) throw error;

            return data;

        } catch (error) {

            console.error(error);
            return null;

        }
    }

    async createNotification(notificationData) {
        try {

            const payload = {
                ...notificationData,
                is_read: false
            };

            const { data, error } = await supabase
                .from(this.table)
                .insert([payload])
                .select();

            if (error) throw error;

            return data;

        } catch (error) {

            console.error(error);
            throw error;

        }
    }

    async sendToUser(
        userId,
        title,
        message,
        type = "system"
    ) {

        return await this.createNotification({
            user_id: userId,
            title,
            message,
            type
        });

    }

    async markAsRead(id) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .update({
                    is_read: true
                })
                .eq("id", id)
                .select();

            if (error) throw error;

            return data;

        } catch (error) {

            console.error(error);
            return null;

        }
    }

    async markAllAsRead(userId) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .update({
                    is_read: true
                })
                .eq("user_id", userId)
                .eq("is_read", false)
                .select();

            if (error) throw error;

            return data || [];

        } catch (error) {

            console.error(error);
            return [];

        }
    }

    async deleteNotification(id) {
        try {

            const { error } = await supabase
                .from(this.table)
                .delete()
                .eq("id", id);

            if (error) throw error;

            return true;

        } catch (error) {

            console.error(error);
            return false;

        }
    }

    async clearUserNotifications(userId) {
        try {

            const { error } = await supabase
                .from(this.table)
                .delete()
                .eq("user_id", userId);

            if (error) throw error;

            return true;

        } catch (error) {

            console.error(error);
            return false;

        }
    }

    async getUnreadCount(userId) {
        try {

            const { count, error } = await supabase
                .from(this.table)
                .select("*", {
                    count: "exact",
                    head: true
                })
                .eq("user_id", userId)
                .eq("is_read", false);

            if (error) throw error;

            return count || 0;

        } catch (error) {

            console.error(error);
            return 0;

        }
    }

    async getRecentNotifications(limit = 10) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .order("created_at", {
                    ascending: false
                })
                .limit(limit);

            if (error) throw error;

            return data || [];

        } catch (error) {

            console.error(error);
            return [];

        }
    }

    async getNotificationStats() {
        try {

            const total =
                (
                    await supabase
                    .from(this.table)
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                ).count || 0;

            const unread =
                (
                    await supabase
                    .from(this.table)
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                    .eq("is_read", false)
                ).count || 0;

            const read =
                (
                    await supabase
                    .from(this.table)
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                    .eq("is_read", true)
                ).count || 0;

            return {
                total,
                read,
                unread
            };

        } catch (error) {

            console.error(error);

            return {
                total: 0,
                read: 0,
                unread: 0
            };

        }
    }

    subscribe(callback) {

        return supabase
            .channel("notifications-channel")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: this.table
                },
                (payload) => {
                    if (callback) {
                        callback(payload.new);
                    }
                }
            )
            .subscribe();

    }

    unsubscribe(channel) {

        if (channel) {
            supabase.removeChannel(channel);
        }

    }
}

window.notificationsService =
    new NotificationsService();