import React from 'react'
import { useNavigate } from 'react-router-dom'

const steps = [
  {
    number: '01',
    title: 'Find a Doctor',
    description:
      'Browse verified specialists and choose a doctor based on your healthcare needs.',
    label: 'DISCOVER',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path strokeLinecap="round" d="M16 16l4.5 4.5" />
        <path strokeLinecap="round" d="M8.5 11h5M11 8.5v5" />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Choose a Time',
    description:
      'Select an available appointment slot that fits conveniently into your schedule.',
    label: 'SCHEDULE',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path strokeLinecap="round" d="M8 3v4M16 3v4M4 10h16" />
        <circle cx="12" cy="15" r="2.5" />
        <path strokeLinecap="round" d="M12 13.5V15l1 1" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Get Care',
    description:
      'Confirm your appointment and stay organized throughout your healthcare journey.',
    label: 'CONNECT',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-6 h-6"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s8-4.5 8-10.5A4.5 4.5 0 0015.5 6c-1.5 0-2.7.7-3.5 1.8C11.2 6.7 10 6 8.5 6A4.5 4.5 0 004 10.5C4 16.5 12 21 12 21z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 12l2.2 2.2 4.8-4.8"
        />
      </svg>
    )
  }
]

const HowItWorks = () => {
  const navigate = useNavigate()

  const handleFindDoctor = () => {
    navigate('/doctors')
    window.scrollTo(0, 0)
  }

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 lg:py-20">

      <div className="absolute top-20 -left-40 w-96 h-96 rounded-full bg-[#19b7c8]/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 rounded-full bg-[#087f91]/6 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">

        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-10 lg:gap-16 items-center">

          <div className="relative">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaf9fa] border border-[#19b7c8]/15 text-[#087f91] text-[10px] font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
              HOW IT WORKS
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[42px] leading-[1.08] font-extrabold tracking-tight text-[#082b3a]">
              Your healthcare
              <span className="block text-gradient-teal">
                journey, simplified.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#71858b]">
              From finding the right specialist to confirming your appointment,
              MediAssist keeps the entire process simple and organized.
            </p>

            <div className="mt-7 flex items-center gap-3">

              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full bg-[#dff7f8] border-2 border-white flex items-center justify-center text-[#087f91]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                    <path strokeLinecap="round" d="M4.5 21a7.5 7.5 0 0115 0" />
                  </svg>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#e8f4f8] border-2 border-white flex items-center justify-center text-[#087f91]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s8-4.5 8-10.5A4.5 4.5 0 0015.5 6c-1.5 0-2.7.7-3.5 1.8C11.2 6.7 10 6 8.5 6A4.5 4.5 0 004 10.5C4 16.5 12 21 12 21z" />
                  </svg>
                </div>

                <div className="w-9 h-9 rounded-full bg-[#dff7f8] border-2 border-white flex items-center justify-center text-[#087f91]">
                  <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-[#082b3a]">
                  Simple from start to finish
                </p>
                <p className="text-[10px] text-[#8a9da2]">
                  No complicated steps
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={handleFindDoctor}
              className="btn-teal mt-7 group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold"
            >
              Start Your Journey

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>

          </div>

          <div className="relative">

            <div className="hidden md:block absolute left-[28px] top-8 bottom-8 w-px bg-gradient-to-b from-[#19b7c8]/10 via-[#19b7c8]/35 to-[#19b7c8]/10" />

            <div className="space-y-4">

              {steps.map((step, index) => (

                <div
                  key={step.number}
                  className="group relative flex gap-4 sm:gap-5"
                >

                  <div className="relative z-10 flex-shrink-0">

                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#cfeaed] shadow-[0_8px_24px_rgba(8,43,58,0.07)] flex items-center justify-center text-[#087f91] transition-all duration-300 group-hover:scale-110 group-hover:border-[#19b7c8]/40 group-hover:shadow-[0_12px_30px_rgba(25,183,200,0.18)]">

                      <div className="w-10 h-10 rounded-xl bg-[#eaf9fa] flex items-center justify-center transition-all duration-300 group-hover:bg-[#087f91] group-hover:text-white">
                        {step.icon}
                      </div>

                    </div>

                  </div>

                  <div className="flex-1 min-w-0">

                    <div className="relative overflow-hidden rounded-2xl border border-[#dceff2] bg-white/75 backdrop-blur-xl px-5 py-4 sm:px-6 sm:py-5 shadow-[0_8px_25px_rgba(8,43,58,0.045)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#19b7c8]/30 group-hover:bg-white/90 group-hover:shadow-[0_18px_40px_rgba(8,127,145,0.10)]">

                      <div className="absolute right-0 top-0 w-28 h-28 rounded-full bg-[#19b7c8]/7 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative flex items-center justify-between gap-3">

                        <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.18em] text-[#19b7c8]">
                          {step.label}
                        </span>

                        <span className="text-2xl sm:text-3xl font-extrabold text-[#082b3a]/6">
                          {step.number}
                        </span>

                      </div>

                      <h3 className="relative mt-1 text-base sm:text-lg font-bold text-[#082b3a] group-hover:text-[#087f91] transition-colors duration-300">
                        {step.title}
                      </h3>

                      <p className="relative mt-1.5 max-w-xl text-xs sm:text-sm leading-5 sm:leading-6 text-[#71858b]">
                        {step.description}
                      </p>

                      <div className="relative mt-4 flex items-center gap-2">

                        <div className="h-1 w-16 rounded-full bg-[#e4f5f6] overflow-hidden">
                          <div className="h-full w-0 rounded-full bg-gradient-to-r from-[#087f91] to-[#19b7c8] transition-all duration-500 group-hover:w-full" />
                        </div>

                        <span className="text-[9px] font-semibold text-[#91a2a7]">
                          Step {index + 1} of 3
                        </span>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            <div className="mt-5 ml-[69px] hidden sm:flex items-center gap-2 text-[10px] font-semibold text-[#7c9298]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18a875]" />
              Everything you need, in one place
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default HowItWorks