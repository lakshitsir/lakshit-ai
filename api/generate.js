import { generateReply } from "../lib/brain.js";
import { format } from "../lib/design.js";
import { track } from "../lib/store.js";

let globalReplies = [];

export default function handler(req, res) {
  try {

    // 🌐 GET SUPPORT (Chrome / Browser)
    if (req.method === "GET") {
      return res.json({
        ok: true,
        status: "online",
        message: "API is running",
        usage: {
          method: "POST",
          headers: {
            "x-user-id": "string",
            "x-message": "string"
          }
        },
        example: {
          curl: "curl -X POST https://lakshit-ai.vercel.app/api/generate -H \"x-user-id: 1\" -H \"x-message: hello\""
        }
      });
    }

    // 🔥 POST MAIN LOGIC
    if (req.method === "POST") {

      const userId = req.headers["x-user-id"] || "u";
      const message = req.headers["x-message"] || "hi";

      // 🌐 IP detect
      const ip =
        req.headers["x-forwarded-for"]?.split(",")[0] ||
        req.headers["x-real-ip"] ||
        req.socket?.remoteAddress ||
        "0.0.0.0";

      // 📊 analytics
      track(userId, ip);

      // 🧠 AI reply
      const { text } = generateReply(userId, message);

      let final = format(text);

      // 🚫 anti repeat
      if (globalReplies.includes(final)) {
        final = format("Done");
      }

      globalReplies.push(final);
      if (globalReplies.length > 100) globalReplies.shift();

      return res.json({
        ok: true,
        action: "reply",
        reply: final,
        delete_after: 6
      });
    }

    // ❌ invalid method
    return res.status(405).json({
      ok: false,
      error: "Method Not Allowed"
    });

  } catch (err) {
    console.error(err);

    return res.json({
      ok: true,
      action: "reply",
      reply: "⚡ *Done*",
      delete_after: 6,
      fallback: true
    });
  }
  }
