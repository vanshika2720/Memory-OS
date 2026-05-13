import { Resend } from 'resend';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  try {
    return new Resend(process.env.RESEND_API_KEY);
  } catch {
    return null;
  }
}

export async function sendMagicLink(email: string, url: string) {
  const resend = getResend();
  if (!resend) {
    console.log(`[Magic Link] Would send to ${email}: ${url}`);
    return;
  }
  await resend.emails.send({
    from: `MemoryOS <${FROM_EMAIL}>`,
    to: email,
    subject: 'Access your MemoryOS vault',
    html: `
      <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
        <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 40px; text-transform: uppercase;">MemoryOS</h1>
        <p style="font-size: 16px; color: #ccc;">Click the link below to enter your memory vault.</p>
        <a href="${url}" style="display: inline-block; background-color: #fff; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">Enter Vault</a>
      </div>
    `
  });
}

export async function sendWeeklyReview(email: string, review: any) {
  const resend = getResend();
  if (!resend) return;
  await resend.emails.send({
    from: `MemoryOS <${FROM_EMAIL}>`,
    to: email,
    subject: 'Your Weekly Memory Review',
    html: `
      <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
        <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 40px; text-transform: uppercase;">Weekly Review</h1>
        <p style="font-size: 16px; color: #ccc;">${review.mirrorInsight}</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/insights" style="display: inline-block; background-color: #fff; color: #000; padding: 12px 24px; text-decoration: none; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 2px;">View Full Review</a>
      </div>
    `
  });
}
