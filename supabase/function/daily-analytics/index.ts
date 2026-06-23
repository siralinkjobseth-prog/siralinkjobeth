
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async () => {
  try {

    const today = new Date().toISOString().split("T")[0];

    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    const { count: totalJobs } = await supabase
      .from("jobs")
      .select("*", { count: "exact", head: true });

    const { count: totalApplications } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true });

    const { count: totalNotifications } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true });

    const { count: dailyUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00`);

    const { count: dailyApplications } = await supabase
      .from("applications")
      .select("*", { count: "exact", head: true })
      .gte("created_at", `${today}T00:00:00`);

    await supabase
      .from("analytics_daily")
      .upsert({
        analytics_date: today,
        total_users: totalUsers || 0,
        total_jobs: totalJobs || 0,
        total_applications: totalApplications || 0,
        total_notifications: totalNotifications || 0,
        daily_users: dailyUsers || 0,
        daily_applications: dailyApplications || 0
      });

    return new Response(
      JSON.stringify({
        success: true,
        date: today
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
