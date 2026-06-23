import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async () => {
  try {

    const today = new Date().toISOString().split("T")[0];

    const { data: expiredJobs, error: fetchError } = await supabase
      .from("jobs")
      .select("id,title")
      .lt("deadline", today);

    if (fetchError) throw fetchError;

    let deletedCount = 0;

    if (expiredJobs && expiredJobs.length > 0) {

      const ids = expiredJobs.map(job => job.id);

      const { error: deleteError } = await supabase
        .from("jobs")
        .delete()
        .in("id", ids);

      if (deleteError) throw deleteError;

      deletedCount = ids.length;
    }

    return new Response(
      JSON.stringify({
        success: true,
        deleted_jobs: deletedCount
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (err) {

    return new Response(
      JSON.stringify({
        success: false,
        error: err.message
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }
});
