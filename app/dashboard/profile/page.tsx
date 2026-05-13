"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ProfileResponse = {
  id: string;
  email: string;
  name: string | null;
  bio: string | null;
  hasPassword: boolean;
};

export default function ProfilePage() {
  const router = useRouter();

  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [isSavingBio, setIsSavingBio] = useState(false);
  const [bioMessage, setBioMessage] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/user/me");
        if (!res.ok) return;
        const data = (await res.json()) as ProfileResponse;
        setProfile(data);
        setName(data.name || "");
        setBio(data.bio || "");
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  const canEditBio = useMemo(() => Boolean(profile), [profile]);

  const handleSaveBio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSavingBio(true);
    setBioMessage(null);

    try {
      const res = await fetch("/api/user/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim() || null,
          bio: bio.trim() || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        setBioMessage(err?.error || "Failed to save profile.");
        return;
      }

      const data = await res.json();
      setProfile((p) =>
        p
          ? {
              ...p,
              name: data.name ?? null,
              bio: data.bio ?? null,
            }
          : p,
      );
      setBioMessage("Profile saved.");
    } catch {
      setBioMessage("Failed to save profile.");
    } finally {
      setIsSavingBio(false);
    }
  };

  const handleSetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    setIsSavingPassword(true);
    setPasswordMessage(null);

    try {
      const res = await fetch("/api/user/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: currentPassword || undefined,
          newPassword,
          confirmPassword,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({} as any));
        setPasswordMessage(err?.error || "Failed to update password.");
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordMessage("Password updated.");
      setProfile((p) => (p ? { ...p, hasPassword: true } : p));
    } catch {
      setPasswordMessage("Failed to update password.");
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="p-8 md:p-12 ml-[220px] space-y-16 pb-24">
      <div>
        <h1 className="font-headline text-[80px] leading-[0.8] tracking-[-4px] uppercase text-white">pROFILE.</h1>
        <p className="text-[#333] uppercase tracking-[2px] text-[11px] mt-4 font-headline">Your account details.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <section className="space-y-8">
          <h2 className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase border-b border-[#111] pb-2">
            Profile
          </h2>
          <form onSubmit={handleSaveBio} className="space-y-6">
            <div className="space-y-2">
              <div className="text-[11px] font-headline tracking-[2px] uppercase text-[#555]">Email</div>
              <input
                className="w-full bg-transparent border border-[#111] text-white px-4 py-3 rounded-lg"
                value={profile?.email || ""}
                disabled
              />
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-headline tracking-[2px] uppercase text-[#555]">Name</div>
              <input
                className="w-full bg-transparent border border-[#111] text-white px-4 py-3 rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!canEditBio || isSavingBio}
              />
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-headline tracking-[2px] uppercase text-[#555]">Bio</div>
              <textarea
                className="w-full bg-transparent border border-[#111] text-white px-4 py-3 rounded-lg min-h-[140px] resize-none"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={!canEditBio || isSavingBio}
                placeholder="Tell us a little about you..."
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={!canEditBio || isSavingBio}
                className="flex-1 py-3 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all"
              >
                {isSavingBio ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/dashboard/settings/privacy")}
                className="px-6 py-3 border border-[#333] text-[#444] font-headline text-[11px] tracking-[2px] uppercase hover:text-white hover:border-[#333] transition-all"
              >
                Privacy
              </button>
            </div>

            {bioMessage && <div className="text-[12px] text-[#aaa]">{bioMessage}</div>}
          </form>
        </section>

        <section className="space-y-8">
          <h2 className="font-headline text-[14px] text-[#444] tracking-[4px] uppercase border-b border-[#111] pb-2">
            Password
          </h2>
          <form onSubmit={handleSetPassword} className="space-y-6">
            {profile?.hasPassword && (
              <div className="space-y-2">
                <div className="text-[11px] font-headline tracking-[2px] uppercase text-[#555]">Current password</div>
                <input
                  type="password"
                  className="w-full bg-transparent border border-[#111] text-white px-4 py-3 rounded-lg"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isSavingPassword}
                  required
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="text-[11px] font-headline tracking-[2px] uppercase text-[#555]">New password</div>
              <input
                type="password"
                className="w-full bg-transparent border border-[#111] text-white px-4 py-3 rounded-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={isSavingPassword}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="text-[11px] font-headline tracking-[2px] uppercase text-[#555]">Confirm new password</div>
              <input
                type="password"
                className="w-full bg-transparent border border-[#111] text-white px-4 py-3 rounded-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSavingPassword}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSavingPassword}
              className="w-full py-4 border border-white text-white font-headline text-[11px] tracking-[2px] uppercase hover:bg-white hover:text-black transition-all"
            >
              {isSavingPassword ? "Updating..." : profile?.hasPassword ? "Update password" : "Set password"}
            </button>

            {passwordMessage && <div className="text-[12px] text-[#aaa]">{passwordMessage}</div>}
          </form>
        </section>
      </div>
    </div>
  );
}

