import React, { useEffect, useRef, useState } from 'react'

const DoctorCard = ({
  doctor,
  currencySymbol = '$',
  onClick
}) => {
  const cardRef = useRef(null)

  const [transformStyle, setTransformStyle] = useState(
    'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
  )

  const [isHovered, setIsHovered] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const isAvailable = doctor?.available !== false

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    )

    const updateMotionPreference = () => {
      const reduced = mediaQuery.matches

      setPrefersReducedMotion(reduced)

      if (reduced) {
        setIsHovered(false)
        setTransformStyle(
          'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
        )
      }
    }

    updateMotionPreference()

    mediaQuery.addEventListener('change', updateMotionPreference)

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
    }
  }, [])

  const handleMouseMove = (event) => {
    if (
      prefersReducedMotion ||
      !cardRef.current ||
      window.innerWidth < 768 ||
      !isHovered
    ) {
      return
    }

    const rect = cardRef.current.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -3
    const rotateY = ((x - centerX) / centerX) * 3

    setTransformStyle(
      `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale(1.025)`
    )
  }

  const handleMouseEnter = () => {
    if (
      prefersReducedMotion ||
      window.innerWidth < 768
    ) {
      return
    }

    setIsHovered(true)

    setTransformStyle(
      'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(-8px) scale(1.025)'
    )
  }

  const handleMouseLeave = () => {
    setIsHovered(false)

    setTransformStyle(
      'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)'
    )
  }

  const handleClick = () => {
    if (!isAvailable) return

    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        transform: transformStyle,
        transformStyle: 'preserve-3d',
        transition: prefersReducedMotion
          ? 'none'
          : isHovered
            ? 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.8s ease'
            : 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.9s ease'
      }}
      className={`group relative overflow-hidden rounded-[22px] border ${
        isAvailable
          ? 'cursor-pointer border-[#dceff2] hover:border-[#19b7c8]/50 hover:shadow-[0_25px_55px_rgba(8,127,145,0.18)]'
          : 'cursor-not-allowed border-[#e4edef] opacity-80'
      } bg-white shadow-sm`}
    >

      {/* Outer Glow */}
      {isAvailable && (
        <div
          className={`
            absolute
            -inset-1
            rounded-[25px]
            bg-gradient-to-r
            from-[#19b7c8]/20
            via-[#087f91]/10
            to-[#19b7c8]/20
            blur-2xl
            pointer-events-none
            ${
              prefersReducedMotion
                ? 'opacity-0'
                : 'opacity-0 group-hover:opacity-100 transition-opacity duration-[1200ms]'
            }
          `}
        />
      )}

      {/* Main Card */}
      <div
        className="
          relative
          flex
          h-full
          flex-col
          overflow-hidden
          rounded-[21px]
          bg-white
        "
        style={{
          transform: 'translateZ(0)'
        }}
      >

        {/* Doctor Image */}
        <div className="relative h-60 sm:h-64 overflow-hidden bg-[#eef9fa]">

          <img
            src={doctor?.image}
            alt={doctor?.name || 'Doctor'}
            className={`
              w-full
              h-full
              object-cover
              object-top
              ${
                prefersReducedMotion
                  ? ''
                  : 'transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]'
              }
            `}
          />

          {/* Image Overlay */}
          <div
            className={`
              absolute
              inset-0
              bg-gradient-to-t
              from-[#06202d]/45
              via-transparent
              to-transparent
              pointer-events-none
              ${
                prefersReducedMotion
                  ? 'opacity-80'
                  : 'opacity-80 transition-opacity duration-[1000ms] group-hover:opacity-100'
              }
            `}
          />

          {/* Availability */}
          <div className="absolute top-3 left-3 z-10">

            <span
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                px-2.5
                py-1.5
                text-[10px]
                font-bold
                backdrop-blur-md
                ${
                  prefersReducedMotion
                    ? ''
                    : 'transition-all duration-[800ms]'
                }
                ${
                  isAvailable
                    ? 'border-white/80 bg-white/90 text-[#18a875]'
                    : 'border-white/80 bg-white/90 text-[#e65d67]'
                }
              `}
            >

              <span className="relative flex h-1.5 w-1.5">

                {isAvailable && !prefersReducedMotion && (
                  <span className="absolute inset-0 rounded-full bg-[#18a875]/50 animate-ping" />
                )}

                <span
                  className={`
                    relative
                    h-1.5
                    w-1.5
                    rounded-full
                    ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-transform duration-[800ms] group-hover:scale-150'
                    }
                    ${
                      isAvailable
                        ? 'bg-[#18a875]'
                        : 'bg-[#e65d67]'
                    }
                  `}
                />

              </span>

              {isAvailable ? 'Available' : 'Unavailable'}

            </span>

          </div>

          {/* Experience */}
          {doctor?.experience && (
            <div className="absolute top-3 right-3 z-10">

              <span
                className={`
                  rounded-full
                  border
                  border-white/20
                  bg-[#06202d]/75
                  px-2.5
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-white
                  backdrop-blur-md
                  ${
                    prefersReducedMotion
                      ? ''
                      : 'transition-all duration-[900ms] group-hover:bg-[#06202d]/90'
                  }
                `}
              >
                {doctor.experience} Exp
              </span>

            </div>
          )}

          {/* Hover Booking Indicator */}
          {isAvailable && (
            <div
              className={`
                absolute
                bottom-3
                right-3
                w-10
                h-10
                rounded-full
                bg-white/90
                backdrop-blur-md
                text-[#087f91]
                flex
                items-center
                justify-center
                shadow-lg
                ${
                  prefersReducedMotion
                    ? 'opacity-0'
                    : `
                      opacity-0
                      scale-75
                      translate-y-3
                      group-hover:opacity-100
                      group-hover:scale-100
                      group-hover:translate-y-0
                      transition-all
                      duration-[900ms]
                      ease-out
                    `
                }
              `}
            >

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

        {/* Details */}
        <div className="flex flex-1 flex-col justify-between p-4">

          <div>

            <div className="flex items-start justify-between gap-2">

              <div className="min-w-0">

                <p
                  className={`
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#087f91]
                    truncate
                    ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-all duration-[800ms] group-hover:tracking-[0.11em]'
                    }
                  `}
                >
                  {doctor?.speciality || 'Healthcare Specialist'}
                </p>

                <h3
                  className={`
                    mt-1
                    text-base
                    font-bold
                    text-[#082b3a]
                    truncate
                    ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-colors duration-[800ms] group-hover:text-[#087f91]'
                    }
                  `}
                >
                  {doctor?.name || 'Doctor'}
                </h3>

              </div>

              {doctor?.degree && (
                <span
                  className={`
                    flex-shrink-0
                    rounded-lg
                    bg-[#f2f8f9]
                    px-2
                    py-1
                    text-[9px]
                    font-semibold
                    text-[#6c8188]
                    ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-all duration-[800ms] group-hover:bg-[#e8f8fa] group-hover:text-[#087f91]'
                    }
                  `}
                >
                  {doctor.degree}
                </span>
              )}

            </div>

          </div>

          {/* Bottom Information */}
          <div
            className="
              mt-4
              border-t
              border-[#edf3f4]
              pt-3
              flex
              items-center
              justify-between
              gap-3
            "
          >

            {doctor?.fees !== undefined ? (

              <div>

                <span className="block text-[9px] text-[#7c9096]">
                  Consultation
                </span>

                <span
                  className={`
                    text-sm
                    font-bold
                    text-[#082b3a]
                    ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-colors duration-[800ms] group-hover:text-[#087f91]'
                    }
                  `}
                >
                  {currencySymbol}{doctor.fees}
                </span>

              </div>

            ) : (

              <div>

                <span className="block text-[9px] text-[#7c9096]">
                  Specialist
                </span>

                <span className="text-xs font-semibold text-[#082b3a]">
                  Verified Care
                </span>

              </div>

            )}

            {/* Book Button */}
            <button
              type="button"
              disabled={!isAvailable}
              onClick={(event) => {
                event.stopPropagation()
                handleClick()
              }}
              className={`
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                px-3.5
                py-2
                text-[10px]
                font-bold
                ${
                  prefersReducedMotion
                    ? ''
                    : 'transition-all duration-[800ms]'
                }
                ${
                  isAvailable
                    ? 'bg-[#e8f8fa] text-[#087f91] hover:bg-[#087f91] hover:text-white'
                    : 'cursor-not-allowed bg-[#f1f3f4] text-[#9aa8ac]'
                }
              `}
            >

              {isAvailable ? 'Book Slot' : 'Unavailable'}

              {isAvailable && (
                <svg
                  className={`
                    h-3.5
                    w-3.5
                    ${
                      prefersReducedMotion
                        ? ''
                        : 'transition-transform duration-[800ms] group-hover:translate-x-1'
                    }
                  `}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}

export default DoctorCard