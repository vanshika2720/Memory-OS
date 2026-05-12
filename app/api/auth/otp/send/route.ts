import { NextResponse } from "next/server";
import { generateOtp, storeOtp } from "@/lib/otp";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const code = generateOtp();
    storeOtp(email, code);

    console.log(`[OTP] Code for ${email}: ${code}`);

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: `MemoryOS <${FROM_EMAIL}>`,
        to: email,
        subject: "Your MemoryOS verification code",
        html: `
          <div style="background-color: #000; color: #fff; padding: 40px; font-family: sans-serif;">
            <h1 style="font-family: 'Bebas Neue', sans-serif; font-size: 40px; text-transform: uppercase;">MemoryOS</h1>
            <p style="font-size: 16px; color: #ccc;">Your verification code is:</p>
            <div style="font-size: 48px; font-weight: bold; letter-spacing: 8px; text-align: center; padding: 24px; background: #111; margin: 24px 0;">${code}</div>
            <p style="font-size: 14px; color: #666;">This code expires in 10 minutes.</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send OTP" }, { status: 500 });
  }
}
