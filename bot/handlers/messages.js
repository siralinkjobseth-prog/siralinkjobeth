import { startCommand }
from "../commands/start.js";

import { helpCommand }
from "../commands/help.js";

import { profileCommand }
from "../commands/profile.js";

import { jobsCommand }
from "../commands/jobs.js";

export async function handleMessage(
message
){

const text =
message.text;

if(text === "/start"){

return startCommand(
message
);

}

if(text === "/help"){

return helpCommand(
message
);

}

if(text === "/profile"){

return profileCommand(
message
);

}

if(text === "/jobs"){

return jobsCommand(
message
);

}

}