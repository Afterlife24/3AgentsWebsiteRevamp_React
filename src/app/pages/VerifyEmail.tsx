import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import { useAuth } from "../contexts/AuthContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifyOtp, resendOtp } = useAuth();
  const navigate = useNavigate();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await verifyOtp(emailParam, otp);
    setLoading(false);
    if (result.success) {
      navigate("/");
    } else {
      setError(result.error || "Verification failed");
    }
  };

  const handleResend = async () => {
    setError("");
    setSuccess("");
    const result = await resendOtp(emailParam);
    if (result.success) setSuccess("A new code has been sent to your email");
    else setError(result.error || "Failed to resend");
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
              <h1 className="text-3xl font-bold text-white mb-2 text-center">Verify Your Email</h1>
              <p className="text-gray-400 text-center mb-2 text-sm">We sent a 6-digit code to</p>
              <p className="text-cyan-400 text-center mb-8 text-sm font-medium">{emailParam}</p>

              <form onSubmit={handleVerify} className="space-y-4">
                {error && <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
                {success && <div className="bg-green-500/20 border border-green-500/50 rounded-xl px-4 py-3 text-green-300 text-sm">{success}</div>}
                <div>
                  <input id="otp" type="text" required value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-2xl tracking-[0.5em] placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="000000" maxLength={6} />
                </div>
                <button type="submit" disabled={loading || otp.length !== 6}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50">
                  {loading ? "Verifying..." : "Verify Email"}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
                Didn't receive the code?{" "}
                <button onClick={handleResend} className="text-cyan-400 hover:underline">Resend</button>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
