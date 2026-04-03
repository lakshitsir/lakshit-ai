let analytics = {};

export function track(user){
  if(!analytics[user]){
    analytics[user] = 0;
  }
  analytics[user]++;
}

export function getStats(){
  return analytics;
}
