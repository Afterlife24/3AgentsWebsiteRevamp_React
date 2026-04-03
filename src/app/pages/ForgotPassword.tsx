import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import { useAuth } from "../contexts/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await forgotPassword(email);
    setLoading(false);
    if (result.success) {
      navigate(`/reset-password?email=${encodeURIComponent(email)}`);
    } else {
      setError(result.error || "Something went wrong");
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
              <h1 className="text-3xl font-bold text-white mb-2 text-center">Forgot Password</h1>
              <p className="text-gray-400 text-center mb-8 text-sm">Enter your email and we'll send you a reset code</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="bg-red-500/20 border border-red-500/50 rounded-xl px-4 py-3 text-red-300 text-sm">{error}</div>}
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-300 mb-1.5">Email</label>
                  <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    placeholder="you@example.com" />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-50">
                  {loading ? "Sending..." : "Send Reset Code"}
                </button>
              </form>

              <p className="text-center text-gray-400 text-sm mt-6">
                Remember your password?{" "}
                <Link to="/login" className="text-cyan-400 hover:underline">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
