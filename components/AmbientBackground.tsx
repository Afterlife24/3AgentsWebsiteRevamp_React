import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large teal glow - left side */}
      <div className="absolute top-[20%] left-[-10%] w-[50vw] h-[50vw] bg-[#00d4aa] rounded-full filter blur-[150px] opacity-20 animate-blob"></div>

      {/* Large cyan/blue glow - center right */}
      <div className="absolute top-[30%] right-[10%] w-[45vw] h-[45vw] bg-[#0099cc] rounded-full filter blur-[140px] opacity-15 animate-blob animation-delay-2000"></div>

      {/* Subtle green glow - bottom left */}
      <div className="absolute bottom-[10%] left-[15%] w-[40vw] h-[40vw] bg-[#00aa88] rounded-full filter blur-[130px] opacity-12 animate-blob animation-delay-4000"></div>
    </div>
  );
}
