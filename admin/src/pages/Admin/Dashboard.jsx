import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'

const StatIcon = ({ type }) => {
  const icons = {
    doctors: (
      <>
        <circle cx="32" cy="20" r="9" stroke="currentColor" strokeWidth="3.5" />
        <path
          d="M15 53C15 42.5 21.5 36 32 36C42.5 36 49 42.5 49 53"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M45 17C49 18 51.5 21 51.5 25"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </>
    ),
    patients: (
      <>
        <circle cx="24" cy="21" r="7.5" stroke="currentColor" strokeWidth="3.5" />
        <circle cx="43" cy="23" r="6.5" stroke="currentColor" strokeWidth="3.5" />
        <path
          d="M10 52C10 42.5 15.5 36 24 36C32.5 36 38 42.5 38 52"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M38 38C45 38 50.5 43 52 51"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </>
    ),
    appointments: (
      <>
        <rect
          x="10"
          y="14"
          width="44"
          height="40"
          rx="6"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M19 10V20M45 10V20M10 27H54"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M20 36H27M37 36H44M20 46H27M37 46H44"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </>
    ),
    cancelled: (
      <>
        <rect
          x="12"
          y="14"
          width="40"
          height="38"
          rx="6"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M21 10V19M43 10V19M12 27H52"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M24 36L40 44M40 36L24 44"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </>
    ),
    refunds: (
      <>
        <circle
          cx="32"
          cy="32"
          r="22"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          d="M23 27C23 23 27 20 32 20C37 20 41 23 41 27"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M23 37C23 41 27 44 32 44C37 44 41 41 41 37"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M32 16V48"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </>
    )
  }

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="h-9 w-9"
      aria-hidden="true"
    >
      {icons[type]}
    </svg>
  )
}

const statConfig = [
  {
    key: 'doctors',
    title: 'Doctors',
    description: 'Registered doctors',
    icon: 'doctors',
    accent: 'text-[#087f91]',
    iconBg: 'bg-[#e7f8fa]',
    glow: 'from-[#19b7c8]/20'
  },
  {
    key: 'users',
    title: 'Patients',
    description: 'Registered patients',
    icon: 'patients',
    accent: 'text-[#087f91]',
    iconBg: 'bg-[#e7f8fa]',
    glow: 'from-[#19b7c8]/20'
  },
  {
    key: 'appointments',
    title: 'Appointments',
    description: 'Total appointments',
    icon: 'appointments',
    accent: 'text-[#087f91]',
    iconBg: 'bg-[#e7f8fa]',
    glow: 'from-[#19b7c8]/20'
  },
  {
    key: 'cancelledAppointments',
    title: 'Cancelled',
    description: 'Cancelled appointments',
    icon: 'cancelled',
    accent: 'text-[#d95d68]',
    iconBg: 'bg-[#fff0f2]',
    glow: 'from-[#e65d67]/15'
  },
  {
    key: 'refunds',
    title: 'Refunds',
    description: 'Temporary refund count',
    icon: 'refunds',
    accent: 'text-[#b27a1f]',
    iconBg: 'bg-[#fff8e8]',
    glow: 'from-[#e5a93d]/15'
  }
]

