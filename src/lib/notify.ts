import type { ContactRow } from "./db";
import { site } from "./site";

/**
 * Push a new lead to wherever the owner actually looks: email and/or Telegram.
 *
 * Both channels are optional and configured purely by env vars — with none set
 * this is a no-op, so local development and CI stay quiet. Delivery is
 * best-effort: a failed notification must never fail the submission, because
 * the lead is already safely in SQLite by the time we get here.
 *
 *   RESEND_API_KEY   + LEAD_EMAIL_TO (+ optional LEAD_EMAIL_FROM)
 *   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID
 */

const PACKAGE_LABELS: Record<string, string> = {
  "vetem-faqja": "Vetëm Faqja (€299)",
  "faqja-plus-domain": "Faqja + Domain (€399)",
  mirembajtje: "Mirëmbajtje (€29/muaj)",
  premium: "Gjithçka (€799)",
  tjeter: "Diçka tjetër / pyetje",
};

function summarize(row: ContactRow) {
  const lines = [
    `Emri: ${row.name}`,
    `Email: ${row.email}`,
    row.phone ? `Telefon: ${row.phone}` : null,
    row.business ? `Biznesi: ${row.business}` : null,
    row.package
      ? `Interesi: ${PACKAGE_LABELS[row.package] ?? row.package}`
      : null,
    "",
    row.message,
  ].filter((l) => l !== null);

  return lines.join("\n");
}

async function sendEmail(row: ContactRow, signal: AbortSignal) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!apiKey || !to) return;

  const from = process.env.LEAD_EMAIL_FROM || `Krijo Studio <${site.email}>`;
  const subject = `Kërkesë e re — ${row.name}${
    row.business ? ` (${row.business})` : ""
  }`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      // Replying to the notification replies to the lead.
      reply_to: row.email,
      subject,
      text: `${summarize(row)}\n\n—\nID #${row.id} · ${row.created_at}`,
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`resend responded ${res.status}: ${await res.text()}`);
  }
}

async function sendTelegram(row: ContactRow, signal: AbortSignal) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      // Plain text: lead content is user input and would need escaping in
      // any markup mode.
      text: `🔔 Kërkesë e re #${row.id}\n\n${summarize(row)}`,
      disable_web_page_preview: true,
    }),
    signal,
  });

  if (!res.ok) {
    throw new Error(`telegram responded ${res.status}: ${await res.text()}`);
  }
}

export async function notifyNewLead(row: ContactRow): Promise<void> {
  // Cap the wait so a hanging provider can't hold the request open.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const results = await Promise.allSettled([
      sendEmail(row, controller.signal),
      sendTelegram(row, controller.signal),
    ]);

    for (const result of results) {
      if (result.status === "rejected") {
        console.error("[notify] lead notification failed:", result.reason);
      }
    }
  } finally {
    clearTimeout(timeout);
  }
}
