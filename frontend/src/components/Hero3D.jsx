
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'

const Hero3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (window.innerWidth < 768) return

      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1

      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full h-[420px] sm:h-[470px] lg:h-[540px] flex items-center justify-center perspective-1000 overflow-visible select-none">

      {/* Ambient glow */}
      <div
        className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-[390px] lg:h-[390px] rounded-full bg-gradient-to-br from-[#19b7c8]/25 to-[#056071]/10 blur-3xl transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -14}px, ${mousePos.y * -14}px, 0)`
        }}
      />

      {/* Main orbital ring */}
      <div
        className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-[410px] lg:h-[410px] rounded-full border border-[#19b7c8]/25 animate-spin-slow pointer-events-none"
        style={{
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0) rotateX(58deg) rotateY(12deg)`
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#19b7c8] shadow-lg shadow-[#19b7c8]/70" />

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#056071] shadow-md" />
      </div>

      {/* Secondary orbital ring */}
      <div
        className="absolute w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-dashed border-[#087f91]/25 animate-spin-slow pointer-events-none"
        style={{
          animationDirection: 'reverse',
          transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 18}px, 0) rotateX(45deg) rotateY(-18deg)`
        }}
      />

      {/* Doctor image */}
      <div
        className="relative z-10 w-56 h-64 sm:w-64 sm:h-72 lg:w-80 lg:h-96 transition-transform duration-200 ease-out flex items-end justify-center"
        style={{
          transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 30px) rotateY(${mousePos.x * 7}deg) rotateX(${mousePos.y * -7}deg)`
        }}
      >
        <div className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/70 bg-white/30 backdrop-blur-md shadow-2xl shadow-[#087f91]/15">

          <img
            src={assets.header_img}
            alt="MediAssist healthcare specialist"
            className="w-full h-full object-cover object-top"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#06202d]/45 via-transparent to-transparent" />

          <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/40" />
        </div>
      </div>

      {/* Health status card */}
      <div
        className="absolute top-4 left-0 sm:left-2 lg:-left-8 z-20 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 35}px, ${mousePos.y * 35}px, 50px)`
        }}
      >
        <div className="glass-card px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 border border-white/80 shadow-xl shadow-[#087f91]/10">

          <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#19b7c8]/15 flex items-center justify-center text-[#087f91]">
            <span className="absolute w-2.5 h-2.5 rounded-full bg-[#19b7c8] animate-ping" />

            <svg
              className="relative z-10 w-4.5 h-4.5 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>

          <div>
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-[#6c8188]">
              Healthcare Support
            </p>

            <p className="text-xs sm:text-sm font-bold text-[#082b3a]">
              Care when you need it
            </p>
          </div>
        </div>
      </div>

      {/* Booking card */}
      <div
        className="absolute bottom-5 right-0 sm:right-2 lg:-right-6 z-20 transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -30}px, 70px)`
        }}
      >
        <div className="glass-card px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 border border-white/80 shadow-xl shadow-[#087f91]/10">

          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#18a875]/12 flex items-center justify-center text-[#18a875]">
            <svg
              className="w-4.5 h-4.5 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18a875] animate-pulse" />

              <p className="text-[11px] sm:text-xs font-bold text-[#082b3a]">
                Easy Booking
              </p>
            </div>

            <p className="text-[9px] sm:text-[11px] text-[#6c8188]">
              Trusted healthcare platform
            </p>
          </div>
        </div>
      </div>

      {/* Medical cross */}
      <div
        className="absolute top-8 right-8 sm:right-12 z-20 hidden sm:flex transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 42}px, ${mousePos.y * 28}px, 80px)`
        }}
      >
        <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-[#19b7c8] to-[#056071] text-white flex items-center justify-center shadow-lg shadow-[#087f91]/30 animate-float">
          <svg
            className="w-5 h-5 lg:w-6 lg:h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5S10.5 4.17 10.5 5v5.5H5c-.83 0-1.5.67-1.5 1.5S4.17 13.5 5 13.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5S19.83 10.5 19 10.5z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Hero3D
