import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const API = import.meta.env.VITE_AUTH_API || "http://localhost:5000/api/auth";

export interface User {
  name: string;
  email: string;
  avatar?: string | null;
  provider: "email" | "google";
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string; needsVerification?: boolean }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  googleLogin: (profile: { name: string; email: string; avatar?: string }) => Promise<{ success: boolean; error?: string }>;
  verifyOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  resendOtp: (email: string) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string; message?: string }>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function apiCall(endpoint: string, body: object, token?: string | null) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${API}${endpoint}`, { method: "POST", headers, body: JSON.stringify(body) });
  const data = await res.json();
  return { ok: res.ok, status: res.status, data };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken) {
      fetch(`${API}/me`, { headers: { Authorization: `Bearer ${savedToken}` } })
        .then((r) => r.json())
        .then((data) => {
          if (data.user) { setUser(data.user); setToken(savedToken); }
          else localStorage.removeItem("auth_token");
        })
        .catch(() => localStorage.removeItem("auth_token"))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const persist = (u: User, t: string) => {
    setUser(u);
    setToken(t);
    localStorage.setItem("auth_token", t);
  };

  const login = async (email: string, password: string) => {
    try {
      const { ok, data } = await apiCall("/login", { email, password });
      if (ok) { persist(data.user, data.token); return { success: true }; }
      return { success: false, error: data.error, needsVerification: data.needsVerification };
    } catch { return { success: false, error: "Network error" }; }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const { ok, data } = await apiCall("/signup", { name, email, password });
      if (ok) { persist(data.user, data.token); return { success: true }; }
      return { success: false, error: data.error };
    } catch { return { success: false, error: "Network error" }; }
  };

  const googleLogin = async (profile: { name: string; email: string; avatar?: string }) => {
    try {
      const { ok, data } = await apiCall("/google", profile);
      if (ok) { persist(data.user, data.token); return { success: true }; }
      return { success: false, error: data.error };
    } catch { return { success: false, error: "Network error" }; }
  };

  const verifyOtp = async (email: string, otp: string) => {
    try {
      const { ok, data } = await apiCall("/verify-otp", { email, otp });
      if (ok) { persist(data.user, data.token); return { success: true }; }
      return { success: false, error: data.error };
    } catch { return { success: false, error: "Network error" }; }
  };

  const resendOtp = async (email: string) => {
    try {
      const { ok, data } = await apiCall("/resend-otp", { email });
      if (ok) return { success: true };
      return { success: false, error: data.error };
    } catch { return { success: false, error: "Network error" }; }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { ok, data } = await apiCall("/forgot-password", { email });
      if (ok) return { success: true, message: data.message };
      return { success: false, error: data.error };
    } catch { return { success: false, error: "Network error" }; }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      const { ok, data } = await apiCall("/reset-password", { email, otp, newPassword });
      if (ok) { persist(data.user, data.token); return { success: true }; }
      return { success: false, error: data.error };
    } catch { return { success: false, error: "Network error" }; }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, googleLogin, verifyOtp, resendOtp, forgotPassword, resetPassword, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
