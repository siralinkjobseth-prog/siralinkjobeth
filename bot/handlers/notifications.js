import { sendMessage }
from "../services/telegram-api.js";

export async function sendJobAlert(

chatId,

job

){

await sendMessage(

chatId,

`
📢 New Job Alert

💼 ${job.title}

🏢 ${job.company_name}

📍 ${job.location}

🎓 ${job.education_level}

⏳ ${job.experience}

Apply Now
`

);

}