import express
from "express";

import { handleMessage }
from "./handlers/messages.js";

const app = express();

app.use(express.json());

app.post(
"/webhook",
async(req,res)=>{

const update =
req.body;

if(update.message){

await handleMessage(
update.message
);

}

res.sendStatus(200);

}
);

app.listen(
3000,
()=>{

console.log(
"Webhook Running"
);

}
);