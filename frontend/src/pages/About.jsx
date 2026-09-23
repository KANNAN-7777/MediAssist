import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <main className="py-6 sm:py-8 lg:py-10">

      {/* HERO */}

      <section className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-[10px] sm:text-[11px] font-bold tracking-[0.08em]">

          <span className="relative flex w-1.5 h-1.5">

            <span className="absolute inset-0 rounded-full bg-[#19b7c8] opacity-40 animate-ping" />

            <span className="relative w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />

          </span>

          ABOUT MEDIASSIST

        </div>

        <h1 className="mt-4 text-[30px] sm:text-4xl lg:text-[42px] leading-tight font-bold tracking-tight text-[#082b3a]">

          Healthcare built around
          <span className="text-[#087f91]"> you.</span>

        </h1>

        <p className="max-w-2xl mx-auto mt-3 text-[13px] sm:text-sm text-[#6c8188] leading-6 sm:leading-7">
          Making healthcare simpler, accessible and connected for patients
          and healthcare professionals.
        </p>

      </section>


      {/* ABOUT */}

      <section className="grid md:grid-cols-[0.92fr_1.08fr] items-center gap-7 lg:gap-11 mb-11">

        {/* IMAGE */}

        <div className="relative group">

          <div className="absolute -inset-3 rounded-[30px] bg-[#19b7c8]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative overflow-hidden rounded-[26px] border border-[#dceff2] bg-[#edf9fa] shadow-[0_16px_40px_rgba(8,43,58,0.07)]">

            <img
              src={assets.about_image}
              alt="MediAssist healthcare"
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#062b3a]/25 via-transparent to-transparent pointer-events-none" />


            {/* FLOATING CARD */}

            <div className="absolute bottom-4 left-4 right-4">

              <div className="inline-flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-lg">

                <div className="w-9 h-9 rounded-lg bg-[#e8f8fa] flex items-center justify-center text-[#087f91]">

                  <svg
                    className="w-[18px] h-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v18M3 12h18"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 7l10 10M17 7L7 17"
                    />

                  </svg>

                </div>

                <div>

                  <p className="text-xs font-bold text-[#082b3a]">
                    Smart Healthcare
                  </p>

                  <p className="text-[10px] text-[#7b9096] mt-0.5">
                    Technology with care
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* CONTENT */}

        <div className="flex flex-col gap-4.5">

          <div>

            <div className="flex items-center gap-2 mb-3">

              <span className="w-7 h-px bg-[#19b7c8]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#087f91]">
                Who We Are
              </span>

            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#082b3a]">
              Healthcare designed
              <br className="hidden sm:block" />
              around your needs.
            </h2>

          </div>


          <p className="text-[13px] sm:text-sm text-[#61777e] leading-7">
            Welcome to MediAssist, your trusted partner for managing
            healthcare needs conveniently and efficiently. We understand
            the challenges individuals face when scheduling doctor
            appointments and managing their healthcare journey.
          </p>

          <p className="text-[13px] sm:text-sm text-[#61777e] leading-7">
            MediAssist is committed to excellence in healthcare technology.
            We continuously strive to enhance our platform by integrating
            modern technology to create a smoother experience for patients
            and healthcare professionals.
          </p>


          {/* VISION */}

          <div className="group relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#f5fcfd] to-[#eaf8fa] border border-[#d4eef1] hover:-translate-y-1 hover:border-[#19b7c8]/40 hover:shadow-[0_14px_30px_rgba(8,127,145,0.08)] transition-all duration-300">

            <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-[#19b7c8]/10 blur-2xl group-hover:bg-[#19b7c8]/15 transition-colors duration-300" />

            <div className="relative flex items-start gap-3">

              <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white border border-[#d8edf0] flex items-center justify-center text-[#087f91] shadow-sm group-hover:-translate-y-0.5 transition-transform duration-300">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                  />

                </svg>

              </div>

              <div>

                <h3 className="text-sm font-bold text-[#082b3a]">
                  Our Vision
                </h3>

                <p className="mt-1.5 text-xs sm:text-sm text-[#6c8188] leading-6">
                  Our vision is to create a seamless healthcare experience
                  for every user. We aim to bridge the gap between patients
                  and healthcare providers, making it easier to access the
                  care you need, when you need it.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* WHY CHOOSE US */}

      <section>

        <div className="mb-6">

          <div className="flex items-center gap-2.5">

            <span className="w-7 h-px bg-[#19b7c8]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#087f91]">
              Why Choose Us
            </span>

          </div>

          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#082b3a]">
            Built for a better healthcare experience
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          {/* EFFICIENCY */}

          <div className="group relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-white border border-[#dceff2] shadow-sm hover:-translate-y-1.5 hover:border-[#19b7c8]/40 hover:shadow-[0_18px_38px_rgba(8,127,145,0.1)] transition-all duration-300">

            <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-[#e8f8fa] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />

            <div className="relative">

              <div className="w-11 h-11 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center mb-4 group-hover:bg-[#087f91] group-hover:text-white group-hover:scale-105 transition-all duration-300">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                  />

                </svg>

              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-[#19b7c8]">
                01
              </p>

              <h3 className="mt-1 text-base font-bold text-[#082b3a]">
                Efficiency
              </h3>

              <p className="mt-2 text-sm text-[#6c8188] leading-6">
                Streamlined appointment scheduling that fits into your
                busy lifestyle.
              </p>

            </div>

          </div>


          {/* CONVENIENCE */}

          <div className="group relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-white border border-[#dceff2] shadow-sm hover:-translate-y-1.5 hover:border-[#19b7c8]/40 hover:shadow-[0_18px_38px_rgba(8,127,145,0.1)] transition-all duration-300">

            <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-[#e8f8fa] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />

            <div className="relative">

              <div className="w-11 h-11 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center mb-4 group-hover:bg-[#087f91] group-hover:text-white group-hover:scale-105 transition-all duration-300">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z"
                  />

                  <circle
                    cx="12"
                    cy="10"
                    r="2.5"
                  />

                </svg>

              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-[#19b7c8]">
                02
              </p>

              <h3 className="mt-1 text-base font-bold text-[#082b3a]">
                Convenience
              </h3>

              <p className="mt-2 text-sm text-[#6c8188] leading-6">
                Access to a network of trusted healthcare professionals
                in your area.
              </p>

            </div>

          </div>


          {/* PERSONALIZATION */}

          <div className="group relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-white border border-[#dceff2] shadow-sm hover:-translate-y-1.5 hover:border-[#19b7c8]/40 hover:shadow-[0_18px_38px_rgba(8,127,145,0.1)] transition-all duration-300">

            <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-[#e8f8fa] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-300" />

            <div className="relative">

              <div className="w-11 h-11 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center mb-4 group-hover:bg-[#087f91] group-hover:text-white group-hover:scale-105 transition-all duration-300">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20 21a8 8 0 00-16 0"
                  />

                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />

                </svg>

              </div>

              <p className="text-[10px] font-bold uppercase tracking-wider text-[#19b7c8]">
                03
              </p>

              <h3 className="mt-1 text-base font-bold text-[#082b3a]">
                Personalization
              </h3>

              <p className="mt-2 text-sm text-[#6c8188] leading-6">
                Tailored recommendations and reminders to help you stay
                on top of your health.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CLOSING STATEMENT */}

      <section className="mt-9 sm:mt-11 relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#062b3a] via-[#056071] to-[#087f91] px-5 sm:px-8 py-6 sm:py-7">

        <div className="absolute -right-16 -top-20 w-48 h-48 rounded-full bg-[#19b7c8]/15 blur-3xl" />

        <div className="absolute -left-16 -bottom-20 w-40 h-40 rounded-full bg-[#19b7c8]/10 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8ff3dc]">
              MediAssist
            </p>

            <h2 className="mt-1 text-lg sm:text-xl font-bold text-white">
              Technology that keeps healthcare connected.
            </h2>

            <p className="mt-1.5 max-w-xl text-xs sm:text-sm text-white/60 leading-5">
              A simpler way for patients and healthcare professionals
              to stay connected.
            </p>

          </div>

          <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#9ceff2]">

            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18M3 12h18"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 7l10 10M17 7L7 17"
              />

            </svg>

          </div>

        </div>

      </section>

    </main>
  )
}

export default About