const Dashboard = () => {
  const {
    aToken,
    dashData,
    getDashData
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getDashData()
    }
  }, [aToken])

  return (
    <div className="relative w-full">

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#19b7c8]/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 top-96 h-72 w-72 rounded-full bg-[#087f91]/5 blur-3xl" />

      <div className="relative">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#18a875] shadow-[0_0_0_5px_rgba(24,168,117,.10)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087f91]">
                Admin Overview
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#082b3a] sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-[#71858b]">
              Monitor your MediAssist healthcare operations.
            </p>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#dceff2] bg-white/80 px-3 py-2 shadow-sm backdrop-blur-xl">
            <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />

            <span className="text-[10px] font-semibold text-[#60777e]">
              System Active
            </span>
          </div>

        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

          {statConfig.map((stat) => (
            <div
              key={stat.key}
              className="group relative overflow-hidden rounded-[22px] border border-[#dceff2] bg-white/90 p-5 shadow-[0_8px_30px_rgba(8,127,145,0.06)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-[#19b7c8]/30 hover:shadow-[0_18px_40px_rgba(8,127,145,0.12)]"
            >

              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${stat.glow} to-transparent blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />

              <div className="relative flex items-start justify-between gap-3">

                <div className="min-w-0">

                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#789097]">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#082b3a]">
                    {dashData?.[stat.key] || 0}
                  </p>

                  <p className="mt-1 text-[10px] text-[#94a4a8]">
                    {stat.description}
                  </p>

                </div>

                <div
                  className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl ${stat.iconBg} ${stat.accent} transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <StatIcon type={stat.icon} />
                </div>

              </div>

              <div className="mt-5 h-1 overflow-hidden rounded-full bg-[#edf5f6]">
                <div
                  className={`h-full w-1/2 rounded-full bg-current ${stat.accent} opacity-50 transition-all duration-700 group-hover:w-4/5 group-hover:opacity-100`}
                />
              </div>

            </div>
          ))}

        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] border border-[#dceff2] bg-white/90 shadow-[0_10px_35px_rgba(8,127,145,0.06)] backdrop-blur-xl">

          <div className="flex flex-col gap-4 border-b border-[#edf3f4] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e8f8fa] text-[#087f91]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>

                <h2 className="text-base font-bold text-[#082b3a]">
                  Latest Appointments
                </h2>
              </div>

              <p className="mt-2 text-xs text-[#819398]">
                Recently booked appointments across MediAssist.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full bg-[#f3f9fa] px-3 py-1.5">
              <span className="text-xs font-bold text-[#087f91]">
                {dashData?.latestAppointments?.length || 0}
              </span>

              <span className="text-[10px] font-medium text-[#809398]">
                appointments
              </span>
            </div>

          </div>

          {dashData?.latestAppointments?.length > 0 ? (

            <div>

              {dashData.latestAppointments.map((item, index) => (

                <div
                  key={item._id}
                  className="group border-b border-[#edf3f4] px-5 py-4 last:border-b-0 hover:bg-[#f8fcfd] sm:px-6"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                    <div className="flex min-w-0 flex-1 items-center gap-3">

                      <div className="relative flex-shrink-0">

                        <img
                          src={
                            item.userData?.image ||
                            assets.profile_pic
                          }
                          alt={
                            item.userData?.name ||
                            'Patient'
                          }
                          className="h-11 w-11 rounded-2xl border border-[#dceff2] object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#18a875]" />

                      </div>

                      <div className="min-w-0">

                        <p className="truncate text-sm font-bold text-[#082b3a]">
                          {item.userData?.name ||
                            'Unknown Patient'}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#8a9a9f]">
                          Patient #{index + 1}
                        </p>

                      </div>

                    </div>

                    <div className="flex min-w-0 flex-1 items-center gap-3">

                      <img
                        src={item.docData?.image}
                        alt={
                          item.docData?.name ||
                          'Doctor'
                        }
                        className="h-10 w-10 flex-shrink-0 rounded-xl border border-[#dceff2] object-cover"
                      />

                      <div className="min-w-0">

                        <p className="truncate text-sm font-semibold text-[#29434c]">
                          {item.docData?.name ||
                            'Unknown Doctor'}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-[#8a9a9f]">
                          {item.docData?.speciality ||
                            'N/A'}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3 lg:w-36">

                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#f1f8f9] text-[#087f91]">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-4 w-4"
                        >
                          <path
                            d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-wide text-[#94a4a8]">
                          Date & Time
                        </p>

                        <p className="mt-1 text-xs font-semibold text-[#516970]">
                          {item.slotDate}
                        </p>

                        <p className="mt-0.5 text-[10px] text-[#8b9ca1]">
                          {item.slotTime}
                        </p>
                      </div>

                    </div>

                    <div className="lg:w-44">

                      {item.cancelled ? (

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-[#fff0f2] px-2.5 py-1 text-[10px] font-bold text-[#d95d68]">
                            Cancelled
                          </span>

                          {item.payment && (
                            <span className="rounded-full bg-[#e8f8fa] px-2.5 py-1 text-[10px] font-bold text-[#087f91]">
                              Refund
                            </span>
                          )}

                        </div>

                      ) : item.isCompleted ? (

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-[#f0f2f3] px-2.5 py-1 text-[10px] font-bold text-[#65777d]">
                            Completed
                          </span>

                          {item.payment ? (
                            <span className="rounded-full bg-[#eaf9f3] px-2.5 py-1 text-[10px] font-bold text-[#18a875]">
                              Paid
                            </span>
                          ) : (
                            <span className="rounded-full bg-[#fff8e8] px-2.5 py-1 text-[10px] font-bold text-[#b27a1f]">
                              Unpaid
                            </span>
                          )}

                        </div>

                      ) : (

                        <div className="flex flex-wrap items-center gap-2">

                          <span className="rounded-full bg-[#e8f8fa] px-2.5 py-1 text-[10px] font-bold text-[#087f91]">
                            Upcoming
                          </span>

                          {item.payment ? (
                            <span className="rounded-full bg-[#eaf9f3] px-2.5 py-1 text-[10px] font-bold text-[#18a875]">
                              Paid
                            </span>
                          ) : (
                            <span className="rounded-full bg-[#fff8e8] px-2.5 py-1 text-[10px] font-bold text-[#b27a1f]">
                              Unpaid
                            </span>
                          )}

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <div className="px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f1f8f9] text-[#9aabb0]">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M8 3V6M16 3V6M4 9H20M6 5H18C19.1 5 20 5.9 20 7V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V7C4 5.9 4.9 5 6 5Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

              </div>

              <p className="mt-4 text-sm font-semibold text-[#60777e]">
                No recent appointments
              </p>

              <p className="mt-1 text-xs text-[#9aa8ac]">
                New appointments will appear here.
              </p>

            </div>

          )}

        </div>

      </div>

    </div>
  )
}

export default Dashboard