import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  CheckCircle,
  Briefcase,
  Users,
  Stethoscope,
  UtensilsCrossed,
  Home,
  ShoppingCart,
  Hotel,
  GraduationCap,
  Plane,
  Store,
} from "lucide-react";
import {
  SiGmail,
  SiWhatsapp,
  SiSalesforce,
  SiSlack,
  SiHubspot,
  SiGooglecloud,
  SiN8N,
  SiGooglecalendar,
} from "react-icons/si";
import { MdEmail, MdSms, MdPointOfSale, MdDashboard } from "react-icons/md";
import { FaMicrosoft, FaCalendarAlt } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import WaitlistModal from "../components/WaitlistModal";

export default function AIAssistants() {
  const { t } = useLanguage();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  // Track mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle URL parameters for navigation (agent-triggered scroll)
  useEffect(() => {
    if (!mounted) return;

    const params = new URLSearchParams(location.search);
    const action = params.get("action");
    const section = params.get("section");

    if (action === "scroll" && section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 500);
    }
  }, [mounted, location.search]);
  const aiWorkforce = [
    {
      id: "receptionist",
      firstName: "Sara",
      name: t("aiAssistantsPage.receptionist.name"),
      subtitle: t("aiAssistantsPage.receptionist.subtitle"),
      description: t("aiAssistantsPage.receptionist.description"),
      icon: <Phone className="w-8 h-8" />,
      gradient: "from-blue-400/30 to-cyan-400/30",
      buttonGradient: "from-blue-500 to-cyan-600",
      buttonHover: "hover:from-blue-600 hover:to-cyan-700",
      image: "/assets/sara.png",
      capabilities: [
        t("aiAssistantsPage.receptionist.capability1"),
        t("aiAssistantsPage.receptionist.capability2"),
        t("aiAssistantsPage.receptionist.capability3"),
        t("aiAssistantsPage.receptionist.capability4"),
        t("aiAssistantsPage.receptionist.capability5"),
      ],
      integrations: [
        { name: "Gmail", icon: <SiGmail className="w-4 h-4" /> },
        { name: "WhatsApp", icon: <SiWhatsapp className="w-4 h-4" /> },
        { name: "Salesforce", icon: <SiSalesforce className="w-4 h-4" /> },
      ],
    },
    {
      id: "admin",
      firstName: "Emma",
      name: t("aiAssistantsPage.admin.name"),
      subtitle: t("aiAssistantsPage.admin.subtitle"),
      description: t("aiAssistantsPage.admin.description"),
      icon: <Briefcase className="w-8 h-8" />,
      gradient: "from-purple-400/30 to-pink-400/30",
      buttonGradient: "from-purple-500 to-pink-600",
      buttonHover: "hover:from-purple-600 hover:to-pink-700",
      image: "/assets/emma.png",
      capabilities: [
        t("aiAssistantsPage.admin.capability1"),
        t("aiAssistantsPage.admin.capability2"),
        t("aiAssistantsPage.admin.capability3"),
        t("aiAssistantsPage.admin.capability4"),
        t("aiAssistantsPage.admin.capability5"),
      ],
      integrations: [
        {
          name: "Google Workspace",
          icon: <SiGooglecloud className="w-4 h-4" />,
        },
        { name: "Microsoft 365", icon: <FaMicrosoft className="w-4 h-4" /> },
        { name: "Slack", icon: <SiSlack className="w-4 h-4" /> },
        { name: "Email", icon: <MdEmail className="w-4 h-4" /> },
      ],
    },
    {
      id: "sales",
      firstName: "Adam",
      name: t("aiAssistantsPage.sales.name"),
      subtitle: t("aiAssistantsPage.sales.subtitle"),
      description: t("aiAssistantsPage.sales.description"),
      icon: <Users className="w-8 h-8" />,
      gradient: "from-green-400/30 to-emerald-400/30",
      buttonGradient: "from-green-500 to-emerald-600",
      buttonHover: "hover:from-green-600 hover:to-emerald-700",
      image: "/assets/adam.png",
      capabilities: [
        t("aiAssistantsPage.sales.capability1"),
        t("aiAssistantsPage.sales.capability2"),
        t("aiAssistantsPage.sales.capability3"),
        t("aiAssistantsPage.sales.capability4"),
        t("aiAssistantsPage.sales.capability5"),
      ],
      integrations: [
        { name: "Salesforce", icon: <SiSalesforce className="w-4 h-4" /> },
        { name: "HubSpot", icon: <SiHubspot className="w-4 h-4" /> },
        { name: "WhatsApp", icon: <SiWhatsapp className="w-4 h-4" /> },
        { name: "SMS", icon: <MdSms className="w-4 h-4" /> },
        { name: "Clover POS", icon: <MdPointOfSale className="w-4 h-4" /> },
      ],
    },
  ];

  const industries = [
    {
      name: t("aiAssistantsPage.industries.healthcare"),
      icon: <Stethoscope className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.restaurants"),
      icon: <UtensilsCrossed className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.realEstate"),
      icon: <Home className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.ecommerce"),
      icon: <ShoppingCart className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.hospitality"),
      icon: <Hotel className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.professional"),
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.education"),
      icon: <GraduationCap className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.travel"),
      icon: <Plane className="w-8 h-8" />,
    },
    {
      name: t("aiAssistantsPage.industries.local"),
      icon: <Store className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0a0f1a] font-sans overflow-hidden relative flex flex-col" style={{ backgroundImage: 'url(/assets/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      {/* Background */}
      <AmbientBackground />

      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto z-10 relative scroll-smooth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Caption */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              <span className="text-white">Humans and agents drive </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300">
                customer success together
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-4xl mx-auto">
              Agentforce transforms Sales, Service, Commerce, Marketing, IT, and more by uniting humans and AI agents to drive customer success.
            </p>
          </div>

          {/* Featured Real Estate Demo Card */}
          <div id="demo" className="mb-16 relative">
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/50 backdrop-blur-xl h-[400px]"
              style={{
                background:
                  "radial-gradient(ellipse at top, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
              }}
            >
              {/* Bokeh/Particle effect layer */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Large bokeh circles */}
                <div
                  className="absolute top-10 left-20 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl animate-pulse"
                  style={{ animationDuration: "3s" }}
                ></div>
                <div
                  className="absolute top-40 right-32 w-40 h-40 bg-amber-200/15 rounded-full blur-3xl animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                ></div>
                <div
                  className="absolute bottom-20 left-40 w-36 h-36 bg-yellow-300/20 rounded-full blur-2xl animate-pulse"
                  style={{ animationDuration: "3.5s", animationDelay: "1s" }}
                ></div>

                {/* Small particles scattered throughout */}
                {[...Array(60)].map((_, i) => (
                  <div
                    key={`particle-${i}`}
                    className="absolute w-1 h-1 bg-white/50 rounded-full animate-pulse"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDuration: `${1.5 + Math.random() * 2}s`,
                      animationDelay: `${Math.random() * 2}s`,
                    }}
                  ></div>
                ))}
              </div>

              {/* Sparkle effects */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="absolute animate-pulse"
                    style={{
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 80}%`,
                      animationDuration: `${2 + Math.random()}s`,
                      animationDelay: `${Math.random()}s`,
                    }}
                  >
                    <div className="relative w-4 h-4">
                      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full transform -translate-y-1/2"></div>
                      <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white rounded-full transform -translate-x-1/2"></div>
                      <div className="absolute inset-0 bg-white/40 blur-sm rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 p-8 sm:p-12 h-full max-w-full">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left max-w-2xl">
                  <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-2xl">
                    {t("aiAssistantsPage.demo.title")}
                  </h2>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-600/40 backdrop-blur-sm rounded-full mb-6 border-2 border-yellow-700/40 shadow-lg">
                    <span className="text-yellow-900 font-bold text-sm">#</span>
                    <span className="text-yellow-900 font-bold text-sm uppercase tracking-wide">
                      {t("aiAssistantsPage.demo.badge")}
                    </span>
                  </div>

                  <p className="text-white text-lg sm:text-xl font-bold mb-1 drop-shadow-lg">
                    {t("aiAssistantsPage.demo.feature1")}
                  </p>
                  <p className="text-white text-lg sm:text-xl font-bold mb-6 drop-shadow-lg">
                    {t("aiAssistantsPage.demo.feature2")}
                  </p>

                  <p className="text-white/95 text-base mb-8 drop-shadow-md">
                    {t("aiAssistantsPage.demo.description")}
                  </p>

                  <button
                    onClick={() => setShowWaitlistModal(true)}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-600/90 hover:bg-yellow-700 text-white rounded-2xl font-bold text-lg shadow-2xl transition-all transform hover:scale-105 border-2 border-yellow-500/50"
                  >
                    <span>{t("aiAssistantsPage.demo.cta")}</span>
                    <ArrowRight size={20} />
                  </button>
                </div>

                {/* Right Image - Robot with House */}
                <div className="flex-shrink-0 h-full flex items-end justify-center lg:justify-end">
                  <img
                    src="/assets/realestate_bot.png"
                    alt="Real Estate Bot"
                    className="h-full w-auto object-contain object-bottom drop-shadow-2xl max-h-[350px]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Workforce Grid */}
          <div
            id="ai-workforce"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24"
          >
            {aiWorkforce.map((assistant) => (
              <div
                key={assistant.id}
                className="group relative rounded-3xl overflow-hidden bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:bg-[#0d3a4a]/90 flex flex-col"
              >
                {/* Animated gradient glow effect on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${assistant.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}
                ></div>

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col flex-1">
                  {/* Profile Image with gradient border */}
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${assistant.buttonGradient} rounded-2xl blur-md opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                    ></div>
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                      <img
                        src={assistant.image}
                        alt={assistant.firstName}
                        className="w-full aspect-square object-cover"
                      />
                      {/* Name Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 pt-8">
                        <h4 className="text-white text-3xl font-bold drop-shadow-lg mb-1">
                          {assistant.firstName}
                        </h4>
                        <p className="text-white/95 text-base font-semibold drop-shadow-md">
                          {assistant.name}
                        </p>
                        <p className="text-white/80 text-xs font-medium drop-shadow-md mt-0.5">
                          {assistant.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                    {assistant.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mb-4 flex-1">
                    <h4 className="text-sm font-bold text-white mb-2">
                      {t("aiAssistantsPage.capabilities")}
                    </h4>
                    <ul className="space-y-1.5">
                      {assistant.capabilities.map((capability, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-gray-200"
                        >
                          <CheckCircle
                            size={14}
                            className="mt-0.5 flex-shrink-0 text-blue-500"
                          />
                          <span>{capability}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Integrations */}
                  <div className="bg-[#0d3a4a]/60 backdrop-blur-sm rounded-xl p-2.5 mb-4 border border-cyan-500/30">
                    <h4 className="text-sm font-bold text-white mb-2">
                      {t("aiAssistantsPage.whatsapp.integrations")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {assistant.integrations.map((integration, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0a2a3a]/80 rounded-lg border border-cyan-500/20 hover:bg-[#0d3a4a]/90 transition-colors"
                          title={integration.name}
                        >
                          <div className="text-cyan-400">
                            {integration.icon}
                          </div>
                          <span className="text-sm font-medium text-gray-200">
                            {integration.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>


                </div>

                {/* Decorative corner accent */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${assistant.buttonGradient} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>

          {/* WhatsApp Agent Section */}
          <div id="whatsapp-agent" className="mb-24">
            <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">
                    {t("aiAssistantsPage.whatsapp.title")}
                  </h2>
                  <p className="text-xl text-gray-200">
                    {t("aiAssistantsPage.whatsapp.subtitle")}
                  </p>
                </div>
              </div>

              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                {t("aiAssistantsPage.whatsapp.description")}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("aiAssistantsPage.whatsapp.whatItCanDo")}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      t("aiAssistantsPage.whatsapp.capability1"),
                      t("aiAssistantsPage.whatsapp.capability2"),
                      t("aiAssistantsPage.whatsapp.capability3"),
                      t("aiAssistantsPage.whatsapp.capability4"),
                      t("aiAssistantsPage.whatsapp.capability5"),
                      t("aiAssistantsPage.whatsapp.capability6"),
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-200"
                      >
                        <CheckCircle
                          size={18}
                          className="mt-0.5 flex-shrink-0 text-green-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("aiAssistantsPage.whatsapp.applications")}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      t("aiAssistantsPage.whatsapp.app1"),
                      t("aiAssistantsPage.whatsapp.app2"),
                      t("aiAssistantsPage.whatsapp.app3"),
                      t("aiAssistantsPage.whatsapp.app4"),
                      t("aiAssistantsPage.whatsapp.app5"),
                      t("aiAssistantsPage.whatsapp.app6"),
                    ].map((app, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-green-500/30 text-green-100 rounded-full text-sm font-medium border border-green-500/40"
                      >
                        {app}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("aiAssistantsPage.whatsapp.integrations")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiSalesforce className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Salesforce
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiHubspot className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        HubSpot
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiN8N className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        n8n
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <FaCalendarAlt className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Calendars
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <MdDashboard className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Dashboards
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Web Agent Section */}
          <div id="web-agent" className="mb-24">
            <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">
                    {t("aiAssistantsPage.web.title")}
                  </h2>
                  <p className="text-xl text-gray-200">
                    {t("aiAssistantsPage.web.subtitle")}
                  </p>
                </div>
              </div>

              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                {t("aiAssistantsPage.web.description")}
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("aiAssistantsPage.web.whatItCanDo")}
                  </h3>
                  <ul className="space-y-2">
                    {[
                      t("aiAssistantsPage.web.capability1"),
                      t("aiAssistantsPage.web.capability2"),
                      t("aiAssistantsPage.web.capability3"),
                      t("aiAssistantsPage.web.capability4"),
                      t("aiAssistantsPage.web.capability5"),
                      t("aiAssistantsPage.web.capability6"),
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-gray-200"
                      >
                        <CheckCircle
                          size={18}
                          className="mt-0.5 flex-shrink-0 text-blue-500"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("aiAssistantsPage.web.applications")}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {[
                      t("aiAssistantsPage.web.app1"),
                      t("aiAssistantsPage.web.app2"),
                      t("aiAssistantsPage.web.app3"),
                      t("aiAssistantsPage.web.app4"),
                      t("aiAssistantsPage.web.app5"),
                    ].map((app, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-blue-500/30 text-blue-100 rounded-full text-sm font-medium border border-blue-500/40"
                      >
                        {app}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">
                    {t("aiAssistantsPage.web.integrations")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiSalesforce className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Salesforce
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiHubspot className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        HubSpot
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiN8N className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        n8n
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <SiGooglecalendar className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Google Calendar
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <FaMicrosoft className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Outlook
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d3a4a]/60 rounded-lg border border-cyan-500/30 hover:bg-[#0d3a4a]/90 transition-colors">
                      <MdDashboard className="w-5 h-5 text-cyan-400" />
                      <span className="text-sm font-medium text-gray-200">
                        Dashboards
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Industries Section */}
          <div id="industries" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t("aiAssistantsPage.industries.title")}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
            {industries.map((industry, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl overflow-hidden bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-[#0d3a4a]/90 p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300 mb-3">
                  {industry.icon}
                </div>
                <h3 className="text-sm font-bold text-white">
                  {industry.name}
                </h3>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/971581324928"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-bold text-xl shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3"
            >
              <span>{t("aiAssistantsPage.cta")}</span>
              <ArrowRight size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
