import { useState, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext)

  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (loading) return

    try {
      setLoading(true)

      if (state === 'Sign Up') {
        const { data } = await axios.post(
          backendUrl + '/api/user/register',
          {
            name,
            email,
            password
          }
        )

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message)
        } else {
          toast.error(data.message)
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
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success(data.message)
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  const switchState = (nextState) => {
    setState(nextState)
    setPassword('')
    setShowPassword(false)
  }

  return (
    <main className="relative min-h-[calc(100vh-68px)] flex items-center justify-center px-3 sm:px-5 py-6 sm:py-8 overflow-hidden">

      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[#19b7c8]/10 blur-3xl pointer-events-none" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#087f91]/10 blur-3xl pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 w-52 h-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#19b7c8]/[0.035] blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-[980px] grid lg:grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-[28px] bg-white/90 backdrop-blur-2xl border border-[#dceff2] shadow-[0_24px_70px_rgba(8,43,58,0.12)]">

        {/* LEFT PANEL */}

        <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-[#062b3a] via-[#056071] to-[#087f91] p-9 xl:p-11 flex-col justify-between min-h-[560px]">

          <div className="absolute -top-32 -right-28 w-96 h-96 rounded-full bg-[#19b7c8]/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-[#19b7c8]/10 blur-3xl" />

          <div className="absolute right-10 top-[27%] w-32 h-32 rounded-full border border-white/10" />

          <div className="absolute right-[72px] top-[31%] w-16 h-16 rounded-full border border-white/10" />

          <div className="absolute right-[102px] top-[35%] w-2 h-2 rounded-full bg-[#8ff3dc]/60" />

          <div className="relative z-10">

            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">

              <img
                src="/mediassist-logo.png"
                alt="MediAssist"
                className="w-[138px] h-auto object-contain brightness-0 invert"
              />

            </div>

            <div className="mt-14 xl:mt-16">

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/75 text-[10px] font-semibold tracking-wide">

                <span className="relative flex w-1.5 h-1.5">
                  <span className="absolute inset-0 rounded-full bg-[#8ff3dc] animate-ping opacity-50" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-[#8ff3dc]" />
                </span>

                SMART HEALTHCARE

              </div>

              <h1 className="mt-5 text-4xl xl:text-[45px] leading-[1.08] font-bold tracking-tight text-white">

                Healthcare

                <br />

                <span className="text-[#a5f1f3]">
                  made simpler.
                </span>

              </h1>

              <p className="mt-5 max-w-sm text-sm text-white/65 leading-7">
                Connect with trusted doctors, book appointments,
                and manage your healthcare journey from one
                secure platform.
              </p>

              <div className="mt-6 flex items-center gap-5">

                <div className="flex -space-x-2">

                  <div className="w-8 h-8 rounded-full bg-white/15 border-2 border-[#056071]" />
                  <div className="w-8 h-8 rounded-full bg-[#19b7c8]/30 border-2 border-[#056071]" />
                  <div className="w-8 h-8 rounded-full bg-white/10 border-2 border-[#056071]" />

                </div>

                <div>

                  <p className="text-xs font-semibold text-white">
                    Trusted healthcare access
                  </p>

                  <p className="text-[10px] text-white/45 mt-0.5">
                    Simple. Connected. Secure.
                  </p>

                </div>

              </div>

            </div>

          </div>

          <div className="relative z-10 flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.08] border border-white/10 backdrop-blur-md">

            <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center">

              <svg
                className="w-5 h-5 text-[#a5f1f3]"
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

            </div>

            <div>

              <p className="text-xs font-semibold text-white">
                Secure healthcare access
              </p>

              <p className="mt-0.5 text-[10px] text-white/50">
                Your healthcare journey, all in one place
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT PANEL */}

        <div className="p-5 sm:p-7 lg:p-9 xl:p-10 flex flex-col justify-center">

          {/* Mobile logo */}

          <div className="lg:hidden flex justify-center mb-5">

            <div className="inline-flex items-center px-3.5 py-2 rounded-xl bg-[#f5fcfd] border border-[#dceff2]">

              <img
                src="/mediassist-logo.png"
                alt="MediAssist"
                className="w-[138px] h-auto object-contain"
              />

            </div>

          </div>


          {/* HEADING */}

          <div className="mb-5">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-[10px] sm:text-[11px] font-semibold tracking-wide">

              <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />

              {state === 'Sign Up'
                ? 'NEW TO MEDIASSIST'
                : 'WELCOME BACK'}

            </div>

            <h2 className="mt-3 text-2xl sm:text-[29px] font-bold tracking-tight text-[#082b3a]">

              {state === 'Sign Up'
                ? 'Create your account'
                : 'Welcome back'}

            </h2>

            <p className="mt-1.5 text-[13px] sm:text-sm text-[#6c8188] leading-6">

              {state === 'Sign Up'
                ? 'Create an account to book and manage your appointments.'
                : 'Log in to continue managing your healthcare.'}

            </p>

          </div>


          {/* FORM */}

          <form
            onSubmit={onSubmitHandler}
            className="space-y-3"
          >

            {/* FULL NAME */}

            {state === 'Sign Up' && (

              <div>

                <label className="block mb-1 text-[10px] font-bold uppercase tracking-wide text-[#60777e]">
                  Full Name
                </label>

                <div className="relative">

                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91a5aa] pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20 21a8 8 0 00-16 0"
                    />

                    <circle
                      cx="12"
                      cy="7"
                      r="4"
                    />
                  </svg>

                  <input
                    className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#d9e7e9] bg-[#f9fcfc] text-[13px] text-[#082b3a] placeholder:text-[#a6b5b9] outline-none transition-all duration-200 focus:bg-white focus:border-[#19b7c8] focus:ring-4 focus:ring-[#19b7c8]/10"
                    type="text"
                    placeholder="Enter your full name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                  />

                </div>

              </div>

            )}


            {/* EMAIL */}

            <div>

              <label className="block mb-1 text-[10px] font-bold uppercase tracking-wide text-[#60777e]">
                Email Address
              </label>

              <div className="relative">

                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91a5aa] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
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
                  className="w-full h-10 pl-9 pr-3 rounded-lg border border-[#d9e7e9] bg-[#f9fcfc] text-[13px] text-[#082b3a] placeholder:text-[#a6b5b9] outline-none transition-all duration-200 focus:bg-white focus:border-[#19b7c8] focus:ring-4 focus:ring-[#19b7c8]/10"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="block mb-1 text-[10px] font-bold uppercase tracking-wide text-[#60777e]">
                Password
              </label>

              <div className="relative">

                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#91a5aa] pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="4"
                    y="10"
                    width="16"
                    height="11"
                    rx="2"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10V7a4 4 0 018 0v3"
                  />
                </svg>

                <input
                  className="w-full h-10 pl-9 pr-11 rounded-lg border border-[#d9e7e9] bg-[#f9fcfc] text-[13px] text-[#082b3a] placeholder:text-[#a6b5b9] outline-none transition-all duration-200 focus:bg-white focus:border-[#19b7c8] focus:ring-4 focus:ring-[#19b7c8]/10"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-md flex items-center justify-center text-[#91a5aa] hover:text-[#087f91] hover:bg-[#e8f8fa] transition-all duration-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >

                  {showPassword ? (

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />
                    </svg>

                  ) : (

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3l18 18"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.6 5.2A10.8 10.8 0 0012 5c7 0 10 7 10 7a18 18 0 01-3.2 4.5"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.2 6.3C3.6 8.1 2 12 2 12s3.5 6 10 6c1.5 0 2.8-.3 4-.8"
                      />
                    </svg>

                  )}

                </button>

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-10 mt-1 overflow-hidden rounded-lg bg-gradient-to-r from-[#056071] via-[#087f91] to-[#19b7c8] text-white text-[13px] font-semibold shadow-md shadow-[#087f91]/20 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#087f91]/25 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 transition-all duration-300"
            >

              <span className="relative z-10 flex items-center justify-center gap-2">

                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />

                    {state === 'Sign Up'
                      ? 'Creating Account...'
                      : 'Logging in...'}
                  </>
                ) : (
                  <>
                    {state === 'Sign Up'
                      ? 'Create Account'
                      : 'Login'}

                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </span>

            </button>

          </form>


         
        {/* ACCOUNT SWITCH */}

<div className="mt-4 flex flex-col items-center gap-2.5">

  {state === 'Sign Up' ? (
    <>
      <span className="text-xs text-[#7b8f95]">
        Already have an account?
      </span>

      <button
        type="button"
        onClick={() => switchState('Login')}
        className="group relative h-9 px-6 overflow-hidden rounded-full border border-[#19b7c8]/30 bg-white text-xs font-bold text-[#087f91] shadow-sm hover:border-[#19b7c8] hover:bg-[#eaf9fa] hover:shadow-[0_6px_18px_rgba(25,183,200,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          Login here
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </>
  ) : (
    <>
      <span className="text-xs text-[#7b8f95]">
        Don't have an account?
      </span>

      <button
        type="button"
        onClick={() => switchState('Sign Up')}
        className="group relative h-9 px-6 overflow-hidden rounded-full border border-[#19b7c8]/30 bg-white text-xs font-bold text-[#087f91] shadow-sm hover:border-[#19b7c8] hover:bg-[#eaf9fa] hover:shadow-[0_6px_18px_rgba(25,183,200,0.15)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">
          Create account
          <span className="text-sm transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </button>
    </>
  )}

</div>

          {/* SECURITY */}

          <div className="mt-4 flex items-center justify-center gap-2">

            <svg
              className="w-3.5 h-3.5 text-[#18a875]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
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

            <span className="text-[10px] text-[#91a4a9]">
              Secure access to your MediAssist account
            </span>

          </div>

        </div>

      </div>

    </main>
  )
}

export default Login