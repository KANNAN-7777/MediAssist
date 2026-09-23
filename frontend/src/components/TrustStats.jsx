import React, { useEffect, useRef, useState } from 'react'

const stats = [
  {
    value: 10000,
    suffix: '+',
    label: 'Patients Served',
    description: 'Patients connected with trusted healthcare',
    icon: 'users'
  },
  {
    value: 120,
    suffix: '+',
    label: 'Verified Doctors',
    description: 'Experienced specialists across departments',
    icon: 'doctor'
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Healthcare Support',
    description: 'Support whenever you need assistance',
    icon: 'support'
  },
  {
    value: 99,
    suffix: '%',
    label: 'Patient Satisfaction',
    description: 'Focused on a smooth care experience',
    icon: 'heart'
  }
]

const icons = {
  users: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
      />
      <circle cx="9" cy="7" r="4" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
      />
    </svg>
  ),

  doctor: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 14a4 4 0 004-4V5a4 4 0 10-8 0v5a4 4 0 004 4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 10v1a7 7 0 01-14 0v-1M12 18v3M8 21h8"
      />
    </svg>
  ),

  support: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.5 14.5a4.5 4.5 0 007 0"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 9h.01M15 9h.01"
      />
    </svg>
  ),

  heart: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z"
      />
    </svg>
  )
}

const AnimatedNumber = ({ value, suffix, start }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return

    let frame
    let startTime = null
    const duration = 1500

    const animate = timestamp => {
      if (!startTime) startTime = timestamp

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      )

      const eased =
        1 - Math.pow(1 - progress, 4)

      setCount(Math.floor(value * eased))

      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }

    frame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frame)
  }, [value, start])

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  )
}

const TrustStats = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = sectionRef.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.18
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
    >

      {/* Background atmosphere */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#19b7c8]/8 blur-[110px]" />

      <div className="pointer-events-none absolute -right-20 top-8 h-44 w-44 rounded-full border-[18px] border-[#19b7c8]/[0.025]" />

      <div className="pointer-events-none absolute -left-20 bottom-12 h-36 w-36 rounded-full border-[14px] border-[#087f91]/[0.025]" />

      <div className="relative mx-auto max-w-6xl px-4">

        {/* Section heading */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:mb-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#19b7c8]/15 bg-white/75 px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-[#087f91] backdrop-blur-xl sm:text-xs">

              <span className="relative flex h-1.5 w-1.5">

                <span className="absolute inset-0 animate-ping rounded-full bg-[#19b7c8]/50" />

                <span className="relative h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />

              </span>

              TRUSTED HEALTHCARE

            </div>

            <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-[#082b3a] sm:text-3xl lg:text-4xl">
              Care built around
              <span className="text-gradient-teal"> trust.</span>
            </h2>

          </div>

          <p className="max-w-xl text-[12px] leading-6 text-[#71858b] sm:text-sm sm:leading-7 lg:ml-auto">
            Thousands of patients use MediAssist to discover doctors,
            manage appointments and access a more connected healthcare
            experience.
          </p>

        </div>

        {/* Main stats */}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">

          {stats.map((stat, index) => (
            <article
              key={stat.label}
              className="group relative overflow-hidden rounded-[22px] border border-white/80 bg-white/72 p-4 shadow-[0_12px_35px_rgba(8,43,58,0.055)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#19b7c8]/25 hover:bg-white/90 hover:shadow-[0_22px_45px_rgba(8,127,145,0.12)] sm:rounded-[26px] sm:p-5 lg:p-6"
            >

              {/* Card highlight */}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#19b7c8]/50 to-transparent opacity-60" />

              {/* Hover glow */}

              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#19b7c8]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Number */}

              <div className="relative flex items-start justify-between gap-3">

                <div>

                  <p className="text-[8px] font-bold tracking-[0.16em] text-[#9aa9ad] sm:text-[9px]">
                    0{index + 1}
                  </p>

                  <div className="mt-2 text-2xl font-extrabold tracking-tight text-[#082b3a] sm:text-3xl lg:text-[34px]">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      start={isVisible}
                    />
                  </div>

                </div>

                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-[#19b7c8]/10 bg-[#eaf9fa] text-[#087f91] shadow-[0_6px_18px_rgba(25,183,200,0.08)] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#087f91] group-hover:text-white sm:h-10 sm:w-10">
                  {icons[stat.icon]}
                </div>

              </div>

              {/* Label */}

              <h3 className="relative mt-3 text-[11px] font-bold leading-5 text-[#082b3a] sm:text-sm">
                {stat.label}
              </h3>

              {/* Description */}

              <p className="relative mt-1 text-[9px] leading-4 text-[#7a8e94] sm:text-[11px] sm:leading-5">
                {stat.description}
              </p>

              {/* Bottom indicator */}

              <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-[#e7f4f5]">

                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#087f91] to-[#19b7c8] transition-all duration-1000"
                  style={{
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${400 + index * 120}ms`
                  }}
                />

              </div>

            </article>
          ))}

        </div>

        {/* Trust statement */}

        <div className="relative mt-5 overflow-hidden rounded-[22px] border border-[#19b7c8]/10 bg-white/60 px-4 py-4 shadow-[0_12px_35px_rgba(8,43,58,0.04)] backdrop-blur-2xl sm:mt-6 sm:rounded-[26px] sm:px-6 sm:py-5">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <p className="text-[9px] font-bold tracking-[0.16em] text-[#087f91]">
                WHY PATIENTS CHOOSE MEDIASSIST
              </p>

              <p className="mt-1 text-xs font-semibold text-[#536970] sm:text-sm">
                A simpler way to stay connected with healthcare.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4 sm:gap-x-7">

              {[
                'Verified Doctors',
                'Secure Data',
                'Easy Booking',
                'Patient-focused'
              ].map(item => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-[9px] font-semibold text-[#61767c] sm:text-[10px]"
                >
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#e5f8f3] text-[10px] font-bold text-[#18a875]">
                    ✓
                  </span>

                  <span className="whitespace-nowrap">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default TrustStats