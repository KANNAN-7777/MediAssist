import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Banner = () => {
  const navigate = useNavigate()

  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const image = imageRef.current
    const glow = glowRef.current

    if (!section || !image || !glow) return

    let frame

    const handleMouseMove = event => {
      if (window.innerWidth < 768) return

      const rect = section.getBoundingClientRect()

      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5

      cancelAnimationFrame(frame)

      frame = requestAnimationFrame(() => {
        image.style.transform = `
          translate3d(${x * 10}px, ${y * 8}px, 0)
          rotateY(${x * 3}deg)
          rotateX(${y * -3}deg)
        `

        glow.style.transform = `
          translate3d(${x * -18}px, ${y * -12}px, 0)
        `
      })
    }

    const handleMouseLeave = () => {
      cancelAnimationFrame(frame)

      image.style.transform =
        'translate3d(0,0,0) rotateY(0deg) rotateX(0deg)'

      glow.style.transform = 'translate3d(0,0,0)'
    }

    section.addEventListener('mousemove', handleMouseMove)
    section.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener('mousemove', handleMouseMove)
      section.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const goTo = path => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  return (
    <section
      ref={sectionRef}
      className="relative mt-10 overflow-hidden rounded-[30px] bg-[#062b3a] shadow-[0_25px_70px_rgba(6,43,58,0.18)]"
    >

      <div className="absolute inset-0 pointer-events-none">

        <div
          ref={glowRef}
          className="absolute -right-24 -top-32 h-[430px] w-[430px] rounded-full bg-[#19b7c8]/20 blur-[90px] transition-transform duration-700 ease-out"
        />

        <div className="absolute -left-28 bottom-[-180px] h-[400px] w-[400px] rounded-full bg-[#087f91]/20 blur-[90px]" />

        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '34px 34px'
          }}
        />

        <div className="absolute right-[30%] top-[-90px] h-52 w-52 rounded-full border border-[#19b7c8]/15" />

        <div className="absolute right-[25%] top-[-55px] h-36 w-36 rounded-full border border-white/10" />

      </div>

      <div className="relative z-10 grid min-h-[620px] grid-cols-1 sm:min-h-[650px] lg:min-h-[430px] lg:grid-cols-[1fr_0.9fr]">

        <div className="flex flex-col justify-center px-6 py-10 sm:px-9 sm:py-12 lg:px-12 lg:py-10">

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#19b7c8]/20 bg-white/[0.07] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8cecf0] backdrop-blur-md">

            <span className="h-1.5 w-1.5 rounded-full bg-[#19b7c8] shadow-[0_0_10px_rgba(25,183,200,0.8)]" />

            Your health, our priority

          </div>

          <h2 className="mt-5 max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-[42px]">

            <span className="block leading-tight">
              The right doctor.
            </span>

            <span className="block leading-tight text-[#67dce3]">
              At the right time.
            </span>

          </h2>

          <p className="mt-4 max-w-lg text-[12px] leading-6 text-white/65 sm:text-sm">
            Connect with trusted healthcare specialists, book appointments,
            and manage your care from one simple platform.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={() => goTo('/login')}
              className="group inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 text-xs font-extrabold text-[#087f91] shadow-[0_10px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#eaf9fa] hover:shadow-[0_15px_32px_rgba(0,0,0,0.18)]"
            >
              Create an account

              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>

            <button
              type="button"
              onClick={() => goTo('/doctors')}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-5 text-xs font-bold text-white/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#19b7c8]/40 hover:bg-white/[0.1] hover:text-white"
            >
              Find a doctor
            </button>

          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-white/10 pt-5">

            <div className="flex items-center gap-2">

              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#19b7c8]/15 text-[#67dce3]">

                <svg
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />
                </svg>

              </div>

              <div>

                <p className="text-[9px] font-bold text-white/85">
                  Trusted care
                </p>

                <p className="text-[8px] text-white/40">
                  Verified specialists
                </p>

              </div>

            </div>

            <div className="h-7 w-px bg-white/10" />

            <div>

              <p className="text-[9px] font-bold text-white/85">
                Simple booking
              </p>

              <p className="text-[8px] text-white/40">
                Fast appointments
              </p>

            </div>

            <div className="h-7 w-px bg-white/10" />

            <div>

              <p className="text-[9px] font-bold text-white/85">
                Secure platform
              </p>

              <p className="text-[8px] text-white/40">
                Your data protected
              </p>

            </div>

          </div>

        </div>

        <div className="relative min-h-[350px] overflow-hidden sm:min-h-[390px] lg:min-h-[430px]">

          <div className="absolute left-1/2 top-[48%] h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#19b7c8]/10 sm:h-[390px] sm:w-[390px]" />

          <div className="absolute left-1/2 top-[48%] h-[250px] w-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

          <div className="absolute left-1/2 top-[48%] h-[170px] w-[170px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#19b7c8]/10" />

          <div className="absolute inset-0 flex items-end justify-center px-4 sm:px-8 lg:px-2">

            <img
              ref={imageRef}
              src={assets.appointment_img}
              alt="MediAssist appointment"
              className="relative z-10 block h-[320px] w-[88%] max-w-[430px] object-contain object-bottom drop-shadow-[0_25px_35px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-out sm:h-[370px] lg:h-[420px]"
            />

          </div>

          <div className="absolute left-4 top-8 z-20 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.14)] sm:left-6 sm:top-12">

            <div className="flex items-center gap-2.5">

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#19b7c8]/20 text-[#67dce3]">

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />
                </svg>

              </div>

              <div>

                <p className="text-[9px] font-bold text-white">
                  Easy appointments
                </p>

                <p className="mt-0.5 text-[8px] text-white/45">
                  Choose your preferred time
                </p>

              </div>

            </div>

          </div>

          <div className="absolute bottom-8 right-4 z-20 rounded-2xl border border-white/15 bg-white/10 px-3 py-2.5 backdrop-blur-xl shadow-[0_12px_30px_rgba(0,0,0,0.16)] sm:bottom-10 sm:right-7">

            <div className="flex items-center gap-2.5">

              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#18a875]/15 text-[#6be0b2]">

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                  />
                </svg>

              </div>

              <div>

                <p className="text-[9px] font-bold text-white">
                  Secure booking
                </p>

                <p className="mt-0.5 text-[8px] text-white/45">
                  Your appointment is protected
                </p>

              </div>

            </div>

          </div>

          <div className="absolute right-[12%] top-[18%] z-10 flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/[0.07] text-[#67dce3] backdrop-blur-md">

            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 2h6v7h7v6h-7v7H9v-7H2V9h7V2z" />
            </svg>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Banner