import React, { useContext, useEffect, useMemo, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const Icon = ({ type, size = 20 }) => {

  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  }

  const icons = {

    search: (
      <svg {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>
    ),

    user: (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.8-3.2 3.2-5 7-5s6.2 1.8 7 5" />
      </svg>
    ),

    calendar: (
      <svg {...common}>
        <rect x="3" y="4" width="18" height="17" rx="3" />
        <path d="M16 2v4M8 2v4M3 9h18" />
      </svg>
    ),

    clock: (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),

    check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),

    close: (
      <svg {...common}>
        <path d="M6 6l12 12M18 6 6 18" />
      </svg>
    ),

    arrow: (
      <svg {...common}>
        <path d="m9 18 6-6-6-6" />
      </svg>
    ),

    history: (
      <svg {...common}>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),

    money: (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M15 9.5c-.7-.8-1.6-1.2-2.8-1.2-1.5 0-2.6.8-2.6 1.9 0 1.2 1 1.6 2.6 2 1.7.4 2.7.9 2.7 2.1 0 1.1-1.1 2-2.7 2-1.3 0-2.4-.5-3.1-1.4" />
        <path d="M12 6.8v10.4" />
      </svg>
    ),

    activity: (
      <svg {...common}>
        <path d="M3 12h4l2-6 4 12 2-6h6" />
      </svg>
    ),

    phone: (
      <svg {...common}>
        <path d="M6.5 3.5 9 3l2 4-2 1.5c.9 2 2.5 3.6 4.5 4.5L15 11l4 2 .5 2.5c.2 1.2-.7 2.5-2 2.8C11.7 19.4 4.6 12.3 5.7 6.5c.3-1.3 1.6-2.2 2.8-2Z" />
      </svg>
    ),

    mail: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </svg>
    ),

    refresh: (
      <svg {...common}>
        <path d="M20 11a8 8 0 0 0-14.7-4L3 10" />
        <path d="M3 5v5h5" />
        <path d="M4 13a8 8 0 0 0 14.7 4L21 14" />
        <path d="M21 19v-5h-5" />
      </svg>
    )
  }

  return icons[type] || null
}


const formatDate = (date) => {

  if (!date) return '--'

  const value = new Date(date)

  if (Number.isNaN(value.getTime())) {
    return date
  }

  return value.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}


const formatDateTime = (date, time) => {

  if (!date) return '--'

  const formattedDate = formatDate(date)

  if (!time) return formattedDate

  return `${formattedDate} • ${time}`
}


const calculateAge = (dob) => {

  if (!dob) return null

  const birthDate = new Date(dob)

  if (Number.isNaN(birthDate.getTime())) {
    return null
  }

  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()

  const monthDifference =
    today.getMonth() - birthDate.getMonth()

  if (
    monthDifference < 0 ||
    (
      monthDifference === 0 &&
      today.getDate() < birthDate.getDate()
    )
  ) {
    age--
  }

  return age >= 0 ? age : null
}


