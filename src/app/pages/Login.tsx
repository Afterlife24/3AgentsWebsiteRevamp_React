import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useGoogleLogin } from "@react-oauth/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate("/");
    } else if (result.needsVerification) {
      navigate(`/verify-email?email=${encodeURIComponent(email)}`);
    } else {
      setError(result.error || t("auth.login.error"));
    }
  };

  const triggerGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const profile = await res.json();
        const result = await googleLogin({ name: profile.name, email: profile.email, avatar: profile.picture });
        if (result.success) navigate("/");
        else setError(result.error || "Google login failed");
      } catch {
        setError("Google login failed");
      }
    },
    onError: () => setError("Google login failed"),
  });

  return (
    <div className="min-h-screen w-full bg-[#0a0f1a] font-sans relative flex flex-col"
      style={{ backgroundImage: "url(/assets/bg.png)", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <AmbientBackground />
      <NavBar />

      <main className="flex-1 relative z-10 flex items-center justify-center p-4 pt-20 md:pt-24">
        <div className="w-full max-w-md">
          <div className="bg-[#0a2a3a]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-cyan-500/20 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-3xl font-bold text-white mb-2 text-center">{t("auth.login.title")}</h1>
              <p className="text-gray-400 text-center mb-8 text-sm">{t("auth.login.subtitle")}</p>

              <button onClick={() => triggerGoogleLogin()}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white rounded-xl text-gray-700 font-medium hover:bg-gray-100 transition-colors mb-6">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                {t("auth.google")}
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-600" />
                <span className="text-gray-400 text-xs uppercase">{t("auth.or")}</span>
                <div className="flex-1 h-px bg-gray-600" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-300 mb-1.5">{t("auth.email")}</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm text-gray-300 mb-1.5">{t("auth.password")}</label>
                  <div className="relative">
                    <input id="password" type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors text-sm">
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <Link to="/forgot-password" className="text-cyan-400 text-sm hover:underline">Forgot password?</Link>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50">
                  {loading ? "..." : t("auth.login.button")}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
                {t("auth.login.noAccount")}{" "}
                <Link to="/signup" className="text-cyan-400 hover:underline">{t("auth.login.signupLink")}</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
