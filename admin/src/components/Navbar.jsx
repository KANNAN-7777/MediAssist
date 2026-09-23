import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)

  const isAdmin = !!aToken
  const isDoctor = !!dToken

  const panelName = isAdmin ? 'Admin Panel' : 'Doctor Panel'
  const panelLabel = isAdmin ? 'ADMINISTRATION' : 'HEALTHCARE'

  const logout = () => {
    localStorage.removeItem('aToken')
    setAToken('')

    localStorage.removeItem('dToken')
    setDToken('')

    navigate('/', { replace: true })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#dceff2]/80 bg-white/90 backdrop-blur-xl">
      <div className="flex h-[68px] items-center justify-between px-4 sm:px-6 lg:px-8">

        <div className="flex min-w-0 items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#d9f0f3] bg-[#f2fbfc] shadow-sm">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(25,183,200,0.18),transparent_60%)]" />

            <span className="relative text-lg font-black text-[#087f91]">
              M
            </span>
          </div>

          <div className="hidden h-8 w-px bg-[#dcecef] sm:block" />

          <img
            src="/mediassist-logo.png"
            className="w-[108px] sm:w-[125px] h-auto object-contain"
            alt="MediAssist"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">

          <div className="hidden items-center gap-3 rounded-xl border border-[#dceff2] bg-[#f7fcfd] px-3 py-2 sm:flex">

            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#19b7c8]/40" />

              <span className="relative h-2.5 w-2.5 rounded-full bg-[#18a875]" />
            </span>

            <div className="leading-none">
              <p className="text-[9px] font-bold tracking-[0.16em] text-[#7b9097]">
                {panelLabel}
              </p>

              <p className="mt-1 text-xs font-bold text-[#082b3a]">
                {panelName}
              </p>
            </div>
          </div>

          <div className="relative">

            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="group flex h-10 items-center gap-2 rounded-xl border border-[#d9edf0] bg-white px-3 text-[#082b3a] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#19b7c8]/50 hover:bg-[#f4fcfd] hover:shadow-[0_8px_22px_rgba(8,127,145,0.10)]"
              aria-label="Panel account menu"
              aria-expanded={showMenu}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#e9f8fa] text-[#087f91]">

                {isAdmin ? (
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
                      d="M12 14a4 4 0 100-8 4 4 0 000 8z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 20a7.5 7.5 0 0115 0"
                    />
                  </svg>
                ) : (
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
                      d="M12 21s7-3.4 7-9V5l-7-2-7 2v7c0 5.6 7 9 7 9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.5 12l1.7 1.7 3.5-3.5"
                    />
                  </svg>
                )}

              </span>

              <span className="hidden text-xs font-bold text-[#082b3a] sm:block">
                {isAdmin ? 'Admin' : 'Doctor'}
              </span>

              <svg
                className={`h-3.5 w-3.5 text-[#6c8188] transition-transform duration-300 ${
                  showMenu ? 'rotate-180' : ''
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 9l6 6 6-6"
                />
              </svg>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-52 overflow-hidden rounded-2xl border border-[#dceff2] bg-white p-2 shadow-[0_18px_45px_rgba(8,43,58,0.14)]">

                <div className="mb-1 rounded-xl bg-[#f5fbfc] px-3 py-2.5">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#7b9097]">
                    Current access
                  </p>

                  <p className="mt-1 text-xs font-bold text-[#082b3a]">
                    {panelName}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-xs font-bold text-[#e65d67] transition-all duration-200 hover:bg-[#fff3f4]"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#fff0f1] transition-transform duration-200 group-hover:translate-x-0.5">
                    <svg
                      className="h-3.5 w-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 17l5-5-5-5"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12H3"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 19V5a2 2 0 00-2-2h-5"
                      />
                    </svg>
                  </span>

                  Sign out
                </button>

              </div>
            )}

          </div>

          <button
            type="button"
            onClick={logout}
            className="hidden h-10 items-center gap-2 rounded-xl bg-[#082b3a] px-4 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#087f91] hover:shadow-[0_8px_24px_rgba(8,127,145,0.20)] sm:flex"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 17l5-5-5-5"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H3"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 19V5a2 2 0 00-2-2h-5"
              />
            </svg>

            Logout
          </button>

        </div>

      </div>
    </header>
  )
}

export default Navbar