"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { CircleIcon } from "@/components/ui/CircleIcon";

type AuthStep = "email" | "otp" | "password" | "magicLinkSent";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<AuthStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExists, setOtpExists] = useState(false);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  if (!isOpen) return null;

  const cleanEmail = () => email.trim().toLowerCase();

  const resetState = () => {
    setEmail("");
    setPassword("");
    setStep("email");
    setIsLoading(false);
    setError("");
    setOtpCode("");
    setResendCooldown(0);
    setOtpExists(false);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const sendOtp = async () => {
    const e = cleanEmail();
    if (!e) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e }),
      });

      const data = await res.json();
      if (!data.success) {
        setError("Failed to send code. Please try again.");
      } else {
        setOtpExists(data.exists || false);
        setStep("otp");
        setResendCooldown(30);
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetStarted = () => sendOtp();

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const ec = cleanEmail();
    if (!ec || !otpCode) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: ec, code: otpCode }),
      });

      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Invalid or expired code.");
      } else {
        const result = await signIn("credentials", {
          email: ec,
          otpToken: data.otpToken,
          redirect: false,
          callbackUrl: "/dashboard/timeline",
        });

        if (result?.error) {
          setError("Failed to sign in. Please try again.");
        } else {
          window.location.href = "/dashboard/timeline";
        }
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ec = cleanEmail();
    if (!ec || !password) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: ec,
        password,
        redirect: false,
        callbackUrl: "/dashboard/timeline",
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        window.location.href = "/dashboard/timeline";
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMagicLink = async () => {
    const ec = cleanEmail();
    if (!ec) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email: ec,
        redirect: false,
        callbackUrl: "/dashboard/timeline",
      });

      if (result?.error) {
        setError("Failed to send magic link. Please try again.");
      } else {
        setStep("magicLinkSent");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email.trim()) {
      handleGetStarted();
    }
  };

  const btnGhost = "w-full border border-[#1a1a1a] bg-transparent text-white font-headline text-[11px] uppercase tracking-[2px] px-[30px] py-[13px] hover:bg-white/5 transition-colors";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-border p-12 space-y-12">
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-tertiary hover:text-white transition-colors"
        >
          <X size={20} />
        </button>

        <div className="space-y-4">
          <h2 className="font-headline text-[40px] leading-[0.9] tracking-[-1px] uppercase text-white">
            Access your vault.
          </h2>
          <p className="text-secondary text-[14px]">
            {step === "otp"
              ? otpExists
                ? "A code was already sent. Enter it below."
                : `Enter the code sent to ${cleanEmail()}`
              : step === "magicLinkSent"
              ? "Check your inbox for the magic link."
              : "Enter your email to get started."}
          </p>
        </div>

        {step === "email" && (
          <div className="space-y-6">
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Email address</span>
              <Input
                type="email"
                placeholder="YOUR@EMAIL.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailKeyDown}
                required
                className="bg-transparent border-subtle focus:border-white text-white"
              />
              {error && <p className="text-red-500 text-[12px] uppercase tracking-[1px] font-headline">{error}</p>}
            </div>

            <Button onClick={handleGetStarted} className="w-full flex items-center justify-center gap-2" disabled={isLoading || !email.trim()}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Get Started <CircleIcon className="w-3 h-3" /></>
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setStep("password")}
                className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary hover:text-white transition-colors"
              >
                Login with password
              </button>
            </div>
          </div>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">
                Verification code
              </span>
              <Input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                className="bg-transparent border-subtle focus:border-white text-white text-center text-2xl tracking-[8px]"
                autoFocus
              />
              {error && <p className="text-red-500 text-[12px] uppercase tracking-[1px] font-headline">{error}</p>}
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading || otpCode.length !== 6}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Verify <CircleIcon className="w-3 h-3" /></>
              )}
            </Button>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => sendOtp()}
                disabled={isLoading || resendCooldown > 0}
                className={btnGhost + " disabled:opacity-30"}
              >
                {resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : "Resend code"}
              </button>
              <button
                type="button"
                onClick={handleSendMagicLink}
                disabled={isLoading}
                className={btnGhost}
              >
                Send magic link instead
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className={btnGhost}
              >
                Back
              </button>
            </div>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handlePasswordLogin} className="space-y-6">
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Email</span>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-transparent border-subtle focus:border-white text-white"
              />
            </div>
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">Password</span>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-transparent border-subtle focus:border-white text-white"
              />
              {error && <p className="text-red-500 text-[12px] uppercase tracking-[1px] font-headline">{error}</p>}
            </div>

            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Login <CircleIcon className="w-3 h-3" /></>
              )}
            </Button>

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={handleSendMagicLink}
                disabled={isLoading}
                className={btnGhost}
              >
                Send magic link instead
              </button>
              <button
                type="button"
                onClick={() => setStep("email")}
                className={btnGhost}
              >
                Back
              </button>
            </div>
          </form>
        )}

        {step === "magicLinkSent" && (
          <div className="space-y-8 py-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 border border-white mx-auto flex items-center justify-center">
              <CircleIcon className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-[24px] uppercase tracking-[-1px] text-white">Check your inbox.</h3>
              <p className="text-secondary text-[14px]">
                We've sent a magic link to <span className="text-white">{cleanEmail()}</span>. Click it to enter your vault.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleSendMagicLink}
                disabled={isLoading}
                className={btnGhost}
              >
                Resend magic link
              </button>
              <button
                onClick={() => setStep("email")}
                className={btnGhost}
              >
                Back to login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
