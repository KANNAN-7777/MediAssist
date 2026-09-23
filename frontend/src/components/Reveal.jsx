
import React, { useEffect, useRef, useState } from 'react'

const Reveal = ({
  children,
  width = 'w-full',
  delay = 0,
  direction = 'up'
}) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current

    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  const getDirectionStyles = () => {
    if (isVisible) {
      return 'opacity-100 translate-x-0 translate-y-0 scale-100'
    }

    switch (direction) {
      case 'down':
        return 'opacity-0 -translate-y-10 scale-[0.97]'

      case 'left':
        return 'opacity-0 translate-x-10 scale-[0.97]'

      case 'right':
        return 'opacity-0 -translate-x-10 scale-[0.97]'

      case 'zoom':
        return 'opacity-0 scale-90'

      case 'up':
      default:
        return 'opacity-0 translate-y-10 scale-[0.97]'
    }
  }

  return (
    <div
      ref={ref}
      className={`${width} transition-all duration-700 ease-out ${getDirectionStyles()}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  )
}

export default Reveal
