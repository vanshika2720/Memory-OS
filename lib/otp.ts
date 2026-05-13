declare global {
  var __otpStore: Map<string, { code: string; expiresAt: number }> | undefined;
}

function getStore(): Map<string, { code: string; expiresAt: number }> {
  if (!globalThis.__otpStore) {
    globalThis.__otpStore = new Map();
  }
  return globalThis.__otpStore;
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOtp(email: string, code: string): void {
  getStore().set(email.toLowerCase().trim(), {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
}

export function hasValidOtp(email: string): boolean {
  const entry = getStore().get(email.toLowerCase().trim());
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    getStore().delete(email.toLowerCase().trim());
    return false;
  }
  return true;
}

export function verifyOtp(email: string, code: string): { valid: boolean; reason?: string } {
  const store = getStore();
  const key = email.toLowerCase().trim();
  const entry = store.get(key);
  if (!entry) {
    return { valid: false, reason: "no_code" };
  }
  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return { valid: false, reason: "expired" };
  }
  if (entry.code !== code) {
    return { valid: false, reason: "mismatch" };
  }
  store.delete(key);
  return { valid: true };
}
