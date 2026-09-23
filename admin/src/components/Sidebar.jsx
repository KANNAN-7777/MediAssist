import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { assets } from '../assets/assets'


const Sidebar = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  const [mobileOpen, setMobileOpen] = useState(false)


  const adminLinks = [
    {
      to: '/admin-dashboard',
      icon: assets.home_icon,
      label: 'Dashboard',
      description: 'Overview',
    },
    {
      to: '/all-appointments',
      icon: assets.appointment_icon,
      label: 'Appointments',
      description: 'Manage bookings',
    },
    {
      to: '/add-doctor',
      icon: assets.add_icon,
      label: 'Add Doctor',
      description: 'Create profile',
    },
    {
      to: '/doctor-list',
      icon: assets.people_icon,
      label: 'Doctor List',
      description: 'Manage doctors',
    },
  ]


  const doctorLinks = [
    {
      to: '/doctor-dashboard',
      icon: assets.home_icon,
      label: 'Dashboard',
      description: 'Overview',
    },
    {
      to: '/doctor-appointments',
      icon: assets.appointment_icon,
      label: 'Appointments',
      description: 'Patient bookings',
    },
    {
      to: '/patient-history',
      icon: assets.people_icon,
      label: 'Patient History',
      description: 'Previous visits',
    },
    {
      to: '/doctor-profile',
      icon: assets.people_icon,
      label: 'Profile',
      description: 'Your details',
    },
  ]


  const isAdmin = !!aToken

  const links = isAdmin
    ? adminLinks
    : dToken
      ? doctorLinks
      : []


  if (!links.length) {
    return null
  }


  const panelType = isAdmin
    ? 'Admin workspace'
    : 'Doctor workspace'

  const panelLabel = isAdmin
    ? 'ADMIN'
    : 'DOCTOR'


  return (
    <>
      {/* Mobile Open Button */}

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="
          fixed
          left-4
          top-[82px]
          z-40
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          border
          border-[#dceff2]
          bg-white
          text-[#087f91]
          shadow-lg
          shadow-[#087f91]/10
          lg:hidden
        "
        aria-label="Open navigation"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>


      {/* Mobile Overlay */}

      {mobileOpen && (
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className="
            fixed
            inset-0
            z-40
            bg-[#06202d]/30
            backdrop-blur-sm
            lg:hidden
          "
          aria-label="Close navigation"
        />
      )}


      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-[68px]
          z-50
          h-[calc(100vh-68px)]
          w-[280px]
          border-r
          border-[#dceff2]
          bg-white/95
          shadow-[15px_0_45px_rgba(8,43,58,0.08)]
          backdrop-blur-xl
          transition-transform
          duration-300

          lg:sticky
          lg:top-[68px]
          lg:z-30
          lg:h-[calc(100vh-68px)]
          lg:w-[250px]
          lg:translate-x-0
          lg:shadow-none

          xl:w-[270px]

          ${mobileOpen
            ? 'translate-x-0'
            : '-translate-x-full'
          }
        `}
      >

        <div className="flex h-full flex-col overflow-y-auto">

          {/* Workspace Header */}

          <div className="border-b border-[#edf4f5] px-5 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf9fa]">
                <span className="text-lg font-black text-[#087f91]">
                  M
                </span>
              </div>


              <div className="min-w-0">

                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#7b9097]">
                  MediAssist
                </p>

                <p className="mt-0.5 truncate text-sm font-bold text-[#082b3a]">
                  {panelType}
                </p>

              </div>


              {/* Mobile Close */}

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="
                  ml-auto
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  text-[#6c8188]
                  hover:bg-[#f3f9fa]
                  hover:text-[#087f91]
                  lg:hidden
                "
                aria-label="Close navigation"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>
              </button>

            </div>

          </div>


          {/* Navigation */}

          <div className="px-4 pt-5">

            <div className="mb-3 flex items-center gap-2 px-2">

              <span className="h-px flex-1 bg-[#e8f2f4]" />

              <span className="text-[9px] font-bold tracking-[0.18em] text-[#8a9ca2]">
                {panelLabel}
              </span>

              <span className="h-px flex-1 bg-[#e8f2f4]" />

            </div>


            <nav className="space-y-1.5">

              {links.map((item) => (

                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `
                      group
                      relative
                      flex
                      items-center
                      gap-3
                      overflow-hidden
                      rounded-2xl
                      px-3
                      py-3
                      transition-all
                      duration-300

                      ${
                        isActive
                          ? 'bg-[#eaf9fa] text-[#087f91] shadow-sm'
                          : 'text-[#5f737a] hover:-translate-y-0.5 hover:bg-[#f6fbfc] hover:text-[#087f91]'
                      }
                    `
                  }
                >

                  {({ isActive }) => (

                    <>

                      {/* Active Indicator */}

                      {isActive && (
                        <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-[#19b7c8]" />
                      )}


                      {/* Icon */}

                      <span
                        className={`
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? 'bg-white shadow-sm'
                              : 'bg-[#f5f9fa] group-hover:bg-white group-hover:shadow-sm'
                          }
                        `}
                      >

                        <img
                          src={item.icon}
                          alt=""
                          className={`
                            h-5
                            w-5
                            object-contain
                            transition-transform
                            duration-300

                            ${
                              isActive
                                ? 'scale-105'
                                : 'group-hover:scale-110'
                            }
                          `}
                        />

                      </span>


                      {/* Text */}

                      <span className="min-w-0 flex-1">

                        <span
                          className={`
                            block
                            break-words
                            text-sm
                            font-bold

                            ${
                              isActive
                                ? 'text-[#087f91]'
                                : 'text-[#3f5961]'
                            }
                          `}
                        >
                          {item.label}
                        </span>


                        <span
                          className={`
                            mt-0.5
                            block
                            break-words
                            text-[9px]

                            ${
                              isActive
                                ? 'text-[#4e929c]'
                                : 'text-[#8b9da2]'
                            }
                          `}
                        >
                          {item.description}
                        </span>

                      </span>


                      {/* Arrow */}

                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-sm
                          transition-all
                          duration-300

                          ${
                            isActive
                              ? 'bg-white text-[#087f91] shadow-sm'
                              : 'text-[#a1b0b4] opacity-0 group-hover:translate-x-0.5 group-hover:opacity-100'
                          }
                        `}
                      >
                        →
                      </span>

                    </>

                  )}

                </NavLink>

              ))}

            </nav>

          </div>


          {/* System Status */}

          <div className="mt-auto p-4">

            <div className="relative overflow-hidden rounded-2xl border border-[#dceff2] bg-[#f5fbfc] p-4">

              <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#19b7c8]/10 blur-2xl" />

              <div className="relative flex items-start gap-3">

                <span className="relative mt-1 flex h-2.5 w-2.5 shrink-0">

                  <span className="absolute inset-0 animate-ping rounded-full bg-[#18a875]/40" />

                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#18a875]" />

                </span>


                <div className="min-w-0">

                  <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#71878e]">
                    System status
                  </p>

                  <p className="mt-1 text-[11px] font-bold leading-4 text-[#082b3a]">
                    All systems operational
                  </p>

                  <p className="mt-1 text-[9px] leading-4 text-[#82959b]">
                    MediAssist services are running normally.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </aside>
    </>
  )
}

export default Sidebar