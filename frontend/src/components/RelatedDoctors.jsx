import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        doc =>
          doc.speciality === speciality &&
          doc._id !== docId
      )

      setRelDocs(doctorsData)
    }
  }, [doctors, speciality, docId])

  const handleDoctorClick = (id) => {
    navigate(`/appointment/${id}`)
    window.scrollTo(0, 0)
  }

  const handleViewAll = () => {
    navigate('/doctors')
    window.scrollTo(0, 0)
  }

  return (
    <section className="my-12 sm:my-14">

      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

        <div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d7eef1] text-[#087f91] text-[10px] font-bold tracking-[0.08em] uppercase">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-[#19b7c8] opacity-40 animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
            </span>

            More Specialists
          </div>

          <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#082b3a]">
            More {speciality} Specialists
          </h2>

          <p className="mt-2 max-w-2xl text-sm text-[#6c8188] leading-6">
            Explore other specialists in the same field and
            choose a doctor who fits your healthcare needs.
          </p>

        </div>

        {relDoc.length > 0 && (
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#dceff2] shadow-sm">

            <span className="w-2 h-2 rounded-full bg-[#18a875]" />

            <span className="text-[11px] font-semibold text-[#6c8188]">
              {relDoc.length} specialist
              {relDoc.length !== 1 ? 's' : ''} available
            </span>

          </div>
        )}

      </div>

      {/* Doctors */}
      {relDoc.length > 0 ? (

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

          {relDoc.slice(0, 5).map((item, index) => (

            <article
              key={item._id || index}
              onClick={() => handleDoctorClick(item._id)}
              className="group relative overflow-hidden rounded-[22px] bg-white border border-[#dceff2] shadow-sm cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-[#19b7c8]/45 hover:shadow-[0_18px_40px_rgba(8,127,145,0.12)]"
            >

              {/* Doctor image */}
              <div className="relative overflow-hidden bg-[#edf9fa]">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full aspect-[4/4.1] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#062b3a]/55 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-500" />

                {/* Availability */}
                <div className="absolute top-3 left-3">

                  <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-white/80 shadow-sm">

                    <span className="relative flex w-1.5 h-1.5">

                      {item.available && (
                        <span className="absolute inset-0 rounded-full bg-[#18a875] opacity-40 animate-ping" />
                      )}

                      <span
                        className={`relative w-1.5 h-1.5 rounded-full ${
                          item.available
                            ? 'bg-[#18a875]'
                            : 'bg-[#e65d67]'
                        }`}
                      />

                    </span>

                    <span className="text-[10px] font-bold text-[#082b3a]">
                      {item.available
                        ? 'Available'
                        : 'Unavailable'}
                    </span>

                  </div>

                </div>

                {/* Image bottom action */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">

                  <span className="px-2.5 py-1 rounded-full bg-[#062b3a]/80 backdrop-blur-md text-[9px] font-semibold text-white">
                    {item.speciality}
                  </span>

                  <span className="w-8 h-8 rounded-full bg-white text-[#087f91] flex items-center justify-center shadow-lg">

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
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>

                  </span>

                </div>

              </div>

              {/* Doctor details */}
              <div className="p-4">

                <div className="flex items-start justify-between gap-3">

                  <div className="min-w-0">

                    <div className="flex items-center gap-1.5">

                      <h3 className="text-[15px] font-bold text-[#082b3a] truncate group-hover:text-[#087f91] transition-colors duration-300">
                        {item.name}
                      </h3>

                      {/* Verified icon */}
                      <span className="flex-shrink-0 w-4 h-4 rounded-full bg-[#e8f8fa] text-[#087f91] flex items-center justify-center">

                        <svg
                          className="w-2.5 h-2.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 12l4 4L19 6"
                          />
                        </svg>

                      </span>

                    </div>

                    <p className="mt-1 text-xs text-[#6c8188]">
                      {item.speciality}
                    </p>

                  </div>

                  {/* Arrow */}
                  <div className="w-8 h-8 flex-shrink-0 rounded-xl bg-[#f0fafb] text-[#087f91] flex items-center justify-center transition-all duration-300 group-hover:bg-[#087f91] group-hover:text-white group-hover:translate-x-0.5">

                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>

                  </div>

                </div>

                {/* Doctor metadata */}
                <div className="mt-3 grid grid-cols-2 gap-2">

                  <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#f7fcfd] border border-[#e8f2f4]">

                    <svg
                      className="w-3.5 h-3.5 text-[#087f91] flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4"
                      />
                    </svg>

                    <span className="text-[9px] font-semibold text-[#7c9096] truncate">
                      Verified
                    </span>

                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg bg-[#f7fcfd] border border-[#e8f2f4]">

                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        item.available
                          ? 'bg-[#18a875]'
                          : 'bg-[#e65d67]'
                      }`}
                    />

                    <span className="text-[9px] font-semibold text-[#7c9096] truncate">
                      {item.available
                        ? 'Ready to consult'
                        : 'Currently busy'}
                    </span>

                  </div>

                </div>

              </div>

            </article>

          ))}

        </div>

      ) : (

        /* Empty state */
        <div className="mt-7 rounded-[24px] border border-[#dceff2] bg-gradient-to-br from-[#f8fcfd] to-[#eef9fa] p-8 sm:p-10 text-center">

          <div className="relative mx-auto w-14 h-14">

            <div className="absolute inset-0 rounded-2xl bg-[#dff5f7] rotate-6" />

            <div className="relative w-14 h-14 rounded-2xl bg-white border border-[#dceff2] text-[#087f91] flex items-center justify-center shadow-sm">

              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="8"
                  r="3"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 20c.8-3.4 3-5 7-5s6.2 1.6 7 5"
                />

              </svg>

            </div>

          </div>

          <p className="mt-5 text-sm font-bold text-[#082b3a]">
            No other doctors available
          </p>

          <p className="mt-1 max-w-md mx-auto text-xs text-[#7c9096] leading-5">
            There are currently no other doctors listed under
            this speciality.
          </p>

        </div>

      )}

      {/* View all doctors */}
      <div className="flex justify-center mt-8">

        <button
          type="button"
          onClick={handleViewAll}
          className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-sm font-bold hover:bg-[#087f91] hover:text-white hover:border-[#087f91] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#087f91]/15 transition-all duration-300"
        >

          <span>
            View All Doctors
          </span>

          <span className="w-7 h-7 rounded-full bg-white text-[#087f91] flex items-center justify-center shadow-sm group-hover:translate-x-0.5 transition-transform duration-300">

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
                d="M5 12h14M13 6l6 6-6 6"
              />
            </svg>

          </span>

        </button>

      </div>

    </section>
  )
}

export default RelatedDoctors