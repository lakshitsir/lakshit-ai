let memoryPool = [];

const intents = {
  greeting: ["hey","hello","hi"],
  question: ["why","what","?"],
  urgent: ["urgent","fast","now"],
  casual: ["ok","hmm","nice"]
};

const responses = {
  greeting: ["Ready","Here","Yes"],
  question: ["Handled","Sorted","Checked"],
  urgent: ["On priority","Doing now","Processing"],
  casual: ["Done","Set","Alright"]
};

function detectIntent(msg){
  msg = msg.toLowerCase();

  for(const key in intents){
    if(intents[key].some(w => msg.includes(w))){
      return key;
    }
  }
  return "casual";
}

// 🧠 pollination mix
function pollinate(base){
  if(memoryPool.length === 0) return base;

  const old = memoryPool[Math.floor(Math.random()*memoryPool.length)];

  const mix = `${base.split(" ")[0]} ${old.split(" ").slice(-1)}`;

  return mix;
}

export function generateLocalAI(message){
  const intent = detectIntent(message);

  let base = responses[intent][
    Math.floor(Math.random()*responses[intent].length)
  ];

  // pollination
  let reply = pollinate(base);

  // store memory
  memoryPool.push(reply);
  if(memoryPool.length > 50) memoryPool.shift();

  return reply;
}
