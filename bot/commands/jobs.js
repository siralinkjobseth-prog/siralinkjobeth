import { sendMessage }
from "../services/telegram-api.js";

export async function jobsCommand(
message
){

await sendMessage(

message.chat.id,

"Open Mini App to view jobs."

);

}