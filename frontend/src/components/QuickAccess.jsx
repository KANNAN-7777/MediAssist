import React from 'react'
import { useNavigate } from 'react-router-dom'

const actions = [
  {
    title: 'Find a Doctor',
    description: 'Browse specialists',
    path: '/doctors',
    number: '01',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="6.5" />
        <path strokeLinecap="round" d="M16 16l4.5 4.5" />
        <path strokeLinecap="round" d="M8.5 11h5M11 8.5v5" />
      </svg>
    )
  },
  {
    title: 'My Appointments',
    description: 'View your bookings',
    path: '/myappointment',
    number: '02',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path strokeLinecap="round" d="M8 3v4M16 3v4M4 10h16" />
        <path strokeLinecap="round" d="M8 14h3M8 17h6" />
      </svg>
    )
  },
  {
    title: 'My Profile',
    description: 'Manage your details',
    path: '/profile',
    number: '03',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.5" />
        <path strokeLinecap="round" d="M5 20c.8-3.4 3.1-5 7-5s6.2 1.6 7 5" />
      </svg>
    )
  },
  {
    title: 'Contact Support',
    description: 'Get assistance',
    path: '/contact',
    number: '04',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.8">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5h14v11H9l-4 4V5z"
        />
        <path strokeLinecap="round" d="M8 9h8M8 12h5" />
      </svg>
    )
  }
]

const QuickAccess = () => {
  const navigate = useNavigate()

  const handleNavigate = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  return (
    <section className="relative py-10 sm:py-12 lg:py-14 overflow-hidden">

      <div className="absolute left-1/4 -top-24 w-72 h-72 rounded-full bg-[#19b7c8]/6 blur-[110px] pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-[#087f91]/6 blur-[120px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4">

        <div className="relative overflow-hidden rounded-[30px] bg-[#062b3a] shadow-[0_24px_65px_rgba(6,44,59,0.18)]">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(25,183,200,0.18),transparent_32%),radial-gradient(circle_at_10%_100%,rgba(8,127,145,0.22),transparent_35%)] pointer-events-none" />

          <div className="absolute right-[-80px] top-[-90px] w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute right-[-35px] top-[-45px] w-40 h-40 rounded-full border border-white/5 pointer-events-none" />

          <div className="relative z-10 p-5 sm:p-7 lg:p-8">

            <div className="grid lg:grid-cols-[0.55fr_1.45fr] gap-7 lg:gap-10 items-center">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/10 text-[#9ceef0] text-[10px] font-bold tracking-[0.16em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8] shadow-[0_0_12px_rgba(25,183,200,0.7)]" />
                  QUICK ACCESS
                </div>

                <h2 className="mt-4 text-2xl sm:text-3xl lg:text-[34px] leading-[1.08] font-extrabold tracking-tight text-white">
                  Your healthcare
                  <span className="block text-[#8ee9ed]">
                    starts here.
                  </span>
                </h2>

                <p className="mt-3 max-w-sm text-xs sm:text-sm leading-6 text-white/50">
                  Access your most important MediAssist tools without
                  searching through the platform.
                </p>

                <div className="mt-6 flex items-center gap-3">

                  <div className="relative w-11 h-11 rounded-2xl bg-[#19b7c8]/10 border border-[#19b7c8]/20 flex items-center justify-center text-[#9ceef0]">

                    <div className="absolute inset-1.5 rounded-xl border border-[#19b7c8]/15" />

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="relative w-5 h-5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21s8-4.5 8-10.5A4.5 4.5 0 0015.5 6c-1.5 0-2.7.7-3.5 1.8C11.2 6.7 10 6 8.5 6A4.5 4.5 0 004 10.5C4 16.5 12 21 12 21z"
                      />
                    </svg>

                  </div>

                  <div>
                    <p className="text-xs font-bold text-white">
                      Everything in one place
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/40">
                      Simple. Fast. Connected.
                    </p>
                  </div>

                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">

                {actions.map((action) => (

                  <button
                    key={action.title}
                    type="button"
                    onClick={() => handleNavigate(action.path)}
                    className="
                      group
                      relative
                      overflow-hidden
                      min-h-[112px]
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.055]
                      backdrop-blur-xl
                      p-4
                      text-left
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:bg-white/[0.10]
                      hover:border-[#19b7c8]/30
                      hover:shadow-[0_18px_35px_rgba(0,0,0,0.14)]
                    "
                  >

                    <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-[#19b7c8]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex items-start justify-between gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-white/[0.07]
                          border
                          border-white/10
                          flex
                          items-center
                          justify-center
                          text-[#9ceef0]
                          transition-all
                          duration-300
                          group-hover:bg-[#19b7c8]/15
                          group-hover:border-[#19b7c8]/25
                          group-hover:scale-105
                        "
                      >
                        {action.icon}
                      </div>

                      <span className="text-[10px] font-extrabold tracking-wider text-white/20 group-hover:text-[#8ee9ed]/50 transition-colors">
                        {action.number}
                      </span>

                    </div>

                    <div className="relative mt-4">

                      <p className="text-xs sm:text-sm font-bold text-white">
                        {action.title}
                      </p>

                      <div className="mt-1 flex items-center justify-between gap-3">

                        <p className="text-[10px] sm:text-[11px] text-white/40">
                          {action.description}
                        </p>

                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/30 group-hover:bg-[#19b7c8]/15 group-hover:text-[#9ceef0] group-hover:border-[#19b7c8]/20 transition-all duration-300">

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 12h14M13 6l6 6-6 6"
                            />
                          </svg>

                        </span>

                      </div>

                    </div>

                  </button>

                ))}

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default QuickAccess