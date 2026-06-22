import { supabase } from "../config/supabase.js";
import { telegramUser } from "../config/telegram.js";

export async function authenticateUser() {

    if (!telegramUser) {
        console.error("Telegram User Not Found");
        return null;
    }

    const telegramId = telegramUser.id.toString();

    const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("telegram_id", telegramId)
        .single();

    if (existingUser) {

        localStorage.setItem(
            "user",
            JSON.stringify(existingUser)
        );

        return existingUser;
    }

    const newUser = {

        telegram_id: telegramId,

        username:
        telegramUser.username || "",

        first_name:
        telegramUser.first_name || "",

        last_name:
        telegramUser.last_name || "",

        full_name:
        `${telegramUser.first_name || ""} ${telegramUser.last_name || ""}`,

        profile_photo:
        telegramUser.photo_url || "",

        is_active: true

    };

    const { data, error } =
    await supabase
        .from("users")
        .insert([newUser])
        .select()
        .single();

    if (error) {
        console.error(error);
        return null;
    }

    localStorage.setItem(
        "user",
        JSON.stringify(data)
    );

    return data;
}