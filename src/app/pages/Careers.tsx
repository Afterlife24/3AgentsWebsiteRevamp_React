import { Briefcase, Mail, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

export default function Careers() {
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
                <div className="max-w-4xl mx-auto">
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
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full mb-6 border border-purple-500/30">
                            <Briefcase className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-semibold text-purple-300">
                                Join Our Team
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Careers at{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Autonomiq
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            We're building the future of AI-powered business automation. Join us in revolutionizing how companies interact with their customers.
                        </p>
                    </div>

                    {/* No Openings Card */}
                    <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 md:p-12 shadow-xl mb-12">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-cyan-500/30">
                                <Briefcase className="w-10 h-10 text-cyan-400" />
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                No Current Openings
                            </h2>

                            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
                                We don't have any open positions at the moment, but we're always looking for talented individuals who are passionate about AI and innovation.
                            </p>

                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-6 mb-8">
                                <p className="text-cyan-300 text-sm md:text-base font-medium mb-2">
                                    Interested in future opportunities?
                                </p>
                                <p className="text-gray-400 text-sm">
                                    Send your resume and a brief introduction to our team. We'll keep you in mind for future openings that match your skills.
                                </p>
                            </div>

                            <a
                                href="mailto:info@autonomiq.ae?subject=Career Inquiry"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-base shadow-xl hover:shadow-2xl hover:from-cyan-400 hover:to-blue-500 transition-all transform hover:scale-105"
                            >
                                <Mail className="w-5 h-5" />
                                <span>Send Your Resume</span>
                            </a>
                        </div>
                    </div>

                    {/* Why Join Us Section */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-4 flex items-center justify-center border border-purple-500/30">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Innovation First</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Work on cutting-edge AI technology that's transforming how businesses operate and communicate with customers.
                            </p>
                        </div>

                        <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-4 flex items-center justify-center border border-cyan-500/30">
                                <span className="text-2xl">🌍</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Global Impact</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Be part of a team that's making a real difference for businesses worldwide, from startups to enterprises.
                            </p>
                        </div>

                        <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl mb-4 flex items-center justify-center border border-green-500/30">
                                <span className="text-2xl">💡</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Growth & Learning</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Continuous learning opportunities with access to the latest tools, technologies, and industry best practices.
                            </p>
                        </div>

                        <div className="bg-[#0a2a3a]/60 backdrop-blur-xl border border-cyan-500/20 rounded-xl p-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl mb-4 flex items-center justify-center border border-orange-500/30">
                                <span className="text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Collaborative Culture</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Join a diverse, talented team that values collaboration, creativity, and mutual respect.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
