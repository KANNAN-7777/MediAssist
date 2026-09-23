import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({ role }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const isDoctor = role === 'Doctor'

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (loading) return

    setLoading(true)

    try {
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

          toast.success('Admin login successful')

          navigate('/admin-dashboard', {
            replace: true
          })
        } else {
          toast.error(data.message)
        }
      } else {
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

          toast.success('Doctor login successful')

          navigate('/doctor-dashboard', {
            replace: true
          })
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log('Login Error:', error)

      toast.error(
        error.response?.data?.message ||
        'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  const goToRoleSelection = () => {
    navigate('/', {
      replace: true
    })
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f3fbfd] text-[#082b3a]">

      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#19b7c8]/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[#087f91]/10 blur-3xl" />

      <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-[#19b7c8]/40" />
      <div className="absolute right-[13%] top-[27%] h-1.5 w-1.5 rounded-full bg-[#087f91]/40" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 py-8 sm:px-6">

        <div className="grid w-full overflow-hidden rounded-[28px] border border-white/80 bg-white/80 shadow-[0_30px_90px_rgba(8,43,58,0.12)] backdrop-blur-xl lg:grid-cols-[0.82fr_1.18fr]">

          <div className="relative hidden overflow-hidden bg-[#062f3d] p-8 text-white lg:flex lg:flex-col lg:justify-between xl:p-10">

            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#19b7c8]/20 blur-3xl" />
            <div className="absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-[#087f91]/25 blur-3xl" />

            <div className="relative">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <span className="text-xl font-black text-[#66d9e3]">
                    M
                  </span>
                </div>

                <div>
                  <img
                    src="/mediassist-logo.png"
                    alt="MediAssist"
                    className="w-[135px] brightness-0 invert"
                  />

                  <p className="mt-1 text-[8px] font-bold tracking-[0.18em] text-white/50">
                    SMART HEALTHCARE
                  </p>
                </div>

              </div>

              <div className="mt-20 max-w-sm">

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[9px] font-bold tracking-[0.16em] text-[#9deaf0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#18a875]" />
                  {isDoctor ? 'CLINICAL ACCESS' : 'MANAGEMENT ACCESS'}
                </span>

                <h1 className="mt-5 text-3xl font-black leading-tight xl:text-4xl">
                  Your healthcare
                  <span className="block text-[#5fd7e1]">
                    workspace awaits.
                  </span>
                </h1>

                <p className="mt-5 text-sm leading-6 text-white/60">
                  Securely access the MediAssist platform to manage healthcare operations and deliver connected care.
                </p>

              </div>

            </div>

            <div className="relative">

              <div className="grid grid-cols-3 gap-2">

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-lg font-black text-white">
                    24/7
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/40">
                    Access
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-lg font-black text-white">
                    100%
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/40">
                    Secure
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                  <p className="text-lg font-black text-white">
                    Smart
                  </p>
                  <p className="mt-1 text-[8px] font-bold uppercase tracking-wider text-white/40">
                    Care
                  </p>
                </div>

              </div>

            </div>

          </div>

          <div className="p-5 sm:p-8 lg:p-10">

            <div className="mb-7 flex items-center justify-between">

              <div className="flex items-center gap-2">

                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#19b7c8]/40" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-[#19b7c8]" />
                </span>

                <span className="text-[9px] font-bold tracking-[0.15em] text-[#71878e]">
                  SECURE PORTAL
                </span>

              </div>

              <span className="rounded-full bg-[#eaf9fa] px-3 py-1.5 text-[9px] font-bold text-[#087f91]">
                {role}
              </span>

            </div>

            <div className="mb-7">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f8fa] text-[#087f91] shadow-sm">

                {isDoctor ? (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <circle cx="12" cy="8" r="3.2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.5 20a6.5 6.5 0 0113 0"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 4v4M17 6h4"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 20V9l8-5 8 5v11"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 20v-6h8v6"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7v4M10 9h4"
                    />
                  </svg>
                )}

              </div>

              <h2 className="text-2xl font-black tracking-tight text-[#082b3a]">
                Welcome back
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#71878e]">
                Sign in to your MediAssist {role.toLowerCase()} workspace.
              </p>

            </div>

            <form
              onSubmit={onSubmitHandler}
              className="space-y-4"
            >

              <div>

                <label
                  htmlFor="login-email"
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-[#526b73]"
                >
                  Email address
                </label>

                <div className="group flex h-11 items-center rounded-xl border border-[#dcecef] bg-[#f8fcfd] px-3 transition-all duration-300 focus-within:border-[#19b7c8] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(25,183,200,0.08)]">

                  <svg
                    className="mr-2.5 h-4 w-4 shrink-0 text-[#8ba0a6] transition-colors group-focus-within:text-[#087f91]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="14"
                      rx="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 7l9 6 9-6"
                    />
                  </svg>

                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="h-full w-full bg-transparent text-xs font-medium text-[#082b3a] outline-none placeholder:text-[#a2b1b5]"
                  />

                </div>

              </div>

              <div>

                <div className="mb-1.5 flex items-center justify-between">

                  <label
                    htmlFor="login-password"
                    className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#526b73]"
                  >
                    Password
                  </label>

                </div>

                <div className="group flex h-11 items-center rounded-xl border border-[#dcecef] bg-[#f8fcfd] px-3 transition-all duration-300 focus-within:border-[#19b7c8] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(25,183,200,0.08)]">

                  <svg
                    className="mr-2.5 h-4 w-4 shrink-0 text-[#8ba0a6] transition-colors group-focus-within:text-[#087f91]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >
                    <rect
                      x="5"
                      y="10"
                      width="14"
                      height="10"
                      rx="2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10V7a4 4 0 018 0v3"
                    />
                  </svg>

                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="h-full w-full bg-transparent text-xs font-medium text-[#082b3a] outline-none placeholder:text-[#a2b1b5]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#7f969d] transition-colors hover:bg-[#eaf9fa] hover:text-[#087f91]"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3l18 18"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.6 10.6a2 2 0 002.8 2.8"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.5 9.5 7a14 14 0 01-3.1 4.5"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.2 6.2A14 14 0 003 12c1 2.5 4.5 7 9 7 1.1 0 2.2-.2 3.1-.6"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 12s3.5-7 9-7 9 7 9 7-3.5 7-9 7-9-7-9-7z"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="2.5"
                        />
                      </svg>
                    )}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className={`group mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold text-white transition-all duration-300 ${
                  loading
                    ? 'cursor-not-allowed bg-[#6aaeb6]'
                    : 'bg-[#087f91] shadow-[0_10px_25px_rgba(8,127,145,0.18)] hover:-translate-y-0.5 hover:bg-[#056071] hover:shadow-[0_14px_30px_rgba(8,127,145,0.24)]'
                }`}
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Continue as {role}

                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}
              </button>

            </form>

            <button
              type="button"
              onClick={goToRoleSelection}
              className="mx-auto mt-5 flex items-center gap-1.5 text-[10px] font-bold text-[#71878e] transition-colors hover:text-[#087f91]"
            >
              <span className="transition-transform duration-300 hover:-translate-x-1">
                ←
              </span>
              Back to login selection
            </button>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#e4eff1] bg-[#f7fbfc] px-3.5 py-3">

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <svg
                  className="h-3.5 w-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-3.4 7-9V5l-7-2-7 2v7c0 5.6 7 9 7 9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.5 12l1.7 1.7 3.5-3.5"
                  />
                </svg>
              </div>

              <div>
                <p className="text-[10px] font-bold text-[#082b3a]">
                  Secure access
                </p>

                <p className="mt-0.5 text-[9px] text-[#82959b]">
                  Your healthcare workspace is protected.
                </p>
              </div>

              <span className="ml-auto hidden text-[9px] font-bold text-[#18a875] sm:block">
                Protected
              </span>

            </div>

            <p className="mt-6 text-center text-[9px] text-[#9aa9ad]">
              © {new Date().getFullYear()} MediAssist · Secure Healthcare Platform
            </p>

          </div>

        </div>

      </main>
    </div>
  )
}

export default Login