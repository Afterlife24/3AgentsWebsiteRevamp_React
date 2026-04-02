import React from "react";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import { useLanguage } from "../contexts/LanguageContext";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="h-screen w-full bg-[#0a0f1a] font-sans overflow-hidden relative flex flex-col" style={{ backgroundImage: 'url(/assets/bg.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
      <AmbientBackground />
      <NavBar />

      <main className="flex-1 relative z-10 flex flex-col items-center p-4 md:p-8 pt-20 md:pt-24 overflow-y-auto">
        <div className="w-full max-w-4xl">
          <div className="bg-[#0a2a3a]/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-16 border border-cyan-500/20 shadow-2xl text-center relative overflow-hidden">
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none"></div>

            <h1 className="relative text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
              {t("about.title")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Autonomiq
              </span>
            </h1>

            <div className="space-y-6 text-center max-w-3xl mx-auto relative z-10">
              <p className="text-xl md:text-2xl text-gray-200 font-semibold leading-relaxed">
                {t("about.subtitle")}
              </p>

              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full opacity-80"></div>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {t("about.text1")}
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                {t("about.text2")}
              </p>

              <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-[#0d3a4a]/60 rounded-2xl border border-cyan-500/30 shadow-sm">
                  <h3 className="font-bold text-white mb-1">
                    {t("about.automate.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("about.automate.desc")}
                  </p>
                </div>
                <div className="p-4 bg-[#0d3a4a]/60 rounded-2xl border border-cyan-500/30 shadow-sm">
                  <h3 className="font-bold text-white mb-1">
                    {t("about.engage.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("about.engage.desc")}
                  </p>
                </div>
                <div className="p-4 bg-[#0d3a4a]/60 rounded-2xl border border-cyan-500/30 shadow-sm">
                  <h3 className="font-bold text-white mb-1">
                    {t("about.scale.title")}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {t("about.scale.desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-400/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

