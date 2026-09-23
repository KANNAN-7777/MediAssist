import { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {
  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  useEffect(() => {
    if (speciality) {
      setFilterDoc(
        doctors.filter(
          item =>
            item.speciality?.toLowerCase() === speciality.toLowerCase()
        )
      )
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  const handleSpeciality = item => {
    if (speciality?.toLowerCase() === item.toLowerCase()) {
      navigate('/doctors')
    } else {
      navigate(`/doctors/${item}`)
    }

    setShowFilter(false)
    window.scrollTo(0, 0)
  }

  const handleDoctorClick = doctor => {
    if (!doctor.available) return

    navigate(`/appointment/${doctor._id}`)
    window.scrollTo(0, 0)
  }

  const handleAllDoctors = () => {
    navigate('/doctors')
    setShowFilter(false)
    window.scrollTo(0, 0)
  }

  return (
    <section className="py-6 sm:py-9">

      {/* PAGE INTRO */}

      <div className="relative overflow-hidden rounded-[28px] border border-[#dceff2] bg-white shadow-[0_10px_35px_rgba(8,43,58,0.05)]">

        <div className="absolute -right-20 -top-28 w-72 h-72 rounded-full bg-[#19b7c8]/10 blur-3xl pointer-events-none" />

        <div className="absolute -left-24 bottom-[-150px] w-72 h-72 rounded-full bg-[#087f91]/[0.06] blur-3xl pointer-events-none" />

        <div className="relative z-10 px-5 py-6 sm:px-7 sm:py-7 lg:px-9 lg:py-8">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

            <div className="max-w-2xl">

              <div className="inline-flex items-center gap-2 rounded-full border border-[#19b7c8]/15 bg-[#eaf9fa] px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] text-[#087f91]">

                <span className="relative flex h-1.5 w-1.5">

                  <span className="absolute inset-0 rounded-full bg-[#19b7c8]/40 animate-ping" />

                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />

                </span>

                Healthcare Specialists

              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-[38px] font-extrabold tracking-tight text-[#082b3a]">
                Find the right doctor
                <span className="text-[#087f91]"> for you.</span>
              </h1>

              <p className="mt-2.5 max-w-xl text-[12px] sm:text-sm leading-6 text-[#6c8188]">
                Explore verified healthcare specialists and choose a doctor
                based on your medical needs.
              </p>

            </div>

            <div className="flex items-center gap-3">

              <div className="rounded-2xl border border-[#dceff2] bg-[#f7fcfd] px-4 py-3">

                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8aa0a6]">
                  Specialists
                </p>

                <p className="mt-0.5 text-xl font-extrabold text-[#082b3a]">
                  {filterDoc.length}
                </p>

              </div>

              <div className="hidden sm:block rounded-2xl border border-[#dceff2] bg-[#f7fcfd] px-4 py-3">

                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#8aa0a6]">
                  Status
                </p>

                <div className="mt-1 flex items-center gap-1.5">

                  <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />

                  <span className="text-xs font-semibold text-[#18a875]">
                    Live
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* MOBILE FILTER */}

      <button
        type="button"
        onClick={() => setShowFilter(prev => !prev)}
        className={`
          mt-5
          sm:hidden
          w-full
          flex
          items-center
          justify-between
          rounded-2xl
          border
          px-4
          py-3.5
          text-sm
          font-bold
          transition-all
          duration-300
          ${
            showFilter
              ? 'border-[#087f91] bg-[#087f91] text-white shadow-[0_10px_25px_rgba(8,127,145,0.18)]'
              : 'border-[#dceff2] bg-white text-[#082b3a] shadow-sm'
          }
        `}
      >

        <span className="flex items-center gap-2.5">

          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M7 12h10M10 18h4"
            />
          </svg>

          Filter by speciality

        </span>

        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            showFilter ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 9l6 6 6-6"
          />
        </svg>

      </button>

      {/* MAIN AREA */}

      <div className="mt-5 sm:mt-7 flex flex-col sm:flex-row items-start gap-5 lg:gap-7">

        {/* FILTER PANEL */}

        <aside
          className={`
            w-full
            sm:w-[215px]
            lg:w-[230px]
            flex-shrink-0
            ${showFilter ? 'block' : 'hidden sm:block'}
          `}
        >

          <div className="sticky top-[82px] overflow-hidden rounded-[24px] border border-[#dceff2] bg-white shadow-[0_8px_28px_rgba(8,43,58,0.05)]">

            <div className="border-b border-[#edf3f4] px-4 py-4">

              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#087f91]">
                Specialities
              </p>

              <p className="mt-1 text-[11px] text-[#8a9da3]">
                Select a medical area
              </p>

            </div>

            <div className="p-2.5">

              {specialities.map(item => {

                const isActive =
                  speciality?.toLowerCase() === item.toLowerCase()

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleSpeciality(item)}
                    className={`
                      group
                      relative
                      w-full
                      flex
                      items-center
                      justify-between
                      gap-2
                      rounded-xl
                      px-3
                      py-2.5
                      text-left
                      text-[12px]
                      transition-all
                      duration-250
                      ${
                        isActive
                          ? 'bg-[#e8f8fa] text-[#087f91] font-bold'
                          : 'text-[#536b73] hover:bg-[#f5fbfc] hover:text-[#087f91]'
                      }
                    `}
                  >

                    <span className="flex items-center gap-2">

                      <span
                        className={`
                          h-1.5
                          w-1.5
                          rounded-full
                          transition-all
                          duration-300
                          ${
                            isActive
                              ? 'bg-[#19b7c8] scale-100'
                              : 'bg-[#d5e4e7] scale-75 group-hover:bg-[#19b7c8]'
                          }
                        `}
                      />

                      {item}

                    </span>

                    {isActive && (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12l4 4L19 6"
                        />
                      </svg>
                    )}

                  </button>
                )
              })}

              <div className="my-2 border-t border-[#edf3f4]" />

              <button
                type="button"
                onClick={handleAllDoctors}
                className={`
                  w-full
                  rounded-xl
                  px-3
                  py-2.5
                  text-left
                  text-[12px]
                  font-bold
                  transition-all
                  duration-250
                  ${
                    !speciality
                      ? 'bg-[#087f91] text-white shadow-[0_7px_18px_rgba(8,127,145,0.18)]'
                      : 'text-[#536b73] hover:bg-[#f5fbfc] hover:text-[#087f91]'
                  }
                `}
              >
                <span className="flex items-center justify-between">

                  All Doctors

                  {!speciality && (
                    <span className="text-[10px] text-[#baf7f8]">
                      Active
                    </span>
                  )}

                </span>
              </button>

            </div>

          </div>

        </aside>

        {/* DOCTOR CONTENT */}

        <div className="flex-1 w-full min-w-0">

          <div className="mb-4 flex items-center justify-between">

            <div>

              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8ba0a6]">
                {speciality ? 'Selected speciality' : 'All specialists'}
              </p>

              <div className="mt-1 flex items-center gap-2">

                <h2 className="text-base sm:text-lg font-extrabold text-[#082b3a]">
                  {speciality || 'Available Doctors'}
                </h2>

                <span className="rounded-full bg-[#eaf9fa] px-2 py-0.5 text-[9px] font-bold text-[#087f91]">
                  {filterDoc.length}
                </span>

              </div>

            </div>

            {speciality && (
              <button
                type="button"
                onClick={handleAllDoctors}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[#dceff2] bg-white px-3 py-1.5 text-[10px] font-bold text-[#087f91] hover:border-[#19b7c8]/40 hover:bg-[#eaf9fa] transition-all duration-300"
              >
                View all
                <span>→</span>
              </button>
            )}

          </div>

          {filterDoc.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

              {filterDoc.map(item => (

                <article
                  key={item._id}
                  onClick={() => handleDoctorClick(item)}
                  className={`
                    group
                    relative
                    overflow-hidden
                    rounded-[22px]
                    border
                    bg-white
                    transition-all
                    duration-500
                    ${
                      item.available
                        ? 'cursor-pointer border-[#dceff2] shadow-[0_7px_25px_rgba(8,43,58,0.05)] hover:-translate-y-1.5 hover:border-[#19b7c8]/35 hover:shadow-[0_20px_42px_rgba(8,127,145,0.13)]'
                        : 'cursor-not-allowed border-[#e6edef] opacity-65'
                    }
                  `}
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden bg-[#edf9fa]">

                    <img
                      src={item.image}
                      alt={item.name}
                      className={`
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-[900ms]
                        ease-out
                        ${
                          item.available
                            ? 'group-hover:scale-[1.055]'
                            : ''
                        }
                      `}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#062b3a]/35 via-transparent to-transparent opacity-70" />

                    {/* Availability */}

                    <div className="absolute left-3 top-3">

                      <div
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          border-white/70
                          bg-white/90
                          px-2.5
                          py-1.5
                          text-[9px]
                          font-bold
                          shadow-sm
                          backdrop-blur-md
                          ${
                            item.available
                              ? 'text-[#159568]'
                              : 'text-[#d45c67]'
                          }
                        `}
                      >

                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${
                              item.available
                                ? 'bg-[#18a875]'
                                : 'bg-[#e65d67]'
                            }
                          `}
                        />

                        {item.available
                          ? 'Available'
                          : 'Unavailable'}

                      </div>

                    </div>

                    {/* Verified */}

                    {item.available && (

                      <div
                        className="
                          absolute
                          bottom-3
                          right-3
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/70
                          bg-white/90
                          text-[#087f91]
                          opacity-0
                          scale-75
                          shadow-lg
                          backdrop-blur-md
                          transition-all
                          duration-500
                          group-hover:opacity-100
                          group-hover:scale-100
                        "
                      >

                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.9"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                          />
                        </svg>

                      </div>

                    )}

                  </div>

                  {/* INFORMATION */}

                  <div className="p-4">

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <h3
                          className="
                            truncate
                            text-[15px]
                            font-extrabold
                            text-[#082b3a]
                            transition-colors
                            duration-300
                            group-hover:text-[#087f91]
                          "
                        >
                          {item.name}
                        </h3>

                        <p className="mt-1 text-[11px] font-medium text-[#73888f] truncate">
                          {item.speciality}
                        </p>

                      </div>

                      {item.degree && (
                        <span className="flex-shrink-0 rounded-lg bg-[#f3f8f9] px-2 py-1 text-[8px] font-bold text-[#82959b]">
                          {item.degree}
                        </span>
                      )}

                    </div>

                    <div className="mt-4 flex items-center gap-2">

                      <div className="flex items-center gap-1.5 rounded-lg bg-[#f5fbfc] px-2.5 py-1.5">

                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${
                              item.available
                                ? 'bg-[#18a875]'
                                : 'bg-[#c5ced1]'
                            }
                          `}
                        />

                        <span className="text-[9px] font-semibold text-[#748990]">
                          {item.available
                            ? 'Ready to consult'
                            : 'Currently unavailable'}
                        </span>

                      </div>

                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[#edf3f4] pt-3">

                      <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#a0afb3]">
                        Healthcare specialist
                      </span>

                      {item.available ? (

                        <span
                          className="
                            inline-flex
                            items-center
                            gap-1
                            text-[10px]
                            font-extrabold
                            text-[#087f91]
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                          "
                        >
                          Book
                          <span>→</span>
                        </span>

                      ) : (

                        <span className="text-[9px] font-semibold text-[#a6b1b4]">
                          Unavailable
                        </span>

                      )}

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="flex min-h-[330px] flex-col items-center justify-center rounded-[24px] border border-[#dceff2] bg-white px-5 shadow-sm">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf9fa] text-[#087f91]">

                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                  />

                  <circle
                    cx="9"
                    cy="7"
                    r="4"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  />
                </svg>

              </div>

              <h2 className="mt-4 text-base font-extrabold text-[#082b3a]">
                No doctors found
              </h2>

              <p className="mt-1 max-w-sm text-center text-[12px] leading-5 text-[#73888f]">
                No doctors are currently available for this speciality.
              </p>

              {speciality && (

                <button
                  type="button"
                  onClick={handleAllDoctors}
                  className="
                    mt-5
                    rounded-full
                    bg-[#087f91]
                    px-5
                    py-2.5
                    text-[10px]
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(8,127,145,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:bg-[#056071]
                  "
                >
                  View All Doctors
                </button>

              )}

            </div>

          )}

        </div>

      </div>

    </section>
  )
}

export default Doctor