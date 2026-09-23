import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const handleDoctorClick = (doctor) => {
    if (!doctor?.available) return

    navigate(`/appointment/${doctor._id}`)
    window.scrollTo(0, 0)
  }

  const handleViewAll = () => {
    navigate('/doctors')
    window.scrollTo(0, 0)
  }

  return (
    <section className="my-12 sm:my-16">

      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto px-3">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] text-[#087f91] text-[10px] sm:text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
          Trusted Specialists
        </div>

        <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#082b3a]">
          Top Doctors to Book
        </h2>

        <p className="mt-2 text-xs sm:text-sm text-[#6c8188] leading-6">
          Connect with experienced healthcare professionals and book
          your appointment at your convenience.
        </p>

      </div>


      {/* DOCTOR GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-9">

        {doctors.slice(0, 8).map((doctor) => (

          <article
            key={doctor._id}
            onClick={() => handleDoctorClick(doctor)}
            className={`
              group
              relative
              ${
                doctor.available
                  ? 'cursor-pointer'
                  : 'cursor-not-allowed'
              }
            `}
          >

            {/* SOFT OUTER GLOW */}
            {doctor.available && (
              <div
                className="
                  absolute
                  -inset-[3px]
                  rounded-[26px]

                  bg-gradient-to-r
                  from-[#19b7c8]/20
                  via-[#087f91]/10
                  to-[#19b7c8]/20

                  blur-xl

                  opacity-0
                  group-hover:opacity-100

                  transition-opacity
                  duration-700
                  ease-in-out

                  pointer-events-none
                "
              />
            )}


            {/* MAIN CARD */}
            <div
              className={`
                doctor-card
                relative
                overflow-hidden
                rounded-[24px]

                bg-white

                border
                ${
                  doctor.available
                    ? 'border-[#dceff2]'
                    : 'border-[#e4edef]'
                }

                shadow-[0_6px_24px_rgba(8,43,58,0.06)]
              `}
            >

              {/* IMAGE */}
              <div className="relative h-[270px] overflow-hidden bg-[#eef9fa]">

                <img
                  src={doctor?.image}
                  alt={doctor?.name || 'Doctor'}
                  className={`
                    doctor-card-image

                    w-full
                    h-full
                    object-cover
                    object-top

                    ${
                      doctor.available
                        ? 'group-hover:scale-[1.06]'
                        : ''
                    }
                  `}
                />


                {/* IMAGE OVERLAY */}
                <div
                  className="
                    doctor-card-overlay

                    absolute
                    inset-0

                    bg-gradient-to-t
                    from-[#06202d]/55
                    via-transparent
                    to-transparent

                    pointer-events-none
                  "
                />


                {/* AVAILABLE */}
                <div className="absolute top-4 left-4 z-10">

                  <span
                    className={`
                      doctor-card-badge

                      inline-flex
                      items-center
                      gap-2

                      px-3
                      py-2

                      rounded-full

                      bg-white/90
                      backdrop-blur-xl

                      border
                      border-white/80

                      shadow-lg

                      text-[10px]
                      font-bold

                      ${
                        doctor.available
                          ? 'text-[#18a875]'
                          : 'text-[#e65d67]'
                      }
                    `}
                  >

                    <span
                      className={`
                        w-1.5
                        h-1.5
                        rounded-full

                        ${
                          doctor.available
                            ? 'bg-[#18a875]'
                            : 'bg-[#e65d67]'
                        }
                      `}
                    />

                    {doctor.available
                      ? 'Available'
                      : 'Unavailable'}

                  </span>

                </div>


                {/* EXPERIENCE */}
                {doctor?.experience && (

                  <div className="absolute top-4 right-4 z-10">

                    <span
                      className="
                        inline-flex

                        px-3
                        py-2

                        rounded-full

                        bg-[#06202d]/75
                        backdrop-blur-xl

                        border
                        border-white/20

                        text-white
                        text-[10px]
                        font-semibold
                      "
                    >
                      {doctor.experience} Exp
                    </span>

                  </div>

                )}


                {/* HOVER ICON */}
                {doctor.available && (

                  <div
                    className="
                      doctor-card-icon

                      absolute
                      bottom-4
                      right-4

                      w-11
                      h-11

                      rounded-full

                      bg-white/95
                      backdrop-blur-xl

                      flex
                      items-center
                      justify-center

                      text-[#087f91]

                      shadow-xl
                    "
                  >

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
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


              {/* DETAILS */}
              <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <p
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.12em]
                        font-bold
                        text-[#087f91]

                        group-hover:tracking-[0.14em]

                        transition-[letter-spacing]
                        duration-500
                        ease-out
                      "
                    >
                      {doctor?.speciality || 'Healthcare Specialist'}
                    </p>


                    <h3
                      className="
                        mt-1.5

                        text-base
                        font-bold
                        text-[#082b3a]

                        truncate

                        group-hover:text-[#087f91]

                        transition-colors
                        duration-500
                        ease-out
                      "
                    >
                      {doctor?.name || 'Doctor'}
                    </h3>

                  </div>


                  {doctor?.degree && (

                    <span
                      className="
                        flex-shrink-0

                        px-2
                        py-1

                        rounded-lg

                        bg-[#f1f8f9]

                        text-[9px]
                        font-semibold
                        text-[#6c8188]

                        group-hover:bg-[#e5f7f9]
                        group-hover:text-[#087f91]

                        transition-colors
                        duration-500
                        ease-out
                      "
                    >
                      {doctor.degree}
                    </span>

                  )}

                </div>


                {/* FOOTER */}
                <div
                  className="
                    mt-5
                    pt-4

                    border-t
                    border-[#edf3f4]

                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >

                  <div>

                    <p className="text-[9px] text-[#84969b]">
                      Consultation
                    </p>

                    <p className="mt-0.5 text-sm font-bold text-[#082b3a]">
                      {doctor?.fees !== undefined
                        ? `$${doctor.fees}`
                        : 'Verified Care'}
                    </p>

                  </div>


                  <button
                    type="button"
                    disabled={!doctor.available}
                    onClick={(event) => {

                      event.stopPropagation()

                      if (doctor.available) {
                        handleDoctorClick(doctor)
                      }

                    }}
                    className={`
                      flex
                      items-center
                      gap-2

                      px-4
                      py-2.5

                      rounded-xl

                      text-[10px]
                      font-bold

                      ${
                        doctor.available
                          ? `
                            bg-[#e8f8fa]
                            text-[#087f91]

                            group-hover:bg-[#087f91]
                            group-hover:text-white

                            group-hover:shadow-lg
                          `
                          : `
                            bg-[#f1f3f4]
                            text-[#9aa8ac]
                          `
                      }

                      transition-all
                      duration-500
                      ease-out
                    `}
                  >

                    {doctor.available
                      ? 'Book Slot'
                      : 'Unavailable'}


                    {doctor.available && (

                      <svg
                        className="
                          w-3.5
                          h-3.5

                          group-hover:translate-x-1

                          transition-transform
                          duration-500
                          ease-out
                        "
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >

                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />

                      </svg>

                    )}

                  </button>

                </div>

              </div>

            </div>

          </article>

        ))}

      </div>


      {/* VIEW ALL */}
      <div className="flex justify-center mt-9">

        <button
          type="button"
          onClick={handleViewAll}
          className="
            group

            flex
            items-center
            gap-3

            px-6
            py-3

            rounded-full

            bg-[#e8f8fa]
            border
            border-[#ccecef]

            text-[#087f91]

            text-xs
            sm:text-sm

            font-semibold

            hover:bg-[#087f91]
            hover:text-white
            hover:border-[#087f91]

            transition-all
            duration-500
            ease-out
          "
        >

          View All Doctors

          <span
            className="
              w-6
              h-6

              rounded-full

              bg-white/80

              flex
              items-center
              justify-center

              group-hover:bg-white

              transition-colors
              duration-500
            "
          >

            <svg
              className="
                w-3.5
                h-3.5

                group-hover:translate-x-1

                transition-transform
                duration-500
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 6l6 6-6 6"
              />

            </svg>

          </span>

        </button>

      </div>

    </section>
  )
}

export default TopDoctors