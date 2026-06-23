import { sendMessage }
from "../services/telegram-api.js";

export async function helpCommand(
message
){

await sendMessage(

message.chat.id,

`
Available Commands

/start
/help
/profile
/jobs
`

);

}
