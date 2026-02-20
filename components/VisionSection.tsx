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
        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 tracking-tight">
          {t("vision.title")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            {t("vision.subtitle")}
          </span>
        </h2>

        <div className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/50 shadow-2xl relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>

          <p className="relative text-lg md:text-2xl text-gray-800 font-medium leading-relaxed mb-6">
            {t("vision.text1")}{" "}
            <span className="font-bold text-purple-700">
              {t("vision.understand")}
            </span>
            ,{" "}
            <span className="font-bold text-blue-700">
              {t("vision.empathize")}
            </span>
            , {t("vision.text1").includes("and") ? "and" : "et"}{" "}
            <span className="font-bold text-green-700">
              {t("vision.resolve")}
            </span>
            .
          </p>
          <p className="relative text-base md:text-lg text-gray-700 leading-relaxed">
            {t("vision.text2")}
          </p>
        </div>
      </div>
    </section>
  );
}
