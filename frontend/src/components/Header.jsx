import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    let animationFrame

    const handleMouseMove = (event) => {
      if (window.innerWidth < 768) return

      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }

      animationFrame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = (event.clientY / window.innerHeight) * 2 - 1

        setMousePos({
          x,
          y
        })
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)

      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [])

  const handleFindDoctor = () => {
    navigate('/doctors')
    window.scrollTo(0, 0)
  }

  return (
    <section className="relative mt-3 sm:mt-4 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#056071] via-[#087f91] to-[#19b7c8]">

      <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-cyan-300/10 blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-white/[0.04] blur-3xl pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)',
          backgroundSize: '42px 42px'
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] min-h-[650px] lg:min-h-[560px]">

        {/* LEFT */}

        <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-14 lg:py-12">

          <div className="inline-flex items-center gap-2 w-fit px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">

            <span className="relative flex w-2 h-2">

              <span className="absolute inset-0 rounded-full bg-[#8ff3dc] opacity-60 animate-ping" />

              <span className="relative w-2 h-2 rounded-full bg-[#8ff3dc]" />

            </span>

            <span className="text-white/90 text-[10px] sm:text-xs font-semibold">
              Trusted Healthcare Platform
            </span>

          </div>


          <h1 className="mt-5 text-[34px] sm:text-4xl lg:text-[44px] xl:text-[50px] leading-[1.08] font-bold text-white tracking-tight">

            Healthcare that

            <br />

            <span className="text-[#baf7f8]">
              puts you first.
            </span>

          </h1>


          <p className="mt-4 max-w-[510px] text-[13px] sm:text-sm lg:text-[15px] text-white/75 leading-6 sm:leading-7">
            Find trusted doctors, book appointments, and manage your
            healthcare journey — all in one simple and secure platform.
          </p>


          <div className="flex items-center gap-3 mt-5">

            <img
              src={assets.group_profiles}
              alt="Patients"
              className="w-20 sm:w-24 lg:w-28"
            />

            <div>

              <p className="text-xs sm:text-sm text-white/90 font-medium">
                Connect with trusted doctors
              </p>

              <p className="text-[11px] sm:text-xs text-white/60 mt-0.5">
                at your convenience.
              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={handleFindDoctor}
            className="mt-6 w-fit flex items-center gap-3 bg-white text-[#056071] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-black/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 active:translate-y-0"
          >

            <span>
              Find a Doctor
            </span>

            <span className="w-7 h-7 rounded-full bg-[#e8f9fa] flex items-center justify-center">

              <img
                src={assets.arrow_icon}
                alt=""
                className="w-3"
              />

            </span>

          </button>


          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] sm:text-[11px] text-white/60">

            <span className="flex items-center gap-1.5">

              <span className="w-1.5 h-1.5 rounded-full bg-[#8ff3dc]" />

              Secure platform

            </span>

            <span className="flex items-center gap-1.5">

              <span className="w-1.5 h-1.5 rounded-full bg-[#8ff3dc]" />

              Verified doctors

            </span>

            <span className="flex items-center gap-1.5">

              <span className="w-1.5 h-1.5 rounded-full bg-[#8ff3dc]" />

              Easy appointments

            </span>

          </div>

        </div>


        {/* RIGHT */}

        <div className="relative min-h-[400px] lg:min-h-0 flex items-center justify-center lg:justify-start overflow-visible">

          {/* Ambient Glow */}

          <div
            className="absolute w-64 h-64 sm:w-80 sm:h-80 lg:w-[390px] lg:h-[390px] rounded-full bg-gradient-to-br from-white/15 to-cyan-200/5 blur-3xl transition-transform duration-500 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0)`
            }}
          />


          {/* Main Orbit */}

          <div
            className="absolute w-72 h-72 sm:w-80 sm:h-80 lg:w-[410px] lg:h-[410px] rounded-full border border-white/20 animate-spin-slow pointer-events-none"
            style={{
              transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0) rotateX(58deg) rotateY(12deg)`
            }}
          >

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#baf7f8] shadow-lg shadow-cyan-200/70" />

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white/70" />

          </div>


          {/* Secondary Orbit */}

          <div
            className="absolute w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full border border-dashed border-white/20 animate-spin-slow pointer-events-none"
            style={{
              animationDirection: 'reverse',
              transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14}px, 0) rotateX(45deg) rotateY(-18deg)`
            }}
          />


          {/* MAIN IMAGE */}

          <div
            className="relative z-10 w-[300px] h-64 sm:w-[360px] sm:h-72 lg:w-[470px] lg:h-96 xl:w-[520px] transition-transform duration-200 ease-out"
            style={{
              transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 30px) rotateY(${mousePos.x * 5}deg) rotateX(${mousePos.y * -5}deg)`
            }}
          >

            <div className="absolute inset-0 rounded-[28px] overflow-hidden border border-white/60 bg-white/20 backdrop-blur-md shadow-2xl">

              <img
                src={assets.header_img}
                alt="MediAssist healthcare specialist"
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#06202d]/50 via-transparent to-transparent" />

              <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/30" />

            </div>

          </div>


          {/* HEALTHCARE SUPPORT */}

          <div
            className="absolute top-8 left-1 sm:left-4 lg:left-0 z-20 transition-transform duration-300"
            style={{
              transform: `translate3d(${mousePos.x * 28}px, ${mousePos.y * 28}px, 50px)`
            }}
          >

            <div className="bg-white/90 backdrop-blur-xl px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 border border-white shadow-xl">

              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#19b7c8]/15 flex items-center justify-center text-[#087f91]">

                <span className="absolute w-2.5 h-2.5 rounded-full bg-[#19b7c8] animate-ping" />

                <svg
                  className="relative z-10 w-4 h-4 sm:w-5 sm:h-5"
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


          {/* BOOKING */}

          <div
            className="absolute bottom-7 right-1 sm:right-4 lg:right-8 z-20 transition-transform duration-300"
            style={{
              transform: `translate3d(${mousePos.x * -24}px, ${mousePos.y * -24}px, 70px)`
            }}
          >

            <div className="bg-white/90 backdrop-blur-xl px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl flex items-center gap-2.5 sm:gap-3 border border-white shadow-xl">

              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#18a875]/10 flex items-center justify-center text-[#18a875]">

                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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


          {/* MEDICAL CROSS */}

          <div
            className="absolute top-8 right-8 sm:right-12 lg:right-20 z-20 hidden sm:flex transition-transform duration-300"
            style={{
              transform: `translate3d(${mousePos.x * 32}px, ${mousePos.y * 22}px, 80px)`
            }}
          >

            <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-br from-[#19b7c8] to-[#056071] text-white flex items-center justify-center shadow-lg shadow-black/20 animate-float">

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

      </div>

    </section>
  )
}

export default Header