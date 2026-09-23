import React, { useState } from 'react'

const testimonials = [
  {
    name: 'Priya S',
    role: 'Patient',
    initials: 'PS',
    rating: 5,
    review:
      'MediAssist made it very easy to find a suitable doctor and book an appointment without any confusion.'
  },
  {
    name: 'Arun K',
    role: 'Patient',
    initials: 'AK',
    rating: 5,
    review:
      'The appointment process is simple and the doctor information is clearly organized. It saved me a lot of time.'
  },
  {
    name: 'Divya R',
    role: 'Patient',
    initials: 'DR',
    rating: 5,
    review:
      'I liked how quickly I could explore different specialities and choose an available appointment slot.'
  }
]

const StarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-3.5 h-3.5"
  >
    <path d="M12 2.8l2.9 5.88 6.49.94-4.7 4.58 1.11 6.47L12 17.62 6.2 20.67l1.11-6.47-4.7-4.58 6.49-.94L12 2.8z" />
  </svg>
)

const QuoteIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    className="w-7 h-7"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 17.5H5.8A2.8 2.8 0 013 14.7V9.3A2.8 2.8 0 015.8 6.5h3.4A2.8 2.8 0 0112 9.3v3.9a4.3 4.3 0 01-4.5 4.3z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 17.5h-1.7a2.8 2.8 0 01-2.8-2.8V9.3a2.8 2.8 0 012.8-2.8h3.4A2.8 2.8 0 0121 9.3v3.9a4.3 4.3 0 01-4.5 4.3z"
    />
  </svg>
)

const Testimonials = () => {
  const [active, setActive] = useState(0)

  const current = testimonials[active]

  const previous = () => {
    setActive((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    )
  }

  const next = () => {
    setActive((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 overflow-hidden">

      <div className="absolute -left-40 top-1/4 w-96 h-96 rounded-full bg-[#19b7c8]/7 blur-[120px] pointer-events-none" />
      <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-[#087f91]/6 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">

        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-8 lg:gap-14 items-center">

          <div className="relative">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaf9fa] border border-[#19b7c8]/15 text-[#087f91] text-[10px] sm:text-xs font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
              PATIENT STORIES
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] leading-[1.1] font-extrabold tracking-tight text-[#082b3a]">
              Real experiences.
              <span className="block text-gradient-teal">
                Real care.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#71858b]">
              Hear from patients who use MediAssist to discover doctors,
              manage appointments and make healthcare easier.
            </p>

            <div className="mt-7 flex items-center gap-3">

              <div className="flex items-center">

                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${item.name}'s testimonial`}
                    className={`
                      relative
                      w-10
                      h-10
                      -ml-1
                      first:ml-0
                      rounded-full
                      border-2
                      border-white
                      flex
                      items-center
                      justify-center
                      text-[10px]
                      font-bold
                      transition-all
                      duration-300
                      ${
                        active === index
                          ? 'bg-[#087f91] text-white scale-110 z-10'
                          : 'bg-[#e7f7f8] text-[#087f91]'
                      }
                    `}
                  >
                    {item.initials}
                  </button>
                ))}

              </div>

              <div className="pl-2">
                <div className="flex items-center gap-1 text-[#e4a72c]">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <StarIcon key={item} />
                  ))}
                </div>

                <p className="mt-1 text-[10px] text-[#7d9197]">
                  Patient feedback
                </p>
              </div>

            </div>

          </div>

          <div className="relative">

            <div className="absolute -top-5 -left-5 w-12 h-12 rounded-2xl bg-[#087f91] text-white flex items-center justify-center shadow-[0_12px_30px_rgba(8,127,145,0.22)] z-20">
              <QuoteIcon />
            </div>

            <div className="relative rounded-[28px] bg-[#082b3a] p-1 shadow-[0_25px_60px_rgba(8,43,58,0.16)]">

              <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0a3949] via-[#075d6c] to-[#087f91] px-6 py-7 sm:px-8 sm:py-9">

                <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full border border-white/10" />
                <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full border border-white/10" />
                <div className="absolute -left-20 bottom-0 w-52 h-52 rounded-full bg-[#19b7c8]/10 blur-3xl" />

                <div className="relative z-10">

                  <div className="flex items-start justify-between gap-5">

                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xl flex items-center justify-center text-white font-bold text-sm shadow-inner">
                        {current.initials}
                      </div>

                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-white">
                          {current.name}
                        </h3>

                        <p className="mt-0.5 text-[11px] text-white/55">
                          {current.role}
                        </p>
                      </div>

                    </div>

                    <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[#ffe4a3]">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <StarIcon key={item} />
                      ))}
                    </div>

                  </div>

                  <div className="mt-7">

                    <p className="text-[10px] font-bold tracking-[0.2em] text-[#8ee9ed]">
                      PATIENT REVIEW
                    </p>

                    <blockquote className="mt-3 text-xl sm:text-2xl lg:text-[26px] leading-8 sm:leading-9 font-medium text-white">
                      “{current.review}”
                    </blockquote>

                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div className="flex items-center gap-2.5">

                      <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-[#9ceef0]">
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

                      <span className="text-[11px] text-white/55">
                        Patient-focused healthcare
                      </span>

                    </div>

                    <div className="flex items-center gap-2">

                      <button
                        type="button"
                        onClick={previous}
                        aria-label="Previous testimonial"
                        className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:-translate-y-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-4 h-4"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 18l-6-6 6-6"
                          />
                        </svg>
                      </button>

                      <div className="flex items-center gap-1.5 px-1">

                        {testimonials.map((item, index) => (
                          <button
                            key={item.name}
                            type="button"
                            onClick={() => setActive(index)}
                            aria-label={`Show testimonial ${index + 1}`}
                            className={`
                              h-1.5
                              rounded-full
                              transition-all
                              duration-300
                              ${
                                active === index
                                  ? 'w-7 bg-[#8ee9ed]'
                                  : 'w-1.5 bg-white/25'
                              }
                            `}
                          />
                        ))}

                      </div>

                      <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 text-white flex items-center justify-center hover:bg-white/20 hover:-translate-y-0.5"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="w-4 h-4"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 18l6-6-6-6"
                          />
                        </svg>
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5">

          {[
            {
              value: '5.0',
              label: 'Patient Rating'
            },
            {
              value: '24/7',
              label: 'Healthcare Support'
            },
            {
              value: '100%',
              label: 'Secure Access'
            },
            {
              value: 'Easy',
              label: 'Appointment Booking'
            }
          ].map((item) => (

            <div
              key={item.label}
              className="group rounded-2xl border border-[#dceff2] bg-white/65 backdrop-blur-xl px-3 py-3.5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:border-[#19b7c8]/25 hover:shadow-[0_12px_28px_rgba(8,127,145,0.08)]"
            >
              <p className="text-sm sm:text-base font-extrabold text-[#087f91]">
                {item.value}
              </p>

              <p className="mt-1 text-[9px] sm:text-[10px] text-[#7b8f95]">
                {item.label}
              </p>
            </div>

          ))}

        </div>

      </div>
    </section>
  )
}

export default Testimonials