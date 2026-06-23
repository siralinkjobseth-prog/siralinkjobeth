const BOT_TOKEN =
process.env.BOT_TOKEN;

const API_URL =
`https://api.telegram.org/bot${BOT_TOKEN}`;

export async function sendMessage(
chatId,
text,
keyboard=null
){

await fetch(
`${API_URL}/sendMessage`,
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({

chat_id:chatId,

text,

parse_mode:"HTML",

reply_markup:keyboard

})
});

}
