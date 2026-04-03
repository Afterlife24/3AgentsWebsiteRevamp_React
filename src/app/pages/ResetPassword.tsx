import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import { useAuth } from "../contexts/AuthContext";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  function validatePassword(pw: string): string | null {
    if (pw.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(pw)) return "Password must contain at least one uppercase letter";
    if (!/[0-9]/.test(pw)) return "Password must contain at least one number";
    if (!/[^A-Za-z0-9]/.test(pw)) return "Password must contain at least one special character";
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const pwErr = validatePassword(newPassword);
    if (pwErr) { setError(pwErr); return; }
    if (newPassword !== confirmPassword) { setError("Passwords do not match"); return; }
    setLoading(true);
    const result = await resetPassword(emailParam, otp, newPassword);
    setLoading(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Reset failed");
    }
  };

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
              <h1 className="text-3xl font-bold text-white mb-2 text-center">Reset Password</h1>
              <p className="text-gray-400 text-center mb-2 text-sm">Enter the code sent to</p>
              <p className="text-cyan-400 text-center mb-8 text-sm font-medium">{emailParam}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
                <div>
                  <label htmlFor="otp" className="block text-sm text-gray-300 mb-1.5">Reset Code</label>
                  <input id="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-2xl tracking-[0.5em] placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="000000" maxLength={6} />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm text-gray-300 mb-1.5">New Password</label>
                  <input id="newPassword" type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="••••••••" />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1.5">Confirm Password</label>
                  <input id="confirmPassword" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading || otp.length !== 6}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50">
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