const PatientHistory = () => {

  const {
    dToken,
    appointments,
    getAppointments,
    getPatientList,
    getPatientHistory
  } = useContext(DoctorContext)

  const [search, setSearch] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {

    if (!dToken) return

    const loadAppointments = async () => {

      setLoading(true)

      try {
        await getAppointments()
      } finally {
        setLoading(false)
      }

    }

    loadAppointments()

  }, [dToken])


  const patients = useMemo(() => {

    if (typeof getPatientList === 'function') {
      return getPatientList()
    }

    return []

  }, [appointments, getPatientList])


  const filteredPatients = useMemo(() => {

    const value = search.trim().toLowerCase()

    if (!value) {
      return patients
    }

    return patients.filter(patient =>
      String(patient?.name || '')
        .toLowerCase()
        .includes(value) ||
      String(patient?.email || '')
        .toLowerCase()
        .includes(value) ||
      String(patient?.phone || '')
        .toLowerCase()
        .includes(value)
    )

  }, [patients, search])


  useEffect(() => {

    if (!selectedPatient && filteredPatients.length > 0) {
      setSelectedPatient(filteredPatients[0])
      return
    }

    if (
      selectedPatient &&
      !filteredPatients.some(
        patient =>
          String(patient.key) ===
          String(selectedPatient.key)
      )
    ) {
      setSelectedPatient(
        filteredPatients.length > 0
          ? filteredPatients[0]
          : null
      )
    }

  }, [filteredPatients, selectedPatient])


  const history = useMemo(() => {

    if (
      !selectedPatient ||
      typeof getPatientHistory !== 'function'
    ) {
      return []
    }

    return getPatientHistory(selectedPatient.key)

  }, [
    selectedPatient,
    appointments,
    getPatientHistory
  ])


  const statistics = useMemo(() => {

    const total = history.length

    const completed = history.filter(
      item => item?.isCompleted
    ).length

    const cancelled = history.filter(
      item => item?.cancelled
    ).length

    const upcoming = history.filter(
      item =>
        !item?.cancelled &&
        !item?.isCompleted
    ).length

    const paid = history.filter(
      item =>
        item?.payment === true ||
        item?.paymentMethod === 'Cash'
    ).length

    return {
      total,
      completed,
      cancelled,
      upcoming,
      paid
    }

  }, [history])


  const getAppointmentStatus = (appointment) => {

    if (appointment?.cancelled) {
      return {
        label: appointment?.refund
          ? 'Cancelled • Refunded'
          : 'Cancelled',
        className:
          'bg-[#fff1f2] text-[#d94b58] border-[#ffd7dc]'
      }
    }

    if (appointment?.isCompleted) {
      return {
        label: 'Completed',
        className:
          'bg-[#eafaf3] text-[#16895f] border-[#ccefdc]'
      }
    }

    return {
      label: 'Upcoming',
      className:
        'bg-[#eaf8fa] text-[#087f91] border-[#cceef1]'
    }

  }


  const getPaymentStatus = (appointment) => {

    if (appointment?.paymentMethod === 'Cash') {
      return {
        label: 'Cash',
        className:
          'bg-[#fff8e8] text-[#a97817] border-[#f5e5b7]'
      }
    }

    if (appointment?.payment === true) {
      return {
        label: 'Paid Online',
        className:
          'bg-[#eafaf3] text-[#16895f] border-[#ccefdc]'
      }
    }

    return {
      label: 'Unpaid',
      className:
        'bg-[#fff8e8] text-[#a97817] border-[#f5e5b7]'
    }

  }


  const initials = (name) => {

    if (!name) return 'P'

    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase()

  }


  const selectedAge = calculateAge(
    selectedPatient?.dob
  )


  return (
    <div className="w-full min-w-0 space-y-5">

      {/* Header */}

      <section
        className="
          relative
          overflow-hidden
          rounded-[26px]
          border border-[#dceff2]
          bg-white
          px-5
          py-5
          shadow-[0_18px_55px_rgba(8,127,145,0.08)]
          sm:px-7
          sm:py-6
        "
      >

        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-[#19b7c8]/10
            blur-3xl
          "
        />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div className="min-w-0">

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#cdeff2] bg-[#f1fbfc] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#087f91]">
              <Icon type="history" size={14} />
              Patient Records
            </div>

            <h1 className="break-words text-2xl font-bold tracking-tight text-[#082b3a] sm:text-3xl">
              Patient History
            </h1>

            <p className="mt-1 max-w-2xl break-words text-sm leading-6 text-[#6c8188]">
              Review previous appointments and care activity for your patients.
            </p>

          </div>


          <button
            type="button"
            onClick={async () => {
              setLoading(true)

              try {
                await getAppointments()
              } finally {
                setLoading(false)
              }
            }}
            className="
              inline-flex
              min-h-[44px]
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#dceff2]
              bg-white
              px-4
              py-2.5
              text-xs
              font-bold
              text-[#087f91]
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-[#19b7c8]/50
              hover:bg-[#f3fbfd]
            "
          >
            <Icon
              type="refresh"
              size={15}
            />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>

        </div>

      </section>


      {/* Main Layout */}

      <section
        className="
          grid
          min-w-0
          grid-cols-1
          gap-5
          xl:grid-cols-[340px_minmax(0,1fr)]
        "
      >

        {/* Patient List */}

        <aside
          className="
            min-w-0
            overflow-hidden
            rounded-[24px]
            border
            border-[#dceff2]
            bg-white
            shadow-[0_15px_45px_rgba(8,127,145,0.06)]
          "
        >

          <div className="border-b border-[#edf3f4] p-4">

            <div className="flex items-center justify-between gap-3">

              <div>
                <h2 className="text-sm font-bold text-[#082b3a]">
                  Patients
                </h2>

                <p className="mt-0.5 text-[11px] text-[#7b9096]">
                  {patients.length} patient{patients.length === 1 ? '' : 's'}
                </p>
              </div>

              <div className="rounded-xl bg-[#eaf8fa] px-2.5 py-1.5 text-xs font-bold text-[#087f91]">
                {patients.length}
              </div>

            </div>


            <div className="relative mt-4">

              <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7b9096]">
                <Icon type="search" size={16} />
              </div>

              <input
                type="text"
                value={search}
                onChange={event =>
                  setSearch(event.target.value)
                }
                placeholder="Search patient..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#dceff2]
                  bg-[#f8fcfd]
                  pl-10
                  pr-3
                  text-sm
                  text-[#082b3a]
                  outline-none
                  transition-all
                  placeholder:text-[#9aadb2]
                  focus:border-[#19b7c8]
                  focus:bg-white
                  focus:ring-4
                  focus:ring-[#19b7c8]/10
                "
              />

            </div>

          </div>


          <div className="max-h-[620px] overflow-y-auto p-2">

            {filteredPatients.length === 0 ? (

              <div className="px-5 py-12 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf8fa] text-[#087f91]">
                  <Icon type="user" size={24} />
                </div>

                <h3 className="mt-4 text-sm font-bold text-[#082b3a]">
                  No patients found
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#7b9096]">
                  Try searching with another patient name.
                </p>

              </div>

            ) : (

              <div className="space-y-1">

                {filteredPatients.map(patient => {

                  const active =
                    selectedPatient &&
                    String(selectedPatient.key) ===
                    String(patient.key)

                  return (
                    <button
                      key={String(patient.key)}
                      type="button"
                      onClick={() =>
                        setSelectedPatient(patient)
                      }
                      className={`
                        group
                        flex
                        min-h-[76px]
                        w-full
                        min-w-0
                        items-center
                        gap-3
                        rounded-2xl
                        border
                        p-3
                        text-left
                        transition-all
                        duration-300
                        ${
                          active
                            ? 'border-[#bce9ee] bg-[#f0fbfc] shadow-sm'
                            : 'border-transparent hover:border-[#e1f0f2] hover:bg-[#f8fcfd]'
                        }
                      `}
                    >

                      {patient.image ? (

                        <img
                          src={patient.image}
                          alt={patient.name || 'Patient'}
                          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white"
                        />

                      ) : (

                        <div
                          className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-gradient-to-br
                            from-[#e4f8fa]
                            to-[#d5f0f3]
                            text-xs
                            font-bold
                            text-[#087f91]
                          "
                        >
                          {initials(patient.name)}
                        </div>

                      )}


                      <div className="min-w-0 flex-1">

                        <p className="break-words text-sm font-bold text-[#082b3a]">
                          {patient.name || 'Patient'}
                        </p>

                        <div className="mt-1 flex flex-wrap items-center gap-1.5">

                          <span className="text-[10px] text-[#7b9096]">
                            {patient.appointments} visit{patient.appointments === 1 ? '' : 's'}
                          </span>

                          {patient.completed > 0 && (
                            <span className="rounded-full bg-[#eafaf3] px-1.5 py-0.5 text-[9px] font-bold text-[#16895f]">
                              {patient.completed} completed
                            </span>
                          )}

                        </div>

                      </div>


                      <span
                        className={`
                          shrink-0
                          text-[#9aadb2]
                          transition-transform
                          duration-300
                          ${
                            active
                              ? 'translate-x-0 text-[#087f91]'
                              : 'group-hover:translate-x-1'
                          }
                        `}
                      >
                        <Icon type="arrow" size={16} />
                      </span>

                    </button>
                  )

                })}

              </div>

            )}

          </div>

        </aside>


        {/* Patient Details */}

        <main className="min-w-0 space-y-5">

          {!selectedPatient ? (

            <div className="flex min-h-[500px] items-center justify-center rounded-[24px] border border-[#dceff2] bg-white p-8 text-center shadow-sm">

              <div>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf8fa] text-[#087f91]">
                  <Icon type="history" size={28} />
                </div>

                <h2 className="mt-5 text-lg font-bold text-[#082b3a]">
                  Select a patient
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#7b9096]">
                  Choose a patient from the list to view their appointment history.
                </p>

              </div>

            </div>

          ) : (

            <>

              {/* Patient Profile */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[24px]
                  border
                  border-[#dceff2]
                  bg-white
                  p-5
                  shadow-[0_15px_45px_rgba(8,127,145,0.06)]
                  sm:p-6
                "
              >

                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-20
                    h-44
                    w-44
                    rounded-full
                    bg-[#19b7c8]/10
                    blur-3xl
                  "
                />

                <div className="relative flex min-w-0 flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex min-w-0 items-center gap-4">

                    {selectedPatient.image ? (

                      <img
                        src={selectedPatient.image}
                        alt={selectedPatient.name || 'Patient'}
                        className="
                          h-16
                          w-16
                          shrink-0
                          rounded-2xl
                          object-cover
                          ring-4
                          ring-[#eaf8fa]
                        "
                      />

                    ) : (

                      <div
                        className="
                          flex
                          h-16
                          w-16
                          shrink-0
                          items-center
                          justify-center
                          rounded-2xl
                          bg-gradient-to-br
                          from-[#e2f7f9]
                          to-[#cdeff2]
                          text-lg
                          font-bold
                          text-[#087f91]
                          ring-4
                          ring-[#f2fbfc]
                        "
                      >
                        {initials(selectedPatient.name)}
                      </div>

                    )}


                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <h2 className="break-words text-xl font-bold text-[#082b3a]">
                          {selectedPatient.name || 'Patient'}
                        </h2>

                        <span className="rounded-full border border-[#ccefdc] bg-[#eafaf3] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#16895f]">
                          Patient
                        </span>

                      </div>


                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#6c8188]">

                        {selectedAge !== null && (
                          <span>
                            Age: <strong className="text-[#082b3a]">{selectedAge}</strong>
                          </span>
                        )}

                        {selectedPatient.gender && (
                          <span>
                            Gender: <strong className="text-[#082b3a]">{selectedPatient.gender}</strong>
                          </span>
                        )}

                        {selectedPatient.phone && (
                          <span className="inline-flex items-center gap-1">
                            <Icon type="phone" size={13} />
                            {selectedPatient.phone}
                          </span>
                        )}

                        {selectedPatient.email && (
                          <span className="inline-flex min-w-0 max-w-full items-center gap-1 break-all">
                            <Icon type="mail" size={13} />
                            {selectedPatient.email}
                          </span>
                        )}

                      </div>

                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:min-w-[390px]">

                    <div className="rounded-2xl bg-[#f6fbfc] p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#84979d]">
                        Visits
                      </p>
                      <p className="mt-1 text-lg font-bold text-[#082b3a]">
                        {statistics.total}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#f2fbf6] p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#84979d]">
                        Completed
                      </p>
                      <p className="mt-1 text-lg font-bold text-[#16895f]">
                        {statistics.completed}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#eefafb] p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#84979d]">
                        Upcoming
                      </p>
                      <p className="mt-1 text-lg font-bold text-[#087f91]">
                        {statistics.upcoming}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#fff8eb] p-3">
                      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#84979d]">
                        Cancelled
                      </p>
                      <p className="mt-1 text-lg font-bold text-[#a97817]">
                        {statistics.cancelled}
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              {/* History Heading */}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eaf8fa] text-[#087f91]">
                      <Icon type="history" size={18} />
                    </div>

                    <div>
                      <h2 className="text-lg font-bold text-[#082b3a]">
                        Appointment History
                      </h2>
                      <p className="text-xs text-[#7b9096]">
                        {history.length} recorded appointment{history.length === 1 ? '' : 's'}
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              {/* Timeline */}

              {history.length === 0 ? (

                <div className="rounded-[24px] border border-[#dceff2] bg-white p-10 text-center shadow-sm">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf8fa] text-[#087f91]">
                    <Icon type="calendar" size={24} />
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-[#082b3a]">
                    No appointment history
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-[#7b9096]">
                    No appointment records are available for this patient.
                  </p>

                </div>

              ) : (

                <div className="space-y-4">

                  {history.map((appointment, index) => {

                    const status =
                      getAppointmentStatus(appointment)

                    const payment =
                      getPaymentStatus(appointment)

                    return (
                      <article
                        key={
                          appointment?._id ||
                          appointment?.id ||
                          `${selectedPatient.key}-${index}`
                        }
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-[24px]
                          border
                          border-[#dceff2]
                          bg-white
                          p-5
                          shadow-[0_12px_35px_rgba(8,127,145,0.05)]
                          transition-all
                          duration-300
                          hover:-translate-y-0.5
                          hover:border-[#bce9ee]
                          hover:shadow-[0_18px_45px_rgba(8,127,145,0.09)]
                        "
                      >

                        <div className="flex min-w-0 flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                          {/* Date */}

                          <div className="flex min-w-0 gap-4">

                            <div
                              className="
                                flex
                                h-12
                                w-12
                                shrink-0
                                flex-col
                                items-center
                                justify-center
                                rounded-2xl
                                bg-[#eaf8fa]
                                text-[#087f91]
                              "
                            >
                              <Icon type="calendar" size={18} />
                            </div>


                            <div className="min-w-0">

                              <div className="flex flex-wrap items-center gap-2">

                                <h3 className="break-words text-sm font-bold text-[#082b3a]">
                                  {formatDate(appointment?.slotDate)}
                                </h3>

                                <span className="inline-flex items-center gap-1 text-xs text-[#7b9096]">
                                  <Icon type="clock" size={13} />
                                  {appointment?.slotTime || '--'}
                                </span>

                              </div>

                              <p className="mt-1 break-words text-xs text-[#7b9096]">
                                Appointment {history.length - index}
                              </p>

                            </div>

                          </div>


                          {/* Status */}

                          <div className="flex flex-wrap gap-2">

                            <span
                              className={`
                                rounded-full
                                border
                                px-2.5
                                py-1.5
                                text-[9px]
                                font-bold
                                ${status.className}
                              `}
                            >
                              {status.label}
                            </span>

                            <span
                              className={`
                                rounded-full
                                border
                                px-2.5
                                py-1.5
                                text-[9px]
                                font-bold
                                ${payment.className}
                              `}
                            >
                              {payment.label}
                            </span>

                          </div>

                        </div>


                        {/* Details */}

                        <div className="mt-5 grid min-w-0 grid-cols-1 gap-3 border-t border-[#edf3f4] pt-4 sm:grid-cols-2 lg:grid-cols-4">

                          <div className="min-w-0">

                            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8a9ca1]">
                              Consultation
                            </p>

                            <p className="mt-1 break-words text-sm font-bold text-[#082b3a]">
                              {appointment?.fees !== undefined &&
                              appointment?.fees !== null
                                ? `₹${appointment.fees}`
                                : 'Not available'}
                            </p>

                          </div>


                          <div className="min-w-0">

                            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8a9ca1]">
                              Payment Method
                            </p>

                            <p className="mt-1 break-words text-sm font-semibold text-[#082b3a]">
                              {appointment?.paymentMethod || 'Not specified'}
                            </p>

                          </div>


                          <div className="min-w-0">

                            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8a9ca1]">
                              Visit Date
                            </p>

                            <p className="mt-1 break-words text-sm font-semibold text-[#082b3a]">
                              {formatDateTime(
                                appointment?.slotDate,
                                appointment?.slotTime
                              )}
                            </p>

                          </div>


                          <div className="min-w-0">

                            <p className="text-[9px] font-semibold uppercase tracking-wide text-[#8a9ca1]">
                              Record Status
                            </p>

                            <div className="mt-1 flex items-center gap-1.5">

                              <span
                                className={`
                                  h-2
                                  w-2
                                  shrink-0
                                  rounded-full
                                  ${
                                    appointment?.isCompleted
                                      ? 'bg-[#18a875]'
                                      : appointment?.cancelled
                                        ? 'bg-[#e65d67]'
                                        : 'bg-[#19b7c8]'
                                  }
                                `}
                              />

                              <span className="break-words text-sm font-semibold text-[#082b3a]">
                                {appointment?.isCompleted
                                  ? 'Completed care'
                                  : appointment?.cancelled
                                    ? 'Cancelled visit'
                                    : 'Scheduled visit'}
                              </span>

                            </div>

                          </div>

                        </div>


                        {/* Refund Information */}

                        {appointment?.refund && (
                          <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#ffd9dd] bg-[#fff5f6] px-3 py-2.5 text-xs text-[#c84c58]">

                            <Icon type="money" size={15} />

                            <div className="min-w-0">

                              <p className="font-bold">
                                Refund processed
                              </p>

                              <p className="mt-0.5 break-words text-[10px] text-[#b86b73]">
                                This appointment was cancelled and marked for refund.
                              </p>

                            </div>

                          </div>
                        )}

                      </article>
                    )

                  })}

                </div>

              )}


              {/* Care Summary */}

              <section
                className="
                  rounded-[24px]
                  border
                  border-[#dceff2]
                  bg-gradient-to-br
                  from-[#f7fcfd]
                  to-white
                  p-5
                  sm:p-6
                "
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#eaf8fa] text-[#087f91]">
                    <Icon type="activity" size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#082b3a]">
                      Care Activity Summary
                    </h3>
                    <p className="text-xs text-[#7b9096]">
                      Based on available appointment records
                    </p>
                  </div>

                </div>


                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">

                  <div className="rounded-2xl border border-[#e3eff1] bg-white p-4">

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs font-semibold text-[#6c8188]">
                        Completed care
                      </span>

                      <span className="text-sm font-bold text-[#16895f]">
                        {statistics.completed}
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaf2f3]">

                      <div
                        className="h-full rounded-full bg-[#18a875] transition-all duration-700"
                        style={{
                          width:
                            statistics.total > 0
                              ? `${Math.min(
                                  100,
                                  (statistics.completed /
                                    statistics.total) *
                                    100
                                )}%`
                              : '0%'
                        }}
                      />

                    </div>

                  </div>


                  <div className="rounded-2xl border border-[#e3eff1] bg-white p-4">

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs font-semibold text-[#6c8188]">
                        Upcoming care
                      </span>

                      <span className="text-sm font-bold text-[#087f91]">
                        {statistics.upcoming}
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaf2f3]">

                      <div
                        className="h-full rounded-full bg-[#19b7c8] transition-all duration-700"
                        style={{
                          width:
                            statistics.total > 0
                              ? `${Math.min(
                                  100,
                                  (statistics.upcoming /
                                    statistics.total) *
                                    100
                                )}%`
                              : '0%'
                        }}
                      />

                    </div>

                  </div>


                  <div className="rounded-2xl border border-[#e3eff1] bg-white p-4">

                    <div className="flex items-center justify-between gap-3">

                      <span className="text-xs font-semibold text-[#6c8188]">
                        Payment records
                      </span>

                      <span className="text-sm font-bold text-[#a97817]">
                        {statistics.paid}
                      </span>

                    </div>

                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eaf2f3]">

                      <div
                        className="h-full rounded-full bg-[#e5a93d] transition-all duration-700"
                        style={{
                          width:
                            statistics.total > 0
                              ? `${Math.min(
                                  100,
                                  (statistics.paid /
                                    statistics.total) *
                                    100
                                )}%`
                              : '0%'
                        }}
                      />

                    </div>

                  </div>

                </div>

              </section>

            </>

          )}

        </main>

      </section>

    </div>
  )
}

export default PatientHistory