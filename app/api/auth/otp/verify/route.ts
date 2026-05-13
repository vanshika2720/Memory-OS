import { NextResponse } from "next/server";
import { verifyOtp } from "@/lib/otp";
import { SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "fallback-secret");

export async function POST(req: Request) {
  try {
    const { email, code } = await req.json();
    if (!email || !code) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const result = verifyOtp(email, code);

    if (!result.valid) {
      const messages: Record<string, string> = {
        no_code: "No code was sent to this email. Request a new one.",
        expired: "Code expired. Request a new one.",
        mismatch: "Incorrect code. Please try again.",
      };
      return NextResponse.json({
        success: false,
        error: messages[result.reason || "no_code"] || "Invalid or expired code",
        reason: result.reason,
      }, { status: 401 });
    }

    const otpToken = await new SignJWT({ email: email.toLowerCase(), type: "otp" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("5m")
      .sign(secret);

    return NextResponse.json({ success: true, otpToken });
  } catch {
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
