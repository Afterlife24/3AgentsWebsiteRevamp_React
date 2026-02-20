import React from "react";

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Blob 1 */}
      <div className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-[#A0E1E1] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-50 md:opacity-60 animate-blob"></div>
      
      {/* Blob 2 */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] md:w-[50vw] md:h-[50vw] bg-[#D4C4FB] rounded-full mix-blend-multiply filter blur-[80px] md:blur-[100px] opacity-50 md:opacity-60 animate-blob animation-delay-2000"></div>
      
      {/* Blob 3 (Desktop only) */}
      <div className="hidden md:block absolute top-[20%] left-[30%] w-[40vw] h-[40vw] bg-[#AFF8D8] rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-4000"></div>
    </div>
  );
}
