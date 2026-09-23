import { useNavigate } from 'react-router-dom'

const RoleSelection = () => {
  const navigate = useNavigate()

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3fbfd] text-[#082b3a]">

      <style>{`
        @keyframes maFadeUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes maFadeLeft {
          from {
            opacity: 0;
            transform: translateX(-35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes maFadeRight {
          from {
            opacity: 0;
            transform: translateX(35px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes maFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes maFloatSlow {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-18px) rotate(3deg);
          }
        }

        @keyframes maPulse {
          0%, 100% {
            transform: scale(1);
            opacity: .7;
          }
          50% {
            transform: scale(1.15);
            opacity: 1;
          }
        }

        @keyframes maGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(25,183,200,0.12);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(25,183,200,0);
          }
        }

        @keyframes maLine {
          from {
            transform: scaleX(0);
            transform-origin: left;
          }
          to {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .ma-role-page {
          animation: maFadeUp .8s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-role-brand {
          animation: maFadeLeft .8s .1s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-role-heading {
          animation: maFadeUp .8s .22s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-role-visual {
          animation: maFadeRight .9s .3s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-role-card-one {
          animation: maFadeUp .8s .38s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-role-card-two {
          animation: maFadeUp .8s .5s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-role-float {
          animation: maFloat 4s ease-in-out infinite;
        }

        .ma-role-float-slow {
          animation: maFloatSlow 6s ease-in-out infinite;
        }

        .ma-role-pulse {
          animation: maPulse 2.5s ease-in-out infinite;
        }

        .ma-role-glow {
          animation: maGlow 2.8s ease-in-out infinite;
        }

        .ma-role-line {
          animation: maLine 1.1s .65s cubic-bezier(.22,1,.36,1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .ma-role-page,
          .ma-role-brand,
          .ma-role-heading,
          .ma-role-visual,
          .ma-role-card-one,
          .ma-role-card-two,
          .ma-role-float,
          .ma-role-float-slow,
          .ma-role-pulse,
          .ma-role-glow,
          .ma-role-line {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#19b7c8]/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-48 -right-40 h-[550px] w-[550px] rounded-full bg-[#087f91]/10 blur-3xl" />

      <div className="pointer-events-none absolute left-[8%] top-[25%] h-2 w-2 rounded-full bg-[#19b7c8]/40 ma-role-pulse" />

      <div className="pointer-events-none absolute right-[12%] top-[20%] h-2 w-2 rounded-full bg-[#087f91]/40 ma-role-pulse" />

      <div className="pointer-events-none absolute bottom-[20%] left-[18%] h-1.5 w-1.5 rounded-full bg-[#19b7c8]/40 ma-role-pulse" />

      <main className="ma-role-page relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-7 sm:px-6 lg:px-8">

        <div className="ma-role-brand flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-[#cdebef] bg-white shadow-[0_8px_25px_rgba(8,127,145,0.10)]">

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(25,183,200,0.22),transparent_60%)]" />

              <span className="relative text-xl font-black text-[#087f91]">
                M
              </span>

            </div>

            <div>
              <img
                src="/mediassist-logo.png"
                alt="MediAssist"
                className="w-[125px] sm:w-[145px]"
              />

              <p className="mt-0.5 text-[8px] font-bold tracking-[0.2em] text-[#7b9097]">
                HEALTHCARE MANAGEMENT
              </p>
            </div>

          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[#dceff2] bg-white/70 px-3 py-2 backdrop-blur-md sm:flex">

            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[#18a875]/40 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-[#18a875]" />
            </span>

            <span className="text-[9px] font-bold tracking-[0.12em] text-[#71878e]">
              SYSTEM ONLINE
            </span>

          </div>

        </div>

        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-12">

          <div className="ma-role-heading">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfecef] bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-md">

              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-[#e8f8fa] text-[#087f91]">
                +
              </span>

              <span className="text-[9px] font-bold tracking-[0.15em] text-[#087f91]">
                SECURE HEALTHCARE PORTAL
              </span>

            </div>

            <h1 className="max-w-xl text-4xl font-black leading-[1.05] tracking-[-0.04em] text-[#082b3a] sm:text-5xl lg:text-6xl">

              One platform.

              <span className="block bg-gradient-to-r from-[#087f91] via-[#19b7c8] to-[#4bcbd5] bg-clip-text text-transparent">
                Connected care.
              </span>

            </h1>

            <div className="ma-role-line mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-[#087f91] to-[#19b7c8]" />

            <p className="mt-6 max-w-lg text-sm leading-6 text-[#71878e] sm:text-base">
              Access the MediAssist healthcare management platform through your dedicated workspace.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">

              <div className="flex items-center gap-2 rounded-xl border border-[#dceff2] bg-white/75 px-3 py-2.5 shadow-sm backdrop-blur-md">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf9fa] text-[#087f91]">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21s7-3.4 7-9V5l-7-2-7 2v7c0 5.6 7 9 7 9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.5 12l1.7 1.7 3.5-3.5"
                    />
                  </svg>
                </span>

                <div>
                  <p className="text-[9px] font-bold text-[#082b3a]">
                    Secure
                  </p>
                  <p className="text-[8px] text-[#82959b]">
                    Protected access
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-[#dceff2] bg-white/75 px-3 py-2.5 shadow-sm backdrop-blur-md">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#eaf9fa] text-[#087f91]">
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path
                      strokeLinecap="round"
                      d="M12 7v5l3 2"
                    />
                  </svg>
                </span>

                <div>
                  <p className="text-[9px] font-bold text-[#082b3a]">
                    Connected
                  </p>
                  <p className="text-[8px] text-[#82959b]">
                    Real-time platform
                  </p>
                </div>
              </div>

            </div>

          </div>

          <div className="ma-role-visual relative mx-auto w-full max-w-xl">

            <div className="absolute -right-5 -top-8 h-28 w-28 rounded-full bg-[#19b7c8]/10 blur-2xl ma-role-float" />

            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#087f91]/10 blur-2xl ma-role-float-slow" />

            <div className="relative rounded-[30px] border border-white/80 bg-white/70 p-4 shadow-[0_25px_70px_rgba(8,43,58,0.10)] backdrop-blur-xl sm:p-5">

              <div className="mb-4 flex items-center justify-between px-1">

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#7b9097]">
                    Choose workspace
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#082b3a]">
                    Continue securely
                  </p>
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf9fa] text-[#087f91] ma-role-glow">
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.5 12l1.7 1.7 3.5-3.5"
                    />
                  </svg>
                </div>

              </div>

              <div className="grid gap-3 sm:grid-cols-2">

                <button
                  type="button"
                  onClick={() => navigate('/admin-login')}
                  className="ma-role-card-one group relative overflow-hidden rounded-2xl border border-[#dceff2] bg-[#f8fcfd] p-5 text-left transition-all duration-500 hover:-translate-y-2 hover:border-[#19b7c8]/60 hover:bg-white hover:shadow-[0_20px_45px_rgba(8,127,145,0.15)]"
                >

                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#19b7c8]/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />

                  <div className="relative">

                    <div className="mb-5 flex items-center justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f8fa] text-[#087f91] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">

                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 20V9l8-5 8 5v11"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 20v-6h8v6"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 7v4M10 9h4"
                          />
                        </svg>

                      </div>

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#9aadb2] shadow-sm transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#087f91]">
                        →
                      </span>

                    </div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#087f91]">
                      Management
                    </p>

                    <h2 className="mt-1 text-lg font-black text-[#082b3a]">
                      Admin Portal
                    </h2>

                    <p className="mt-2 text-[10px] leading-5 text-[#7b9097]">
                      Manage doctors, appointments and healthcare operations.
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-[9px] font-bold text-[#18a875]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />
                      Authorized access
                    </div>

                  </div>

                </button>

                <button
                  type="button"
                  onClick={() => navigate('/doctor-login')}
                  className="ma-role-card-two group relative overflow-hidden rounded-2xl border border-[#dceff2] bg-[#f8fcfd] p-5 text-left transition-all duration-500 hover:-translate-y-2 hover:border-[#19b7c8]/60 hover:bg-white hover:shadow-[0_20px_45px_rgba(8,127,145,0.15)]"
                >

                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[#087f91]/10 blur-2xl transition-transform duration-700 group-hover:scale-150" />

                  <div className="relative">

                    <div className="mb-5 flex items-center justify-between">

                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f8fa] text-[#087f91] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">

                        <svg
                          className="h-6 w-6"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.7"
                        >
                          <circle cx="12" cy="8" r="3.2" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5.5 20a6.5 6.5 0 0113 0"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 4v4M17 6h4"
                          />
                        </svg>

                      </div>

                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#9aadb2] shadow-sm transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#087f91]">
                        →
                      </span>

                    </div>

                    <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#087f91]">
                      Clinical
                    </p>

                    <h2 className="mt-1 text-lg font-black text-[#082b3a]">
                      Doctor Portal
                    </h2>

                    <p className="mt-2 text-[10px] leading-5 text-[#7b9097]">
                      Manage appointments, patient care and your professional profile.
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-[9px] font-bold text-[#18a875]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />
                      Authorized access
                    </div>

                  </div>

                </button>

              </div>

              <div className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#e5f0f2] bg-white/70 px-3 py-2.5">

                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#f0f9fa] text-[#087f91]">
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                    />
                  </svg>
                </span>

                <span className="text-[9px] font-medium text-[#82959b]">
                  Protected by MediAssist secure authentication
                </span>

              </div>

            </div>

            <div className="ma-role-float absolute -right-4 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-2xl border border-white bg-white/80 text-[#19b7c8] shadow-lg backdrop-blur-md xl:flex">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v18M3 12h18"
                />
              </svg>
            </div>

          </div>

        </section>

        <footer className="flex flex-col items-center justify-between gap-2 border-t border-[#dceff2]/70 pt-4 text-[9px] text-[#91a2a7] sm:flex-row">

          <span>
            © {new Date().getFullYear()} MediAssist
          </span>

          <span className="font-medium tracking-wide">
            Smart Healthcare Management Platform
          </span>

        </footer>

      </main>

    </div>
  )
}

export default RoleSelection