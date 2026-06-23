import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async () => {
  try {

    const today = new Date();

    const weekAgo = new Date();
    weekAgo.setDate(today.getDate() - 7);

    const monthAgo = new Date();
    monthAgo.setMonth(today.getMonth() - 1);

    // Total Users
    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    // Active Users
    const { count: activeUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true);

    // Weekly Registrations
    const { count: weeklyRegistrations } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", weekAgo.toISOString());

    // Monthly Registrations
    const { count: monthlyRegistrations } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", monthAgo.toISOString());

    // Jobs By Department
    const { data: jobsByDepartment } = await supabase
      .from("jobs")
      .select("department");

    // Jobs By Location
    const { data: jobsByLocation } = await supabase
      .from("jobs")
      .select("location");

    const departmentStats: Record<string, number> = {};
    const locationStats: Record<string, number> = {};

    jobsByDepartment?.forEach((job) => {
      const key = job.department || "Unknown";
      departmentStats[key] =
        (departmentStats[key] || 0) + 1;
    });

    jobsByLocation?.forEach((job) => {
      const key = job.location || "Unknown";
      locationStats[key] =
        (locationStats[key] || 0) + 1;
    });

    await supabase
      .from("statistics")
      .upsert({
        generated_at: new Date().toISOString(),
        total_users: totalUsers || 0,
        active_users: activeUsers || 0,
        weekly_registrations:
          weeklyRegistrations || 0,
        monthly_registrations:
          monthlyRegistrations || 0,
        jobs_by_department: departmentStats,
        jobs_by_location: locationStats
      });

    return new Response(
      JSON.stringify({
        success: true,
        total_users: totalUsers,
        active_users: activeUsers
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
