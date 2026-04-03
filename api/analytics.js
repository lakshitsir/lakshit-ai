import { getStats } from "../lib/store.js";

export default function handler(req,res){
  return res.json({
    ok:true,
    usage:getStats()
  });
}
