class SavedJobsService {

constructor() {
    this.table = "saved_jobs";
}

async saveJob(userId, jobId) {

    try {

        const { data: existing } =
            await supabase
            .from(this.table)
            .select("id")
            .eq("user_id", userId)
            .eq("job_id", jobId)
            .maybeSingle();

        if (existing) {
            return true;
        }

        const { error } =
            await supabase
            .from(this.table)
            .insert([
                {
                    user_id: userId,
                    job_id: jobId
                }
            ]);

        if (error) throw error;

        return true;

    } catch (error) {

        console.error(error);
        return false;

    }

}

async getSavedJobs(userId) {

    try {

        const { data, error } =
            await supabase
            .from(this.table)
            .select(`
                *,
                jobs(*)
            `)
            .eq("user_id", userId)
            .order(
                "saved_at",
                { ascending:false }
            );

        if (error) throw error;

        return data || [];

    } catch (error) {

        console.error(error);
        return [];

    }

}

async removeSavedJob(id) {

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

}

window.savedJobsService =
new SavedJobsService();