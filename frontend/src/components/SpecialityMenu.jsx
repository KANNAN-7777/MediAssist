import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <section
      id="speciality"
      className="py-12 sm:py-14"
    >

      {/* Section heading */}
      <div className="text-center max-w-2xl mx-auto px-2">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] text-[#087f91] text-[11px] sm:text-xs font-semibold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
          Medical Specialities
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-[#082b3a] tracking-tight">
          Find the right specialist
        </h2>

        <p className="mt-2.5 text-[13px] sm:text-sm text-[#6c8188] leading-6">
          Explore our medical specialities and connect with trusted doctors
          for the care you need.
        </p>

      </div>

      {/* Speciality list */}
      <div className="mt-8 sm:mt-9">

        <div className="flex gap-3.5 sm:gap-5 overflow-x-auto pb-4 px-1 sm:px-2 sm:justify-center scrollbar-hide">

          {specialityData.map((item, index) => (

            <Link
              key={index}
              to={`/doctors/${item.speciality}`}
              onClick={() => window.scrollTo(0, 0)}
              className="group flex-shrink-0 w-[105px] sm:w-[120px] flex flex-col items-center"
            >

              {/* Icon card */}
              <div className="relative w-[84px] h-[84px] sm:w-[96px] sm:h-[96px] rounded-2xl bg-white border border-[#dceff2] shadow-[0_5px_18px_rgba(8,43,58,0.05)] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#19b7c8]/40 group-hover:shadow-[0_14px_30px_rgba(8,127,145,0.12)]">

                {/* Inner surface */}
                <div className="absolute inset-2.5 rounded-xl bg-[#f2fbfc] transition-all duration-300 group-hover:bg-[#e5f8fa] group-hover:scale-[1.03]" />

                {/* Soft highlight */}
                <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-[#19b7c8]/5 blur-xl group-hover:bg-[#19b7c8]/10 transition-colors duration-300" />

                <img
                  src={item.image}
                  alt={item.speciality}
                  className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-110"
                />

              </div>

              {/* Name */}
              <p className="mt-3 text-[11px] sm:text-xs font-semibold text-[#082b3a] text-center leading-5 group-hover:text-[#087f91] transition-colors duration-200">
                {item.speciality}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </section>
  )
}

export default SpecialityMenu