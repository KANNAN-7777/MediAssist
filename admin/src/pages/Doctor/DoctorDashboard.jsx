import React, { useContext, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../../context/DoctorContext'

const Icon = ({ name, size = 18 }) => {
  const icons = {
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M16 2v4M8 2v4M3 9h18" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    check: (
      <path d="m5 12 4 4L19 6" />
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3.5 20c.6-3.5 2.5-5 5.5-5s4.9 1.5 5.5 5" />
        <path d="M15 15c2.5.2 4 1.6 4.5 4" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M3 9h18" />
        <path d="M15 14h3" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    activity: (
      <path d="M3 12h4l2-7 4 14 2-7h6" />
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20c.7-3.4 2.9-5 6.5-5s5.8 1.6 6.5 5" />
      </>
    ),
    money: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M15 8.5c-.8-.7-1.8-1-3-1-1.7 0-3 .8-3 2s1.3 2 3 2 3 .8 3 2-1.3 2-3 2c-1.2 0-2.2-.3-3-1" />
        <path d="M12 6v12" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" />
        <path d="m14.5 7.5 3 3" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
        <path d="M3 5v5h5" />
        <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
        <path d="M21 19v-5h-5" />
      </>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  )
}

const DoctorDashboard = () => {
  const navigate = useNavigate()

  const {
    appointments,
    getAppointments,
    doctorData,
    dToken,
    changeAvailability
  } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  const today = new Date().toISOString().split('T')[0]

  const activeAppointments = appointments.filter(
    item => !item.cancelled
  )

  const todayAppointments = appointments.filter(
    item =>
      item.slotDate === today &&
      !item.cancelled
  )

  const completedAppointments = appointments.filter(
    item => item.isCompleted
  )

  const upcomingAppointments = appointments.filter(
    item =>
      !item.cancelled &&
      !item.isCompleted
  )

  const onlinePaid = appointments.filter(
    item =>
      item.paymentMethod === 'Online' &&
      item.payment === true
  )

  const cashPayments = appointments.filter(
    item => item.paymentMethod === 'Cash'
  )

  const refunds = appointments.filter(
    item => item.refund === true
  )

  const pendingPayments = appointments.filter(
    item =>
      !item.cancelled &&
      item.paymentMethod !== 'Cash' &&
      item.payment !== true
  )

  const upcomingAppointment = useMemo(() => {
    const available = appointments
      .filter(item => !item.cancelled && !item.isCompleted)
      .slice()
      .sort((a, b) => {
        const first = new Date(`${a.slotDate} ${a.slotTime}`)
        const second = new Date(`${b.slotDate} ${b.slotTime}`)

        return first - second
      })

    return available[0] || null
  }, [appointments])

  const recentAppointments = appointments.slice(0, 5)

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointments.length,
      icon: 'calendar',
      tone: 'teal'
    },
    {
      title: 'Upcoming',
      value: upcomingAppointments.length,
      icon: 'clock',
      tone: 'blue'
    },
    {
      title: 'Completed',
      value: completedAppointments.length,
      icon: 'check',
      tone: 'green'
    },
    {
      title: 'Total Patients',
      value: new Set(
        appointments
          .map(item => item.userId || item.userData?._id || item.userData?.email)
          .filter(Boolean)
      ).size,
      icon: 'users',
      tone: 'purple'
    },
    {
      title: 'Online Payments',
      value: onlinePaid.length,
      icon: 'wallet',
      tone: 'cyan'
    },
    {
      title: 'Cash Payments',
      value: cashPayments.length,
      icon: 'money',
      tone: 'orange'
    },
    {
      title: 'Refunds',
      value: refunds.length,
      icon: 'refresh',
      tone: 'red'
    }
  ]

  const toneStyles = {
    teal: {
      icon: 'bg-[#e8f8fa] text-[#087f91]',
      value: 'text-[#087f91]',
      bar: 'bg-[#19b7c8]'
    },
    blue: {
      icon: 'bg-[#edf5fc] text-[#397bad]',
      value: 'text-[#397bad]',
      bar: 'bg-[#4c8cc5]'
    },
    green: {
      icon: 'bg-[#effbf6] text-[#159164]',
      value: 'text-[#159164]',
      bar: 'bg-[#18a875]'
    },
    purple: {
      icon: 'bg-[#f5f0fc] text-[#8061a7]',
      value: 'text-[#8061a7]',
      bar: 'bg-[#9673c2]'
    },
    cyan: {
      icon: 'bg-[#eaf9f8] text-[#168e89]',
      value: 'text-[#168e89]',
      bar: 'bg-[#22a9a3]'
    },
    orange: {
      icon: 'bg-[#fff7eb] text-[#b87918]',
      value: 'text-[#b87918]',
      bar: 'bg-[#e5a93d]'
    },
    red: {
      icon: 'bg-[#fff2f4] text-[#d55461]',
      value: 'text-[#d55461]',
      bar: 'bg-[#e65d67]'
    }
  }

  const getPaymentStatus = item => {
    if (item.paymentMethod === 'Cash') {
      return (
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#f6dfbd] bg-[#fff8ed] px-2.5 py-1.5 text-[10px] font-bold text-[#b87918]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5a93d]" />
          Cash
        </span>
      )
    }

    if (item.payment === true) {
      return (
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#ccefe0] bg-[#effbf6] px-2.5 py-1.5 text-[10px] font-bold text-[#159164]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#18a875]" />
          Paid Online
        </span>
      )
    }

    return (
      <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#f3e4ba] bg-[#fffaf0] px-2.5 py-1.5 text-[10px] font-bold text-[#a47718]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#e5a93d]" />
        Unpaid
      </span>
    )
  }

  const getAppointmentStatus = item => {
    if (item.cancelled) {
      return (
        <div className="flex flex-wrap gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f2d3d7] bg-[#fff3f4] px-2.5 py-1.5 text-[10px] font-bold text-[#d55461]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e65d67]" />
            Cancelled
          </span>

          {item.refund === true && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8e6f5] bg-[#f1f7fd] px-2.5 py-1.5 text-[10px] font-bold text-[#3778ae]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4c8cc5]" />
              Refund
            </span>
          )}
        </div>
      )
    }

    if (item.isCompleted) {
      return (
        <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#e1e9eb] bg-[#f6f8f9] px-2.5 py-1.5 text-[10px] font-bold text-[#6c8188]">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8b9ba0]" />
          Completed
        </span>
      )
    }

    return (
      <span className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-[#cdecef] bg-[#eefbfd] px-2.5 py-1.5 text-[10px] font-bold text-[#087f91]">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#19b7c8]" />
        Upcoming
      </span>
    )
  }

  return (
    <div className="relative w-full min-w-0 overflow-hidden pb-8">

      <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-[#19b7c8]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-[420px] h-72 w-72 rounded-full bg-[#087f91]/5 blur-3xl" />

      <div className="relative min-w-0">

        <header className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

          <div className="min-w-0">

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d7edf0] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#087f91] shadow-sm backdrop-blur-xl">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  doctorData?.available
                    ? 'animate-pulse bg-[#18a875]'
                    : 'bg-[#e65d67]'
                }`}
              />
              Doctor Portal
            </div>

            <h1 className="break-words text-2xl font-black tracking-[-0.03em] text-[#082b3a] sm:text-3xl">
              Good to see you, Dr. {doctorData?.name || 'Doctor'}
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#6c8188]">
              Here's your practice overview and today's appointment activity.
            </p>

          </div>

          <div className="flex flex-wrap items-center gap-2">

            <button
              type="button"
              onClick={() => navigate('/doctor-appointments')}
              className="inline-flex items-center gap-2 rounded-xl border border-[#cfe8eb] bg-white px-4 py-2.5 text-[10px] font-bold text-[#087f91] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e8f8fa]"
            >
              <Icon name="calendar" size={14} />
              Appointments
            </button>

            <button
              type="button"
              onClick={() => navigate('/doctor-profile')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#087f91] px-4 py-2.5 text-[10px] font-bold text-white shadow-[0_10px_24px_rgba(8,127,145,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#056071]"
            >
              <Icon name="edit" size={14} />
              Profile
            </button>

          </div>

        </header>


        <section
          className={`mb-6 overflow-hidden rounded-[25px] border p-5 shadow-sm backdrop-blur-xl sm:p-6 ${
            doctorData?.available
              ? 'border-[#ccefe0] bg-gradient-to-r from-[#f4fcf8] via-white to-[#f3fbfd]'
              : 'border-[#efd9dc] bg-gradient-to-r from-[#fff8f8] via-white to-[#f8fbfc]'
          }`}
        >

          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex min-w-0 items-center gap-4">

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                  doctorData?.available
                    ? 'bg-[#e7f8f0] text-[#18a875]'
                    : 'bg-[#fff0f1] text-[#e65d67]'
                }`}
              >
                <Icon
                  name={doctorData?.available ? 'check' : 'clock'}
                  size={21}
                />
              </div>

              <div className="min-w-0">
                <h2 className="break-words text-sm font-bold text-[#082b3a] sm:text-base">
                  {doctorData?.available
                    ? 'You are available for appointments'
                    : 'You are currently unavailable'}
                </h2>

                <p className="mt-1 break-words text-[11px] leading-5 text-[#6c8188]">
                  {doctorData?.available
                    ? 'Patients can currently discover and book your available slots.'
                    : 'Patients cannot currently book appointments until you become available.'}
                </p>
              </div>

            </div>

            <button
              type="button"
              onClick={changeAvailability}
              className={`relative h-8 w-14 shrink-0 rounded-full border p-1 transition-all duration-300 focus:outline-none ${
                doctorData?.available
                  ? 'border-[#18a875] bg-[#18a875]'
                  : 'border-[#cbd9dc] bg-[#dbe5e7]'
              }`}
              aria-label="Toggle doctor availability"
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                  doctorData?.available
                    ? 'translate-x-6'
                    : 'translate-x-0'
                }`}
              />
            </button>

          </div>

        </section>


        <section className="mb-6 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">

          {stats.map(stat => {
            const style = toneStyles[stat.tone]

            return (
              <div
                key={stat.title}
                className="group min-w-0 overflow-hidden rounded-[20px] border border-[#dceff2] bg-white/90 p-4 shadow-sm backdrop-blur-xl transition-all duration-400 hover:-translate-y-1 hover:border-[#bfe2e6] hover:shadow-[0_18px_40px_rgba(8,127,145,0.10)]"
              >

                <div className="flex items-start justify-between gap-3">

                  <span className="min-w-0 break-words text-[10px] font-bold uppercase tracking-[0.06em] text-[#7c9096]">
                    {stat.title}
                  </span>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${style.icon}`}
                  >
                    <Icon name={stat.icon} size={17} />
                  </span>

                </div>

                <div className={`mt-4 text-2xl font-black ${style.value}`}>
                  {stat.value}
                </div>

                <div className="mt-3 h-1 overflow-hidden rounded-full bg-[#edf3f4]">
                  <span
                    className={`block h-full w-1/2 rounded-full transition-all duration-700 group-hover:w-full ${style.bar}`}
                  />
                </div>

              </div>
            )
          })}

        </section>


        <section className="mb-6 grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">

          <div className="min-w-0 overflow-hidden rounded-[25px] border border-[#dceff2] bg-white/90 shadow-[0_18px_50px_rgba(8,127,145,0.07)] backdrop-blur-xl">

            <div className="border-b border-[#edf3f4] px-5 py-5 sm:px-6">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0">
                  <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#087f91]">
                    Priority
                  </span>

                  <h2 className="mt-1 text-lg font-black text-[#082b3a]">
                    Next Appointment
                  </h2>
                </div>

                <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#cdecef] bg-[#eefbfd] px-2.5 py-1.5 text-[9px] font-bold text-[#087f91]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#19b7c8]" />
                  Upcoming
                </span>

              </div>

            </div>

            {upcomingAppointment ? (
              <div className="p-5 sm:p-6">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-[#eaf7f9] text-xl font-black text-[#087f91]">
                    {upcomingAppointment.userData?.image ? (
                      <img
                        src={upcomingAppointment.userData.image}
                        alt={upcomingAppointment.userData?.name || 'Patient'}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      (upcomingAppointment.userData?.name || 'P')
                        .charAt(0)
                        .toUpperCase()
                    )}
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#81949a]">
                      Patient
                    </p>

                    <h3 className="mt-1 break-words text-xl font-black text-[#082b3a]">
                      {upcomingAppointment.userData?.name || 'Patient'}
                    </h3>

                    <p className="mt-1 break-words text-xs text-[#7b8e94]">
                      {upcomingAppointment.userData?.email || 'No email available'}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">

                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#f3f9fa] px-3 py-2 text-[10px] font-bold text-[#087f91]">
                        <Icon name="calendar" size={12} />
                        {upcomingAppointment.slotDate}
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#f3f9fa] px-3 py-2 text-[10px] font-bold text-[#087f91]">
                        <Icon name="clock" size={12} />
                        {upcomingAppointment.slotTime}
                      </span>

                      {getPaymentStatus(upcomingAppointment)}

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => navigate('/doctor-appointments')}
                  className="group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#087f91] px-4 py-3 text-[10px] font-bold text-white transition-all duration-300 hover:bg-[#056071]"
                >
                  Open Appointment Management
                  <Icon name="arrow" size={14} />
                </button>

              </div>
            ) : (
              <div className="flex min-h-[210px] items-center justify-center px-5 py-10 text-center">

                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eef9fa] text-[#087f91]">
                    <Icon name="calendar" size={21} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#082b3a]">
                    No upcoming appointments
                  </h3>

                  <p className="mt-1 max-w-sm text-[11px] leading-5 text-[#7c9096]">
                    Your next available patient appointment will appear here.
                  </p>
                </div>

              </div>
            )}

          </div>


          <div className="min-w-0 rounded-[25px] border border-[#dceff2] bg-white/90 p-5 shadow-[0_18px_50px_rgba(8,127,145,0.07)] backdrop-blur-xl sm:p-6">

            <div className="flex items-center justify-between gap-3">

              <div>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#087f91]">
                  Payment Overview
                </span>

                <h2 className="mt-1 text-lg font-black text-[#082b3a]">
                  Payments
                </h2>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf9f8] text-[#168e89]">
                <Icon name="wallet" size={18} />
              </div>

            </div>

            <div className="mt-5 space-y-3">

              <div className="rounded-2xl border border-[#e3eef0] bg-[#fbfdfe] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-[#71878e]">
                    Online Paid
                  </span>

                  <strong className="text-sm font-black text-[#159164]">
                    {onlinePaid.length}
                  </strong>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf3f4]">
                  <div
                    className="h-full rounded-full bg-[#18a875]"
                    style={{
                      width: `${appointments.length ? Math.min((onlinePaid.length / appointments.length) * 100, 100) : 0}%`
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#e3eef0] bg-[#fbfdfe] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-[#71878e]">
                    Cash Payments
                  </span>

                  <strong className="text-sm font-black text-[#b87918]">
                    {cashPayments.length}
                  </strong>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf3f4]">
                  <div
                    className="h-full rounded-full bg-[#e5a93d]"
                    style={{
                      width: `${appointments.length ? Math.min((cashPayments.length / appointments.length) * 100, 100) : 0}%`
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#e3eef0] bg-[#fbfdfe] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold text-[#71878e]">
                    Pending
                  </span>

                  <strong className="text-sm font-black text-[#8061a7]">
                    {pendingPayments.length}
                  </strong>
                </div>

                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#edf3f4]">
                  <div
                    className="h-full rounded-full bg-[#9673c2]"
                    style={{
                      width: `${appointments.length ? Math.min((pendingPayments.length / appointments.length) * 100, 100) : 0}%`
                    }}
                  />
                </div>
              </div>

            </div>

          </div>

        </section>


        <section className="mb-6 min-w-0 overflow-hidden rounded-[25px] border border-[#dceff2] bg-white/90 shadow-[0_18px_50px_rgba(8,127,145,0.07)] backdrop-blur-xl">

          <div className="flex flex-col gap-4 border-b border-[#edf3f4] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#087f91]">
                Appointment Activity
              </span>

              <h2 className="mt-1 text-lg font-black text-[#082b3a]">
                Recent Appointments
              </h2>

              <p className="mt-1 break-words text-[11px] leading-5 text-[#7c9096]">
                Latest patient appointments and their current payment and appointment status.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/doctor-appointments')}
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-[#cfe8eb] bg-[#f5fbfc] px-4 py-2.5 text-[10px] font-bold text-[#087f91] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#19b7c8] hover:bg-[#e8f8fa]"
            >
              View all
              <Icon name="arrow" size={14} />
            </button>

          </div>


          {recentAppointments.length === 0 ? (
            <div className="px-5 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef9fa] text-[#087f91]">
                <Icon name="calendar" size={23} />
              </div>

              <h3 className="mt-4 text-sm font-bold text-[#082b3a]">
                No appointments yet
              </h3>

              <p className="mx-auto mt-1 max-w-sm text-[11px] leading-5 text-[#7c9096]">
                Patient appointments will appear here once they are booked.
              </p>

            </div>
          ) : (
            <>
              <div className="hidden overflow-hidden xl:block">

                <table className="w-full table-fixed">

                  <thead>
                    <tr className="border-b border-[#edf3f4] bg-[#f8fcfd]">

                      <th className="w-[28%] px-5 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                        Patient
                      </th>

                      <th className="w-[15%] px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                        Date
                      </th>

                      <th className="w-[14%] px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                        Time
                      </th>

                      <th className="w-[19%] px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                        Payment
                      </th>

                      <th className="w-[24%] px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                        Status
                      </th>

                    </tr>
                  </thead>

                  <tbody>

                    {recentAppointments.map(item => (
                      <tr
                        key={item._id}
                        className="border-b border-[#f0f4f5] transition-colors duration-300 last:border-b-0 hover:bg-[#f8fcfd]"
                      >

                        <td className="px-5 py-4">

                          <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eaf7f9] text-xs font-bold text-[#087f91]">
                              {item.userData?.image ? (
                                <img
                                  src={item.userData.image}
                                  alt={item.userData?.name || 'Patient'}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                (item.userData?.name || 'P')
                                  .charAt(0)
                                  .toUpperCase()
                              )}
                            </div>

                            <div className="min-w-0">
                              <strong className="block break-words text-xs font-bold text-[#082b3a]">
                                {item.userData?.name || 'Patient'}
                              </strong>

                              <small className="mt-0.5 block break-words text-[10px] leading-4 text-[#8a9a9f]">
                                {item.userData?.email || 'No email available'}
                              </small>
                            </div>

                          </div>

                        </td>

                        <td className="px-3 py-4">
                          <span className="break-words text-[11px] font-semibold text-[#526d75]">
                            {item.slotDate}
                          </span>
                        </td>

                        <td className="px-3 py-4">
                          <span className="inline-flex rounded-lg bg-[#f3f9fa] px-2.5 py-1.5 text-[10px] font-bold text-[#087f91]">
                            {item.slotTime}
                          </span>
                        </td>

                        <td className="px-3 py-4">
                          {getPaymentStatus(item)}
                        </td>

                        <td className="px-3 py-4">
                          {getAppointmentStatus(item)}
                        </td>

                      </tr>
                    ))}

                  </tbody>

                </table>

              </div>


              <div className="grid gap-3 p-4 sm:p-5 xl:hidden">

                {recentAppointments.map(item => (
                  <div
                    key={item._id}
                    className="min-w-0 rounded-2xl border border-[#e3eef0] bg-[#fbfdfe] p-4 transition-all duration-300 hover:border-[#c8e4e8] hover:bg-white hover:shadow-sm"
                  >

                    <div className="flex min-w-0 items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eaf7f9] text-xs font-bold text-[#087f91]">
                          {item.userData?.image ? (
                            <img
                              src={item.userData.image}
                              alt={item.userData?.name || 'Patient'}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            (item.userData?.name || 'P')
                              .charAt(0)
                              .toUpperCase()
                          )}
                        </div>

                        <div className="min-w-0">

                          <strong className="block break-words text-xs font-bold text-[#082b3a]">
                            {item.userData?.name || 'Patient'}
                          </strong>

                          <span className="mt-0.5 block break-words text-[10px] leading-4 text-[#8a9a9f]">
                            {item.userData?.email || 'No email available'}
                          </span>

                        </div>

                      </div>

                      <div className="shrink-0">
                        {getAppointmentStatus(item)}
                      </div>

                    </div>


                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">

                      <div className="rounded-xl bg-white p-3">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                          Date
                        </span>

                        <span className="mt-1 block break-words text-[10px] font-bold text-[#526d75]">
                          {item.slotDate}
                        </span>
                      </div>

                      <div className="rounded-xl bg-white p-3">
                        <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                          Time
                        </span>

                        <span className="mt-1 inline-flex rounded-md bg-[#eef9fa] px-2 py-1 text-[10px] font-bold text-[#087f91]">
                          {item.slotTime}
                        </span>
                      </div>

                      <div className="col-span-2 rounded-xl bg-white p-3 sm:col-span-1">

                        <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                          Payment
                        </span>

                        <div className="mt-1">
                          {getPaymentStatus(item)}
                        </div>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            </>
          )}

        </section>


        <section className="grid min-w-0 gap-3 md:grid-cols-3">

          <button
            type="button"
            onClick={() => navigate('/doctor-appointments')}
            className="group min-w-0 rounded-[20px] border border-[#dceff2] bg-white/90 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#bfe2e6] hover:shadow-[0_16px_35px_rgba(8,127,145,0.09)]"
          >

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f8fa] text-[#087f91] transition-transform duration-300 group-hover:scale-105">
                <Icon name="calendar" size={19} />
              </div>

              <div className="min-w-0 flex-1">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#8a9a9f]">
                  Today's schedule
                </span>

                <strong className="mt-1 block break-words text-sm font-bold text-[#082b3a]">
                  {todayAppointments.length} appointment
                  {todayAppointments.length !== 1 ? 's' : ''}
                </strong>

                <p className="mt-1 text-[10px] leading-4 text-[#8a9a9f]">
                  Open your full appointment schedule.
                </p>

              </div>

              <Icon name="arrow" size={15} />

            </div>

          </button>


          <button
            type="button"
            onClick={() => navigate('/doctor-profile')}
            className="group min-w-0 rounded-[20px] border border-[#dceff2] bg-white/90 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#bfe2e6] hover:shadow-[0_16px_35px_rgba(8,127,145,0.09)]"
          >

            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#edf5fc] text-[#397bad] transition-transform duration-300 group-hover:scale-105">
                <Icon name="user" size={19} />
              </div>

              <div className="min-w-0 flex-1">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#8a9a9f]">
                  Professional profile
                </span>

                <strong className="mt-1 block break-words text-sm font-bold text-[#082b3a]">
                  Keep your details updated
                </strong>

                <p className="mt-1 text-[10px] leading-4 text-[#8a9a9f]">
                  Update speciality, fees and professional information.
                </p>

              </div>

              <Icon name="arrow" size={15} />

            </div>

          </button>


          <button
            type="button"
            onClick={changeAvailability}
            className="group min-w-0 rounded-[20px] border border-[#dceff2] bg-white/90 p-5 text-left shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#bfe2e6] hover:shadow-[0_16px_35px_rgba(8,127,145,0.09)]"
          >

            <div className="flex items-start gap-4">

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 ${
                  doctorData?.available
                    ? 'bg-[#effbf6] text-[#18a875]'
                    : 'bg-[#fff3f4] text-[#e65d67]'
                }`}
              >
                <Icon name="activity" size={19} />
              </div>

              <div className="min-w-0 flex-1">

                <span className="text-[9px] font-bold uppercase tracking-wide text-[#8a9a9f]">
                  Availability
                </span>

                <strong
                  className={`mt-1 block break-words text-sm font-bold ${
                    doctorData?.available
                      ? 'text-[#16835d]'
                      : 'text-[#c45460]'
                  }`}
                >
                  {doctorData?.available
                    ? 'Currently available'
                    : 'Currently unavailable'}
                </strong>

                <p className="mt-1 text-[10px] leading-4 text-[#8a9a9f]">
                  Toggle whether patients can book you.
                </p>

              </div>

            </div>

          </button>

        </section>


        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#dceff2] bg-white/70 px-4 py-3 backdrop-blur-xl">

          <div className="flex min-w-0 items-center gap-2">

            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e8f8fa] text-[#087f91]">
              <Icon name="shield" size={13} />
            </span>

            <span className="break-words text-[10px] font-semibold leading-4 text-[#71878e]">
              MediAssist secure doctor workspace
            </span>

          </div>

          <span className="shrink-0 text-[9px] font-bold text-[#9aa8ac]">
            {activeAppointments.length} active
          </span>

        </div>

      </div>
    </div>
  )
}

export default DoctorDashboard