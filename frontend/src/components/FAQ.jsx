import React, { useState } from 'react'

const faqs = [
  {
    question: 'How do I book an appointment?',
    answer:
      'Go to All Doctors, choose a speciality or doctor, select an available time slot, and confirm your appointment.'
  },
  {
    question: 'Can I choose a doctor by speciality?',
    answer:
      'Yes. MediAssist lets you browse doctors by speciality so you can find a healthcare professional based on your needs.'
  },
  {
    question: 'How can I manage my appointments?',
    answer:
      'After logging in, you can access your appointment section to view your scheduled appointments and manage your healthcare bookings.'
  },
  {
    question: 'Do I need an account to book an appointment?',
    answer:
      'You need to be logged in to complete an appointment booking. Creating an account helps keep your profile and appointments organized.'
  },
  {
    question: 'How can I update my profile?',
    answer:
      'Open your profile after signing in. You can update available personal information and save the changes from your profile page.'
  }
]

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const toggleFAQ = (index) => {
    setActiveIndex((current) => (current === index ? -1 : index))
  }

  return (
    <section className="relative py-14 sm:py-16 lg:py-20 overflow-hidden">

      <div className="absolute -left-40 top-20 w-96 h-96 rounded-full bg-[#19b7c8]/7 blur-[120px] pointer-events-none" />

      <div className="absolute -right-40 bottom-0 w-96 h-96 rounded-full bg-[#087f91]/6 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">

        <div className="grid lg:grid-cols-[0.72fr_1.28fr] gap-8 lg:gap-14 items-start">

          <div className="relative lg:sticky lg:top-24">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaf9fa] border border-[#19b7c8]/15 text-[#087f91] text-[10px] sm:text-xs font-bold tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
              HELP CENTER
            </div>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[40px] leading-[1.08] font-extrabold tracking-tight text-[#082b3a]">
              Questions?
              <span className="block text-gradient-teal">
                We have answers.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-[#71858b]">
              Everything you need to know about finding doctors,
              booking appointments and managing your MediAssist account.
            </p>

            <div className="relative mt-7 overflow-hidden rounded-[26px] bg-gradient-to-br from-[#062b3a] via-[#075d6c] to-[#087f91] p-6 sm:p-7 shadow-[0_22px_50px_rgba(8,43,58,0.15)]">

              <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full border border-white/10" />
              <div className="absolute -right-5 -top-5 w-28 h-28 rounded-full border border-white/10" />
              <div className="absolute -left-20 -bottom-20 w-48 h-48 rounded-full bg-[#19b7c8]/15 blur-3xl" />

              <div className="relative z-10">

                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-[#9ceef0] flex items-center justify-center">

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-6 h-6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path strokeLinecap="round" d="M9.5 9.5a2.5 2.5 0 115 0c0 1.7-2.5 2-2.5 3.5" />
                    <path strokeLinecap="round" d="M12 16.8h.01" />
                  </svg>

                </div>

                <p className="mt-5 text-[10px] font-bold tracking-[0.2em] text-[#8ee9ed]">
                  MEDIASSIST SUPPORT
                </p>

                <h3 className="mt-2 text-lg sm:text-xl font-bold text-white">
                  Still need help?
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-5 text-white/60">
                  Our support team can help you with questions that aren't covered here.
                </p>

                <a
                  href="/contact"
                  className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#087f91] hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Contact Support

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>

              </div>

            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5">

              <div className="rounded-2xl border border-[#dceff2] bg-white/65 backdrop-blur-xl px-3 py-3 text-center">
                <p className="text-base font-extrabold text-[#087f91]">
                  24/7
                </p>
                <p className="mt-0.5 text-[9px] text-[#7b8f95]">
                  Healthcare support
                </p>
              </div>

              <div className="rounded-2xl border border-[#dceff2] bg-white/65 backdrop-blur-xl px-3 py-3 text-center">
                <p className="text-base font-extrabold text-[#087f91]">
                  Easy
                </p>
                <p className="mt-0.5 text-[9px] text-[#7b8f95]">
                  Appointment booking
                </p>
              </div>

            </div>

          </div>

          <div className="relative">

            <div className="mb-4 flex items-center justify-between">

              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#19b7c8]">
                  COMMON QUESTIONS
                </p>

                <p className="mt-1 text-xs text-[#7b8f95]">
                  Select a question to view the answer.
                </p>
              </div>

              <div className="hidden sm:flex w-9 h-9 rounded-xl bg-white/70 border border-[#dceff2] items-center justify-center text-[#087f91]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path strokeLinecap="round" d="M12 6v6l4 2" />
                  <circle cx="12" cy="12" r="9" />
                </svg>
              </div>

            </div>

            <div className="space-y-3">

              {faqs.map((faq, index) => {

                const isOpen = activeIndex === index

                return (
                  <div
                    key={faq.question}
                    className={`
                      group relative overflow-hidden rounded-2xl border backdrop-blur-xl
                      transition-all duration-300
                      ${
                        isOpen
                          ? 'bg-white/90 border-[#19b7c8]/30 shadow-[0_16px_38px_rgba(8,127,145,0.09)]'
                          : 'bg-white/60 border-[#dceff2] hover:bg-white/85 hover:border-[#19b7c8]/20'
                      }
                    `}
                  >

                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      className="w-full px-4 sm:px-5 py-4 flex items-center gap-4 text-left"
                    >

                      <div
                        className={`
                          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                          text-[10px] font-extrabold
                          transition-all duration-300
                          ${
                            isOpen
                              ? 'bg-[#087f91] text-white shadow-[0_7px_18px_rgba(8,127,145,0.2)]'
                              : 'bg-[#eaf9fa] text-[#087f91] group-hover:bg-[#dff6f8]'
                          }
                        `}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      <div className="flex-1 min-w-0">

                        <p
                          className={`
                            text-xs sm:text-sm font-bold leading-5
                            transition-colors duration-300
                            ${
                              isOpen
                                ? 'text-[#087f91]'
                                : 'text-[#173d49]'
                            }
                          `}
                        >
                          {faq.question}
                        </p>

                        <span className="mt-1 block text-[9px] font-semibold tracking-wider text-[#9aabb0]">
                          QUESTION {index + 1}
                        </span>

                      </div>

                      <span
                        className={`
                          flex-shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center
                          transition-all duration-300
                          ${
                            isOpen
                              ? 'rotate-180 bg-[#eaf9fa] border-[#19b7c8]/25 text-[#087f91]'
                              : 'bg-white/70 border-[#087f91]/10 text-[#71858b] group-hover:border-[#19b7c8]/25'
                          }
                        `}
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
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </span>

                    </button>

                    <div
                      className={`
                        grid transition-[grid-template-rows] duration-300 ease-out
                        ${
                          isOpen
                            ? 'grid-rows-[1fr]'
                            : 'grid-rows-[0fr]'
                        }
                      `}
                    >

                      <div className="overflow-hidden">

                        <div className="mx-4 sm:mx-5 mb-5 ml-[72px] sm:ml-[76px] pr-3 pt-3 border-t border-[#087f91]/8">

                          <p className="text-xs sm:text-sm leading-6 text-[#71858b]">
                            {faq.answer}
                          </p>

                        </div>

                      </div>

                    </div>

                    {isOpen && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#087f91] to-[#19b7c8]" />
                    )}

                  </div>
                )
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default FAQ