import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { DoctorContext } from '../../context/DoctorContext'

const DoctorAppointments = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment
  } = useContext(DoctorContext)

  useEffect(() => {
    if (!dToken) {
      return
    }

    getAppointments()

    const interval = setInterval(() => {
      getAppointments()
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [dToken])

  const calculateAge = (dob) => {
    if (!dob || dob === 'Not Selected') {
      return 'N/A'
    }

    const today = new Date()
    const birthDate = new Date(dob)

    if (isNaN(birthDate.getTime())) {
      return 'N/A'
    }

    let age =
      today.getFullYear() -
      birthDate.getFullYear()

    const month =
      today.getMonth() -
      birthDate.getMonth()

    if (
      month < 0 ||
      (
        month === 0 &&
        today.getDate() < birthDate.getDate()
      )
    ) {
      age--
    }

    return age
  }

  const handleComplete = (appointmentId) => {
    console.log(
      'Complete appointment:',
      appointmentId
    )
  }

  const handleCancel = async (appointmentId) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )

    if (!confirmCancel) {
      return
    }

    try {
      const data =
        await cancelAppointment(appointmentId)

      if (data?.success) {
        toast.success(data.message)
        await getAppointments()
      } else {
        toast.error(
          data?.message ||
          'Failed to cancel appointment'
        )
      }
    } catch (error) {
      console.log(
        'DOCTOR CANCEL ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to cancel appointment'
      )
    }
  }

  const getPaymentStatus = (item) => {
    if (item.paymentMethod === 'Cash') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f5dfbe] bg-[#fff9ef] px-2.5 py-1.5 text-[10px] font-bold text-[#b87918]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e5a93d]" />
          Cash
        </span>
      )
    }

    if (item.payment) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ccefe0] bg-[#effbf6] px-2.5 py-1.5 text-[10px] font-bold text-[#159164]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />
          Paid
          <span className="font-medium text-[#6c9c89]">
            · Online
          </span>
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f3e4ba] bg-[#fffaf0] px-2.5 py-1.5 text-[10px] font-bold text-[#a47718]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#e5a93d]" />
        Unpaid
        <span className="font-medium text-[#a99669]">
          · Online
        </span>
      </span>
    )
  }

  const getStatus = (item) => {
    if (item.cancelled) {
      return (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f2d3d7] bg-[#fff3f4] px-2.5 py-1.5 text-[10px] font-bold text-[#d55461]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e65d67]" />
            Cancelled
          </span>

          {item.refund && (
            <span className="inline-flex items-center rounded-full border border-[#d8e6f5] bg-[#f1f7fd] px-2.5 py-1.5 text-[10px] font-bold text-[#3778ae]">
              Refund
            </span>
          )}
        </div>
      )
    }

    if (item.isCompleted) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e1e9eb] bg-[#f6f8f9] px-2.5 py-1.5 text-[10px] font-bold text-[#6c8188]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b9ba0]" />
          Completed
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#cdecef] bg-[#eefbfd] px-2.5 py-1.5 text-[10px] font-bold text-[#087f91]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />
        Upcoming
      </span>
    )
  }

  const activeAppointments = appointments.filter(
    item =>
      !item.cancelled &&
      !item.isCompleted
  )

  const completedAppointments = appointments.filter(
    item => item.isCompleted
  )

  const cancelledAppointments = appointments.filter(
    item => item.cancelled
  )

  return (
    <div className="relative w-full min-w-0 overflow-hidden pb-8">
      <div className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-[#19b7c8]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-52 h-72 w-72 rounded-full bg-[#087f91]/5 blur-3xl" />

      <div className="relative min-w-0">
        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div className="min-w-0">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d7edf0] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#087f91] shadow-sm backdrop-blur-xl">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#19b7c8]" />
              Appointment Management
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#082b3a] sm:text-3xl">
              My Appointments
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#6c8188]">
              View and manage your scheduled patient appointments.
            </p>
          </div>

          <div className="flex w-fit items-center gap-2 rounded-2xl border border-[#dceff2] bg-white/85 px-4 py-3 shadow-sm backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#19b7c8]/40" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-[#19b7c8]" />
            </span>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-wide text-[#8a9a9f]">
                Live status
              </p>

              <p className="text-xs font-semibold text-[#082b3a]">
                {appointments.length} appointment
                {appointments.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="group rounded-[20px] border border-[#dceff2] bg-white/90 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8a9a9f]">
                Total
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f8fa] text-[#087f91]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <rect
                    x="4"
                    y="3"
                    width="16"
                    height="18"
                    rx="3"
                  />
                  <path
                    strokeLinecap="round"
                    d="M8 8h8M8 12h8M8 16h5"
                  />
                </svg>
              </span>
            </div>

            <strong className="mt-3 block text-2xl font-bold text-[#087f91]">
              {appointments.length}
            </strong>

            <p className="mt-1 text-[10px] text-[#8a9a9f]">
              All appointments
            </p>
          </div>

          <div className="group rounded-[20px] border border-[#dceff2] bg-white/90 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8a9a9f]">
                Upcoming
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#effbf6] text-[#18a875]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    d="M5 12h13"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 6l6 6-6 6"
                  />
                </svg>
              </span>
            </div>

            <strong className="mt-3 block text-2xl font-bold text-[#159164]">
              {activeAppointments.length}
            </strong>

            <p className="mt-1 text-[10px] text-[#8a9a9f]">
              Awaiting consultation
            </p>
          </div>

          <div className="group rounded-[20px] border border-[#dceff2] bg-white/90 p-4 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#8a9a9f]">
                Completed
              </span>

              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f3f7f8] text-[#6c8188]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l4 4L19 6"
                  />
                </svg>
              </span>
            </div>

            <strong className="mt-3 block text-2xl font-bold text-[#526d75]">
              {completedAppointments.length}
            </strong>

            <p className="mt-1 text-[10px] text-[#8a9a9f]">
              Successfully completed
            </p>
          </div>
        </section>

        <section className="min-w-0 overflow-hidden rounded-[24px] border border-[#dceff2] bg-white/90 shadow-[0_18px_50px_rgba(8,127,145,0.07)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-[#edf3f4] bg-gradient-to-r from-[#f8fcfd] via-white to-[#f5fbfc] px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-bold text-[#082b3a]">
                Appointment Schedule
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-[#7c9096]">
                Patient bookings, consultation details and payment status.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ccefe0] bg-[#effbf6] px-3 py-1.5 text-[9px] font-bold text-[#159164]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#18a875]" />
              Live updates every 5 seconds
            </div>
          </div>

          <div className="hidden xl:block">
            {appointments.length === 0 ? (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef9fa] text-[#087f91]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect
                      x="4"
                      y="5"
                      width="16"
                      height="15"
                      rx="3"
                    />
                    <path
                      strokeLinecap="round"
                      d="M8 3v4M16 3v4M4 10h16"
                    />
                  </svg>
                </div>

                <strong className="mt-4 block text-sm font-bold text-[#082b3a]">
                  No appointments found
                </strong>

                <span className="mt-1 block text-[11px] text-[#8a9a9f]">
                  Your scheduled patient appointments will appear here.
                </span>
              </div>
            ) : (
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-[#edf3f4] bg-[#f8fcfd]">
                    <th className="w-[5%] px-4 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      #
                    </th>

                    <th className="w-[23%] px-3 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Patient
                    </th>

                    <th className="w-[7%] px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Age
                    </th>

                    <th className="w-[15%] px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Date & Time
                    </th>

                    <th className="w-[10%] px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Fees
                    </th>

                    <th className="w-[14%] px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Payment
                    </th>

                    <th className="w-[14%] px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Status
                    </th>

                    <th className="w-[12%] px-2 py-3 text-left text-[9px] font-bold uppercase tracking-[0.08em] text-[#7c9096]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((item, index) => (
                    <tr
                      key={item._id}
                      className="border-b border-[#f0f4f5] transition-colors duration-300 last:border-b-0 hover:bg-[#f9fcfd]"
                    >
                      <td className="px-4 py-4 align-middle">
                        <span className="text-[10px] font-bold text-[#a1afb3]">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </td>

                      <td className="px-3 py-4 align-middle">
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#eaf7f9] text-xs font-bold text-[#087f91]">
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

                            {!item.cancelled && (
                              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#18a875]" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <strong className="block break-words text-xs font-bold text-[#082b3a]">
                              {item.userData?.name || 'Patient'}
                            </strong>

                            <span className="mt-0.5 block break-words text-[9px] leading-4 text-[#8a9a9f]">
                              {item.userData?.gender &&
                              item.userData.gender !== 'Not Selected'
                                ? item.userData.gender
                                : 'Gender not provided'}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-2 py-4 align-middle">
                        <span className="text-[11px] font-semibold text-[#526d75]">
                          {calculateAge(item.userData?.dob)}
                        </span>
                      </td>

                      <td className="px-2 py-4 align-middle">
                        <div>
                          <strong className="block break-words text-[10px] font-bold text-[#526d75]">
                            {item.slotDate}
                          </strong>

                          <span className="mt-1 inline-flex rounded-lg bg-[#eef9fa] px-2 py-1 text-[9px] font-bold text-[#087f91]">
                            {item.slotTime}
                          </span>
                        </div>
                      </td>

                      <td className="px-2 py-4 align-middle">
                        <span className="text-xs font-bold text-[#082b3a]">
                          ₹{item.amount}
                        </span>
                      </td>

                      <td className="px-2 py-4 align-middle">
                        {getPaymentStatus(item)}
                      </td>

                      <td className="px-2 py-4 align-middle">
                        {getStatus(item)}
                      </td>

                      <td className="px-2 py-4 align-middle">
                        {item.cancelled ? (
                          <span className="text-[10px] font-bold text-[#a5b1b4]">
                            —
                          </span>
                        ) : item.isCompleted ? (
                          <span className="inline-flex rounded-lg bg-[#f3f7f8] px-2.5 py-1.5 text-[9px] font-bold text-[#6c8188]">
                            Completed
                          </span>
                        ) : (
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              type="button"
                              onClick={() =>
                                handleComplete(item._id)
                              }
                              className="rounded-lg bg-[#effbf6] px-2.5 py-1.5 text-[9px] font-bold text-[#159164] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#18a875] hover:text-white"
                            >
                              Complete
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                handleCancel(item._id)
                              }
                              className="rounded-lg bg-[#fff3f4] px-2.5 py-1.5 text-[9px] font-bold text-[#d55461] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e65d67] hover:text-white"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="grid gap-3 p-4 sm:p-5 xl:hidden">
            {appointments.length === 0 ? (
              <div className="px-4 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eef9fa] text-[#087f91]">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  >
                    <rect
                      x="4"
                      y="5"
                      width="16"
                      height="15"
                      rx="3"
                    />
                    <path
                      strokeLinecap="round"
                      d="M8 3v4M16 3v4M4 10h16"
                    />
                  </svg>
                </div>

                <strong className="mt-4 block text-sm font-bold text-[#082b3a]">
                  No appointments found
                </strong>

                <span className="mt-1 block text-[11px] leading-5 text-[#8a9a9f]">
                  Your scheduled appointments will appear here.
                </span>
              </div>
            ) : (
              appointments.map((item, index) => (
                <div
                  key={item._id}
                  className="min-w-0 overflow-hidden rounded-[20px] border border-[#e0edef] bg-[#fbfdfe] p-4 transition-all duration-300 hover:border-[#c9e4e8] hover:bg-white hover:shadow-md sm:p-5"
                >
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0">
                        <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#eaf7f9] text-xs font-bold text-[#087f91]">
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

                        {!item.cancelled && (
                          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#18a875]" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <strong className="block break-words text-xs font-bold text-[#082b3a]">
                          {item.userData?.name || 'Patient'}
                        </strong>

                        <span className="mt-0.5 block text-[9px] font-semibold text-[#9aa8ac]">
                          Appointment #{index + 1}
                        </span>
                      </div>
                    </div>

                    <span className="shrink-0 rounded-xl bg-[#eef9fa] px-2.5 py-1.5 text-[10px] font-bold text-[#087f91]">
                      ₹{item.amount}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <div className="rounded-xl bg-white p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                        Age
                      </span>

                      <strong className="mt-1 block text-[11px] text-[#526d75]">
                        {calculateAge(item.userData?.dob)}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                        Gender
                      </span>

                      <strong className="mt-1 block break-words text-[11px] text-[#526d75]">
                        {item.userData?.gender &&
                        item.userData.gender !== 'Not Selected'
                          ? item.userData.gender
                          : 'N/A'}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                        Date
                      </span>

                      <strong className="mt-1 block break-words text-[10px] text-[#526d75]">
                        {item.slotDate}
                      </strong>
                    </div>

                    <div className="rounded-xl bg-white p-3">
                      <span className="block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                        Time
                      </span>

                      <strong className="mt-1 block text-[10px] font-bold text-[#087f91]">
                        {item.slotTime}
                      </strong>
                    </div>
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <div className="min-w-0 rounded-xl bg-white p-3">
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                        Payment
                      </span>

                      {getPaymentStatus(item)}
                    </div>

                    <div className="min-w-0 rounded-xl bg-white p-3">
                      <span className="mb-2 block text-[9px] font-bold uppercase tracking-wide text-[#9aa8ac]">
                        Status
                      </span>

                      {getStatus(item)}
                    </div>
                  </div>

                  {!item.cancelled &&
                    !item.isCompleted && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleComplete(item._id)
                          }
                          className="min-h-10 rounded-xl bg-[#effbf6] px-3 py-2 text-[10px] font-bold text-[#159164] transition-all duration-300 hover:bg-[#18a875] hover:text-white"
                        >
                          Complete
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleCancel(item._id)
                          }
                          className="min-h-10 rounded-xl bg-[#fff3f4] px-3 py-2 text-[10px] font-bold text-[#d55461] transition-all duration-300 hover:bg-[#e65d67] hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                  {item.isCompleted && !item.cancelled && (
                    <div className="mt-3 rounded-xl bg-[#f3f7f8] px-3 py-2.5 text-center text-[10px] font-bold text-[#6c8188]">
                      Appointment Completed
                    </div>
                  )}

                  {item.cancelled && (
                    <div className="mt-3 rounded-xl bg-[#fff6f7] px-3 py-2.5 text-center text-[10px] font-bold text-[#d55461]">
                      Appointment Cancelled
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {cancelledAppointments.length > 0 && (
          <div className="mt-4 flex items-center gap-2 px-1 text-[10px] text-[#8a9a9f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e65d67]" />
            {cancelledAppointments.length} cancelled appointment
            {cancelledAppointments.length !== 1 ? 's' : ''} included in
            the schedule
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments