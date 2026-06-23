import { sendMessage }
from "../services/telegram-api.js";

export async function startCommand(
message
){

const chatId =
message.chat.id;

const keyboard = {

inline_keyboard:[
[
{
text:
"🚀 Open SiraLink App",

web_app:{
url:
process.env.MINI_APP_URL
}
}
]
]

};

await sendMessage(

chatId,

`👋 Welcome to SiraLink

Find jobs faster
with smart matching.`,

keyboard

);

}