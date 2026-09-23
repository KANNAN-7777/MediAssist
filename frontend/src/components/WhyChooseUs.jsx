import React from 'react'

const features = [
  {
    number: '01',
    title: 'Verified Specialists',
    description:
      'Connect with experienced doctors across multiple medical specialities and find the right care for your needs.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.5 12l2.2 2.2 4.8-4.8"
        />
      </svg>
    )
  },
  {
    number: '02',
    title: 'Secure & Private',
    description:
      'Your healthcare journey is designed with privacy and secure access in mind, giving you greater confidence.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10V7a4 4 0 018 0v3"
        />
        <circle cx="12" cy="15" r="1" />
      </svg>
    )
  },
  {
    number: '03',
    title: 'Easy Appointment Booking',
    description:
      'Choose your doctor, select a convenient time slot and manage your appointments without unnecessary steps.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 3v4M16 3v4M4 10h16"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 14h2M14 14h2M8 18h2"
        />
      </svg>
    )
  },
  {
    number: '04',
    title: 'Simple Healthcare Experience',
    description:
      'Everything you need is organized in one place, making it easier to discover doctors and stay on top of your care.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="w-5 h-5"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 12h4l2-6 4 12 2-6h4"
        />
      </svg>
    )
  }
]

const WhyChooseUs = () => {
  return (
    <section className="relative py-12 sm:py-14 lg:py-16 overflow-hidden">

      <div
        className="
          absolute
          -left-32
          top-1/3
          w-72
          h-72
          rounded-full
          bg-[#19b7c8]/7
          blur-[90px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -right-32
          bottom-0
          w-80
          h-80
          rounded-full
          bg-[#087f91]/5
          blur-[100px]
          pointer-events-none
        "
      />

      <div className="relative max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3
              py-1.5
              rounded-full
              bg-[#e8f8fa]
              border
              border-[#19b7c8]/10
              text-[#087f91]
              text-[10px]
              sm:text-xs
              font-bold
              tracking-wide
            "
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
            Why MediAssist
          </div>

          <h2
            className="
              mt-3
              text-2xl
              sm:text-3xl
              lg:text-[34px]
              font-extrabold
              tracking-tight
              text-[#082b3a]
            "
          >
            Healthcare designed
            <span className="text-gradient-teal"> around you</span>
          </h2>

          <p
            className="
              mt-2.5
              max-w-xl
              mx-auto
              text-xs
              sm:text-sm
              leading-6
              text-[#71858b]
            "
          >
            From finding the right specialist to managing appointments,
            MediAssist keeps your healthcare experience simple and convenient.
          </p>

        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-[0.88fr_1.12fr] gap-4 lg:gap-5">

          {/* FEATURED PANEL */}
          <div
            className="
              group
              relative
              overflow-hidden
              min-h-[330px]
              sm:min-h-[350px]
              rounded-[26px]
              bg-gradient-to-br
              from-[#056071]
              via-[#087f91]
              to-[#19b7c8]
              p-6
              sm:p-7
              shadow-[0_18px_45px_rgba(8,127,145,0.16)]
            "
          >

            {/* Decorative glow */}
            <div
              className="
                absolute
                -right-20
                -top-20
                w-64
                h-64
                rounded-full
                bg-white/10
                blur-3xl
                transition-transform
                duration-700
                group-hover:scale-125
              "
            />

            <div
              className="
                absolute
                -left-24
                -bottom-24
                w-72
                h-72
                rounded-full
                bg-[#19b7c8]/20
                blur-3xl
              "
            />

            {/* Grid pattern */}
            <div
              className="
                absolute
                inset-0
                opacity-[0.06]
                pointer-events-none
              "
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}
            />

            <div className="relative z-10 flex flex-col h-full">

              <div
                className="
                  inline-flex
                  self-start
                  items-center
                  gap-2
                  px-3
                  py-1.5
                  rounded-full
                  bg-white/10
                  border
                  border-white/15
                  backdrop-blur-md
                  text-white
                  text-[10px]
                  sm:text-[11px]
                  font-semibold
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#baf7f8]" />
                Smarter Healthcare
              </div>

              {/* Central visual */}
              <div className="absolute right-7 top-1/2 -translate-y-1/2 hidden sm:flex">

                <div
                  className="
                    relative
                    w-28
                    h-28
                    rounded-full
                    border
                    border-white/15
                    bg-white/5
                    backdrop-blur-md
                    items-center
                    justify-center
                    group-hover:scale-105
                    transition-transform
                    duration-700
                  "
                >

                  <div
                    className="
                      absolute
                      inset-4
                      rounded-full
                      border
                      border-white/20
                    "
                  />

                  <div
                    className="
                      relative
                      w-12
                      h-12
                      rounded-2xl
                      bg-white
                      flex
                      items-center
                      justify-center
                      text-[#087f91]
                      shadow-[0_10px_30px_rgba(0,0,0,0.12)]
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-6 h-6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s8-4.5 8-10.5A4.5 4.5 0 0015.5 6c-1.5 0-2.7.7-3.5 1.8C11.2 6.7 10 6 8.5 6A4.5 4.5 0 004 10.5C4 16.5 12 21 12 21z"
                      />
                    </svg>
                  </div>

                </div>

              </div>

              <div className="mt-auto max-w-sm">

                <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-white/55">
                  Patient-first platform
                </p>

                <h3
                  className="
                    mt-2
                    text-2xl
                    sm:text-[30px]
                    font-extrabold
                    leading-tight
                    text-white
                  "
                >
                  Your health,
                  <br />
                  <span className="text-[#baf7f8]">
                    made simpler.
                  </span>
                </h3>

                <p
                  className="
                    mt-3
                    max-w-sm
                    text-xs
                    sm:text-sm
                    leading-6
                    text-white/70
                  "
                >
                  Discover doctors, book appointments and manage
                  your healthcare journey from one convenient platform.
                </p>

                <div className="mt-5 flex items-center gap-2.5">

                  <div
                    className="
                      w-9
                      h-9
                      rounded-xl
                      bg-white/10
                      border
                      border-white/15
                      backdrop-blur-md
                      flex
                      items-center
                      justify-center
                      text-white
                    "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-4 h-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s8-4.5 8-10.5A4.5 4.5 0 0015.5 6c-1.5 0-2.7.7-3.5 1.8C11.2 6.7 10 6 8.5 6A4.5 4.5 0 004 10.5C4 16.5 12 21 12 21z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p className="text-[11px] font-bold text-white">
                      Patient-first care
                    </p>
                    <p className="text-[9px] text-white/55">
                      Built for a better experience
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* FEATURE CARDS */}
          <div className="grid sm:grid-cols-2 gap-3.5">

            {features.map((feature) => (

              <div
                key={feature.number}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#dceff2]
                  bg-white/80
                  backdrop-blur-xl
                  p-5
                  shadow-[0_8px_25px_rgba(8,43,58,0.045)]
                  transition-all
                  duration-400
                  hover:-translate-y-1
                  hover:border-[#19b7c8]/30
                  hover:shadow-[0_18px_35px_rgba(8,127,145,0.10)]
                "
              >

                {/* Hover glow */}
                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    w-24
                    h-24
                    rounded-full
                    bg-[#19b7c8]/10
                    blur-2xl
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  "
                />

                <div className="relative flex items-start justify-between">

                  <div
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-[#eaf9fa]
                      border
                      border-[#19b7c8]/10
                      text-[#087f91]
                      flex
                      items-center
                      justify-center
                      shadow-[0_5px_15px_rgba(25,183,200,0.07)]
                      transition-all
                      duration-400
                      group-hover:scale-105
                      group-hover:-rotate-2
                    "
                  >
                    {feature.icon}
                  </div>

                  <span
                    className="
                      text-[9px]
                      font-bold
                      tracking-[0.18em]
                      text-[#19b7c8]/50
                    "
                  >
                    {feature.number}
                  </span>

                </div>

                <h3
                  className="
                    relative
                    mt-4
                    text-sm
                    sm:text-base
                    font-bold
                    text-[#082b3a]
                    group-hover:text-[#087f91]
                    transition-colors
                    duration-300
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    relative
                    mt-2
                    text-[11px]
                    sm:text-xs
                    leading-5
                    text-[#71858b]
                  "
                >
                  {feature.description}
                </p>

                <div
                  className="
                    relative
                    mt-4
                    w-7
                    h-1
                    rounded-full
                    bg-[#e5f5f6]
                    overflow-hidden
                  "
                >
                  <div
                    className="
                      h-full
                      w-0
                      rounded-full
                      bg-gradient-to-r
                      from-[#087f91]
                      to-[#19b7c8]
                      group-hover:w-full
                      transition-all
                      duration-500
                    "
                  />
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  )
}

export default WhyChooseUs