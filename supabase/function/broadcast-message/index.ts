
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN")!;

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  try {

    const { title, message } = await req.json();

    const { data: users, error } = await supabase
      .from("users")
      .select("id, telegram_id");

    if (error) throw error;

    let sentCount = 0;

    for (const user of users) {

      if (!user.telegram_id) continue;

      const text = `
📢 ${title}

${message}

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
            text
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
            title,
            message,
            is_read: false
          });
      }
    }

    await supabase
      .from("broadcasts")
      .insert({
        title,
        message,
        total_sent: sentCount
      });

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
