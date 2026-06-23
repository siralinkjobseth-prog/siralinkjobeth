import { sendMessage }
from "../services/telegram-api.js";

export async function profileCommand(
message
){

await sendMessage(

message.chat.id,

"Open Mini App to manage profile."

);

}