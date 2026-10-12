
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  const visualRef = useRef(null)

  useEffect(() => {
    const visual = visualRef.current

    if (!visual) return

    const handleMouseMove = (event) => {
      if (window.innerWidth < 768) return

      const rect = visual.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      if (!centerX || !centerY) return

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const rotateY = ((x - centerX) / centerX) * 1.8
      const rotateX = ((y - centerY) / centerY) * -1.8

      visual.style.transform =
        `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }

    const handleMouseLeave = () => {
      visual.style.transform =
        'perspective(1400px) rotateX(0deg) rotateY(0deg)'
    }

    visual.addEventListener('mousemove', handleMouseMove)
    visual.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      visual.removeEventListener('mousemove', handleMouseMove)
      visual.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="mediassist-landing relative min-h-screen overflow-hidden bg-[#f3fbfd] text-[#082b3a]">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#19b7c8]/10 blur-[110px]" />
        <div className="absolute -right-[120px] top-[10%] h-[600px] w-[600px] rounded-full bg-[#19b7c8]/15 blur-[120px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-[#087f91]/10 blur-[100px]" />
      </div>

      {/* Flowing hospital artwork */}
      <div
        ref={visualRef}
        className="hospital-flow pointer-events-none absolute z-0"
        aria-hidden="true"
      >
        <img
          src="/Gemini_Generated_Image_a66gyja66gyja66g.png"
          alt=""
          className="hospital-flow-image"
          fetchPriority="high"
        />

        {/* Soft cover for the Gemini sparkle */}
        <div className="hospital-watermark-cover" />

        {/* Subtle lighting */}
        <div className="hospital-light" />

        {/* Decorative motion */}
        <span className="hospital-dot hospital-dot-one" />
        <span className="hospital-dot hospital-dot-two" />
      </div>

      {/* Main content */}
      <main className="relative z-10 mx-auto flex min-h-screen max-w-[1660px] items-center px-6 py-12 sm:px-10 lg:px-[7.3%]">
        <section className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">

          {/* Left content */}
          <div className="relative z-20">

            {/* Platform badge */}
            <div className="landing-enter mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#ccecef] bg-white/85 px-5 py-3 shadow-[0_3px_12px_rgba(8,127,145,0.05)] backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#18a875]/40" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-[#18a875]" />
              </span>

              <span className="text-sm font-bold tracking-tight text-[#176b78]">
                MediAssist Healthcare Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 className="landing-enter landing-delay-1 text-[clamp(3rem,5.2vw,5.5rem)] font-extrabold leading-[1.03] tracking-[-0.055em] text-[#082b3a]">
              Healthcare
              <span className="block bg-gradient-to-r from-[#087f91] via-[#19b7c8] to-[#087f91] bg-clip-text text-transparent">
                management,
              </span>
              <span className="block">made simple.</span>
            </h1>

            {/* Description */}
            <p className="landing-enter landing-delay-2 mt-7 max-w-[650px] text-base leading-[1.8] text-[#415c69] sm:text-lg">
              A secure workspace designed for MediAssist administrators and
              doctors to manage healthcare operations efficiently.
            </p>

            {/* Role selection */}
            <div className="landing-enter landing-delay-3 mt-9 grid max-w-[750px] grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Admin portal */}
              <button
                type="button"
                onClick={() => navigate('/admin-login')}
                aria-label="Open Admin Portal login"
                className="group relative min-h-[210px] overflow-hidden rounded-[23px] border border-[#d6ebee]/90 bg-white/90 p-6 text-left shadow-[0_5px_20px_rgba(8,127,145,0.045)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#19b7c8]/60 hover:bg-white hover:shadow-[0_22px_45px_rgba(8,127,145,0.13)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#19b7c8]/30"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#e8f8fa] transition-transform duration-700 group-hover:scale-125" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#e6f7f8] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#d2f0f2]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
                      <path
                        d="M12 2.8 19 5.5v5.9c0 4.8-3 8.2-7 9.9-4-1.7-7-5.1-7-9.9V5.5l7-2.7Z"
                        fill="#19b7c8"
                        stroke="#087f91"
                        strokeWidth="1.2"
                      />
                      <path
                        d="m8.7 12 2.1 2.1 4.6-4.8"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <span className="relative text-2xl text-[#16899a] transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>

                <div className="relative mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.09em] text-[#087f91]">
                    Management
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#082b3a]">
                    Admin Portal
                  </h2>
                  <p className="mt-3 max-w-[270px] text-sm leading-6 text-[#415c69]">
                    Manage doctors, appointments and operations.
                  </p>
                </div>
              </button>

              {/* Doctor portal */}
              <button
                type="button"
                onClick={() => navigate('/doctor-login')}
                aria-label="Open Doctor Portal login"
                className="group relative min-h-[210px] overflow-hidden rounded-[23px] border border-[#d6ebee]/90 bg-white/90 p-6 text-left shadow-[0_5px_20px_rgba(8,127,145,0.045)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#19b7c8]/60 hover:bg-white hover:shadow-[0_22px_45px_rgba(8,127,145,0.13)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#19b7c8]/30"
              >
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#e8f8fa] transition-transform duration-700 group-hover:scale-125" />

                <div className="relative flex items-center justify-between">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-2xl bg-[#e6f7f8] transition-all duration-500 group-hover:scale-105 group-hover:bg-[#d2f0f2]">
                    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8" aria-hidden="true">
                      <path
                        d="M7 3v5M11 3v5M5 8h8V4.5A1.5 1.5 0 0 0 11.5 3h-5A1.5 1.5 0 0 0 5 4.5V8Z"
                        stroke="#087f91"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 8v3.5a4 4 0 0 0 8 0V10"
                        stroke="#087f91"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="17" cy="8" r="2" fill="#19b7c8" />
                      <path
                        d="M17 10v5a3 3 0 0 0 3 3h1"
                        stroke="#087f91"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <span className="relative text-2xl text-[#16899a] transition-transform duration-300 group-hover:translate-x-1.5">
                    →
                  </span>
                </div>

                <div className="relative mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.09em] text-[#087f91]">
                    Healthcare
                  </p>
                  <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-[#082b3a]">
                    Doctor Portal
                  </h2>
                  <p className="mt-3 max-w-[270px] text-sm leading-6 text-[#415c69]">
                    Manage appointments and patient information.
                  </p>
                </div>
              </button>
            </div>

            {/* Security note */}
            <p className="landing-enter landing-delay-4 mt-7 flex items-center gap-2 text-sm text-[#415c69]">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0 text-[#087f91]" aria-hidden="true">
                <path
                  d="M12 3 19 6v5.5c0 4.4-2.8 7.7-7 9.5-4.2-1.8-7-5.1-7-9.5V6l7-3Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              Secure access for authorized MediAssist staff only
            </p>
          </div>

          {/* Space for the hospital artwork */}
          <div className="hidden min-h-[500px] lg:block" aria-hidden="true" />
        </section>
      </main>

      {/* Hospital movement and landing animations */}
      <style>{`
        .hospital-flow {
          top: 0;
          right: -2%;
          width: 64%;
          height: 100%;
          min-height: 700px;
          transform-style: preserve-3d;
          transform-origin: center;
          transition: transform 300ms ease-out;
          animation: hospitalAppear 1.2s ease-out both;
        }

        .hospital-flow-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center right;
          transform-origin: 70% 50%;
          animation: hospitalMotion 12s ease-in-out infinite;

          -webkit-mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              rgba(0, 0, 0, 0.18) 8%,
              black 28%,
              black 88%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              transparent 0%,
              black 8%,
              black 88%,
              transparent 100%
            );

          -webkit-mask-composite: source-in;

          mask-image:
            linear-gradient(
              to right,
              transparent 0%,
              rgba(0, 0, 0, 0.18) 8%,
              black 28%,
              black 88%,
              transparent 100%
            ),
            linear-gradient(
              to bottom,
              transparent 0%,
              black 8%,
              black 88%,
              transparent 100%
            );

          mask-composite: intersect;
        }

        .hospital-watermark-cover {
          position: absolute;
          right: 7%;
          bottom: 11%;
          width: 65px;
          height: 65px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            #f3fbfd 15%,
            rgba(243, 251, 253, 0.96) 45%,
            rgba(243, 251, 253, 0) 75%
          );
          filter: blur(2px);
          pointer-events: none;
        }

        .hospital-light {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              ellipse at 72% 43%,
              rgba(25, 183, 200, 0.12),
              transparent 52%
            ),
            linear-gradient(
              to left,
              transparent 65%,
              rgba(243, 251, 253, 0.65) 100%
            );
          pointer-events: none;
          animation: lightBreathing 9s ease-in-out infinite;
        }

        .hospital-dot {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #19b7c8;
          box-shadow: 0 0 22px rgba(25, 183, 200, 0.35);
          pointer-events: none;
        }

        .hospital-dot-one {
          top: 28%;
          right: 13%;
          animation: dotFloat 4s ease-in-out infinite;
        }

        .hospital-dot-two {
          bottom: 15%;
          left: 22%;
          width: 8px;
          height: 8px;
          background: #087f91;
          animation: dotFloat 5s ease-in-out infinite reverse;
        }

        @keyframes hospitalAppear {
          from {
            opacity: 0;
            translate: 35px 0;
          }
          to {
            opacity: 1;
            translate: 0 0;
          }
        }

        @keyframes hospitalMotion {
          0%, 100% {
            transform: scale(1) translate3d(0, 0, 0);
          }
          50% {
            transform: scale(1.045) translate3d(-8px, -7px, 0);
          }
        }

        @keyframes lightBreathing {
          0%, 100% {
            opacity: 0.65;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes dotFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes landingEnter {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .landing-enter {
          animation: landingEnter 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .landing-delay-1 { animation-delay: 100ms; }
        .landing-delay-2 { animation-delay: 200ms; }
        .landing-delay-3 { animation-delay: 300ms; }
        .landing-delay-4 { animation-delay: 400ms; }

        @media (max-width: 1023px) {
          .hospital-flow {
            top: 40px;
            right: -20%;
            width: 85%;
            height: 560px;
            min-height: 0;
            opacity: 0.19;
          }

          .hospital-flow-image {
            object-position: center right;
          }

          .hospital-watermark-cover {
            right: 8%;
            bottom: 12%;
          }

          .hospital-light {
            display: none;
          }
        }

        @media (max-width: 639px) {
          .hospital-flow {
            top: 100px;
            right: -48%;
            width: 120%;
            height: 440px;
            opacity: 0.12;
          }

          .hospital-watermark-cover {
            width: 40px;
            height: 40px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .landing-enter,
          .hospital-flow,
          .hospital-flow-image,
          .hospital-light,
          .hospital-dot {
            animation: none !important;
          }

          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Landing
