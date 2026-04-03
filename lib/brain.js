let memory = {};
let greeted = {};
let learning = {}; // adaptive scoring

// 🎭 personalities (extendable)
const personalities = {
  sigma: {
    greeting: ["Proceed.", "Go ahead.", "State your point."],
    normal: ["Handled.", "Already done.", "Taken care of."],
    question: ["Already addressed.", "Nothing pending.", "It’s complete."],
    unavailable: ["User is currently unavailable. Try again later."]
  },

  elite: {
    greeting: ["Hello, how can I assist?", "Good to hear from you.", "Please proceed."],
    normal: ["Everything is handled.", "Completed successfully.", "All set."],
    question: ["Already resolved.", "Everything is in order.", "Handled earlier."],
    unavailable: ["The user is currently unavailable. Please reach out later."]
  },

  calm: {
    greeting: ["Hey, tell me.", "Hi, go ahead.", "I'm listening."],
    normal: ["Done.", "All good.", "Handled."],
    question: ["It’s done already.", "Checked for you.", "Nothing left."],
    unavailable: ["User is away right now. Please message later."]
  },

  cold: {
    greeting: ["Yes?", "Go on.", "Speak."],
    normal: ["Done.", "Handled.", "Finished."],
    question: ["Already handled.", "Nothing pending.", "Done."],
    unavailable: ["User unavailable. Try later."]
  }
};

// 🧠 detect intent
function intent(msg){
  msg = msg.toLowerCase();

  if(msg.includes("?")) return "question";
  if(msg.includes("later") || msg.includes("free")) return "unavailable";

  return "normal";
}

// 🎭 dynamic personality
function pickPersonality(uid, msg){
  if(!learning[uid]) learning[uid] = { sigma:0, elite:0, calm:0, cold:0 };

  // basic adapt
  if(msg.includes("?")) learning[uid].cold++;
  if(msg.includes("please")) learning[uid].elite++;
  if(msg.includes("bro") || msg.includes("bhai")) learning[uid].calm++;

  // pick highest score
  let best = "sigma";
  let max = -1;

  for(const p in learning[uid]){
    if(learning[uid][p] > max){
      max = learning[uid][p];
      best = p;
    }
  }

  return best;
}

// 🧠 memory
function save(uid, msg){
  if(!memory[uid]) memory[uid] = [];
  memory[uid].push(msg);

  if(memory[uid].length > 5) memory[uid].shift();
}

// 🚀 MAIN
export function generateReply(uid, message){

  const p = pickPersonality(uid, message);
  const i = intent(message);

  // greeting first time
  if(!greeted[uid]){
    greeted[uid] = true;

    save(uid, message);

    return { text: personalities[p].greeting[Math.floor(Math.random()*3)] };
  }

  let pool = personalities[p][i] || personalities[p].normal;

  let reply = pool[Math.floor(Math.random()*pool.length)];

  save(uid, message);

  return { text: reply };
      }
