// 🧠 ULTRA HUMAN PREMIUM AUTO REPLY ENGINE

let userMemory = {};
let greetedUsers = {};
let globalReplies = [];

// 🎭 PERSONALITIES
const personalities = ["sigma","elite","calm","cold"];

// 💎 GREETING PACK (REAL HUMAN STYLE)
const greetings = {
  sigma: ["Yes.", "Go ahead.", "Speak."],
  elite: ["Hello, how can I assist?", "Good to hear from you.", "Yes, tell me."],
  calm: ["Hey, what’s up?", "Hi, tell me.", "Hello, go ahead."],
  cold: ["Yes?", "What is it?", "Go on."]
};

// 💎 MAIN RESPONSE PACKS
const packs = {
  sigma: {
    normal: ["Handled.", "Done.", "Taken care."],
    question: ["Already handled.", "Nothing pending.", "It’s done."],
    urgent: ["Working.", "Doing now.", "Handled."]
  },

  elite: {
    normal: ["All set.", "Completed.", "Handled properly."],
    question: ["Everything is resolved.", "Already taken care.", "All in order."],
    urgent: ["On priority.", "Handling immediately.", "Taking care now."]
  },

  calm: {
    normal: ["Done.", "All set.", "Handled."],
    question: ["It’s already done.", "Checked for you.", "Nothing left."],
    urgent: ["Working on it.", "Doing it now.", "Almost done."]
  },

  cold: {
    normal: ["Done.", "Handled.", "Finished."],
    question: ["Already handled.", "Nothing pending.", "Done."],
    urgent: ["Processing.", "Doing.", "Handled."]
  }
};

// 🧠 INTENT DETECT
function detectIntent(msg){
  msg = msg.toLowerCase();

  if(msg.includes("?")) return "question";
  if(msg.includes("urgent") || msg.includes("jaldi")) return "urgent";

  return "normal";
}

// 🎭 PERSONALITY DETECT
function detectPersonality(msg){
  msg = msg.toLowerCase();

  if(msg.includes("?")) return "cold";
  if(msg.includes("urgent")) return "elite";
  if(msg.includes("bhai") || msg.includes("bro")) return "calm";

  return "sigma";
}

// 🧠 CONTEXT MEMORY
function saveContext(userId, msg){
  if(!userMemory[userId]) userMemory[userId] = [];
  userMemory[userId].push(msg);

  if(userMemory[userId].length > 5){
    userMemory[userId].shift();
  }
}

// 🎯 ANTI REPEAT
function avoidRepeat(reply){
  if(globalReplies.includes(reply)){
    return reply + "";
  }

  globalReplies.push(reply);
  if(globalReplies.length > 100) globalReplies.shift();

  return reply;
}

// 🎨 VARIATION
function enhance(text){
  if(Math.random() > 0.6){
    return text.replace(".", "");
  }
  return text;
}

// 🚀 MAIN GENERATOR
export function generateLocalAI(userId, message){

  const intent = detectIntent(message);
  const personality = detectPersonality(message);

  // 👋 GREETING FIRST TIME ONLY
  if(!greetedUsers[userId]){
    greetedUsers[userId] = true;

    const greet = greetings[personality][
      Math.floor(Math.random()*greetings[personality].length)
    ];

    saveContext(userId, message);

    return {
      reply: greet,
      personality,
      type: "greet"
    };
  }

  // 💎 NORMAL REPLY
  const pool = packs[personality][intent];

  let reply = pool[Math.floor(Math.random()*pool.length)];

  reply = enhance(reply);
  reply = avoidRepeat(reply);

  saveContext(userId, message);

  return {
    reply,
    personality,
    type: "reply"
  };
}
