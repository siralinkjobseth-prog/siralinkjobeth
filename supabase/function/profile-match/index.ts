import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  try {

    const { user_id } = await req.json();

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user_id)
      .single();

    if (userError) throw userError;

    const { data: jobs, error: jobsError } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true);

    if (jobsError) throw jobsError;

    const matches = [];

    for (const job of jobs) {

      let score = 0;

      // Department Match
      if (
        user.department &&
        job.department &&
        user.department.toLowerCase() ===
        job.department.toLowerCase()
      ) {
        score += 50;
      }

      // Education Match
      if (
        user.education_level &&
        job.education_level &&
        user.education_level === job.education_level
      ) {
        score += 30;
      }

      // Experience Match
      if (
        Number(user.experience_years || 0) >=
        Number(job.experience || 0)
      ) {
        score += 20;
      }

      if (score > 0) {

        matches.push({
          user_id: user.id,
          job_id: job.id,
          score
        });

      }
    }

    if (matches.length > 0) {

      await supabase
        .from("ai_matches")
        .delete()
        .eq("user_id", user.id);

      await supabase
        .from("ai_matches")
        .insert(matches);

    }

    return new Response(
      JSON.stringify({
        success: true,
        matches_found: matches.length,
        matches
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
