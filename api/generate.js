import { generateReply } from "../lib/brain.js";
import { format } from "../lib/design.js";
import { track, saveHistory } from "../lib/store.js";

let globalReplies = [];

export default function handler(req, res) {
  try {

    // 🌐 GET (query mode)
    if (req.method === "GET") {

      const message = req.query.message || "hello";
      const userId = req.query.user || "web";

      const { text } = generateReply(userId, message);
      let final = format(text);

      return res.json({
        ok: true,
        mode: "GET",
        reply: final,
        input: message
      });
    }

    // 🔥 POST
    if (req.method === "POST") {

      const userId = req.headers["x-user-id"] || "u";
      const message = req.headers["x-message"] || "hi";

      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "0.0.0.0";

      track(userId, ip);

      const { text } = generateReply(userId, message);

      let final = format(text);

      // 🚫 anti repeat
      if (globalReplies.includes(final)) {
        final = format("Done");
      }

      globalReplies.push(final);
      if (globalReplies.length > 100) globalReplies.shift();

      // 🧠 save history
      saveHistory(userId, message, final);

      return res.json({
        ok: true,
        action: "reply",
        reply: final,
        delete_after: 6
      });
    }

    return res.status(405).json({ ok: false });

  } catch {
    return res.json({
      ok: true,
      reply: "⚡ *Done*",
      fallback: true
    });
  }
}
