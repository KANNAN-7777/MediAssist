import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'

const AllApointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment
  } = useContext(AdminContext)

  const { calculateAge } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  const formatDate = (date) => {
    const d = new Date(date)

    if (isNaN(d.getTime())) {
      return date
    }

    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )

    if (!confirmCancel) {
      return
    }

    try {
      const data = await cancelAppointment(appointmentId)

      if (data?.success) {
        await getAllAppointments()
      }
    } catch (error) {
      console.log('ADMIN CANCEL ERROR:', error)
    }
  }

  const getPaymentStatus = (item) => {
    if (item.paymentMethod === 'Cash') {
      return (
        <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#f4dfc3] bg-[#fff8ed] px-3 py-1.5 text-xs font-bold text-[#b47724]">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#e5a93d]" />
          Cash
        </span>
      )
    }

    if (item.payment === true) {
      return (
        <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#d7eee3] bg-[#eefaf4] px-3 py-1.5 text-xs font-bold text-[#16865f]">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#18a875]" />
          Paid Online
        </span>
      )
    }

    return (
      <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#f1e5bd] bg-[#fff9e8] px-3 py-1.5 text-xs font-bold text-[#b27a1f]">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#e5a93d]" />
        Unpaid Online
      </span>
    )
  }

  const getStatus = (item) => {
    if (item.cancelled) {
      return (
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#f2d8dc] bg-[#fff2f4] px-3 py-1.5 text-xs font-bold text-[#d95d68]">
            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#e65d67]" />
            Cancelled
          </span>

          {item.refund === true && (
            <span className="inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#d7edf0] bg-[#e9f9fb] px-3 py-1.5 text-xs font-bold text-[#087f91]">
              Refund
            </span>
          )}
        </div>
      )
    }

    if (item.isCompleted) {
      return (
        <span className="mt-2 inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#e1e8ea] bg-[#f3f5f6] px-3 py-1.5 text-xs font-bold text-[#65777d]">
          <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7f9297]" />
          Completed
        </span>
      )
    }

    return (
      <span className="mt-2 inline-flex w-fit items-center gap-1.5 whitespace-nowrap rounded-full border border-[#d7edf0] bg-[#e9f9fb] px-3 py-1.5 text-xs font-bold text-[#087f91]">
        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#19b7c8]" />
        Upcoming
      </span>
    )
  }

  const totalAppointments = appointments.length

  const cancelledAppointments = appointments.filter(
    (item) => item.cancelled
  ).length

  const completedAppointments = appointments.filter(
    (item) => item.isCompleted && !item.cancelled
  ).length

  const upcomingAppointments = appointments.filter(
    (item) => !item.isCompleted && !item.cancelled
  ).length

  return (
    <div className="relative w-full min-w-0">

      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#19b7c8]/8 blur-3xl" />

      <div className="pointer-events-none absolute -left-24 top-[420px] h-72 w-72 rounded-full bg-[#087f91]/5 blur-3xl" />

      <div className="relative min-w-0">

        <div className="mb-6 flex min-w-0 flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#19b7c8] shadow-[0_0_0_5px_rgba(25,183,200,0.10)]" />

              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#087f91]">
                Appointment Management
              </span>

            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#082b3a]">
              All Appointments
            </h1>

            <p className="mt-2 text-base text-[#71858b]">
              Monitor patient bookings, payments, doctors and appointment status.
            </p>

          </div>

          <div className="grid flex-shrink-0 grid-cols-2 gap-2 sm:grid-cols-4">

            <div className="rounded-2xl border border-[#dceff2] bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#91a1a5]">
                Total
              </p>
              <p className="mt-1 text-xl font-bold text-[#082b3a]">
                {totalAppointments}
              </p>
            </div>

            <div className="rounded-2xl border border-[#d7edf0] bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#91a1a5]">
                Upcoming
              </p>
              <p className="mt-1 text-xl font-bold text-[#087f91]">
                {upcomingAppointments}
              </p>
            </div>

            <div className="rounded-2xl border border-[#d7eee3] bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#91a1a5]">
                Completed
              </p>
              <p className="mt-1 text-xl font-bold text-[#16865f]">
                {completedAppointments}
              </p>
            </div>

            <div className="rounded-2xl border border-[#f2d8dc] bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#91a1a5]">
                Cancelled
              </p>
              <p className="mt-1 text-xl font-bold text-[#d95d68]">
                {cancelledAppointments}
              </p>
            </div>

          </div>

        </div>

        <div className="min-w-0 overflow-hidden rounded-[24px] border border-[#dceff2] bg-white/90 shadow-[0_12px_38px_rgba(8,127,145,0.07)] backdrop-blur-xl">

          <div className="flex min-w-0 flex-col gap-3 border-b border-[#edf3f4] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div className="flex min-w-0 items-center gap-3">

              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#e8f8fa] text-[#087f91]">

                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                >
                  <rect
                    x="4"
                    y="5"
                    width="16"
                    height="16"
                    rx="3"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M8 3V7M16 3V7M4 10H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M8 14H10M14 14H16M8 18H10"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

              </div>

              <div className="min-w-0">

                <h2 className="text-base font-bold text-[#082b3a]">
                  Appointment Records
                </h2>

                <p className="mt-1 text-xs text-[#91a1a5]">
                  {appointments.length} records available
                </p>

              </div>

            </div>

            <div className="flex w-fit flex-shrink-0 items-center gap-2 rounded-full bg-[#f3f9fa] px-3 py-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />

              <span className="text-xs font-semibold text-[#60777e]">
                Live data
              </span>

            </div>

          </div>

          <div className="hidden lg:block">

            <div className="overflow-x-auto">

              <div className="min-w-[1320px]">

                <div className="grid grid-cols-[42px_220px_170px_65px_175px_210px_90px_180px_42px] items-center gap-3 border-b border-[#edf3f4] bg-[#f7fbfc] px-5 py-4">

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    #
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Patient
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Department
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Age
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Date & Time
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Doctor
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Fees
                  </p>

                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#8c9da2]">
                    Payment / Status
                  </p>

                  <span />

                </div>

                {appointments.length > 0 ? (

                  appointments.map((item, index) => (

                    <div
                      key={item._id}
                      className="group grid grid-cols-[42px_220px_170px_65px_175px_210px_90px_180px_42px] items-center gap-3 border-b border-[#edf3f4] px-5 py-5 transition-all duration-300 last:border-b-0 hover:bg-[#f8fcfd]"
                    >

                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1f7f8] text-xs font-bold text-[#809398] transition-colors group-hover:bg-[#e8f8fa] group-hover:text-[#087f91]">
                        {index + 1}
                      </div>

                      <div className="flex min-w-0 items-center gap-3">

                        <img
                          src={item.userData?.image || '/default-avatar.png'}
                          alt=""
                          className="h-11 w-11 flex-shrink-0 rounded-xl border border-[#dceff2] object-cover"
                        />

                        <div className="min-w-0">

                          <p className="break-words text-sm font-bold leading-5 text-[#29434c]">
                            {item.userData?.name || 'Unknown'}
                          </p>

                          <p className="mt-1 text-xs text-[#96a5a9]">
                            Patient
                          </p>

                        </div>

                      </div>

                      <p className="break-words text-sm font-medium leading-5 text-[#60777e]">
                        {item.docData?.speciality || 'N/A'}
                      </p>

                      <p className="text-sm font-semibold text-[#60777e]">
                        {item.userData?.dob
                          ? calculateAge(item.userData.dob)
                          : 'N/A'}
                      </p>

                      <div>

                        <p className="text-sm font-semibold text-[#516970]">
                          {formatDate(item.slotDate)}
                        </p>

                        <div className="mt-1.5 flex w-fit items-center gap-1.5 rounded-lg bg-[#f3f9fa] px-2.5 py-1.5">

                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-3.5 w-3.5 flex-shrink-0 text-[#087f91]"
                          >
                            <circle
                              cx="12"
                              cy="12"
                              r="8.5"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            />

                            <path
                              d="M12 7V12L15 14"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>

                          <span className="whitespace-nowrap text-xs font-semibold text-[#70858b]">
                            {item.slotTime}
                          </span>

                        </div>

                      </div>

                      <div className="flex min-w-0 items-center gap-2">

                        <img
                          src={item.docData?.image || '/default-avatar.png'}
                          alt=""
                          className="h-10 w-10 flex-shrink-0 rounded-xl border border-[#dceff2] object-cover"
                        />

                        <div className="min-w-0">

                          <p className="break-words text-sm font-semibold leading-5 text-[#29434c]">
                            {item.docData?.name || 'Unknown'}
                          </p>

                          <p className="mt-1 text-xs text-[#96a5a9]">
                            Doctor
                          </p>

                        </div>

                      </div>

                      <p className="whitespace-nowrap text-sm font-bold text-[#082b3a]">
                        ₹{item.amount || item.docData?.fees || 0}
                      </p>

                      <div className="flex min-w-0 flex-col items-start">
                        {getPaymentStatus(item)}
                        {getStatus(item)}
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCancel(item._id)}
                        disabled={item.cancelled}
                        title={
                          item.cancelled
                            ? 'Appointment already cancelled'
                            : 'Cancel appointment'
                        }
                        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                          item.cancelled
                            ? 'cursor-not-allowed border-[#e7edef] bg-[#f4f6f7] text-[#a7b2b5]'
                            : 'border-[#f2dadd] bg-[#fff4f5] text-[#d95d68] hover:border-[#e65d67] hover:bg-[#e65d67] hover:text-white hover:shadow-[0_8px_18px_rgba(230,93,103,0.18)]'
                        }`}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-4 w-4"
                        >
                          <path
                            d="M6 6L18 18M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>

                      </button>

                    </div>

                  ))

                ) : (

                  <div className="px-6 py-16 text-center">

                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7f9] text-[#087f91]">

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-6 w-6"
                      >
                        <rect
                          x="4"
                          y="5"
                          width="16"
                          height="16"
                          rx="3"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />

                        <path
                          d="M8 3V7M16 3V7M4 10H20"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />

                      </svg>

                    </div>

                    <p className="mt-4 text-base font-bold text-[#60777e]">
                      No appointments found
                    </p>

                    <p className="mt-1 text-sm text-[#9aa8ac]">
                      Appointment records will appear here.
                    </p>

                  </div>

                )}

              </div>

            </div>

          </div>

          <div className="hidden sm:block lg:hidden">

            <div className="space-y-3 p-4">

              {appointments.length > 0 ? (

                appointments.map((item, index) => (

                  <div
                    key={item._id}
                    className="rounded-[20px] border border-[#dceff2] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#19b7c8]/30 hover:shadow-[0_12px_28px_rgba(8,127,145,0.08)]"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex min-w-0 items-center gap-3">

                        <img
                          src={item.userData?.image || '/default-avatar.png'}
                          alt=""
                          className="h-12 w-12 flex-shrink-0 rounded-xl border border-[#dceff2] object-cover"
                        />

                        <div className="min-w-0">

                          <p className="break-words text-base font-bold leading-5 text-[#29434c]">
                            {item.userData?.name || 'Unknown'}
                          </p>

                          <p className="mt-1 text-xs text-[#96a5a9]">
                            Appointment #{index + 1}
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-shrink-0 flex-col items-end gap-1">
                        {getPaymentStatus(item)}
                        {getStatus(item)}
                      </div>

                    </div>

                    <div className="my-4 h-px bg-[#edf3f4]" />

                    <div className="grid grid-cols-2 gap-x-6 gap-y-5">

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa9ad]">
                          Department
                        </p>

                        <p className="mt-1 break-words text-sm font-semibold leading-5 text-[#516970]">
                          {item.docData?.speciality || 'N/A'}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa9ad]">
                          Age
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#516970]">
                          {item.userData?.dob
                            ? calculateAge(item.userData.dob)
                            : 'N/A'}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa9ad]">
                          Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#516970]">
                          {formatDate(item.slotDate)}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa9ad]">
                          Time
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#516970]">
                          {item.slotTime}
                        </p>
                      </div>

                      <div className="col-span-2">

                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa9ad]">
                          Doctor
                        </p>

                        <div className="mt-2 flex items-start gap-2">

                          <img
                            src={item.docData?.image || '/default-avatar.png'}
                            alt=""
                            className="h-9 w-9 flex-shrink-0 rounded-lg border border-[#dceff2] object-cover"
                          />

                          <p className="break-words text-sm font-semibold leading-5 text-[#516970]">
                            {item.docData?.name || 'Unknown'}
                          </p>

                        </div>

                      </div>

                      <div>

                        <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#9aa9ad]">
                          Fees
                        </p>

                        <p className="mt-1 text-base font-bold text-[#082b3a]">
                          ₹{item.amount || item.docData?.fees || 0}
                        </p>

                      </div>

                    </div>

                    <div className="mt-5 flex justify-end border-t border-[#edf3f4] pt-3">

                      <button
                        type="button"
                        onClick={() => handleCancel(item._id)}
                        disabled={item.cancelled}
                        className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-xs font-bold transition-all duration-300 ${
                          item.cancelled
                            ? 'cursor-not-allowed border-[#e7edef] bg-[#f4f6f7] text-[#a7b2b5]'
                            : 'border-[#f2dadd] bg-[#fff4f5] text-[#d95d68] hover:border-[#e65d67] hover:bg-[#e65d67] hover:text-white'
                        }`}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-4 w-4"
                        >
                          <path
                            d="M6 6L18 18M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>

                        {item.cancelled
                          ? 'Cancelled'
                          : 'Cancel Appointment'}

                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="py-12 text-center">

                  <p className="text-base font-semibold text-[#60777e]">
                    No appointments found
                  </p>

                </div>

              )}

            </div>

          </div>

          <div className="sm:hidden">

            <div className="space-y-3 p-3">

              {appointments.length > 0 ? (

                appointments.map((item, index) => (

                  <div
                    key={item._id}
                    className="rounded-[20px] border border-[#dceff2] bg-white p-4 shadow-sm"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <img
                          src={item.userData?.image || '/default-avatar.png'}
                          alt=""
                          className="h-12 w-12 flex-shrink-0 rounded-xl border border-[#dceff2] object-cover"
                        />

                        <div className="min-w-0">

                          <p className="break-words text-base font-bold leading-5 text-[#29434c]">
                            {item.userData?.name || 'Unknown'}
                          </p>

                          <p className="mt-1 text-xs text-[#96a5a9]">
                            #{index + 1}
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-shrink-0 flex-col items-end gap-1">
                        {getPaymentStatus(item)}
                        {getStatus(item)}
                      </div>

                    </div>

                    <div className="my-4 h-px bg-[#edf3f4]" />

                    <div className="space-y-4">

                      <div className="flex items-start justify-between gap-4">

                        <span className="flex-shrink-0 text-sm text-[#91a1a5]">
                          Department
                        </span>

                        <span className="break-words text-right text-sm font-semibold leading-5 text-[#516970]">
                          {item.docData?.speciality || 'N/A'}
                        </span>

                      </div>

                      <div className="flex items-center justify-between gap-4">

                        <span className="flex-shrink-0 text-sm text-[#91a1a5]">
                          Age
                        </span>

                        <span className="text-sm font-semibold text-[#516970]">
                          {item.userData?.dob
                            ? calculateAge(item.userData.dob)
                            : 'N/A'}
                        </span>

                      </div>

                      <div className="flex items-center justify-between gap-4">

                        <span className="flex-shrink-0 text-sm text-[#91a1a5]">
                          Date
                        </span>

                        <span className="text-right text-sm font-semibold text-[#516970]">
                          {formatDate(item.slotDate)}
                        </span>

                      </div>

                      <div className="flex items-center justify-between gap-4">

                        <span className="flex-shrink-0 text-sm text-[#91a1a5]">
                          Time
                        </span>

                        <span className="text-sm font-semibold text-[#516970]">
                          {item.slotTime}
                        </span>

                      </div>

                      <div className="flex items-start justify-between gap-4">

                        <span className="flex-shrink-0 text-sm text-[#91a1a5]">
                          Doctor
                        </span>

                        <div className="flex max-w-[70%] items-start gap-2">

                          <img
                            src={item.docData?.image || '/default-avatar.png'}
                            alt=""
                            className="h-8 w-8 flex-shrink-0 rounded-lg border border-[#dceff2] object-cover"
                          />

                          <span className="break-words text-right text-sm font-semibold leading-5 text-[#516970]">
                            {item.docData?.name || 'Unknown'}
                          </span>

                        </div>

                      </div>

                      <div className="flex items-center justify-between gap-4">

                        <span className="flex-shrink-0 text-sm text-[#91a1a5]">
                          Fees
                        </span>

                        <span className="text-base font-bold text-[#082b3a]">
                          ₹{item.amount || item.docData?.fees || 0}
                        </span>

                      </div>

                    </div>

                    <div className="mt-5 border-t border-[#edf3f4] pt-3">

                      <button
                        type="button"
                        onClick={() => handleCancel(item._id)}
                        disabled={item.cancelled}
                        className={`flex h-10 w-full items-center justify-center gap-2 rounded-xl border text-xs font-bold transition-all duration-300 ${
                          item.cancelled
                            ? 'cursor-not-allowed border-[#e7edef] bg-[#f4f6f7] text-[#a7b2b5]'
                            : 'border-[#f2dadd] bg-[#fff4f5] text-[#d95d68] active:scale-[0.98]'
                        }`}
                      >

                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-4 w-4"
                        >
                          <path
                            d="M6 6L18 18M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>

                        {item.cancelled
                          ? 'Appointment Cancelled'
                          : 'Cancel Appointment'}

                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="py-12 text-center">

                  <p className="text-base font-semibold text-[#60777e]">
                    No appointments found
                  </p>

                  <p className="mt-1 text-sm text-[#9aa8ac]">
                    New appointment records will appear here.
                  </p>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default AllApointments