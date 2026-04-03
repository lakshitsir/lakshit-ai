let stats = {
  total: 0,
  users: {},
  ips: {},
  uniqueIPs: new Set()
};

// 🧠 chat history store
let history = {}; // userId -> [messages]

// 📊 track usage
export function track(userId, ip){
  stats.total++;

  stats.users[userId] = (stats.users[userId] || 0) + 1;

  const key = ip || "0.0.0.0";
  stats.ips[key] = (stats.ips[key] || 0) + 1;
  stats.uniqueIPs.add(key);
}

// 🧠 save chat
export function saveHistory(userId, userMsg, botReply){
  if(!history[userId]) history[userId] = [];

  history[userId].push({
    user: userMsg,
    bot: botReply,
    time: Date.now()
  });

  if(history[userId].length > 50){
    history[userId].shift();
  }
}

// 📥 get history
export function getHistory(userId){
  return history[userId] || [];
}

// 📊 stats
export function getStats(){
  return {
    total: stats.total,
    users: stats.users,
    ips: stats.ips,
    unique_ip_count: stats.uniqueIPs.size
  };
}
