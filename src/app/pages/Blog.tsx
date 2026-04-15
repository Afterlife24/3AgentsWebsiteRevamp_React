import { BookOpen, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

export default function Blog() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen w-full bg-[#0a0f1a] font-sans overflow-x-hidden relative flex flex-col">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/assets/bg.png"
                    alt="background"
                    className="w-full h-full object-cover opacity-100"
                />
            </div>

            {/* Background Ambient */}
            <AmbientBackground />

            {/* Header */}
            <NavBar />

            {/* Main Content */}
            <main className="flex-1 relative z-10 pt-32 pb-16 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8 group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back to Home</span>
                    </Link>

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm rounded-full mb-6 border border-blue-500/30">
                            <BookOpen className="w-4 h-4 text-blue-400" />
                            <span className="text-sm font-semibold text-blue-300">
                                Insights & Updates
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Autonomiq{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Blog
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            Stay updated with the latest insights on AI, automation, and how we're transforming business communication.
                        </p>
                    </div>

                    {/* Coming Soon Card */}
                    <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-12 shadow-xl mb-12">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-blue-500/30">
                                <BookOpen className="w-10 h-10 text-blue-400" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Coming Soon
                            </h2>

                            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                                We're working on bringing you valuable content about AI, automation, industry trends, and success stories. Check back soon for our first posts!
                            </p>

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                                <p className="text-blue-300 text-sm md:text-base font-medium mb-2">
                                    Want to be notified when we publish?
                                </p>
                                <p className="text-gray-400 text-sm mb-4">
                                    Follow us on social media to stay updated with our latest content and announcements.
                                </p>

                                <div className="flex justify-center gap-4 mt-6">
                                    <a
                                        href="https://www.instagram.com/auto.nomiqai?igsh=bzF0ZHB3dHFmc2Yy&utm_source=qr"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg"
                                    >
                                        Follow on Instagram
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Upcoming Topics Preview */}
                    <div className="mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                            What to Expect
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-4 flex items-center justify-center border border-cyan-500/30">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">AI Insights</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Deep dives into AI technology, machine learning trends, and how they're reshaping business operations.
                                </p>
                            </div>

                            <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 flex items-center justify-center border border-purple-500/30">
                                    <span className="text-2xl">📈</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Success Stories</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Real-world case studies showing how businesses are leveraging AI agents to grow and succeed.
                                </p>
                            </div>

                            <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all">
                                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl mb-4 flex items-center justify-center border border-green-500/30">
                                    <span className="text-2xl">💡</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Best Practices</h3>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    Tips, guides, and strategies for implementing AI automation in your business effectively.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
