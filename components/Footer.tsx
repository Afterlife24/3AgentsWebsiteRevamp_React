import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative w-full bg-[#0a2a3a]/80 backdrop-blur-xl border-t border-cyan-500/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="/assets/logo.jpeg"
              alt="logo"
              className="w-12 h-12 rounded-lg object-cover"
            />
            <span className="text-white font-bold text-2xl tracking-tight">
              Autonomiq
            </span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed mb-6">
            {t("footer.brand.desc")}
          </p>
          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/auto.nomiqai?igsh=bzF0ZHB3dHFmc2Yy&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 transition-all shadow-sm"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@autonomiq.ai5?_r=1&_t=ZN-95DGLJnusP0"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-black transition-all shadow-sm"
              aria-label="TikTok"
            >
              <FaTiktok size={18} />
            </a>
            <a
              href="https://www.facebook.com/share/1Nt27vS99s/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-blue-600 transition-all shadow-sm"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="font-bold text-white mb-6">
            {t("footer.company")}
          </h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li>
              <Link
                to="/about"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.company.about")}
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.company.careers")}
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.company.blog")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="font-bold text-white mb-6">{t("footer.legal")}</h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li>
              <Link
                to="/privacy-policy"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.legal.privacy")}
              </Link>
            </li>
            <li>
              <Link
                to="/terms-of-service"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.legal.terms")}
              </Link>
            </li>
            <li>
              <Link
                to="/cookie-policy"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.legal.cookie")}
              </Link>
            </li>
            <li>
              <Link
                to="#"
                className="hover:text-cyan-400 transition-colors"
              >
                {t("footer.legal.security")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="font-bold text-white mb-6">
            {t("footer.contact")}
          </h4>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <Mail size={18} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>info@autonomiq.ae</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone size={18} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>+971 52 493 4182</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-cyan-400 shrink-0 mt-0.5" />
              <span>Dubai, United Arab Emirates </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-cyan-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Autonomiq Inc. {t("footer.rights")}.
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-400 font-medium">
            {t("footer.status")}
          </span>
        </div>
      </div>
    </footer>
  );
}
