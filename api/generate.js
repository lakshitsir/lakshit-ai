import { generateLocalAI } from "../lib/brain.js";
import { format } from "../lib/design.js";
import { track } from "../lib/store.js";

let userState = {};
let globalReplies = [];

export default function handler(req,res){
  try{
    const userId = req.headers["x-user-id"] || "u";
    const message = req.headers["x-message"] || "hi";

    const now = Date.now();

    if(!userState[userId]){
      userState[userId] = { last:0 };
    }

    const user = userState[userId];

    // 🚫 5 min cooldown
    if(now - user.last < 300000){
      return res.json({ ok:true, action:"skip" });
    }

    track(userId);

    // 🧠 local AI
    let reply = generateLocalAI(message);

    let final = format(reply);

    // 🚫 anti repeat
    if(globalReplies.includes(final)){
      final = format("Done");
    }

    globalReplies.push(final);
    if(globalReplies.length > 100) globalReplies.shift();

    user.last = now;

    return res.json({
      ok:true,
      action:"reply",
      reply: final,
      delete_after: 6
    });

  }catch(e){
    return res.json({ ok:false });
  }
}
