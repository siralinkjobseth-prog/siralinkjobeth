/* ==================================
   SiraLink Jobs Service
================================== */

class JobsService {
    constructor() {
        this.table = "jobs";
    }

    async getAllJobs() {
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

    async getActiveJobs() {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .eq("status", "active")
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

    async getJobById(id) {
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

    async createJob(jobData) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .insert([jobData])
                .select();

            if (error) throw error;

            return data;

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateJob(id, updates) {
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

    async deleteJob(id) {
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

    async searchJobs(keyword) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .or(
                    `title.ilike.%${keyword}%,
                     company_name.ilike.%${keyword}%,
                     location.ilike.%${keyword}%`
                );

            if (error) throw error;

            return data || [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getJobsByDepartment(department) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .eq("department", department);

            if (error) throw error;

            return data || [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getJobsByLocation(location) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .eq("location", location);

            if (error) throw error;

            return data || [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getFeaturedJobs(limit = 6) {
        try {

            const { data, error } = await supabase
                .from(this.table)
                .select("*")
                .eq("featured", true)
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

    async getJobsCount() {
        try {

            const { count } = await supabase
                .from(this.table)
                .select("*", {
                    count: "exact",
                    head: true
                });

            return count || 0;

        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    async closeExpiredJobs() {
        try {

            const today =
                new Date()
                .toISOString()
                .split("T")[0];

            const { data, error } =
                await supabase
                .from(this.table)
                .update({
                    status: "expired"
                })
                .lt(
                    "application_deadline",
                    today
                )
                .eq("status", "active")
                .select();

            if (error) throw error;

            return data || [];

        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getJobStatistics() {
        try {

            const total =
                await this.getJobsCount();

            const active =
                (
                    await supabase
                    .from(this.table)
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                    .eq("status", "active")
                ).count || 0;

            const expired =
                (
                    await supabase
                    .from(this.table)
                    .select("*", {
                        count: "exact",
                        head: true
                    })
                    .eq("status", "expired")
                ).count || 0;

            return {
                total,
                active,
                expired
            };

        } catch (error) {

            console.error(error);

            return {
                total: 0,
                active: 0,
                expired: 0
            };
        }
    }
}

window.jobsService =
new JobsService();