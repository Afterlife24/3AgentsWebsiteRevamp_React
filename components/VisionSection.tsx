import React from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

export default function VisionSection() {
  const { t } = useLanguage();

  return (
    <section
      id="vision"
      className="relative w-full py-24 md:py-32 px-6 flex flex-col items-center justify-center text-center"
    >
      <div className="max-w-4xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          {t("vision.title")}
        </h2>

        <p className="text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold mb-8">
          {t("vision.subtitle")}
        </p>

        <div className="bg-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>

          <p className="relative text-base md:text-lg text-gray-200 leading-relaxed">
            {t("vision.text")}
          </p>
        </div>
      </div>
    </section>
  );
}
