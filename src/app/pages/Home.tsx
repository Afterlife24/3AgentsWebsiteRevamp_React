import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Monitor,
  MessageCircle,
  Mic,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Phone,
  Send,
  Copy,
  Check,
  Users,
  Briefcase,
  LogIn,
} from "lucide-react";
import CountryCodeSelect, {
  DEFAULT_COUNTRY,
  type Country,
} from "../components/CountryCodeSelect";

// Simple loading component without complex animations
const SimpleLoadingSpinner = () => (
  <div className="w-full h-full flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
    <div className="text-blue-500 text-sm">Loading 3D...</div>
  </div>
);

import Avatar3DSingleton from "../components/Avatar3DSingleton";

import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import VisionSection from "../../../components/VisionSection";
import ServicesSection from "../../../components/ServicesSection";
import Footer from "../../../components/Footer";
import { useLanguage } from "../contexts/LanguageContext";
import { useWidget } from "../contexts/WidgetContext";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { t } = useLanguage();
  const { showWidget, openWidget } = useWidget();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>("voice");
  const [isAnyAgentOpen, setIsAnyAgentOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(DEFAULT_COUNTRY);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isWhatsappLoading, setIsWhatsappLoading] = useState(false);
  const [isCallLoading, setIsCallLoading] = useState(false);
  const [callStatus, setCallStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [callState, setCallState] = useState<
    "idle" | "connecting" | "connected" | "disconnected"
  >("idle");
  const [currentCallId, setCurrentCallId] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [whatsappStatus, setWhatsappStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Mobile state
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>("voice");
  const [mounted, setMounted] = useState(false);

  // Preview closing animation state
  const [isPreviewClosing, setIsPreviewClosing] = useState(false);

  // Animation trigger for avatar "hi" gesture on each hover
  const [animationTrigger, setAnimationTrigger] = useState(0);

  // Terms and Conditions modal state
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [pendingAction, setPendingAction] = useState<"web" | "voice" | "whatsapp" | null>(null);

  // Auth gate modal state
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleTryAgent = (agentType: "web" | "voice" | "whatsapp") => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    if (!termsAccepted) {
      setPendingAction(agentType);
      setShowTermsModal(true);
    } else {
      executeAgentAction(agentType);
    }
  };

  const executeAgentAction = (agentType: "web" | "voice" | "whatsapp") => {
    if (agentType === "web") {
      setIsPreviewClosing(true);
      setTimeout(() => {
        openWidget();
        setIsAnyAgentOpen(true);
        setIsPreviewClosing(false);
      }, 500);
    } else if (agentType === "voice") {
      handleMakeCall();
    } else if (agentType === "whatsapp") {
      handleWhatsappDemo();
    }
  };

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setShowTermsModal(false);
    if (pendingAction) {
      executeAgentAction(pendingAction);
      setPendingAction(null);
    }
  };

  // Check if mobile on mount and resize
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Clear phone numbers when country changes
  useEffect(() => {
    setPhoneNumber("");
    setWhatsappNumber("");
  }, [selectedCountry]);

  // Handle URL parameters for navigation (agent-triggered actions)
  useEffect(() => {
    if (!mounted) return;

    const params = new URLSearchParams(location.search);
    const action = params.get("action");
    const section = params.get("section");

    console.log("[Home] URL params changed:", {
      action,
      section,
      search: location.search,
    });

    if (action && section) {
      // Small delay to ensure page is fully loaded
      setTimeout(() => {
        if (action === "expand") {
          // Expand specific product card (mobile and desktop)
          if (
            section === "voice" ||
            section === "web" ||
            section === "whatsapp"
          ) {
            console.log("[Home] Expanding product card:", section);
            setExpandedCard(section);
            setActiveId(section);

            // Scroll to the card smoothly
            const element = document.getElementById(`product-${section}`);
            if (element) {
              console.log("[Home] Scrolling to product card");
              element.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        } else if (action === "scroll") {
          // Scroll to specific section
          console.log("[Home] Scrolling to section:", section);
          const element = document.getElementById(section);
          if (element) {
            console.log("[Home] Element found, scrolling");
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          } else {
            console.warn("[Home] Section element not found:", section);
          }
        }
      }, 500);
    }
  }, [mounted, location.search]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const handleWhatsappDemo = async () => {
    const cleanedNumber = whatsappNumber.replace(/\D/g, "");

    const MIN_LENGTH =
      selectedCountry.code === "US" ||
        selectedCountry.code === "CA" ||
        selectedCountry.code === "IN"
        ? 10
        : 8;
    const MAX_LENGTH = 15;

    if (
      !whatsappNumber.trim() ||
      cleanedNumber.length < MIN_LENGTH ||
      cleanedNumber.length > MAX_LENGTH
    ) {
      setWhatsappStatus({
        type: "error",
        message: `Please enter a valid ${selectedCountry.name} number (${MIN_LENGTH}-${MAX_LENGTH} digits)`,
      });
      setTimeout(() => setWhatsappStatus({ type: null, message: "" }), 3000);
      return;
    }

    setIsWhatsappLoading(true);
    setWhatsappStatus({ type: null, message: "" });

    const fullNumber = `${selectedCountry.dialCode}${cleanedNumber}`;

    try {
      const response = await fetch("https://wa.afterlife.org.in/whatsappDemo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone_number: fullNumber }),
      });

      const data = await response.json();
      if (data.success) {
        setWhatsappStatus({
          type: "success",
          message: `Template sent to ${fullNumber}!`,
        });
        setWhatsappNumber("");
      } else {
        setWhatsappStatus({
          type: "error",
          message: `Error: ${data.error}`,
        });
      }
    } catch (err) {
      setWhatsappStatus({
        type: "error",
        message: "Backend server is not responding.",
      });
    } finally {
      setIsWhatsappLoading(false);
      setTimeout(() => {
        setWhatsappStatus((prev) =>
          prev.type === "success" ? { type: null, message: "" } : prev,
        );
      }, 5000);
    }
  };

  const handleMakeCall = async () => {
    if (callState === "connecting" || callState === "connected") {
      setCallStatus({
        type: "error",
        message: "Please wait for the current call to finish",
      });
      setTimeout(() => {
        setCallStatus({ type: null, message: "" });
      }, 3000);
      return;
    }

    if (!phoneNumber.trim()) {
      setCallStatus({
        type: "error",
        message: "Please enter a phone number",
      });
      setTimeout(() => {
        setCallStatus({ type: null, message: "" });
      }, 3000);
      return;
    }

    const fullPhoneNumber = `${selectedCountry.dialCode}${phoneNumber}`;

    setIsCallLoading(true);
    setCallStatus({ type: null, message: "" });
    setCallState("connecting");

    try {
      const response = await fetch("https://call.afterlife.org.in/makeCall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone_number: fullPhoneNumber }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCallStatus({
          type: "success",
          message: `Call connecting to ${fullPhoneNumber}...`,
        });
        setCurrentCallId(data.call_id || fullPhoneNumber);
        setIsAnyAgentOpen(true);
        pollCallStatus(data.call_id || fullPhoneNumber);

        setTimeout(() => {
          setCallStatus({ type: null, message: "" });
        }, 3000);
      } else {
        setCallStatus({
          type: "error",
          message: data.error || "Failed to initiate call",
        });
        setCallState("idle");
        setTimeout(() => {
          setCallStatus({ type: null, message: "" });
        }, 3000);
      }
    } catch (error) {
      setCallStatus({
        type: "error",
        message: "Network error.",
      });
      setCallState("idle");
      setTimeout(() => {
        setCallStatus({ type: null, message: "" });
      }, 3000);
    } finally {
      setIsCallLoading(false);
    }
  };

  const pollCallStatus = async (callId: string) => {
    let hasTransitionedToConnected = false;
    let wasConnected = false;

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(
          `https://call.afterlife.org.in/callStatus/${callId}`,
        );
        const data = await response.json();

        if (data.status === "connected") {
          if (!hasTransitionedToConnected) {
            wasConnected = true;
            setCallState("connected");
            setCallStatus({
              type: "success",
              message: "Call connected!",
            });
            hasTransitionedToConnected = true;

            setTimeout(() => {
              setCallStatus({ type: null, message: "" });
            }, 3000);
          }
        } else if (data.status === "disconnected" || data.status === "failed") {
          setCallState("disconnected");
          setCallStatus({
            type: "error",
            message: wasConnected ? "Call disconnected" : "No answer",
          });
          clearInterval(pollInterval);
          setIsAnyAgentOpen(false);
          setTimeout(() => {
            setCallStatus({ type: null, message: "" });
          }, 3000);
        }
      } catch (error) {
        console.error("Error polling call status:", error);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(pollInterval);
      if (callState === "connecting") {
        setCallState("disconnected");
        setCallStatus({
          type: "error",
          message: "No answer",
        });
        setIsAnyAgentOpen(false);
        setTimeout(() => {
          setCallStatus({ type: null, message: "" });
        }, 3000);
      }
    }, 120000);
  };

  const products = [
    {
      id: "whatsapp",
      title: t("agent.whatsapp.title"),
      subtitle: t("agent.whatsapp.subtitle"),
      description: t("agent.whatsapp.desc"),
      shortHighlight: t("agent.whatsapp.shortHighlight"),
      backgroundImage: "/assets/whatsapp-agent-bg.png",
      icon: <MessageCircle className="w-8 h-8" />,
      color: "from-green-400 to-emerald-300",
      bgGlow: "bg-green-400/20",
      mobileGradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      id: "voice",
      title: t("agent.voice.title"),
      isPopular: true,
      subtitle: t("agent.voice.subtitle"),
      description: t("agent.voice.desc"),
      shortHighlight: t("agent.voice.shortHighlight"),
      backgroundImage: "/assets/voice-agent-bg.png",
      icon: <Mic className="w-8 h-8" />,
      color: "from-purple-400 to-pink-300",
      bgGlow: "bg-purple-400/20",
      mobileGradient: "from-purple-500/20 to-pink-500/20",
    },
    {
      id: "web",
      title: t("agent.web.title"),
      subtitle: t("agent.web.subtitle"),
      description: t("agent.web.desc"),
      shortHighlight: t("agent.web.shortHighlight"),
      backgroundImage: "/assets/web-agent-bg.png",
      icon: <Monitor className="w-8 h-8" />,
      color: "from-blue-400 to-cyan-300",
      bgGlow: "bg-cyan-400/20",
      mobileGradient: "from-blue-500/20 to-cyan-500/20",
    },
  ];

  const renderMockup = (
    productId: string,
    isActive: boolean,
    isMobileView: boolean = false,
  ) => {
    if (productId === "web") {
      // Hide preview entirely (including border box) when widget is open
      // Only show on hover when widget is not open
      const shouldShowPreview = isActive && !showWidget;

      if (!shouldShowPreview && !isPreviewClosing) {
        return null; // Hide entire mockup including border box
      }

      return (
        <div
          className={`${isMobileView ? "w-full h-32" : "w-full max-w-xs h-48"} bg-white/40 rounded-xl border border-white/50 shadow-sm backdrop-blur-md overflow-hidden flex items-center justify-center transition-all duration-500 ease-out ${isPreviewClosing ? "opacity-0 scale-90" : "opacity-100 scale-100"
            }`}
        >
          {mounted && (shouldShowPreview || isPreviewClosing) && (
            <Avatar3DSingleton
              key={animationTrigger} // Key changes on each hover to replay animation
              scale={isMobileView ? 0.8 : 1.2}
              position={[0, -1.15, 0]}
              playAnimation={true}
              animationSpeed={0.7} // Slower, more graceful animation (70% of normal speed)
            />
          )}
        </div>
      );
    }

    if (productId === "voice") {
      return (
        <div
          className={`${isMobileView ? "w-full" : "w-full max-w-xs"} flex items-center justify-center gap-4`}
        >
          <div
            className={`${isMobileView ? "w-10 h-10" : "w-12 h-12"} rounded-full bg-white/60 flex items-center justify-center shadow-lg animate-pulse`}
          >
            <div
              className={`${isMobileView ? "w-2 h-2" : "w-3 h-3"} bg-purple-600 rounded-full`}
            ></div>
          </div>
          <div className="flex flex-col gap-1">
            <div
              className={`${isMobileView ? "w-20" : "w-24"} h-2 bg-gray-800/10 rounded-full`}
            ></div>
            <div
              className={`${isMobileView ? "w-12" : "w-16"} h-2 bg-gray-800/10 rounded-full`}
            ></div>
          </div>
        </div>
      );
    }

    if (productId === "whatsapp") {
      return (
        <div
          className={`${isMobileView ? "w-full" : "w-full max-w-xs"} bg-[#E5DDD5]/80 rounded-xl p-2 border border-white/50 shadow-sm backdrop-blur-sm relative overflow-hidden`}
        >
          <div className="absolute inset-0 opacity-10 bg-black"></div>
          <div className="relative z-10 bg-white p-2 rounded-lg shadow-sm text-xs mb-2 w-3/4 ml-auto rounded-tr-none text-gray-900 font-medium">
            Hey! Can I schedule a demo?
          </div>
          <div className="relative z-10 bg-[#DCF8C6] p-2 rounded-lg shadow-sm text-xs w-3/4 mr-auto rounded-tl-none text-gray-900 font-medium">
            Absolutely. Pick a time below.
          </div>
        </div>
      );
    }

    return null;
  };

  // Mobile View
  if (isMobile) {
    return (
      <div className="min-h-screen w-full bg-[#0a0f1a] font-sans overflow-hidden relative flex flex-col">
        {/* Background Image */}
        <div className="fixed inset-0 z-0">
          <img
            src="/assets/bg.png"
            alt="background"
            className="w-full h-full object-cover opacity-100"
          />
        </div>

        {/* --- BACKGROUND AMBIENT --- */}
        <AmbientBackground />

        {/* --- HEADER --- */}
        <NavBar />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto z-10 relative scroll-smooth bg-transparent">
          {/* Product Cards Section */}
          <div className="px-4 pt-20 pb-8 space-y-4">
            {products.map((product) => {
              const isExpanded = expandedCard === product.id;

              return (
                <div
                  key={product.id}
                  id={`product-${product.id}`}
                  onClick={() => !isExpanded && setExpandedCard(product.id)}
                  className={`
                    relative rounded-3xl overflow-hidden transition-all duration-500 ease-out
                    ${isExpanded ? "bg-white/95 backdrop-blur-xl shadow-2xl scale-[1.02]" : "bg-white/50 backdrop-blur-md shadow-lg"}
                    border border-white/50
                  `}
                  style={{
                    minHeight: isExpanded ? "auto" : "110px",
                  }}
                >
                  {/* Background Image */}
                  <div className="absolute inset-0 overflow-hidden">
                    <img
                      src={product.backgroundImage}
                      alt=""
                      className="w-full h-full object-cover opacity-5"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-[#0a2a3a]/90 via-[#0d3a4a]/80 to-[#0a2a3a]/90 backdrop-blur-md`}
                    ></div>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${product.mobileGradient} opacity-20`}
                    ></div>
                  </div>

                  {/* Card Header - Always Visible */}
                  <div
                    className="relative p-5 flex items-center justify-between cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCard(isExpanded ? null : product.id);
                      // Trigger animation for web agent on mobile click
                      if (product.id === "web" && !isExpanded) {
                        setAnimationTrigger((prev) => prev + 1);
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-3 rounded-2xl bg-white/70 shadow-md text-gray-800 transition-all duration-300 ${isExpanded ? "scale-110" : "scale-100"}`}
                      >
                        {product.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">
                          {product.title}
                        </h3>
                        <p className="text-xs text-gray-300 mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {product.isPopular && !isExpanded && (
                        <div className="px-2.5 py-1.5 bg-white/20 rounded-full border border-white/30">
                          <Sparkles size={14} className="text-purple-300" />
                        </div>
                      )}
                      <div
                        className={`p-2 rounded-full bg-white/60 transition-transform duration-500 ${isExpanded ? "rotate-180" : ""}`}
                      >
                        <ChevronDown size={22} className="text-gray-700" />
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div
                    className={`
                      relative px-4 pb-4 transition-all duration-500 ease-out
                      ${isExpanded ? "opacity-100 max-h-[800px]" : "opacity-0 max-h-0 overflow-hidden"}
                    `}
                  >
                    {/* Description */}
                    <p className="text-sm text-gray-200 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Mockup */}
                    <div className="mb-4">
                      {renderMockup(product.id, true, true)}
                    </div>

                    {/* CTA Section */}
                    <div className="space-y-3">
                      {product.id === "web" ? (
                        <button
                          onClick={() => handleTryAgent("web")}
                          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-cyan-700 transition-all"
                        >
                          <span>Try Web Agent</span>
                          <ArrowRight size={16} />
                        </button>
                      ) : product.id === "whatsapp" ? (
                        <div className="space-y-3">
                          {/* Message Us Card */}
                          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50">
                            <div className="flex items-center justify-between">
                              <div
                                className="flex flex-col cursor-pointer flex-1"
                                onClick={() => {
                                  navigator.clipboard.writeText("+17178976546");
                                  setCopySuccess(true);
                                  setTimeout(() => setCopySuccess(false), 2000);
                                }}
                              >
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider flex items-center gap-1">
                                  {copySuccess ? (
                                    <Check
                                      size={12}
                                      className="text-green-600"
                                    />
                                  ) : (
                                    <Copy size={12} />
                                  )}
                                  {copySuccess ? "Copied!" : "Message Us"}
                                </span>
                                <span className="text-xs font-mono font-bold text-gray-800">
                                  +17178976546
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  window.open(
                                    "https://wa.me/17178976546?text=Hello",
                                    "_blank",
                                  )
                                }
                                className="p-2.5 bg-[#25D366] text-white rounded-xl shadow-md hover:bg-[#128C7E] transition-colors"
                              >
                                <Send size={16} />
                              </button>
                            </div>
                          </div>

                          {/* OR Divider */}
                          <div className="flex items-center gap-2 px-2">
                            <div className="h-px bg-gray-300 flex-1"></div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                              OR
                            </span>
                            <div className="h-px bg-gray-300 flex-1"></div>
                          </div>

                          {/* Get Demo Form */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 p-1 bg-white/80 backdrop-blur-md rounded-xl border border-white/50">
                              <CountryCodeSelect
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                              />
                              <input
                                type="tel"
                                placeholder="Your Number"
                                className="bg-transparent text-black outline-none px-2 py-2.5 flex-1 text-sm"
                                value={whatsappNumber}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  ); // Only digits
                                  if (
                                    value.length <= selectedCountry.maxLength
                                  ) {
                                    setWhatsappNumber(value);
                                  }
                                }}
                                maxLength={selectedCountry.maxLength}
                                disabled={isWhatsappLoading}
                              />
                            </div>
                            <button
                              onClick={() => handleTryAgent("whatsapp")}
                              disabled={isWhatsappLoading}
                              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50"
                            >
                              {isWhatsappLoading ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                  Sending...
                                </>
                              ) : (
                                <>
                                  Get Demo
                                  <ArrowRight size={16} />
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {/* Call Form */}
                          <div className="flex flex-col gap-2 p-2 bg-white/80 backdrop-blur-md rounded-xl border border-white/50">
                            <div className="flex items-center gap-1">
                              <CountryCodeSelect
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                                disabled={
                                  isCallLoading ||
                                  callState === "connecting" ||
                                  callState === "connected"
                                }
                              />
                              <input
                                type="tel"
                                placeholder="Phone number"
                                className="bg-transparent border-none outline-none text-gray-900 px-2 py-2.5 flex-1 text-sm disabled:opacity-50"
                                value={phoneNumber}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  ); // Only digits
                                  if (
                                    value.length <= selectedCountry.maxLength
                                  ) {
                                    setPhoneNumber(value);
                                  }
                                }}
                                maxLength={selectedCountry.maxLength}
                                disabled={
                                  isCallLoading ||
                                  callState === "connecting" ||
                                  callState === "connected"
                                }
                              />
                            </div>
                            <button
                              onClick={() => handleTryAgent("voice")}
                              disabled={
                                isCallLoading ||
                                callState === "connecting" ||
                                callState === "connected"
                              }
                              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-bold shadow-lg hover:from-purple-600 hover:to-pink-700 transition-all disabled:opacity-50"
                            >
                              {callState === "connecting" ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                  Connecting...
                                </>
                              ) : callState === "connected" ? (
                                <>
                                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                  Connected
                                </>
                              ) : callState === "disconnected" ? (
                                <>
                                  <Phone size={16} />
                                  Call Again
                                </>
                              ) : (
                                <>
                                  <Phone size={16} />
                                  Call Me
                                </>
                              )}
                            </button>
                          </div>

                          {/* Incoming Call Number for Testing */}
                          <a
                            href="tel:+18137974755"
                            className="block p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 backdrop-blur-md hover:bg-purple-500/30 transition-all cursor-pointer"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                <span className="text-[10px] uppercase text-purple-600 font-bold tracking-wider">
                                  Test Incoming Call
                                </span>
                                <span className="text-sm font-mono font-bold text-gray-900">
                                  +1 813 797 4755
                                </span>
                              </div>
                              <Phone size={16} className="text-purple-600" />
                            </div>
                          </a>

                          {/* Status Messages */}
                          {callStatus.type && (
                            <div
                              className={`p-3 rounded-xl backdrop-blur-md border ${callStatus.type === "success"
                                ? "bg-green-500/20 border-green-500/30"
                                : "bg-red-500/20 border-red-500/30"
                                }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${callStatus.type === "success" ? "bg-green-500" : "bg-red-500"} animate-pulse`}
                                />
                                <span className="text-xs font-medium text-white">
                                  {callStatus.message}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- NEW SECTIONS FOR MOBILE --- */}
          <VisionSection />
          <ServicesSection />

          {/* --- ADDITIONAL SERVICES CTA --- */}
          <section className="relative w-full py-8 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm md:text-base text-gray-200 font-medium text-center sm:text-left">
                    {t("additionalServices.text")}
                  </p>
                  <button
                    onClick={() => {
                      navigate('/solutions');
                      window.scrollTo(0, 0);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-md hover:from-blue-700 hover:to-purple-700 transition-all whitespace-nowrap"
                  >
                    {t("additionalServices.button")}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <Footer />
        </div>

        {/* Terms and Conditions Modal */}
        {showTermsModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl max-w-md w-full border border-gray-200/50 overflow-hidden">
              {/* Content */}
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Check className="w-8 h-8 text-white" strokeWidth={3} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                  <p className="text-sm text-gray-600">
                    By continuing, you agree to our terms of service
                  </p>
                </div>

                <div className="bg-gray-50/80 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto">
                  <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                    <p>
                      • Our AI agents are for demonstration and business use
                    </p>
                    <p>
                      • We collect data to provide and improve services
                    </p>
                    <p>
                      • Standard call/message rates may apply
                    </p>
                    <p>
                      • Services provided "as is" without warranties
                    </p>
                    <p>
                      • We may modify or discontinue services anytime
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowTermsModal(false);
                      setPendingAction(null);
                    }}
                    className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                  >
                    Decline
                  </button>
                  <button
                    onClick={handleAcceptTerms}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                  >
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Auth Gate Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl max-w-sm w-full border border-gray-200/50 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("auth.login.title")}</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Please sign in or create an account to try our AI agents.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/login"
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all text-center"
                    onClick={() => setShowAuthModal(false)}
                  >
                    {t("auth.nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all text-center"
                    onClick={() => setShowAuthModal(false)}
                  >
                    {t("auth.nav.signup")}
                  </Link>
                  <button
                    onClick={() => setShowAuthModal(false)}
                    className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop View (Original - with modifications for scrolling)
  return (
    <div className="min-h-screen w-full bg-[#0a0f1a] font-sans overflow-y-auto relative flex flex-col scroll-smooth">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="/assets/bg.png"
          alt="background"
          className="w-full h-full object-cover opacity-100"
        />
      </div>

      {/* --- BACKGROUND AMBIENT --- */}
      <AmbientBackground />

      {/* --- HEADER --- */}
      <NavBar />

      {/* --- HERO SECTION (Full Viewport) --- */}
      <section className="h-screen w-full relative flex flex-col">
        <main className="flex-1 flex flex-col md:flex-row relative z-10 h-full p-4 md:p-6 gap-4 md:gap-6 pt-28 md:pt-32">
          {products.map((product) => {
            const isActive = activeId === product.id;

            return (
              <div
                key={product.id}
                id={`product-${product.id}`}
                onMouseEnter={() => {
                  if (!isAnyAgentOpen) {
                    setActiveId(product.id);
                    // Trigger animation replay for web agent on each hover
                    if (product.id === "web") {
                      setAnimationTrigger((prev) => prev + 1);
                    }
                  }
                }}
                className={`
                  relative h-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 shadow-2xl bg-white/5 backdrop-blur-xl
                  ${isActive ? "flex-[3] md:flex-[2.5]" : "flex-1"}
                  group
                `}
              >
                {/* IMAGE LAYER */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={product.backgroundImage}
                    alt=""
                    className={`w-full h-full object-cover transition-all duration-700 ${isActive ? "opacity-10 scale-105" : "opacity-5 scale-100"}`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b from-[#0a2a3a]/90 via-[#0d3a4a]/80 to-[#0a2a3a]/90 ${isActive ? "backdrop-blur-xl" : "backdrop-blur-md"}`}
                  ></div>
                </div>

                {/* GLOW LAYER */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-30" : "opacity-20"} bg-gradient-to-b ${product.bgGlow} to-transparent`}
                ></div>

                {/* CONTENT CONTAINER */}
                <div className="relative h-full flex flex-col justify-end p-8 md:p-12 z-10 pb-20">
                  {/* POPULAR BADGE */}
                  {product.isPopular && (
                    <div
                      className={`absolute top-12 right-12 z-20 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center gap-1.5 transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`}
                    >
                      <Sparkles
                        size={12}
                        className="text-purple-300 fill-purple-300"
                      />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                        Popular
                      </span>
                    </div>
                  )}

                  {/* ICON & ARROW */}
                  <div
                    className={`absolute top-8 left-8 md:top-12 md:left-12 flex items-center justify-between w-[calc(100%-4rem)] transition-all duration-500`}
                  >
                    <div
                      className={`p-4 rounded-2xl bg-white/50 shadow-sm text-gray-800 transition-transform duration-500 ${isActive ? "scale-0" : "scale-90 origin-top-left"}`}
                    >
                      {product.icon}
                    </div>
                    <div
                      className={`w-10 h-10 rounded-full border border-gray-800/10 flex items-center justify-center transition-all duration-500 ${isActive ? "rotate-90 bg-gray-900 text-white" : "rotate-0 bg-white/50 text-gray-600"}`}
                    >
                      <ChevronRight size={20} />
                    </div>
                  </div>

                  {/* TEXT CONTENT BLOCK */}
                  <div className="min-w-[300px]">
                    {/* TITLE */}
                    <h2
                      className={`font-bold text-white leading-none whitespace-nowrap transition-all duration-500 ${isActive ? "text-3xl md:text-4xl mb-4 translate-y-0" : "text-2xl md:text-3xl mb-2 translate-y-2"}`}
                    >
                      {product.title.split(" ")[0]}
                      <br />
                      <span
                        className={`text-transparent bg-clip-text bg-gradient-to-r ${product.color} pb-1`}
                      >
                        {product.title.split(" ")[1]}
                      </span>
                    </h2>

                    {/* SHORT HIGHLIGHT (Inactive State) */}
                    <div
                      className={`transition-all duration-500 ${!isActive ? "opacity-100 h-auto" : "opacity-0 h-0 overflow-hidden"}`}
                    >
                      <p className="text-sm text-gray-300 font-medium leading-relaxed max-w-[200px]">
                        {product.shortHighlight}
                      </p>
                    </div>

                    {/* FULL DESCRIPTION (Active State) */}
                    <div
                      className={`transition-all duration-700 ease-out overflow-hidden ${isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 max-w-md font-medium">
                        {product.description}
                      </p>

                      {/* MOCKUP CONTAINER */}
                      <div className="mb-6">
                        {renderMockup(product.id, isActive, false)}
                      </div>

                      {/* CTA BUTTONS */}
                      <div className="pt-2">
                        {product.id === "web" ? (
                          <button
                            onClick={() => handleTryAgent("web")}
                            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-full font-bold shadow-lg hover:from-blue-600 hover:to-cyan-700 transition-all"
                          >
                            <span>Try Agent</span>
                            <ArrowRight size={18} />
                          </button>
                        ) : product.id === "whatsapp" ? (
                          <div
                            className="flex flex-col gap-3 w-full max-w-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-between bg-white/40 border border-white/50 backdrop-blur-md rounded-xl p-2 px-3 shadow-sm">
                              <div
                                className="flex flex-col cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText("+17178976546");
                                  setCopySuccess(true);
                                  setTimeout(() => setCopySuccess(false), 2000);
                                }}
                                title="Click to copy"
                              >
                                <span className="text-[10px] uppercase text-gray-500 font-bold tracking-wider">
                                  {copySuccess ? "Copied!" : "Message Us"}
                                </span>
                                <span className="text-sm font-mono font-bold text-gray-800 hover:text-green-600 transition-colors">
                                  +17178976546
                                </span>
                              </div>
                              <button
                                onClick={() =>
                                  window.open(
                                    "https://wa.me/17178976546?text=Hello",
                                    "_blank",
                                  )
                                }
                                className="p-2 bg-[#25D366] text-white rounded-full shadow-md hover:bg-[#128C7E] transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle size={16} />
                              </button>
                            </div>

                            <div className="flex items-center gap-2 px-2">
                              <div className="h-px bg-gray-300 flex-1"></div>
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                OR
                              </span>
                              <div className="h-px bg-gray-300 flex-1"></div>
                            </div>

                            <div className="flex items-center gap-1 p-1.5 bg-white/60 border border-white/50 backdrop-blur-md rounded-full shadow-sm">
                              <CountryCodeSelect
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                              />
                              <input
                                type="tel"
                                placeholder="Your Number"
                                className="bg-transparent text-black outline-none px-3 py-2 flex-1 text-sm font-medium w-0 min-w-0"
                                value={whatsappNumber}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  ); // Only digits
                                  if (
                                    value.length <= selectedCountry.maxLength
                                  ) {
                                    setWhatsappNumber(value);
                                  }
                                }}
                                maxLength={selectedCountry.maxLength}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !isWhatsappLoading) {
                                    handleWhatsappDemo();
                                  }
                                }}
                                disabled={isWhatsappLoading}
                              />
                              <button
                                onClick={() => handleTryAgent("whatsapp")}
                                disabled={isWhatsappLoading}
                                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 whitespace-nowrap shrink-0"
                              >
                                {isWhatsappLoading ? "Sending..." : "Get Demo"}
                                <ArrowRight size={16} />
                              </button>
                            </div>

                            {whatsappStatus.type && (
                              <div
                                className={`px-4 py-2.5 rounded-xl backdrop-blur-md border shadow-sm transition-all duration-300 animate-slide-up ${whatsappStatus.type === "success"
                                  ? "bg-white/40 border-white/50"
                                  : "bg-white/40 border-white/50"
                                  }`}
                              >
                                <div className="flex items-center gap-2">
                                  {whatsappStatus.type === "success" ? (
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                                  ) : (
                                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                  )}
                                  <span className="text-xs font-medium text-white">
                                    {whatsappStatus.message}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-col gap-3 w-full max-w-sm">
                            <div className="flex items-center gap-1 p-1.5 bg-white/40 border border-white/50 backdrop-blur-md rounded-full shadow-sm focus-within:ring-2 focus-within:ring-gray-900/20">
                              <CountryCodeSelect
                                value={selectedCountry}
                                onChange={setSelectedCountry}
                                disabled={
                                  isCallLoading ||
                                  callState === "connecting" ||
                                  callState === "connected"
                                }
                              />
                              <div className="w-px h-6 bg-gray-300/50"></div>
                              <input
                                type="tel"
                                placeholder="555 000 0000"
                                value={phoneNumber}
                                onChange={(e) => {
                                  const value = e.target.value.replace(
                                    /\D/g,
                                    "",
                                  ); // Only digits
                                  if (
                                    value.length <= selectedCountry.maxLength
                                  ) {
                                    setPhoneNumber(value);
                                  }
                                }}
                                maxLength={selectedCountry.maxLength}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && !isCallLoading) {
                                    handleMakeCall();
                                  }
                                }}
                                disabled={
                                  isCallLoading ||
                                  callState === "connecting" ||
                                  callState === "connected"
                                }
                                className="bg-transparent border-none outline-none text-gray-900 px-3 py-2 flex-1 text-sm font-medium w-0 min-w-0 disabled:opacity-50"
                              />
                              <button
                                onClick={() => handleTryAgent("voice")}
                                disabled={
                                  isCallLoading ||
                                  callState === "connecting" ||
                                  callState === "connected"
                                }
                                className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-full font-bold shadow-md hover:from-purple-600 hover:to-pink-700 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed shrink-0 whitespace-nowrap"
                              >
                                {callState === "connecting" ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                    Connecting...
                                  </>
                                ) : callState === "connected" ? (
                                  <>
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Connected
                                  </>
                                ) : callState === "disconnected" ? (
                                  <>
                                    Call Again <ArrowRight size={16} />
                                  </>
                                ) : (
                                  <>
                                    Call Me <ArrowRight size={16} />
                                  </>
                                )}
                              </button>
                            </div>

                            {/* Incoming Call Number for Testing */}
                            <a
                              href="tel:+18137974755"
                              className="block px-4 py-2.5 rounded-xl bg-purple-500/20 border border-purple-500/30 backdrop-blur-md shadow-sm hover:bg-purple-500/30 transition-all cursor-pointer"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                  <span className="text-[10px] uppercase text-purple-600 font-bold tracking-wider">
                                    Test Incoming Call
                                  </span>
                                  <span className="text-sm font-mono font-bold text-gray-900">
                                    +1 813 797 4755
                                  </span>
                                </div>
                                <Phone size={16} className="text-purple-600" />
                              </div>
                            </a>

                            {callStatus.type && (
                              <div
                                className={`px-4 py-2.5 rounded-xl backdrop-blur-md border shadow-sm transition-all duration-300 animate-slide-up ${callStatus.type === "success"
                                  ? "bg-white/40 border-white/50"
                                  : "bg-white/40 border-white/50"
                                  }`}
                              >
                                <div className="flex items-center gap-2">
                                  {callStatus.type === "success" ? (
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
                                  ) : (
                                    <div className="w-2 h-2 bg-red-500 rounded-full shrink-0" />
                                  )}
                                  <span className="text-xs font-medium text-white">
                                    {callStatus.message}
                                  </span>
                                </div>
                              </div>
                            )}

                            {callState === "disconnected" &&
                              !callStatus.type && (
                                <div className="px-4 py-2.5 rounded-xl backdrop-blur-md border bg-white/40 border-white/50 shadow-sm">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-orange-500 rounded-full shrink-0" />
                                    <span className="text-xs font-medium text-white">
                                      Call Disconnected - Ready for next call
                                    </span>
                                  </div>
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </section>

      {/* --- VISION SECTION --- */}
      <VisionSection />

      {/* --- SERVICES SECTION --- */}
      <ServicesSection />

      {/* --- ADDITIONAL SERVICES CTA --- */}
      <section className="relative w-full py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0a2a3a]/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-lg text-gray-200 font-medium text-center md:text-left max-w-2xl">
                {t("additionalServices.text")}
              </p>
              <button
                onClick={() => {
                  navigate('/solutions');
                  window.scrollTo(0, 0);
                }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all whitespace-nowrap hover:scale-105 transform"
              >
                {t("additionalServices.button")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- MEET OUR AI ASSISTANTS CTA --- */}
      <section id="meet-assistants" className="relative w-full py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl overflow-hidden shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div
                className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/2 w-36 h-36 bg-white rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>

            <div className="relative z-10 p-8 md:p-12 lg:p-16 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full mb-6 border border-white/40">
                <Users className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">
                  {t("aiAssistants.badge")}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                {t("aiAssistants.title")}
              </h2>

              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto drop-shadow-md">
                {t("aiAssistants.subtitle")}
              </p>

              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
                  <Phone className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {t("aiAssistants.receptionist")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
                  <Briefcase className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {t("aiAssistants.admin")}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full border border-white/40">
                  <Users className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    {t("aiAssistants.sales")}
                  </span>
                </div>
              </div>

              <a
                href="/ai-assistants"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-purple-700 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 hover:bg-gray-50"
              >
                <span>{t("aiAssistants.cta")}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <Footer />

      {/* Terms and Conditions Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl max-w-md w-full border border-gray-200/50 overflow-hidden">
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Check className="w-8 h-8 text-white" strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms & Conditions</h2>
                <p className="text-sm text-gray-600">
                  By continuing, you agree to our terms of service
                </p>
              </div>

              <div className="bg-gray-50/80 rounded-xl p-4 mb-6 max-h-64 overflow-y-auto">
                <div className="space-y-3 text-xs text-gray-600 leading-relaxed">
                  <p>
                    • Our AI agents are for demonstration and business use
                  </p>
                  <p>
                    • We collect data to provide and improve services
                  </p>
                  <p>
                    • Standard call/message rates may apply
                  </p>
                  <p>
                    • Services provided "as is" without warranties
                  </p>
                  <p>
                    • We may modify or discontinue services anytime
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowTermsModal(false);
                    setPendingAction(null);
                  }}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Decline
                </button>
                <button
                  onClick={handleAcceptTerms}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Auth Gate Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl max-w-sm w-full border border-gray-200/50 overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <LogIn className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("auth.login.title")}</h2>
              <p className="text-sm text-gray-600 mb-6">
                Please sign in or create an account to try our AI agents.
              </p>
              <div className="flex flex-col gap-3">
                <Link
                  to="/login"
                  className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all text-center"
                  onClick={() => setShowAuthModal(false)}
                >
                  {t("auth.nav.login")}
                </Link>
                <Link
                  to="/signup"
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all text-center"
                  onClick={() => setShowAuthModal(false)}
                >
                  {t("auth.nav.signup")}
                </Link>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="text-sm text-gray-400 hover:text-gray-600 transition-colors mt-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
