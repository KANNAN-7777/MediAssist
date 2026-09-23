import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const glowRef = useRef(null)
  const orbRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    const orb = orbRef.current

    if (!glow || !orb) return

    let frame
    let startTime = null

    const animate = (time) => {
      if (!startTime) startTime = time

      const elapsed = time - startTime

      const glowX = Math.sin(elapsed / 1500) * 18
      const glowY = Math.cos(elapsed / 1800) * 12
      const glowScale = 1 + Math.sin(elapsed / 1200) * 0.05

      const orbY = Math.sin(elapsed / 1100) * 5
      const orbRotate = elapsed / 85

      glow.style.transform =
        `translate3d(${glowX}px, ${glowY}px, 0) scale(${glowScale})`

      orb.style.transform =
        `translate3d(0, ${orbY}px, 0) rotate(${orbRotate}deg)`

      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [])

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="mt-10 sm:mt-14">

      <div
        className="
          relative
          overflow-hidden
          rounded-t-[30px]
          bg-[#061f2c]
          border-t
          border-[#19b7c8]/15
        "
      >

        <div
          ref={glowRef}
          className="
            absolute
            -right-24
            -top-36
            w-[380px]
            h-[380px]
            rounded-full
            bg-[#19b7c8]/16
            blur-[95px]
            pointer-events-none
            will-change-transform
          "
        />

        <div
          className="
            absolute
            -left-32
            -bottom-44
            w-[420px]
            h-[420px]
            rounded-full
            bg-[#087f91]/14
            blur-[100px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            left-[38%]
            top-[35%]
            w-40
            h-40
            rounded-full
            bg-[#6ee7c5]/[0.025]
            blur-[80px]
            pointer-events-none
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            pointer-events-none
            bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
            bg-[size:38px_38px]
          "
        />

        {/* Decorative orbit */}

        <div
          ref={orbRef}
          className="
            absolute
            right-[5%]
            top-[7%]
            w-28
            h-28
            sm:w-36
            sm:h-36
            rounded-full
            border
            border-[#19b7c8]/15
            pointer-events-none
            will-change-transform
          "
        >
          <div className="absolute inset-4 rounded-full border border-white/[0.06]" />

          <div className="absolute inset-9 rounded-full border border-[#19b7c8]/10" />

          <div
            className="
              absolute
              top-1/2
              left-1/2
              w-2.5
              h-2.5
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#6ee7c5]
              shadow-[0_0_20px_rgba(110,231,197,0.7)]
            "
          />
        </div>

        {/* Main content */}

        <div
          className="
            relative
            z-10
            px-5
            sm:px-8
            lg:px-12
            pt-9
            sm:pt-11
            lg:pt-12
          "
        >

          {/* Top brand area */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-6
              pb-8
              border-b
              border-white/[0.08]
            "
          >

            <div className="max-w-2xl">

              <button
                type="button"
                onClick={goTop}
                className="
                  group
                  inline-flex
                  items-center
                  rounded-xl
                  bg-white
                  px-3.5
                  py-2
                  shadow-[0_8px_25px_rgba(0,0,0,0.14)]
                  hover:-translate-y-1
                  hover:shadow-[0_14px_32px_rgba(0,0,0,0.18)]
                  transition-all
                  duration-300
                "
              >
                <img
                  src="/mediassist-logo.png"
                  alt="MediAssist"
                  className="
                    w-28
                    sm:w-32
                    h-auto
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-[1.03]
                  "
                />
              </button>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-[11px]
                  sm:text-xs
                  leading-6
                  text-white/45
                "
              >
                Connecting patients with trusted healthcare professionals
                through a simpler, smarter and more convenient experience.
              </p>

            </div>

            <div
              className="
                flex
                items-center
                gap-3
                w-fit
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.045]
                px-4
                py-3
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#19b7c8]/10
                  border
                  border-[#19b7c8]/15
                  text-[#8ee9ee]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s8-4.5 8-10.5A4.5 4.5 0 0015.5 6c-1.5 0-2.7.7-3.5 1.8C11.2 6.7 10 6 8.5 6A4.5 4.5 0 004 10.5C4 16.5 12 21 12 21z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[9px] tracking-[0.15em] text-white/30">
                  YOUR HEALTH
                </p>

                <p className="mt-0.5 text-[11px] font-bold text-white/75">
                  Our priority
                </p>
              </div>

            </div>

          </div>

          {/* Navigation and contact */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-[1fr_1fr_1.2fr]
              gap-8
              sm:gap-9
              lg:gap-16
              py-8
              sm:py-9
            "
          >

            {/* Explore */}

            <div>

              <p
                className="
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  tracking-[0.2em]
                  text-[#8ee9ee]
                  mb-4
                "
              >
                EXPLORE
              </p>

              <nav className="grid grid-cols-2 gap-x-5 gap-y-3">

                <Link
                  to="/"
                  onClick={goTop}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-xs
                    sm:text-sm
                    text-white/50
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <span className="w-1 h-1 rounded-full bg-[#19b7c8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={goTop}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-xs
                    sm:text-sm
                    text-white/50
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <span className="w-1 h-1 rounded-full bg-[#19b7c8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>

                <Link
                  to="/doctors"
                  onClick={goTop}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-xs
                    sm:text-sm
                    text-white/50
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <span className="w-1 h-1 rounded-full bg-[#19b7c8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Find a Doctor
                </Link>

                <Link
                  to="/contact"
                  onClick={goTop}
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    text-xs
                    sm:text-sm
                    text-white/50
                    hover:text-white
                    transition-all
                    duration-300
                  "
                >
                  <span className="w-1 h-1 rounded-full bg-[#19b7c8] opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact
                </Link>

                <span className="text-xs sm:text-sm text-white/20">
                  Privacy Policy
                </span>

              </nav>

            </div>

            {/* Contact */}

            <div>

              <p
                className="
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  tracking-[0.2em]
                  text-[#8ee9ee]
                  mb-4
                "
              >
                CONTACT
              </p>

              <div className="space-y-3">

                <a
                  href="tel:+918667262734"
                  className="group flex items-center gap-3"
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.05]
                      text-[#8ee9ee]
                      transition-all
                      duration-300
                      group-hover:bg-[#19b7c8]/15
                      group-hover:border-[#19b7c8]/25
                      group-hover:-translate-y-0.5
                    "
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[9px] text-white/25">
                      PHONE
                    </p>

                    <span className="text-xs sm:text-sm text-white/55 group-hover:text-white transition-colors">
                      +91 8667262734
                    </span>
                  </div>

                </a>

                <a
                  href="mailto:healthcare108@gmail.com"
                  className="group flex items-center gap-3"
                >

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      flex-shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.05]
                      text-[#8ee9ee]
                      transition-all
                      duration-300
                      group-hover:bg-[#19b7c8]/15
                      group-hover:border-[#19b7c8]/25
                      group-hover:-translate-y-0.5
                    "
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m3 7 9 6 9-6"
                      />
                    </svg>
                  </div>

                  <div className="min-w-0">

                    <p className="text-[9px] text-white/25">
                      EMAIL
                    </p>

                    <span className="text-xs sm:text-sm text-white/55 group-hover:text-white transition-colors break-all">
                      healthcare108@gmail.com
                    </span>

                  </div>

                </a>

              </div>

            </div>

            {/* Closing message */}

            <div>

              <p
                className="
                  text-[9px]
                  sm:text-[10px]
                  font-bold
                  tracking-[0.2em]
                  text-[#8ee9ee]
                  mb-4
                "
              >
                MEDIASSIST
              </p>

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white/[0.045]
                  p-4
                  sm:p-5
                  backdrop-blur-xl
                "
              >

                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-[#19b7c8]/10 blur-2xl" />

                <div className="relative">

                  <div className="flex items-center gap-2">

                    <span className="w-2 h-2 rounded-full bg-[#6ee7c5] shadow-[0_0_10px_rgba(110,231,197,0.7)]" />

                    <span className="text-[9px] font-bold tracking-[0.15em] text-white/35">
                      SMART HEALTHCARE
                    </span>

                  </div>

                  <p className="mt-3 text-sm sm:text-base font-bold leading-6 text-white/85">
                    Healthcare should feel
                    <span className="text-[#8ee9ee]"> simple.</span>
                  </p>

                  <p className="mt-1.5 text-[10px] sm:text-[11px] leading-5 text-white/35">
                    One platform for discovering doctors,
                    managing appointments and staying connected.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="border-t border-white/[0.08] py-4">

            <div
              className="
                flex
                flex-col
                sm:flex-row
                items-center
                justify-between
                gap-3
              "
            >

              <p className="text-[10px] sm:text-[11px] text-white/25 text-center sm:text-left">
                Copyright © 2026 MediAssist. All Rights Reserved.
              </p>

              <div className="flex items-center gap-2">

                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#6ee7c5] animate-ping" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#6ee7c5]" />
                </span>

                <span className="text-[10px] text-white/30">
                  Smart Healthcare Platform
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer