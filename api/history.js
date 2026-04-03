import { getHistory } from "../lib/store.js";

export default function handler(req, res){
  const userId = req.query.user || "web";

  return res.json({
    ok: true,
    user: userId,
    history: getHistory(userId)
  });
}
