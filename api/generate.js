import { generateLocalAI } from "../lib/brain.js";
import { format } from "../lib/design.js";

let userState = {};
let globalReplies = [];

export default function handler(req, res) {
  try {
    const userId = req.headers["x-user-id"] || "u";
    const message = req.headers["x-message"] || "hi";

    const now = Date.now();

    if (!userState[userId]) {
      userState[userId] = { last: 0 };
    }

    const user = userState[userId];

    // 🚫 cooldown (5 min)
    if (now - user.last < 300000) {
      return res.json({ ok: true, action: "skip" });
    }

    // 🧠 AI GENERATE
    const result = generateLocalAI(userId, message);

    if (!result || !result.reply) {
      throw new Error("AI failed");
    }

    let final = format(result.reply);

    // 🚫 anti repeat safety
    if (globalReplies.includes(final)) {
      final = format("Done");
    }

    globalReplies.push(final);
    if (globalReplies.length > 100) globalReplies.shift();

    user.last = now;

    return res.json({
      ok: true,
      action: "reply",
      reply: final,
      delete_after: 6
    });

  } catch (err) {
    console.error("ERROR:", err.message);

    // 🔥 fallback response (never fail)
    return res.json({
      ok: true,
      action: "reply",
      reply: "⚡ *Done*",
      delete_after: 6,
      fallback: true
    });
  }
      }
