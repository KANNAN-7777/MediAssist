
import React from 'react'

const MedicalBackground = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top-left ambient glow */}
      <div className="absolute -top-48 -left-48 w-[560px] h-[560px] rounded-full bg-gradient-to-br from-[#19b7c8]/10 to-transparent blur-3xl" />

      {/* Right-side ambient glow */}
      <div className="absolute top-1/3 -right-48 w-[480px] h-[480px] rounded-full bg-gradient-to-bl from-[#087f91]/8 to-transparent blur-3xl" />

      {/* Bottom ambient glow */}
      <div className="absolute -bottom-56 left-1/4 w-[620px] h-[620px] rounded-full bg-gradient-to-t from-[#19b7c8]/7 via-transparent to-transparent blur-3xl" />

      {/* Subtle medical grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(25,183,200,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(25,183,200,0.035) 1px, transparent 1px)',
          backgroundSize: '4rem 4rem'
        }}
      />

      {/* Small floating particles */}
      <div className="absolute top-1/4 left-[8%] w-1.5 h-1.5 rounded-full bg-[#19b7c8]/35" />

      <div className="absolute top-[62%] right-[9%] w-2 h-2 rounded-full bg-[#087f91]/25" />

      <div className="absolute bottom-[20%] left-[34%] w-1.5 h-1.5 rounded-full bg-[#19b7c8]/25" />
    </div>
  )
}

export default MedicalBackground
