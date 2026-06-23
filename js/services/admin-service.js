/* ==================================
   SiraLink Admin Service
================================== */

class AdminService {
    constructor() {
        this.table = "admins";
    }

    async getCurrentAdmin() {
        try {
            const {
                data: { user },
                error
            } = await supabase.auth.getUser();

            if (error) throw error;

            if (!user) return null;

            const { data, error: adminError } = await supabase
                .from(this.table)
                .select("*")
                .eq("id", user.id)
                .single();

            if (adminError) throw adminError;

            return data;
        } catch (error) {
            console.error("Get Admin Error:", error);
            return null;
        }
    }

    async getAllAdmins() {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getAdminById(id) {
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

    async createAdmin(adminData) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .insert([adminData])
                .select();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateAdmin(id, updates) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .update(updates)
                .eq("id", id)
                .select();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteAdmin(id) {
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

    async getDashboardStats() {
        try {
            const [
                users,
                jobs,
                applications,
                notifications
            ] = await Promise.all([
                supabase.from("users").select("*", { count: "exact", head: true }),
                supabase.from("jobs").select("*", { count: "exact", head: true }),
                supabase.from("applications").select("*", { count: "exact", head: true }),
                supabase.from("notifications").select("*", { count: "exact", head: true })
            ]);

            return {
                users: users.count || 0,
                jobs: jobs.count || 0,
                applications: applications.count || 0,
                notifications: notifications.count || 0
            };
        } catch (error) {
            console.error(error);

            return {
                users: 0,
                jobs: 0,
                applications: 0,
                notifications: 0
            };
        }
    }

    async getRecentUsers(limit = 10) {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .order("created_at", {
                    ascending: false
                })
                .limit(limit);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getRecentJobs(limit = 10) {
        try {
            const { data, error } = await supabase
                .from("jobs")
                .select("*")
                .order("created_at", {
                    ascending: false
                })
                .limit(limit);

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async isAdmin(userId) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("id")
                .eq("id", userId)
                .single();

            if (error) return false;

            return !!data;
        } catch {
            return false;
        }
    }

    async logout() {
        try {
            await supabase.auth.signOut();

            window.location.href =
                "../../pages/admin/login.html";
        } catch (error) {
            console.error(error);
        }
    }
}

window.adminService = new AdminService();
