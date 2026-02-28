// Placeholder for email sending (Resend, SendGrid, etc.)
// Set EMAIL_* in .env when ready

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}): Promise<{ ok: boolean; error?: string }> {
  if (!process.env.EMAIL_FROM) {
    console.log("[Email] No EMAIL_FROM set, skipping:", { to, subject });
    return { ok: true };
  }
  // TODO: integrate with your provider
  console.log("[Email] Would send:", { to, subject });
  return { ok: true };
}

export async function sendPasswordResetEmail(
  to: string,
  resetLink: string
): Promise<{ ok: boolean; error?: string }> {
  return sendEmail({
    to,
    subject: "Unida Tech – Reset your password",
    html: `Click to reset: <a href="${resetLink}">${resetLink}</a>`,
    text: `Reset your password: ${resetLink}`,
  });
}
