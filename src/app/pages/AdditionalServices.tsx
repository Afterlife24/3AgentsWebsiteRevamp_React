import { useState } from "react";
import {
    Globe,
    Smartphone,
    Database,
    Zap,
    Code,
    Settings,
    ArrowRight,
    Check,
    Sparkles,
} from "lucide-react";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";

export default function AdditionalServices() {
    const { t } = useLanguage();
    const [hoveredService, setHoveredService] = useState<string | null>(null);

    const services = [
        {
            id: "website",
            title: "Website Development",
            subtitle: "Modern & Responsive",
            description:
                "Build stunning, high-performance websites tailored to your business needs. From landing pages to complex web applications.",
            icon: <Globe className="w-10 h-10" />,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-500",
            features: [
                "Responsive Design",
                "SEO Optimized",
                "Fast Loading Speed",
                "Custom UI/UX",
                "E-commerce Integration",
            ],
        },
        {
            id: "mobile",
            title: "Mobile App Development",
            subtitle: "iOS & Android",
            description:
                "Create powerful mobile applications for iOS and Android platforms. Native performance with cross-platform efficiency.",
            icon: <Smartphone className="w-10 h-10" />,
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-500",
            features: [
                "Cross-Platform Apps",
                "Native Performance",
                "Push Notifications",
                "Offline Functionality",
                "App Store Deployment",
            ],
        },
        {
            id: "crm",
            title: "CRM Solutions",
            subtitle: "Customer Management",
            description:
                "Streamline your customer relationships with custom CRM systems. Manage leads, sales, and customer interactions efficiently.",
            icon: <Database className="w-10 h-10" />,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-500",
            features: [
                "Lead Management",
                "Sales Pipeline",
                "Customer Analytics",
                "Email Integration",
                "Custom Workflows",
            ],
        },
        {
            id: "automation",
            title: "Business Automation",
            subtitle: "Workflow Optimization",
            description:
                "Automate repetitive tasks and workflows to boost productivity. From data processing to complex business logic.",
            icon: <Zap className="w-10 h-10" />,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-500",
            features: [
                "Process Automation",
                "Data Integration",
                "Workflow Design",
                "API Development",
                "Task Scheduling",
            ],
        },
        {
            id: "custom",
            title: "Custom Software",
            subtitle: "Tailored Solutions",
            description:
                "Build bespoke software solutions designed specifically for your unique business requirements and challenges.",
            icon: <Code className="w-10 h-10" />,
            color: "from-indigo-500 to-blue-500",
            bgColor: "bg-indigo-500",
            features: [
                "Custom Development",
                "Scalable Architecture",
                "Cloud Integration",
                "Security First",
                "Ongoing Support",
            ],
        },
        {
            id: "integration",
            title: "System Integration",
            subtitle: "Connect Everything",
            description:
                "Integrate your existing systems and tools seamlessly. Connect APIs, databases, and third-party services effortlessly.",
            icon: <Settings className="w-10 h-10" />,
            color: "from-teal-500 to-cyan-500",
            bgColor: "bg-teal-500",
            features: [
                "API Integration",
                "Database Sync",
                "Third-party Tools",
                "Real-time Updates",
                "Data Migration",
            ],
        },
    ];

    return (
        <div className="min-h-screen w-full bg-[#F0F4F8] font-sans overflow-y-auto relative flex flex-col">
            {/* Background */}
            <AmbientBackground />

            {/* Header */}
            <NavBar />

            {/* Hero Section */}
            <section className="relative w-full pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/40 backdrop-blur-md rounded-full mb-6 border border-white/50">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        <span className="text-sm font-semibold text-gray-700">
                            Complete Solutions
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Our Solutions
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Beyond AI agents, we offer comprehensive technology solutions to
                        transform your business
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="relative w-full py-12 px-4 md:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                onMouseEnter={() => setHoveredService(service.id)}
                                onMouseLeave={() => setHoveredService(null)}
                                className="group relative bg-white/50 backdrop-blur-xl border border-white/50 rounded-3xl p-8 hover:bg-white/70 transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-2xl"
                            >
                                {/* Icon */}
                                <div
                                    className={`w-20 h-20 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 text-white`}
                                >
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mb-4">
                                    {service.subtitle}
                                </p>

                                {/* Description */}
                                <p className="text-gray-700 mb-6 leading-relaxed">
                                    {service.description}
                                </p>

                                {/* Features */}
                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-start gap-3 text-sm text-gray-600 font-medium"
                                        >
                                            <div
                                                className={`mt-0.5 p-0.5 rounded-full bg-gradient-to-r ${service.color} opacity-80`}
                                            >
                                                <Check
                                                    size={10}
                                                    className="text-white"
                                                    strokeWidth={4}
                                                />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <button
                                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r ${service.color} text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all group-hover:scale-105`}
                                >
                                    <span>Get Started</span>
                                    <ArrowRight size={16} />
                                </button>

                                {/* Animated Border */}
                                <div
                                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.color} transition-all duration-500 rounded-b-3xl ${hoveredService === service.id ? "w-full" : "w-0"
                                        }`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative w-full py-20 px-4 md:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
                        {/* Animated background */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
                            <div
                                className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"
                                style={{ animationDelay: "1s" }}
                            ></div>
                        </div>

                        <div className="relative z-10 p-8 md:p-16 text-center">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Ready to Transform Your Business?
                            </h2>
                            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                                Let's discuss how our solutions can help you achieve your goals.
                                Get in touch with our team today.
                            </p>
                            <button className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-600 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                                <span>Contact Us</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
