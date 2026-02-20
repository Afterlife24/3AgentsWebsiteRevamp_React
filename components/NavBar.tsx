import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LANGUAGES = [
  { code: "en" as const, label: "English", flag: "🇬🇧" },
  { code: "fr" as const, label: "Français", flag: "🇫🇷" },
  { code: "ar" as const, label: "العربية", flag: "🇸🇦" },
];

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isRTL = language === "ar";

  const NAV_ITEMS = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.pricing"), path: "/pricing" },
    { name: t("nav.about"), path: "/about" },
  ];

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`hidden md:flex absolute top-0 w-full z-50 p-6 justify-between items-center ${isRTL ? "right-0" : "left-0"}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <img
            src="/assets/logo.jpeg"
            alt="logo"
            className="w-6 h-6 rounded object-cover"
          />
          <span className="text-gray-800 font-bold tracking-tight">
            Afterlife
          </span>
        </Link>

        <div
          className={`flex gap-4 items-center ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <div
            className={`flex gap-8 text-sm font-medium text-gray-600 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="group relative h-[1.2em] overflow-hidden"
                >
                  <div
                    className={`flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-[1.2em] ${isActive ? "-translate-y-[1.2em]" : ""}`}
                  >
                    <span className="flex items-center h-[1.2em]">
                      {item.name}
                    </span>
                    <span className="flex items-center h-[1.2em] text-black font-bold">
                      {item.name}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className={`flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
              aria-label="Change language"
              data-testid="language-switcher"
            >
              <Globe className="w-4 h-4 text-gray-700" />
              <span className="text-sm font-medium text-gray-700">
                {LANGUAGES.find((l) => l.code === language)?.flag}
              </span>
            </button>

            {showLanguageMenu && (
              <div
                className={`absolute top-12 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-2 w-40 z-50 ${isRTL ? "left-0" : "right-0"}`}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full px-4 py-2 rounded-xl transition-colors flex items-center gap-2 ${
                      lang.code === "ar"
                        ? "flex-row-reverse text-right"
                        : "text-left"
                    } ${
                      language === lang.code
                        ? "bg-black/10 font-bold"
                        : "hover:bg-black/5"
                    }`}
                    data-testid={`language-option-${lang.code}`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm text-gray-700">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav
        className={`md:hidden relative z-50 p-4 flex justify-between items-center ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <img
            src="/assets/logo.jpeg"
            alt="logo"
            className="w-5 h-5 rounded object-cover"
          />
          <span className="text-gray-800 font-bold tracking-tight text-sm">
            Afterlife
          </span>
        </Link>

        <div
          className={`flex gap-2 items-center ${isRTL ? "flex-row-reverse" : ""}`}
        >
          {/* Mobile Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg"
              aria-label="Change language"
              data-testid="language-switcher-mobile"
            >
              <Globe className="w-4 h-4 text-gray-800" />
            </button>

            {showLanguageMenu && (
              <div
                className={`absolute top-12 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-2 w-36 z-50 ${isRTL ? "left-0" : "right-0"}`}
              >
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageMenu(false);
                    }}
                    className={`w-full px-3 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm ${
                      lang.code === "ar"
                        ? "flex-row-reverse text-right"
                        : "text-left"
                    } ${
                      language === lang.code
                        ? "bg-black/10 font-bold"
                        : "hover:bg-black/5"
                    }`}
                    data-testid={`language-option-${lang.code}`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-gray-700">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2 bg-white/30 backdrop-blur-md rounded-full border border-white/40 shadow-lg"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-1">
              <div
                className={`w-5 h-0.5 bg-gray-800 transition-transform ${showMobileMenu ? "rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-gray-800 transition-opacity ${showMobileMenu ? "opacity-0" : ""}`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-gray-800 transition-transform ${showMobileMenu ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div
            className={`absolute top-20 z-50 bg-white/90 backdrop-blur-xl rounded-2xl border border-white/50 shadow-2xl p-4 w-48 animate-slide-down ${isRTL ? "left-4" : "right-4"}`}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block w-full text-left px-4 py-3 text-gray-700 hover:bg-black/5 rounded-xl transition-colors ${location.pathname === item.path ? "font-bold bg-black/5" : ""}`}
                onClick={() => setShowMobileMenu(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
