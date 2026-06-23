import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  try {

    const { job_id } = await req.json();

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", job_id)
      .single();

    if (jobError) throw jobError;

    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .eq("department", job.department);

    if (usersError) throw usersError;

    let sentCount = 0;

    for (const user of users) {

      if (!user.telegram_id) continue;

      const message = `
📢 አዲስ ስራ ተለጥፏል

💼 ${job.title}

🏢 ${job.company_name}

📍 ${job.location}

🎓 ${job.education_level}

⏳ ${job.experience}

📅 Deadline: ${job.deadline}

🚀 SiraLink
      `;

      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            chat_id: user.telegram_id,
            text: message
          })
        }
      );

      const result = await response.json();

      if (result.ok) {
        sentCount++;

        await supabase
          .from("notifications")
          .insert({
            user_id: user.id,
            title: "New Job Posted",
            message: message,
            is_read: false
          });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent_to: sentCount
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message
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
