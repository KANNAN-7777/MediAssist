import { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General Physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
  event.preventDefault()

  alert('Submit button clicked')

  try {
    if (!docImg) {
      alert('Image not selected')
      return
    }

    const formData = new FormData()

    formData.append('image', docImg)
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('experience', experience)
    formData.append('fees', fees)
    formData.append('about', about)
    formData.append('speciality', speciality)
    formData.append('degree', degree)

    formData.append(
      'address',
      JSON.stringify({
        line1: address1,
        line2: address2
      })
    )

    alert('Sending request to backend...')

    const { data } = await axios.post(
      backendUrl + '/api/admin/add-doctor',
      formData,
      {
        headers: {
          atoken: aToken
        }
      }
    )

    alert(
      `Backend response received:\nSuccess: ${data.success}\nMessage: ${data.message || 'No message'}`
    )

    if (data.success) {
      alert('Doctor added successfully')

      toast.success(
        data.message || 'Doctor added successfully'
      )

      setDocImg(false)
      setName('')
      setEmail('')
      setPassword('')
      setExperience('1 Year')
      setFees('')
      setAbout('')
      setSpeciality('General Physician')
      setDegree('')
      setAddress1('')
      setAddress2('')
    } else {
      alert(data.message || 'Failed to add doctor')

      toast.error(
        data.message || 'Failed to add doctor'
      )
    }

  } catch (error) {
    console.log('ADD DOCTOR ERROR:', error)
    console.log('RESPONSE:', error.response?.data)

    alert(
      error.response?.data?.message ||
      error.message ||
      'Something went wrong'
    )

    toast.error(
      error.response?.data?.message ||
      'Something went wrong'
    )
  }
}
  
  return (
    <div className="relative w-full min-w-0 pb-8">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-[#19b7c8]/10 blur-3xl" />

      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-[#087f91]/5 blur-3xl" />

      <div className="relative">

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div className="min-w-0">

            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[#d7edf0] bg-white/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#087f91] shadow-sm backdrop-blur-xl">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#19b7c8]" />

              Admin Portal

            </div>

            <h1 className="text-2xl font-bold tracking-tight text-[#082b3a] sm:text-3xl">
              Add Doctor
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[#6c8188]">
              Create a professional doctor profile and add them to the
              MediAssist healthcare network.
            </p>

          </div>

          <div className="hidden items-center gap-2 rounded-2xl border border-[#dceff2] bg-white/80 px-4 py-3 shadow-sm backdrop-blur-xl sm:flex">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f8fa] text-[#087f91]">

              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4.5-1.5-7-4.5-7-9V7l7-4z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />

              </svg>

            </div>

            <div>

              <p className="text-[9px] font-bold uppercase tracking-wide text-[#7c9096]">
                Protected
              </p>

              <p className="text-xs font-semibold text-[#082b3a]">
                Secure profile setup
              </p>

            </div>

          </div>

        </div>

        <form
          onSubmit={onSubmitHandler}
          className="w-full"
        >

          <div className="overflow-hidden rounded-[26px] border border-[#dceff2] bg-white/90 shadow-[0_20px_60px_rgba(8,127,145,0.08)] backdrop-blur-xl">

            <div className="border-b border-[#edf3f4] bg-gradient-to-r from-[#f8fcfd] via-white to-[#f5fbfc] px-5 py-5 sm:px-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#e8f8fa] text-[#087f91]">

                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  >

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19a4 4 0 00-8 0"
                    />

                    <circle
                      cx="11"
                      cy="8"
                      r="3"
                    />

                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 8v6M16 11h6"
                    />

                  </svg>

                </div>

                <div>

                  <h2 className="text-sm font-bold text-[#082b3a]">
                    Doctor Information
                  </h2>

                  <p className="mt-0.5 text-xs text-[#7c9096]">
                    Add the doctor's professional and contact details.
                  </p>

                </div>

              </div>

            </div>

            <div className="p-5 sm:p-7">

              <div className="grid min-w-0 gap-7 xl:grid-cols-[240px_minmax(0,1fr)]">

                <div className="min-w-0">

                  <label className="mb-3 block text-xs font-bold text-[#082b3a]">
                    Profile Picture
                  </label>

                  <label
                    htmlFor="doc-img"
                    className="group relative block aspect-square w-full max-w-[220px] cursor-pointer overflow-hidden rounded-[24px] border border-dashed border-[#b9dfe4] bg-[#f5fbfc] transition-all duration-500 hover:border-[#19b7c8] hover:bg-[#eefafd] hover:shadow-[0_15px_35px_rgba(8,127,145,0.12)]"
                  >

                    <img
                      src={
                        docImg
                          ? URL.createObjectURL(docImg)
                          : assets.upload_area
                      }
                      alt="Upload doctor"
                      className={`h-full w-full object-cover transition-all duration-500 ${
                        docImg
                          ? 'group-hover:scale-105'
                          : 'object-contain p-10 opacity-60'
                      }`}
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-[#06202d]/0 transition-all duration-500 group-hover:bg-[#06202d]/15">

                      <span className="flex h-11 w-11 scale-90 items-center justify-center rounded-2xl bg-white/95 text-2xl font-light text-[#087f91] opacity-0 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
                        +
                      </span>

                    </div>

                  </label>

                  <input
                    onChange={(e) => setDocImg(e.target.files[0])}
                    type="file"
                    id="doc-img"
                    hidden
                    accept="image/*"
                  />

                  <div className="mt-4 max-w-[220px]">

                    <p className="text-xs font-bold text-[#082b3a]">
                      Doctor profile picture
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#7c9096]">
                      Use a clear professional photograph for the doctor's
                      profile.
                    </p>

                    <span className="mt-2 inline-flex rounded-full bg-[#eef9fa] px-2.5 py-1 text-[9px] font-bold text-[#087f91]">
                      JPG · PNG · WEBP
                    </span>

                  </div>

                </div>

                <div className="grid min-w-0 gap-5 lg:grid-cols-2">

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Doctor Name
                    </label>

                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Enter doctor name"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    />

                  </div>

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Doctor Email
                    </label>

                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter email address"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    />

                  </div>

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Doctor Password
                    </label>

                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Create password"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    />

                  </div>

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Experience
                    </label>

                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    >

                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                      <option value="4 Years">4 Years</option>
                      <option value="5 Years">5 Years</option>
                      <option value="6 Years">6 Years</option>
                      <option value="7 Years">7 Years</option>
                      <option value="8 Years">8 Years</option>
                      <option value="9 Years">9 Years</option>
                      <option value="10 Years">10 Years</option>

                    </select>

                  </div>

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Consultation Fees
                    </label>

                    <div className="flex h-11 min-w-0 overflow-hidden rounded-xl border border-[#dcebed] bg-[#fbfdfe] transition-all duration-300 focus-within:border-[#19b7c8] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#19b7c8]/10">

                      <span className="flex w-11 shrink-0 items-center justify-center border-r border-[#e6f0f2] bg-[#f5fbfc] text-sm font-bold text-[#087f91]">
                        ₹
                      </span>

                      <input
                        value={fees}
                        onChange={(e) => setFees(e.target.value)}
                        type="number"
                        placeholder="Consultation fee"
                        required
                        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-[#082b3a] outline-none placeholder:text-[#a5b4b8]"
                      />

                    </div>

                  </div>

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Speciality
                    </label>

                    <select
                      value={speciality}
                      onChange={(e) => setSpeciality(e.target.value)}
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    >

                      <option value="General Physician">
                        General Physician
                      </option>

                      <option value="Gynecologist">
                        Gynecologist
                      </option>

                      <option value="Dermatologist">
                        Dermatologist
                      </option>

                      <option value="Pediatricians">
                        Pediatricians
                      </option>

                      <option value="Neurologist">
                        Neurologist
                      </option>

                      <option value="Gastroenterologist">
                        Gastroenterologist
                      </option>

                    </select>

                  </div>

                  <div className="min-w-0">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Education
                    </label>

                    <input
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      type="text"
                      placeholder="e.g. MBBS, MD"
                      required
                      className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    />

                  </div>

                  <div className="min-w-0 lg:col-span-2">

                    <label className="mb-2 block text-[11px] font-bold text-[#082b3a]">
                      Address
                    </label>

                    <div className="grid gap-3 sm:grid-cols-2">

                      <input
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                        type="text"
                        placeholder="Address line 1"
                        required
                        className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                      />

                      <input
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        type="text"
                        placeholder="Address line 2"
                        required
                        className="h-11 w-full min-w-0 rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 text-sm text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                      />

                    </div>

                  </div>

                </div>

              </div>

              <div className="my-7 h-px bg-[#edf3f4]" />

              <div className="min-w-0">

                <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">

                  <div>

                    <label className="block text-[11px] font-bold text-[#082b3a]">
                      About Doctor
                    </label>

                    <p className="mt-1 text-[10px] leading-4 text-[#7c9096]">
                      Add professional background, expertise and areas of
                      practice.
                    </p>

                  </div>

                  <span className="text-[9px] font-semibold text-[#9aa8ac]">
                    Professional profile
                  </span>

                </div>

                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  rows="5"
                  placeholder="Write a short professional description about the doctor..."
                  required
                  className="w-full min-w-0 resize-y rounded-xl border border-[#dcebed] bg-[#fbfdfe] px-3.5 py-3 text-sm leading-6 text-[#082b3a] outline-none transition-all duration-300 placeholder:text-[#a5b4b8] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                />

              </div>

            </div>

            <div className="flex flex-col gap-4 border-t border-[#edf3f4] bg-[#fbfdfe] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

              <div className="flex min-w-0 items-start gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#effbf6] text-[#18a875]">

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

                <div className="min-w-0">

                  <p className="text-xs font-bold text-[#082b3a]">
                    Secure profile creation
                  </p>

                  <p className="mt-0.5 break-words text-[10px] leading-4 text-[#7c9096]">
                    Doctor information is securely submitted to MediAssist.
                  </p>

                </div>

              </div>

              <button
                type="submit"
                className="group inline-flex min-h-11 w-full items-center justify-center gap-3 rounded-xl bg-[#087f91] px-6 py-3 text-xs font-bold text-white shadow-[0_10px_25px_rgba(8,127,145,0.20)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#056071] hover:shadow-[0_15px_30px_rgba(8,127,145,0.25)] sm:w-auto"
              >

                <span>Add Doctor</span>

                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 6l6 6-6 6"
                  />

                </svg>

              </button>

            </div>

          </div>

        </form>

      </div>
    </div>
  )
}

export default AddDoctor