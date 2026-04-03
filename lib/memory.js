let memory = {};

export function getHistory(userId){
  if(!memory[userId]) memory[userId] = [];
  return memory[userId];
}

export function saveMessage(userId, msg){
  if(!memory[userId]) memory[userId] = [];

  memory[userId].push(msg);

  if(memory[userId].length > 5){
    memory[userId].shift();
  }
}
