import React from "react";
import AmbientBackground from "../../../components/AmbientBackground";
import NavBar from "../../../components/NavBar";
import PricingContent from "./PricingContent";

export default function Pricing() {
  return (
    <div className="h-screen w-full bg-[#F0F4F8] font-sans overflow-hidden relative flex flex-col">
      <AmbientBackground />
      <NavBar />
      <PricingContent />
    </div>
  );
}

