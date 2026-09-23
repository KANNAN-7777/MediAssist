import { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {
    aToken,
    doctors,
    getAllDoctors,
    changeAvailable
  } = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors()
    }
  }, [aToken])

  const availableCount = doctors.filter(
    (doctor) => doctor.available
  ).length

  const unavailableCount =
    doctors.length - availableCount

  return (
    <div className="relative w-full">

      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#19b7c8]/8 blur-3xl" />

      <div className="relative">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#19b7c8] shadow-[0_0_0_5px_rgba(25,183,200,0.10)]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#087f91]">
                Medical Team
              </span>
            </div>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#082b3a] sm:text-3xl">
              Doctors
            </h1>

            <p className="mt-1 text-sm text-[#71858b]">
              Manage doctors and control their appointment availability.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <div className="flex items-center gap-2 rounded-full border border-[#dceff2] bg-white px-3 py-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#087f91]" />

              <span className="text-[10px] font-semibold text-[#61777e]">
                {doctors.length} Total
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#dcefe5] bg-white px-3 py-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />

              <span className="text-[10px] font-semibold text-[#16865f]">
                {availableCount} Available
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[#f0e1e3] bg-white px-3 py-2 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e46b72]" />

              <span className="text-[10px] font-semibold text-[#c85e66]">
                {unavailableCount} Offline
              </span>
            </div>

          </div>

        </div>

        {doctors.length > 0 ? (

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            {doctors.map((item) => (

              <div
                key={item._id}
                className="group relative overflow-hidden rounded-[24px] border border-[#dceff2] bg-white shadow-[0_8px_28px_rgba(8,43,58,0.055)] transition-all duration-500 hover:-translate-y-2 hover:border-[#19b7c8]/35 hover:shadow-[0_22px_48px_rgba(8,127,145,0.14)]"
              >

                <div className="pointer-events-none absolute -right-16 -top-16 z-20 h-32 w-32 rounded-full bg-[#19b7c8]/10 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="relative h-[245px] overflow-hidden bg-[#edf8fa]">

                  <div className="absolute inset-0 bg-gradient-to-br from-[#f2fafb] via-[#e8f6f8] to-[#d9eef2] transition-all duration-700 group-hover:from-[#e2f6f8] group-hover:via-[#d5f0f3] group-hover:to-[#c9e9ed]" />

                  <div className="absolute bottom-[-75px] left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#19b7c8]/0 blur-3xl transition-all duration-700 group-hover:bg-[#19b7c8]/15 group-hover:scale-125" />

                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative z-10 h-full w-full object-contain object-bottom px-3 pt-2 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                  />

                  <div className="absolute left-3 top-3 z-20">

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-2.5 py-1.5 text-[10px] font-bold text-[#60777e] shadow-sm backdrop-blur-md">

                      <span className="relative flex h-1.5 w-1.5">

                        {item.available && (
                          <span className="absolute inset-0 animate-ping rounded-full bg-[#18a875]/50" />
                        )}

                        <span
                          className={`relative h-1.5 w-1.5 rounded-full ${
                            item.available
                              ? 'bg-[#18a875]'
                              : 'bg-[#e46b72]'
                          }`}
                        />

                      </span>

                      {item.available
                        ? 'Available'
                        : 'Unavailable'}

                    </span>

                  </div>

                  <div className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-white/70 bg-white/80 text-[#087f91] opacity-0 shadow-sm backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4"
                    >
                      <path
                        d="M12 21C16.5 16.5 19 13.2 19 9.5C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.5C5 13.2 7.5 16.5 12 21Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />

                      <circle
                        cx="12"
                        cy="9.5"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>

                  </div>

                </div>

                <div className="relative bg-white p-4">

                  <div className="flex items-start justify-between gap-3">

                    <div className="min-w-0">

                      <p className="truncate text-[15px] font-bold text-[#082b3a] transition-colors duration-300 group-hover:text-[#087f91]">
                        {item.name}
                      </p>

                      <p className="mt-1 truncate text-[11px] font-medium text-[#7a9096]">
                        {item.speciality}
                      </p>

                    </div>

                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[#f1f8f9] text-[#087f91] transition-all duration-300 group-hover:bg-[#e8f8fa] group-hover:scale-105">

                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-4 w-4"
                      >
                        <path
                          d="M20 21V19C20 16.8 18.2 15 16 15H8C5.8 15 4 16.8 4 19V21"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />

                        <circle
                          cx="12"
                          cy="7"
                          r="4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                      </svg>

                    </span>

                  </div>

                  <div className="my-4 h-px bg-[#edf3f4]" />

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-[#9aa9ad]">
                        Appointment Status
                      </p>

                      <p
                        className={`mt-1 text-[11px] font-semibold ${
                          item.available
                            ? 'text-[#16865f]'
                            : 'text-[#7b8c91]'
                        }`}
                      >
                        {item.available
                          ? 'Accepting appointments'
                          : 'Currently unavailable'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        changeAvailable(item._id)
                      }
                      className={`relative flex h-7 w-12 items-center rounded-full p-1 transition-all duration-300 ${
                        item.available
                          ? 'bg-[#18a875]'
                          : 'bg-[#cbd7da]'
                      }`}
                      aria-label={
                        item.available
                          ? `Make ${item.name} unavailable`
                          : `Make ${item.name} available`
                      }
                    >

                      <span
                        className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                          item.available
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        }`}
                      />

                    </button>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      changeAvailable(item._id)
                    }
                    className={`mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border text-[11px] font-bold transition-all duration-300 active:scale-[0.98] ${
                      item.available
                        ? 'border-[#dcefe5] bg-[#f1fbf6] text-[#16865f] hover:border-[#18a875] hover:bg-[#18a875] hover:text-white hover:shadow-[0_8px_20px_rgba(24,168,117,.18)]'
                        : 'border-[#dceff2] bg-[#f6fbfc] text-[#087f91] hover:border-[#087f91] hover:bg-[#087f91] hover:text-white hover:shadow-[0_8px_20px_rgba(8,127,145,.18)]'
                    }`}
                  >

                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        item.available
                          ? 'bg-[#18a875]'
                          : 'bg-[#9aa8ac]'
                      }`}
                    />

                    {item.available
                      ? 'Set Unavailable'
                      : 'Make Available'}

                  </button>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="rounded-[24px] border border-[#dceff2] bg-white px-6 py-16 text-center shadow-[0_8px_28px_rgba(8,43,58,0.04)]">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e8f8fa] text-[#087f91]">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
              >
                <path
                  d="M12 5V19M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

            </div>

            <p className="mt-5 text-sm font-bold text-[#082b3a]">
              No doctors found
            </p>

            <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-[#8a9da3]">
              Doctors will appear here once they are added to the MediAssist platform.
            </p>

          </div>

        )}

      </div>

    </div>
  )
}

export default DoctorsList