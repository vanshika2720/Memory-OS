"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { X, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { CircleIcon } from "@/components/ui/CircleIcon";

type AuthStep = "email" | "password" | "magicLinkSent" | "otp";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<AuthStep>("email");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpCode, setOtpCode] = useState("");

  if (!isOpen) return null;

  const resetState = () => {
    setEmail("");
    setPassword("");
    setStep("email");
    setIsLoading(false);
    setError("");
    setOtpCode("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const sendMagicLink = async () => {
    if (!email) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/dashboard",
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

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (result?.error) {
        setError("Invalid email or password.");
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = async () => {
    if (!email) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!data.success) {
        setError("Failed to send code. Please try again.");
      } else {
        setStep("otp");
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !otpCode) return;
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });

      const data = await res.json();
      if (!data.success) {
        setError("Invalid or expired code.");
      } else {
        const result = await signIn("credentials", {
          email,
          otpToken: data.otpToken,
          redirect: false,
          callbackUrl: "/dashboard",
        });

        if (result?.error) {
          setError("Failed to sign in. Please try again.");
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

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
            {step === "magicLinkSent"
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
                required
                className="bg-transparent border-subtle focus:border-white text-white"
              />
              {error && <p className="text-red-500 text-[12px] uppercase tracking-[1px] font-headline">{error}</p>}
            </div>

            <Button onClick={sendMagicLink} className="w-full flex items-center justify-center gap-2" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>Get Started <CircleIcon className="w-3 h-3" /></>
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-subtle" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black px-4 text-[11px] font-headline tracking-[2px] uppercase text-tertiary">or</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("password")}
                className="w-full justify-center"
              >
                Login with Password
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full justify-center"
              >
                Send Verification Code
              </Button>
            </div>
          </div>
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

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-subtle" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-black px-4 text-[11px] font-headline tracking-[2px] uppercase text-tertiary">or</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={sendMagicLink}
                disabled={isLoading}
                className="w-full justify-center"
              >
                Send Magic Link Instead
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full justify-center"
              >
                Send Verification Code
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("email")}
                className="w-full justify-center"
              >
                Back
              </Button>
            </div>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-4">
              <span className="font-headline text-[11px] tracking-[2px] uppercase text-tertiary">
                Enter the 6-digit code sent to {email}
              </span>
              <Input
                type="text"
                placeholder="000000"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                className="bg-transparent border-subtle focus:border-white text-white text-center text-2xl tracking-[8px]"
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
              <Button type="button" variant="ghost" onClick={handleSendOtp} disabled={isLoading} className="w-full justify-center">
                Resend Code
              </Button>
              <Button type="button" variant="ghost" onClick={() => setStep("email")} className="w-full justify-center">
                Back
              </Button>
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
                We've sent a magic link to <span className="text-white">{email}</span>. Click it to enter your vault.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={sendMagicLink} variant="ghost" className="w-full" disabled={isLoading}>
                Resend Magic Link
              </Button>
              <Button onClick={() => setStep("email")} variant="ghost" className="w-full">
                Back to login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
