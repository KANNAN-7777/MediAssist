import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <main className="py-6 sm:py-8 lg:py-10">

      {/* Header */}
      <section className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-[10px] sm:text-[11px] font-bold tracking-[0.08em]">

          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[#19b7c8] opacity-40 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
          </span>

          GET IN TOUCH

        </div>

        <h1 className="mt-4 text-[30px] sm:text-4xl lg:text-[42px] leading-tight font-bold tracking-tight text-[#082b3a]">
          Let's connect
          <span className="text-[#087f91]"> with us.</span>
        </h1>

        <p className="max-w-xl mx-auto mt-3 text-[13px] sm:text-sm text-[#6c8188] leading-6 sm:leading-7">
          Have a question or need assistance? Our team is here to
          help you with your MediAssist journey.
        </p>

      </section>


      {/* Main layout */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-5 lg:gap-7 mb-12">

        {/* Image panel */}
        <div className="relative group min-h-[340px] lg:min-h-[500px]">

          <div className="absolute -inset-3 rounded-[30px] bg-[#19b7c8]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative h-full min-h-[340px] lg:min-h-[500px] overflow-hidden rounded-[26px] bg-[#edf9fa] border border-[#dceff2] shadow-[0_16px_40px_rgba(8,43,58,0.07)]">

            <img
              src={assets.contact_image}
              alt="Contact MediAssist"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#062b3a]/60 via-transparent to-transparent pointer-events-none" />

            {/* Support card */}
            <div className="absolute bottom-5 left-5 right-5">

              <div className="max-w-sm p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-xl">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center">

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 12h8M12 8v8"
                      />

                    </svg>

                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#082b3a]">
                      MediAssist Support
                    </p>

                    <p className="text-[10px] text-[#7b9096] mt-0.5">
                      We're here when you need us
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* Contact cards */}
        <div className="flex flex-col gap-4">

          {/* Office */}
          <div className="group p-5 sm:p-6 rounded-2xl bg-white border border-[#dceff2] shadow-sm hover:-translate-y-1 hover:border-[#19b7c8]/40 hover:shadow-[0_18px_38px_rgba(8,127,145,0.1)] transition-all duration-300">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center group-hover:bg-[#087f91] group-hover:text-white transition-all duration-300">

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
                    d="M3 21h18"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 21V5l7-3 7 3v16"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1"
                  />

                </svg>

              </div>

              <div className="min-w-0">

                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#19b7c8]">
                  Visit Us
                </p>

                <h2 className="mt-1 text-base font-bold text-[#082b3a]">
                  Our Office
                </h2>

                <p className="mt-2 text-sm text-[#6c8188] leading-6">
                  No:594/1, Saravana Nagar First Cross Street
                  <br />
                  Orikkai, Kanchipuram
                </p>

              </div>

            </div>

          </div>


          {/* Contact information */}
          <div className="group p-5 sm:p-6 rounded-2xl bg-white border border-[#dceff2] shadow-sm hover:-translate-y-1 hover:border-[#19b7c8]/40 hover:shadow-[0_18px_38px_rgba(8,127,145,0.1)] transition-all duration-300">

            <div className="flex items-start gap-4">

              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center group-hover:bg-[#087f91] group-hover:text-white transition-all duration-300">

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
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.62 2.63a2 2 0 01-.45 2.11L8 9.73a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0122 16.92z"
                  />
                </svg>

              </div>

              <div className="min-w-0">

                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#19b7c8]">
                  Reach Us
                </p>

                <h2 className="mt-1 text-base font-bold text-[#082b3a]">
                  Contact Information
                </h2>

                <div className="mt-2 space-y-2 text-sm">

                  <div className="flex flex-wrap gap-1">

                    <span className="text-[#7b9096]">
                      Phone:
                    </span>

                    <a
                      href="tel:+918667262734"
                      className="font-semibold text-[#087f91] hover:text-[#056071] transition-colors"
                    >
                      +91 8667262734
                    </a>

                  </div>

                  <div className="flex flex-wrap gap-1">

                    <span className="text-[#7b9096]">
                      Email:
                    </span>

                    <a
                      href="mailto:kannan915923@gmail.com"
                      className="font-semibold text-[#087f91] break-all hover:text-[#056071] transition-colors"
                    >
                      kannan915923@gmail.com
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* Careers */}
          <div className="group relative overflow-hidden p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#062b3a] via-[#056071] to-[#087f91] shadow-lg shadow-[#082b3a]/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">

            <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#19b7c8]/20 blur-3xl" />

            <div className="absolute -bottom-16 -left-12 w-32 h-32 rounded-full bg-[#19b7c8]/10 blur-2xl" />

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-[#9ceff2]">

                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="7"
                      width="18"
                      height="13"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12h18"
                    />

                  </svg>

                </div>

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8ff3dc]">
                    Join Our Team
                  </p>

                  <h2 className="mt-0.5 text-base font-bold text-white">
                    Careers at MediAssist
                  </h2>

                </div>

              </div>

              <p className="mt-3 max-w-md text-sm text-white/65 leading-6">
                Learn more about our teams and job openings.
              </p>

              <button
                type="button"
                className="group/btn mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#056071] text-xs font-bold hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300"
              >
                Explore Jobs

                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                  →
                </span>

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* Bottom reassurance */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 sm:px-6 py-4 rounded-2xl bg-[#f4fbfc] border border-[#dceff2]">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 flex-shrink-0 rounded-lg bg-white border border-[#dceff2] flex items-center justify-center text-[#18a875]">

            <svg
              className="w-4 h-4"
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

            <p className="text-xs font-bold text-[#082b3a]">
              We're here to help
            </p>

            <p className="text-[10px] text-[#7b9096] leading-5">
              Reach out to the MediAssist team whenever you need assistance.
            </p>

          </div>

        </div>

        <span className="text-[10px] font-semibold text-[#087f91]">
          MediAssist Healthcare
        </span>

      </section>

    </main>
  )
}

export default Contact