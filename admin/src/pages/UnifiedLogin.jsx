import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const USER_APP_URL =
  import.meta.env.VITE_USER_APP_URL || 'http://localhost:5173'

const roles = [
  {
    id: 'Admin',
    title: 'Admin',
    description: 'Manage doctors, appointments and platform operations',
    short: 'A'
  },
  {
    id: 'Doctor',
    title: 'Doctor',
    description: 'Manage appointments and patient consultations',
    short: 'D'
  },
  {
    id: 'User',
    title: 'Patient',
    description: 'Book appointments and manage your healthcare',
    short: 'P'
  }
]

const UnifiedLogin = () => {
  const navigate = useNavigate()

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const [role, setRole] = useState('Admin')
  const [mode, setMode] = useState('Login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setName('')
    setEmail('')
    setPassword('')
    setMode('Login')
  }, [role])

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole)
  }

  const handleSubmit = async (event) => {
  event.preventDefault()

  if (loading) return

  if (!email.trim() || !password.trim()) {
    toast.error('Please enter email and password', {
      autoClose: 3000
    })
    return
  }

  if (role === 'User' && mode === 'Sign Up' && !name.trim()) {
    toast.error('Please enter your name', {
      autoClose: 3000
    })
    return
  }

  try {
    setLoading(true)

    if (role === 'Admin') {
      const { data } = await axios.post(
        backendUrl + '/api/admin/login',
        {
          email,
          password
        }
      )

      if (data.success) {
        localStorage.removeItem('dToken')
        setDToken('')

        localStorage.setItem('aToken', data.token)
        setAToken(data.token)

        toast.success('Admin login successful', {
          autoClose: 3000
        })

        setTimeout(() => {
          navigate('/admin-dashboard', {
            replace: true
          })
        }, 1200)
      } else {
        toast.error(data.message, {
          autoClose: 3000
        })
      }
    }

    if (role === 'Doctor') {
      const { data } = await axios.post(
        backendUrl + '/api/doctor/login',
        {
          email,
          password
        }
      )

      if (data.success) {
        localStorage.removeItem('aToken')
        setAToken('')

        localStorage.setItem('dToken', data.token)
        setDToken(data.token)

        toast.success('Doctor login successful', {
          autoClose: 3000
        })

        setTimeout(() => {
          navigate('/doctor-dashboard', {
            replace: true
          })
        }, 1200)
      } else {
        toast.error(data.message, {
          autoClose: 3000
        })
      }
    }

    if (role === 'User') {
      if (mode === 'Sign Up') {
        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          {
            name,
            email,
            password
          }
        )

        if (data.success) {
          toast.success(
            data.message || 'Account created successfully',
            {
              autoClose: 3000
            }
          )

          setTimeout(() => {
            window.location.href =
              `${USER_APP_URL}/login?token=${encodeURIComponent(data.token)}`
          }, 1200)
        } else {
          toast.error(data.message, {
            autoClose: 3000
          })
        }
      } else {
        const { data } = await axios.post(
          backendUrl + '/api/user/login',
          {
            email,
            password
          }
        )

        if (data.success) {
          toast.success(
            data.message || 'Login successful',
            {
              autoClose: 3000
            }
          )

          setTimeout(() => {
            window.location.href =
              `${USER_APP_URL}/login?token=${encodeURIComponent(data.token)}`
          }, 1200)
        } else {
          toast.error(data.message, {
            autoClose: 3000
          })
        }
      }
    }
  } catch (error) {
    console.log('Login Error:', error)

    toast.error(
      error.response?.data?.message ||
      'Something went wrong',
      {
        autoClose: 3000
      }
    )
  } finally {
    setLoading(false)
  }
}
  const selectedRole = roles.find(
    (item) => item.id === role
  )

  return (
    <>
      <style>{`
        @keyframes maFadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes maFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes maPulse {
          0%, 100% {
            opacity: .35;
            transform: scale(1);
          }
          50% {
            opacity: .7;
            transform: scale(1.08);
          }
        }

        @keyframes maSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .ma-fade-up {
          animation: maFadeUp .7s cubic-bezier(.22,1,.36,1) both;
        }

        .ma-float {
          animation: maFloat 5s ease-in-out infinite;
        }

        .ma-pulse {
          animation: maPulse 4s ease-in-out infinite;
        }

        .ma-spin {
          animation: maSpin .8s linear infinite;
        }
      `}</style>

      <div className="relative min-h-screen overflow-hidden bg-[#f3fbfd] px-4 py-6 sm:px-6 lg:px-10">

        <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#19b7c8]/10 blur-3xl ma-pulse" />

        <div
          className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#087f91]/10 blur-3xl ma-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl items-center justify-center">

          <div className="ma-fade-up grid w-full overflow-hidden rounded-[30px] border border-[#dceff2] bg-white shadow-[0_30px_90px_rgba(8,127,145,0.13)] lg:grid-cols-[.85fr_1.15fr]">

            <div className="relative hidden overflow-hidden bg-[#06202d] p-10 lg:flex lg:min-h-[650px] lg:flex-col lg:justify-between">

              <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#19b7c8]/20 blur-3xl" />

              <div className="absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-[#087f91]/25 blur-3xl" />

              <div className="absolute right-16 top-36 h-20 w-20 rounded-full border border-[#19b7c8]/20 ma-float" />

              <div className="relative z-10">

                <img
                  src="/mediassist-logo.png"
                  alt="MediAssist"
                  className="w-52 object-contain"
                />

                <div className="mt-20 max-w-md">

                  <div className="inline-flex items-center gap-2 rounded-full border border-[#19b7c8]/20 bg-[#19b7c8]/10 px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />
                    <span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#19b7c8]">
                      Smart Healthcare
                    </span>
                  </div>

                  <h1 className="mt-5 text-4xl font-bold leading-tight text-white">
                    Healthcare,
                    <br />
                    connected
                    <br />
                    intelligently.
                  </h1>

                  <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
                    One secure gateway for administrators,
                    doctors and patients across the MediAssist
                    healthcare platform.
                  </p>

                </div>
              </div>

              <div className="relative z-10 grid grid-cols-3 gap-3">

                {[
                  ['01', 'Admin'],
                  ['02', 'Doctor'],
                  ['03', 'Patient']
                ].map(([number, label]) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-white/10 bg-white/[.05] p-3 backdrop-blur-xl"
                  >
                    <p className="text-[9px] font-bold tracking-widest text-[#19b7c8]">
                      {number}
                    </p>

                    <p className="mt-1 text-xs font-semibold text-white/80">
                      {label}
                    </p>
                  </div>
                ))}

              </div>
            </div>

            <div className="p-5 sm:p-8 lg:p-10">

              <div className="lg:hidden">
                <img
                  src="/mediassist-logo.png"
                  alt="MediAssist"
                  className="w-44 object-contain"
                />
              </div>

              <div className="mt-6 lg:mt-0">

                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#087f91]">
                  MediAssist Portal
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#082b3a] sm:text-3xl">
                  Welcome back
                </h2>

                <p className="mt-2 text-sm text-[#71858b]">
                  Choose your role and continue securely.
                </p>

              </div>

              <div className="mt-7 grid grid-cols-3 gap-2 rounded-2xl bg-[#f3f9fa] p-1.5">

                {roles.map((item) => {
                  const active = role === item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleRoleChange(item.id)}
                      className={`group rounded-xl px-2 py-3 transition-all duration-300 ${
                        active
                          ? 'bg-white shadow-[0_7px_22px_rgba(8,127,145,.12)]'
                          : 'hover:bg-white/60'
                      }`}
                    >

                      <span
                        className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300 ${
                          active
                            ? 'bg-[#087f91] text-white shadow-[0_7px_18px_rgba(8,127,145,.25)]'
                            : 'bg-[#e8f5f7] text-[#087f91] group-hover:scale-105'
                        }`}
                      >
                        {item.short}
                      </span>

                      <span
                        className={`mt-2 block text-[11px] font-bold ${
                          active
                            ? 'text-[#087f91]'
                            : 'text-[#71858b]'
                        }`}
                      >
                        {item.title}
                      </span>

                    </button>
                  )
                })}

              </div>

              <div className="mt-5 rounded-2xl border border-[#dceff2] bg-[#f8fcfd] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f8fa] text-sm font-bold text-[#087f91]">
                    {selectedRole?.short}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-[#082b3a]">
                      {selectedRole?.title} Portal
                    </p>

                    <p className="mt-0.5 text-[10px] leading-5 text-[#7b9096]">
                      {selectedRole?.description}
                    </p>
                  </div>

                </div>

              </div>

              {role === 'User' && (
                <div className="mt-5 flex rounded-xl bg-[#f3f9fa] p-1">

                  <button
                    type="button"
                    onClick={() => setMode('Login')}
                    className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
                      mode === 'Login'
                        ? 'bg-white text-[#087f91] shadow-sm'
                        : 'text-[#71858b]'
                    }`}
                  >
                    Login
                  </button>

                  <button
                    type="button"
                    onClick={() => setMode('Sign Up')}
                    className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${
                      mode === 'Sign Up'
                        ? 'bg-white text-[#087f91] shadow-sm'
                        : 'text-[#71858b]'
                    }`}
                  >
                    Sign Up
                  </button>

                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
              >

                {role === 'User' && mode === 'Sign Up' && (
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-[#31515b]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Enter your name"
                      className="h-12 w-full rounded-xl border border-[#d9e9ec] bg-white px-4 text-sm text-[#082b3a] outline-none transition-all placeholder:text-[#a0afb3] focus:border-[#19b7c8] focus:ring-4 focus:ring-[#19b7c8]/10"
                    />
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#31515b]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-[#d9e9ec] bg-white px-4 text-sm text-[#082b3a] outline-none transition-all placeholder:text-[#a0afb3] focus:border-[#19b7c8] focus:ring-4 focus:ring-[#19b7c8]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-bold text-[#31515b]">
                    Password
                  </label>

                  <div className="relative">

                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      autoComplete={
                        mode === 'Sign Up'
                          ? 'new-password'
                          : 'current-password'
                      }
                      className="h-12 w-full rounded-xl border border-[#d9e9ec] bg-white px-4 pr-16 text-sm text-[#082b3a] outline-none transition-all placeholder:text-[#a0afb3] focus:border-[#19b7c8] focus:ring-4 focus:ring-[#19b7c8]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((value) => !value)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-[10px] font-bold text-[#087f91] transition-colors hover:bg-[#e8f8fa]"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>

                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#087f91] text-sm font-bold text-white shadow-[0_12px_28px_rgba(8,127,145,.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#056071] hover:shadow-[0_16px_32px_rgba(8,127,145,.28)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="ma-spin h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {mode === 'Sign Up' && role === 'User'
                        ? 'Create Account'
                        : `Login as ${role}`}

                      <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </>
                  )}

                </button>

              </form>

              <div className="mt-6 flex items-center justify-center gap-2">

                <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />

                <span className="text-[10px] font-medium text-[#829399]">
                  Secure MediAssist authentication
                </span>

              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default UnifiedLogin