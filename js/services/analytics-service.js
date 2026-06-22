/* ==================================
   SiraLink Analytics Service
================================== */

class AnalyticsService {
    constructor() {
        this.usersTable = "users";
        this.jobsTable = "jobs";
        this.applicationsTable = "applications";
        this.notificationsTable = "notifications";
    }

    async getDashboardAnalytics() {
        try {
            const [
                users,
                jobs,
                applications,
                notifications
            ] = await Promise.all([
                this.getUsersCount(),
                this.getJobsCount(),
                this.getApplicationsCount(),
                this.getNotificationsCount()
            ]);

            return {
                users,
                jobs,
                applications,
                notifications
            };
        } catch (error) {
            console.error("Analytics Error:", error);

            return {
                users: 0,
                jobs: 0,
                applications: 0,
                notifications: 0
            };
        }
    }

    async getUsersCount() {
        const { count } = await supabase
            .from(this.usersTable)
            .select("*", {
                count: "exact",
                head: true
            });

        return count || 0;
    }

    async getJobsCount() {
        const { count } = await supabase
            .from(this.jobsTable)
            .select("*", {
                count: "exact",
                head: true
            });

        return count || 0;
    }

    async getApplicationsCount() {
        const { count } = await supabase
            .from(this.applicationsTable)
            .select("*", {
                count: "exact",
                head: true
            });

        return count || 0;
    }

    async getNotificationsCount() {
        const { count } = await supabase
            .from(this.notificationsTable)
            .select("*", {
                count: "exact",
                head: true
            });

        return count || 0;
    }

    async getApplicationsByStatus() {
        try {
            const { data, error } = await supabase
                .from(this.applicationsTable)
                .select("status");

            if (error) throw error;

            const stats = {
                pending: 0,
                reviewed: 0,
                shortlisted: 0,
                hired: 0,
                rejected: 0
            };

            data.forEach(item => {
                if (stats[item.status] !== undefined) {
                    stats[item.status]++;
                }
            });

            return stats;
        } catch (error) {
            console.error(error);

            return {
                pending: 0,
                reviewed: 0,
                shortlisted: 0,
                hired: 0,
                rejected: 0
            };
        }
    }

    async getRecentUsers(limit = 10) {
        try {
            const { data, error } = await supabase
                .from(this.usersTable)
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

    async getRecentApplications(limit = 10) {
        try {
            const { data, error } = await supabase
                .from(this.applicationsTable)
                .select(`
                    *,
                    users(full_name),
                    jobs(title)
                `)
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

    async getRecentJobs(limit = 10) {
        try {
            const { data, error } = await supabase
                .from(this.jobsTable)
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

    async getMonthlyGrowth() {
        try {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();

            const startDate = `${currentYear}-${String(currentMonth).padStart(2, "0")}-01`;

            const { count } = await supabase
                .from(this.usersTable)
                .select("*", {
                    count: "exact",
                    head: true
                })
                .gte("created_at", startDate);

            return count || 0;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async getSystemSummary() {
        try {
            const analytics = await this.getDashboardAnalytics();
            const applicationStats =
                await this.getApplicationsByStatus();

            return {
                ...analytics,
                applicationStats,
                generatedAt: new Date().toISOString()
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}

window.analyticsService = new AnalyticsService();