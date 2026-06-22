/* ==================================
   SiraLink Applications Service
================================== */

class ApplicationsService {
    constructor() {
        this.table = "applications";
    }

    async getAllApplications() {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select(`
                    *,
                    users(
                        id,
                        full_name,
                        email
                    ),
                    jobs(
                        id,
                        title,
                        company_name
                    )
                `)
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

    async getApplicationById(id) {
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

    async getUserApplications(userId) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select(`
                    *,
                    jobs(*)
                `)
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

    async getJobApplications(jobId) {
        try {
            const { data, error } = await supabase
                .from(this.table)
                .select(`
                    *,
                    users(*)
                `)
                .eq("job_id", jobId)
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

    async apply(userId, jobId) {
        try {

            const { data: existing } =
                await supabase
                .from(this.table)
                .select("id")
                .eq("user_id", userId)
                .eq("job_id", jobId)
                .maybeSingle();

            if (existing) {
                throw new Error(
                    "Already applied"
                );
            }

            const { data, error } =
                await supabase
                .from(this.table)
                .insert([
                    {
                        user_id: userId,
                        job_id: jobId,
                        status: "pending"
                    }
                ])
                .select();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateStatus(id, status) {
        try {

            const { data, error } =
                await supabase
                .from(this.table)
                .update({
                    status: status
                })
                .eq("id", id)
                .select();

            if (error) throw error;

            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteApplication(id) {
        try {

            const { error } =
                await supabase
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

    async getStatistics() {
        try {

            const { data, error } =
                await supabase
                .from(this.table)
                .select("status");

            if (error) throw error;

            const stats = {
                total: 0,
                pending: 0,
                reviewed: 0,
                shortlisted: 0,
                hired: 0,
                rejected: 0
            };

            stats.total = data.length;

            data.forEach(item => {

                if (
                    stats[item.status] !==
                    undefined
                ) {
                    stats[item.status]++;
                }

            });

            return stats;

        } catch (error) {

            console.error(error);

            return {
                total: 0,
                pending: 0,
                reviewed: 0,
                shortlisted: 0,
                hired: 0,
                rejected: 0
            };

        }
    }

    async hasApplied(userId, jobId) {

        try {

            const { data } =
                await supabase
                .from(this.table)
                .select("id")
                .eq("user_id", userId)
                .eq("job_id", jobId)
                .maybeSingle();

            return !!data;

        } catch {

            return false;

        }

    }

}

window.applicationsService =
new ApplicationsService();