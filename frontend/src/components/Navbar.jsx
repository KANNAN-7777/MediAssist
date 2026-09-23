
import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    token,
    setToken,
    userData
  } = useContext(AppContext)

  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    setShowProfileMenu(false)
    setShowMobileMenu(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = showMobileMenu ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [showMobileMenu])

  const logout = () => {
    setToken('')
    localStorage.removeItem('token')
    setShowProfileMenu(false)
    setShowMobileMenu(false)
    navigate('/login')
  }

  const goTo = (path) => {
    setShowMobileMenu(false)
    setShowProfileMenu(false)
    navigate(path)
    window.scrollTo(0, 0)
  }

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'All Doctors', path: '/doctors' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ]

  return (
    <>
      {/* NAVBAR SPACE */}
      <div className="h-[74px] sm:h-[81px]" />

      {/* FIXED NAVBAR */}
      <header
      className={`
  fixed
  top-2
  sm:top-3
  left-4
  right-4
  sm:left-[10%]
  sm:right-[10%]
  z-50
  rounded-2xl
  border
  border-white/70
  backdrop-blur-xl
  transition-all duration-300

  ${
    isScrolled
      ? 'bg-white/75 opacity-90 shadow-md shadow-[#087f91]/10'
      : 'bg-white/95 opacity-100 shadow-sm'
  }
`}
      >

        <div className="h-[64px] sm:h-[68px] px-4 sm:px-5 lg:px-7 flex items-center justify-between gap-4">

          {/* LOGO */}
          <button
            type="button"
            onClick={() => goTo('/')}
            className="flex items-center flex-shrink-0 focus:outline-none"
          >
           <img
  src="/mediassist-logo.png"
  alt="MediAssist"
  className="
    w-[105px]
    sm:w-[115px]
    lg:w-[125px]
    h-auto
    object-contain
  "
/>
          </button>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center justify-center gap-1 flex-1">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) => `
                  relative
                  px-4
                  py-2
                  rounded-xl
                  text-sm
                  font-semibold
                  transition-all duration-200
                  ${
                    isActive
                      ? 'text-[#087f91] bg-[#e9f9fb]'
                      : 'text-[#536970] hover:text-[#087f91] hover:bg-[#f2fafb]'
                  }
                `}
              >
                {item.name}
              </NavLink>
            ))}

          </nav>

          {/* DESKTOP PROFILE / LOGIN */}
          <div className="hidden lg:flex items-center justify-end flex-shrink-0">

            {token ? (

              <div className="relative">

                <button
                  type="button"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                  className="
                    flex items-center gap-2.5
                    px-2.5 py-1.5
                    rounded-full
                    border border-[#dcecef]
                    bg-white
                    hover:border-[#19b7c8]/50
                    hover:shadow-md
                    transition-all duration-200
                  "
                >

                  <div className="
                    w-9 h-9
                    rounded-full
                    overflow-hidden
                    bg-[#e8f8fa]
                    border border-[#d7eef1]
                    flex items-center justify-center
                  ">
                    {userData?.image ? (
                      <img
                        src={userData.image}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-[#087f91]">
                        {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>

                  <div className="hidden xl:block text-left max-w-[110px]">
                    <p className="text-xs font-bold text-[#082b3a] truncate">
                      {userData?.name || 'My Profile'}
                    </p>

                    <p className="text-[10px] text-[#71858b]">
                      Patient
                    </p>
                  </div>

                  <svg
                    className={`
                      w-4 h-4 text-[#71858b]
                      transition-transform duration-200
                      ${showProfileMenu ? 'rotate-180' : ''}
                    `}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 9l6 6 6-6"
                    />
                  </svg>

                </button>

                {showProfileMenu && (

                  <div className="
                    absolute
                    right-0
                    top-[52px]
                    w-52
                    rounded-2xl
                    border border-[#e1eef0]
                    bg-white
                    shadow-xl
                    shadow-[#082b3a]/10
                    p-2
                    overflow-hidden
                  ">

                    <button
                      type="button"
                      onClick={() => goTo('/profile')}
                      className="
                        w-full
                        flex items-center gap-3
                        px-3 py-2.5
                        rounded-xl
                        text-sm font-medium
                        text-[#40565d]
                        hover:bg-[#eefafb]
                        hover:text-[#087f91]
                        transition
                        text-left
                      "
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#eaf9fa] flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#087f91]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                          />
                        </svg>
                      </span>

                      My Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => goTo('/myappointment')}
                      className="
                        w-full
                        flex items-center gap-3
                        px-3 py-2.5
                        rounded-xl
                        text-sm font-medium
                        text-[#40565d]
                        hover:bg-[#eefafb]
                        hover:text-[#087f91]
                        transition
                        text-left
                      "
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#eaf9fa] flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#087f91]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M8 7V3m8 4V3m-9 8h10M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
                          />
                        </svg>
                      </span>

                      My Appointments
                    </button>

                    <div className="my-1 border-t border-[#edf3f4]" />

                    <button
                      type="button"
                      onClick={logout}
                      className="
                        w-full
                        flex items-center gap-3
                        px-3 py-2.5
                        rounded-xl
                        text-sm font-medium
                        text-[#d95760]
                        hover:bg-[#fff2f3]
                        transition
                        text-left
                      "
                    >
                      <span className="w-8 h-8 rounded-lg bg-[#fff0f1] flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#d95760]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.8"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3-6l3 3m0 0l-3 3m3-3H9"
                          />
                        </svg>
                      </span>

                      Logout
                    </button>

                  </div>

                )}

              </div>

            ) : (

              <button
                type="button"
                onClick={() => goTo('/login')}
                className="
                  px-5
                  py-2.5
                  rounded-full
                  bg-[#087f91]
                  text-white
                  text-sm
                  font-bold
                  shadow-md
                  shadow-[#087f91]/20
                  hover:bg-[#056071]
                  hover:-translate-y-0.5
                  transition-all duration-200
                "
              >
                Create Account
              </button>

            )}

          </div>

          {/* MOBILE RIGHT SIDE */}
          <div className="lg:hidden flex items-center gap-2 flex-shrink-0">

            {token && (
              <button
                type="button"
                onClick={() => goTo('/profile')}
                className="
                  w-10 h-10
                  rounded-full
                  overflow-hidden
                  border border-[#d7eef1]
                  bg-[#e8f8fa]
                  flex items-center justify-center
                  flex-shrink-0
                "
              >
                {userData?.image ? (
                  <img
                    src={userData.image}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm font-bold text-[#087f91]">
                    {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                )}
              </button>
            )}

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={showMobileMenu}
              onClick={() => setShowMobileMenu((prev) => !prev)}
              className="
                w-10 h-10
                rounded-xl
                border border-[#dcecef]
                bg-white
                flex items-center justify-center
                text-[#087f91]
                hover:bg-[#eefafb]
                transition
              "
            >

              {showMobileMenu ? (

                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 6l12 12M18 6L6 18"
                  />
                </svg>

              ) : (

                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

              )}

            </button>

          </div>

        </div>

      </header>

      {/* MOBILE MENU */}
      {showMobileMenu && (

        <div className="lg:hidden fixed inset-0 z-40">

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setShowMobileMenu(false)}
            className="absolute inset-0 bg-[#06202d]/35 backdrop-blur-[2px]"
          />

          <div className="
            absolute
            top-[76px]
            left-3
            right-3
            rounded-2xl
            border border-[#dcecef]
            bg-white
            shadow-2xl
            shadow-[#06202d]/15
            p-3
            overflow-hidden
          ">

            {token && (

              <div className="
                flex items-center gap-3
                px-3 py-3
                mb-2
                rounded-xl
                bg-[#f1fafb]
                border border-[#e2f1f3]
              ">

                <div className="
                  w-11 h-11
                  rounded-full
                  overflow-hidden
                  bg-white
                  border border-[#d7eef1]
                  flex items-center justify-center
                  flex-shrink-0
                ">
                  {userData?.image ? (
                    <img
                      src={userData.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-bold text-[#087f91]">
                      {userData?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#082b3a] truncate">
                    {userData?.name || 'Patient'}
                  </p>

                  <p className="text-[11px] text-[#71858b]">
                    MediAssist Patient
                  </p>
                </div>

              </div>

            )}

            <nav className="space-y-1">

              {navItems.map((item) => (

                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setShowMobileMenu(false)
                    window.scrollTo(0, 0)
                  }}
                  className={({ isActive }) => `
                    flex items-center
                    w-full
                    px-4 py-3
                    rounded-xl
                    text-sm
                    font-semibold
                    transition
                    ${
                      isActive
                        ? 'bg-[#e9f9fb] text-[#087f91]'
                        : 'text-[#40565d] hover:bg-[#f3fafb] hover:text-[#087f91]'
                    }
                  `}
                >
                  {item.name}
                </NavLink>

              ))}

            </nav>

            {token ? (

              <div className="mt-2 pt-2 border-t border-[#edf3f4] space-y-1">

                <button
                  type="button"
                  onClick={() => goTo('/profile')}
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    text-left
                    text-sm
                    font-semibold
                    text-[#40565d]
                    hover:bg-[#f3fafb]
                    hover:text-[#087f91]
                    transition
                  "
                >
                  My Profile
                </button>

                <button
                  type="button"
                  onClick={() => goTo('/myappointment')}
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    text-left
                    text-sm
                    font-semibold
                    text-[#40565d]
                    hover:bg-[#f3fafb]
                    hover:text-[#087f91]
                    transition
                  "
                >
                  My Appointments
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="
                    w-full
                    px-4 py-3
                    rounded-xl
                    text-left
                    text-sm
                    font-semibold
                    text-[#d95760]
                    hover:bg-[#fff2f3]
                    transition
                  "
                >
                  Logout
                </button>

              </div>

            ) : (

              <button
                type="button"
                onClick={() => goTo('/login')}
                className="
                  mt-2
                  w-full
                  py-3
                  rounded-xl
                  bg-[#087f91]
                  text-white
                  text-sm
                  font-bold
                  hover:bg-[#056071]
                  transition
                "
              >
                Create Account
              </button>

            )}

          </div>

        </div>

      )}

    </>
  )
}

export default Navbar
