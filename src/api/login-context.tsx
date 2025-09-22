/* api/login-context.tsx */
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

// In the extension world, chrome is global
declare const chrome: any;

type User = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

type AuthState = {
  isLoggedIn: boolean;
  token?: string; // Your backend JWT
  user?: User;
};

type AuthContextValue = {
  auth: AuthState;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// ====== EDIT THESE ======
const GOOGLE_CLIENT_ID =
  "345688677648-t0gkstp1i74m3m3rtibkdsbbvj0ua04q.apps.googleusercontent.com"; // from Google Cloud Console
const API_BASE = "http://localhost:4000"; // e.g. https://api.yourdomain.com or http://localhost:4000
// ========================

function parseHashParams(url: string): Record<string, string> {
  // redirectUrl will look like: https://<ext>.chromiumapp.org/#access_token=...&id_token=...&state=...
  const hash = url.split("#")[1] || "";
  const out: Record<string, string> = {};
  for (const pair of hash.split("&")) {
    if (!pair) continue;
    const [k, v] = pair.split("=");
    out[decodeURIComponent(k)] = decodeURIComponent(v || "");
  }
  return out;
}

function randomStr(n = 16) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let s = "";
  for (let i = 0; i < n; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false });

  useEffect(() => {
    (async () => {
      const stored = await chrome.storage.local.get([
        "isLoggedIn",
        "authToken",
        "user",
      ]);
      setAuth({
        isLoggedIn: Boolean(stored.isLoggedIn),
        token: stored.authToken,
        user: stored.user,
      });
    })();
  }, []);

  const loginWithGoogle = async () => {
    const state = randomStr(16);
    const nonce = randomStr(16);

    // 1) Ask background to start OAuth
    const res = await chrome.runtime.sendMessage({
      type: "START_GOOGLE_OAUTH",
      payload: {
        clientId: GOOGLE_CLIENT_ID,
        scopes: ["openid", "email", "profile"],
        state,
        nonce,
      },
    });

    if (!res?.ok) throw new Error(res?.error || "OAuth failed");

    // 2) Parse tokens from the redirect URL fragment
    const params = parseHashParams(res.redirectUrl);
    if (params.state && params.state !== state) {
      throw new Error("State mismatch");
    }
    const idToken = params.id_token;
    if (!idToken) throw new Error("No id_token returned");

    // 3) Exchange ID token with your backend for a session JWT
    const r = await fetch(`${API_BASE}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_token: idToken }),
    });

    if (!r.ok) {
      const txt = await r.text();
      throw new Error(`Backend error: ${txt}`);
    }

    const data = await r.json();
    const token = data.token as string;
    const user = data.user as User;

    await chrome.storage.local.set({
      isLoggedIn: true,
      authToken: token,
      user,
    });
    setAuth({ isLoggedIn: true, token, user });
  };

  const logout = async () => {
    await chrome.storage.local.remove(["isLoggedIn", "authToken", "user"]);
    setAuth({ isLoggedIn: false });
  };

  const value = useMemo(() => ({ auth, loginWithGoogle, logout }), [auth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
