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

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateY = ((x - centerX) / centerX) * 8
      const rotateX = ((y - centerY) / centerY) * -8

      visual.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`
    }

    const handleMouseLeave = () => {
      visual.style.transform =
        'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)'
    }

    visual.addEventListener('mousemove', handleMouseMove)
    visual.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      visual.removeEventListener('mousemove', handleMouseMove)
      visual.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3fbfd]">

      {/* Background Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            -left-32
            -top-32
            h-80
            w-80
            rounded-full
            bg-[#19b7c8]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-32
            top-1/3
            h-96
            w-96
            rounded-full
            bg-[#087f91]/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-180px]
            left-1/3
            h-96
            w-96
            rounded-full
            bg-[#19b7c8]/10
            blur-3xl
          "
        />

      </div>

      {/* Header */}
      <header
        className="
          relative
          z-20
          border-b
          border-[#dceff2]
          bg-white/80
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            max-w-7xl
            items-center
            justify-between
            px-6
            py-4
          "
        >

          <img
            src="/mediassist-logo.png"
            alt="MediAssist"
            className="
              h-11
              w-auto
              transition-transform
              duration-500
              hover:scale-105
            "
          />

          <div
            className="
              rounded-full
              border
              border-[#ccecef]
              bg-[#e8f8fa]
              px-4
              py-2
              text-xs
              font-bold
              text-[#087f91]
            "
          >
            STAFF PORTAL
          </div>

        </div>

      </header>

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl px-6">

        <section
          className="
            grid
            min-h-[calc(100vh-76px)]
            items-center
            gap-12
            py-12
            lg:grid-cols-[1fr_0.9fr]
            lg:gap-20
          "
        >

          {/* LEFT */}
          <div className="text-center lg:text-left">

            {/* Badge */}
            <div
              className="
                mb-6
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#ccecef]
                bg-white/80
                px-4
                py-2
                text-xs
                font-bold
                text-[#087f91]
                shadow-sm
                backdrop-blur
                animate-fade-in
              "
            >

              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-[#18a875]
                "
              />

              MediAssist Healthcare Platform

            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-[#082b3a]
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >

              Healthcare

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-[#087f91]
                  via-[#19b7c8]
                  to-[#087f91]
                  bg-clip-text
                  text-transparent
                "
              >
                management,
              </span>

              made simple.

            </h1>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-6
                max-w-xl
                text-sm
                leading-7
                text-[#6c8188]
                sm:text-base
                lg:mx-0
              "
            >
              A secure workspace designed for MediAssist administrators
              and doctors to manage healthcare operations efficiently.
            </p>

            {/* Role Cards */}
            <div
              className="
                mt-10
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
              "
            >

              {/* ADMIN */}
              <button
                type="button"
                onClick={() => navigate('/admin-login')}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#dceff2]
                  bg-white
                  p-5
                  text-left
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#19b7c8]
                  hover:shadow-[0_25px_60px_rgba(8,127,145,0.16)]
                "
              >

                <div
                  className="
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-[#19b7c8]/10
                    transition-transform
                    duration-700
                    group-hover:scale-[2]
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#e8f8fa]
                      text-xl
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:bg-[#087f91]
                    "
                  >
                    🛡️
                  </div>

                  <span
                    className="
                      text-lg
                      text-[#087f91]
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>

                </div>

                <div className="relative mt-5">

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-[#087f91]
                    "
                  >
                    Management
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl
                      font-bold
                      text-[#082b3a]
                    "
                  >
                    Admin Portal
                  </h2>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-[#6c8188]
                    "
                  >
                    Manage doctors, appointments and operations.
                  </p>

                </div>

              </button>

              {/* DOCTOR */}
              <button
                type="button"
                onClick={() => navigate('/doctor-login')}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-[#dceff2]
                  bg-white
                  p-5
                  text-left
                  shadow-sm
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-[#19b7c8]
                  hover:shadow-[0_25px_60px_rgba(8,127,145,0.16)]
                "
              >

                <div
                  className="
                    absolute
                    -right-10
                    -top-10
                    h-24
                    w-24
                    rounded-full
                    bg-[#19b7c8]/10
                    transition-transform
                    duration-700
                    group-hover:scale-[2]
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-[#e8f8fa]
                      text-xl
                      transition-all
                      duration-500
                      group-hover:scale-110
                      group-hover:bg-[#087f91]
                    "
                  >
                    🩺
                  </div>

                  <span
                    className="
                      text-lg
                      text-[#087f91]
                      transition-transform
                      duration-500
                      group-hover:translate-x-1
                    "
                  >
                    →
                  </span>

                </div>

                <div className="relative mt-5">

                  <p
                    className="
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-widest
                      text-[#087f91]
                    "
                  >
                    Healthcare
                  </p>

                  <h2
                    className="
                      mt-1
                      text-xl
                      font-bold
                      text-[#082b3a]
                    "
                  >
                    Doctor Portal
                  </h2>

                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-[#6c8188]
                    "
                  >
                    Manage appointments and patient information.
                  </p>

                </div>

              </button>

            </div>

            <p
              className="
                mt-6
                text-xs
                text-[#8aa0a6]
              "
            >
              Secure access for authorized MediAssist staff only
            </p>

          </div>


          {/* RIGHT 3D VISUAL */}
          <div
            ref={visualRef}
            className="
              relative
              mx-auto
              flex
              h-[430px]
              w-full
              max-w-[500px]
              items-center
              justify-center
              transition-transform
              duration-500
              ease-out
            "
          >

            {/* Outer Ring */}
            <div
              className="
                absolute
                h-[330px]
                w-[330px]
                animate-spin-slow
                rounded-full
                border
                border-dashed
                border-[#19b7c8]/30
              "
            />

            {/* Inner Ring */}
            <div
              className="
                absolute
                h-[270px]
                w-[270px]
                animate-spin-reverse
                rounded-full
                border
                border-[#087f91]/20
              "
            />

            {/* Glow */}
            <div
              className="
                absolute
                h-64
                w-64
                animate-pulse
                rounded-full
                bg-[#19b7c8]/20
                blur-3xl
              "
            />

            {/* Main Glass Circle */}
            <div
              className="
                relative
                flex
                h-64
                w-64
                items-center
                justify-center
                rounded-full
                border
                border-white/80
                bg-white/70
                shadow-[0_30px_80px_rgba(8,127,145,0.18)]
                backdrop-blur-xl
                animate-float
              "
            >

              <div
                className="
                  flex
                  h-44
                  w-44
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-[#e8f8fa]
                  to-white
                  shadow-inner
                "
              >

                <div
                  className="
                    flex
                    h-28
                    w-28
                    items-center
                    justify-center
                    rounded-3xl
                    bg-[#087f91]
                    text-5xl
                    shadow-[0_15px_40px_rgba(8,127,145,0.35)]
                    animate-float-reverse
                  "
                >
                  ⚕
                </div>

              </div>

            </div>


            {/* Floating Doctor Card */}
            <div
              className="
                absolute
                left-0
                top-16
                rounded-2xl
                border
                border-white/80
                bg-white/90
                px-4
                py-3
                shadow-lg
                backdrop-blur-xl
                animate-float-small
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#e8f8fa]
                  "
                >
                  👨‍⚕️
                </div>

                <div>

                  <p className="text-[10px] text-[#8aa0a6]">
                    Healthcare
                  </p>

                  <p className="text-xs font-bold text-[#082b3a]">
                    Doctor Portal
                  </p>

                </div>

              </div>

            </div>


            {/* Floating Admin Card */}
            <div
              className="
                absolute
                bottom-16
                right-0
                rounded-2xl
                border
                border-white/80
                bg-white/90
                px-4
                py-3
                shadow-lg
                backdrop-blur-xl
                animate-float-small-reverse
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#e8f8fa]
                  "
                >
                  🛡️
                </div>

                <div>

                  <p className="text-[10px] text-[#8aa0a6]">
                    Management
                  </p>

                  <p className="text-xs font-bold text-[#082b3a]">
                    Admin Portal
                  </p>

                </div>

              </div>

            </div>


            {/* Floating Dots */}
            <span
              className="
                absolute
                right-16
                top-12
                h-3
                w-3
                animate-ping
                rounded-full
                bg-[#19b7c8]
              "
            />

            <span
              className="
                absolute
                bottom-10
                left-20
                h-2
                w-2
                animate-pulse
                rounded-full
                bg-[#087f91]
              "
            />

          </div>

        </section>

      </main>

      {/* Animation CSS */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes floatSmall {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }

          to {
            transform: rotate(0deg);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 5s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float 4s ease-in-out infinite reverse;
        }

        .animate-float-small {
          animation: floatSmall 4s ease-in-out infinite;
        }

        .animate-float-small-reverse {
          animation: floatSmall 5s ease-in-out infinite reverse;
        }

        .animate-spin-slow {
          animation: spinSlow 20s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 15s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

    </div>
  )
}

export default Landing