import { useContext, useRef, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyProfile = () => {
  const {
    backendUrl,
    token,
    userData,
    setUserData,
    loadUserProfileData
  } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const imageInputRef = useRef(null)

  if (!userData) {
    return (
      <main className="min-h-[65vh] flex items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3">
          <div className="relative w-11 h-11">
            <div className="absolute inset-0 rounded-full border-2 border-[#d8f0f3]" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#087f91] animate-spin" />
          </div>

          <p className="text-sm font-medium text-[#6c8188]">
            Loading profile...
          </p>
        </div>
      </main>
    )
  }

  const saveProfile = async () => {
    try {
      setLoading(true)

      const formData = new FormData()

      formData.append('name', userData.name || '')
      formData.append('phone', userData.phone || '')

      formData.append(
        'address',
        JSON.stringify(
          userData.address || {
            line1: '',
            line2: ''
          }
        )
      )

      formData.append(
        'dob',
        userData.dob || 'Not Selected'
      )

      formData.append(
        'gender',
        userData.gender || 'Not Selected'
      )

      if (imageFile) {
        formData.append('image', imageFile)
      }

      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        formData,
        {
          headers: {
            token
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        setImageFile(null)
        setIsEdit(false)
        await loadUserProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)

      toast.error(
        error.response?.data?.message ||
        'Failed to update profile'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async () => {
    setImageFile(null)
    setIsEdit(false)
    await loadUserProfileData()
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)
    }
  }

  return (
    <main className="py-6 sm:py-8 lg:py-10 pb-14">

      {/* Page heading */}
      <section className="mb-6 sm:mb-7">

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-[10px] sm:text-[11px] font-bold tracking-[0.08em]">
          <span className="relative flex w-1.5 h-1.5">
            <span className="absolute inset-0 rounded-full bg-[#19b7c8] opacity-40 animate-ping" />
            <span className="relative w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />
          </span>

          PERSONAL PROFILE
        </div>

        <h1 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-[#082b3a]">
          My Profile
        </h1>

        <p className="mt-1 text-[13px] sm:text-sm text-[#6c8188]">
          Manage your personal information and healthcare details.
        </p>

      </section>


      {/* Main profile card */}
      <section className="max-w-4xl rounded-[26px] bg-white/90 backdrop-blur-xl border border-[#dceff2] shadow-[0_14px_40px_rgba(8,43,58,0.06)] overflow-hidden">

        {/* Profile banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#062b3a] via-[#056071] to-[#087f91] px-5 sm:px-8 py-7 sm:py-8">

          {/* Decorative glass shapes */}
          <div className="absolute -top-28 -right-20 w-64 h-64 rounded-full bg-[#19b7c8]/20 blur-3xl pointer-events-none" />

          <div className="absolute -bottom-28 left-[32%] w-56 h-56 rounded-full bg-[#19b7c8]/10 blur-3xl pointer-events-none" />

          <div className="absolute top-1/2 right-[20%] w-24 h-24 rounded-full border border-white/10 pointer-events-none" />

          <div className="relative flex flex-col sm:flex-row items-center sm:items-end gap-5">

            {/* Profile image */}
            <div className="relative flex-shrink-0">

              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[24px] p-1.5 bg-white/15 backdrop-blur-md border border-white/20 shadow-[0_16px_35px_rgba(0,0,0,0.18)]">

                <img
                  className="w-full h-full object-cover rounded-[18px] bg-white"
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : userData.image || assets.profile_pic
                  }
                  alt="Profile"
                />

              </div>

              {isEdit && (
                <button
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-[#087f91] text-[11px] font-bold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 whitespace-nowrap"
                >
                  Change Photo
                </button>
              )}

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />

            </div>


            {/* Identity */}
            <div className="text-center sm:text-left text-white pb-1 min-w-0 w-full">

              {isEdit ? (
                <input
                  className="w-full sm:w-80 h-11 px-4 text-base sm:text-lg font-semibold text-[#082b3a] bg-white rounded-xl outline-none border border-white/30 focus:ring-2 focus:ring-[#19b7c8]/40 shadow-sm"
                  type="text"
                  value={userData.name || ''}
                  onChange={(e) =>
                    setUserData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))
                  }
                  placeholder="Your name"
                />
              ) : (
                <p className="text-xl sm:text-2xl font-bold break-words">
                  {userData.name || 'User'}
                </p>
              )}

              <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">

                <span className="w-1.5 h-1.5 rounded-full bg-[#7df0d0]" />

                <p className="text-xs sm:text-sm text-white/65">
                  MediAssist Patient
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* Profile details */}
        <div className="p-5 sm:p-7 lg:p-8">

          {/* Contact information */}
          <section>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center border border-[#d9eff2]">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 6l-10 7L2 6"
                  />
                </svg>

              </div>

              <div>
                <h2 className="font-bold text-[#082b3a]">
                  Contact Information
                </h2>

                <p className="text-xs text-[#8a9ba0] mt-0.5">
                  Your contact details
                </p>
              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Email */}
              <div className="group p-4 rounded-2xl bg-[#f7fcfd] border border-[#e3f1f3] hover:border-[#19b7c8]/35 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">

                <p className="text-[11px] font-semibold text-[#7b9096] mb-1.5">
                  Email Address
                </p>

                <p className="text-sm font-medium text-[#087f91] break-all">
                  {userData.email}
                </p>

              </div>


              {/* Phone */}
              <div className="group p-4 rounded-2xl bg-[#f7fcfd] border border-[#e3f1f3] hover:border-[#19b7c8]/35 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">

                <p className="text-[11px] font-semibold text-[#7b9096] mb-1.5">
                  Phone Number
                </p>

                {isEdit ? (
                  <input
                    className="w-full h-9 px-3 text-sm bg-white border border-[#cfe7ea] rounded-lg outline-none focus:border-[#19b7c8] focus:ring-2 focus:ring-[#19b7c8]/10"
                    type="text"
                    value={userData.phone || ''}
                    onChange={(e) =>
                      setUserData(prev => ({
                        ...prev,
                        phone: e.target.value
                      }))
                    }
                    placeholder="Enter phone number"
                  />
                ) : (
                  <p className="text-sm font-medium text-[#087f91]">
                    {userData.phone || 'Not provided'}
                  </p>
                )}

              </div>


              {/* Address */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-[#f7fcfd] border border-[#e3f1f3] hover:border-[#19b7c8]/35 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">

                <p className="text-[11px] font-semibold text-[#7b9096] mb-2">
                  Address
                </p>

                {isEdit ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    <input
                      className="w-full h-10 px-3 text-sm bg-white border border-[#cfe7ea] rounded-lg outline-none focus:border-[#19b7c8] focus:ring-2 focus:ring-[#19b7c8]/10"
                      type="text"
                      placeholder="Address line 1"
                      value={userData.address?.line1 || ''}
                      onChange={(e) =>
                        setUserData(prev => ({
                          ...prev,
                          address: {
                            ...(prev.address || {}),
                            line1: e.target.value
                          }
                        }))
                      }
                    />

                    <input
                      className="w-full h-10 px-3 text-sm bg-white border border-[#cfe7ea] rounded-lg outline-none focus:border-[#19b7c8] focus:ring-2 focus:ring-[#19b7c8]/10"
                      type="text"
                      placeholder="Address line 2"
                      value={userData.address?.line2 || ''}
                      onChange={(e) =>
                        setUserData(prev => ({
                          ...prev,
                          address: {
                            ...(prev.address || {}),
                            line2: e.target.value
                          }
                        }))
                      }
                    />

                  </div>
                ) : (
                  <p className="text-sm text-[#61777e] leading-6">

                    {userData.address?.line1 || 'Not provided'}

                    {userData.address?.line2 && (
                      <>
                        <br />
                        {userData.address.line2}
                      </>
                    )}

                  </p>
                )}

              </div>

            </div>

          </section>


          {/* Divider */}
          <div className="my-7 h-px bg-[#e5f1f3]" />


          {/* Basic information */}
          <section>

            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center border border-[#d9eff2]">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="7"
                    r="4"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.5 21a6.5 6.5 0 0113 0"
                  />

                </svg>

              </div>

              <div>

                <h2 className="font-bold text-[#082b3a]">
                  Basic Information
                </h2>

                <p className="text-xs text-[#8a9ba0] mt-0.5">
                  Personal details
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* Gender */}
              <div className="p-4 rounded-2xl bg-[#f7fcfd] border border-[#e3f1f3] hover:border-[#19b7c8]/35 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">

                <p className="text-[11px] font-semibold text-[#7b9096] mb-2">
                  Gender
                </p>

                {isEdit ? (
                  <select
                    className="w-full h-10 px-3 text-sm bg-white border border-[#cfe7ea] rounded-lg outline-none focus:border-[#19b7c8] focus:ring-2 focus:ring-[#19b7c8]/10"
                    value={userData.gender || 'Not Selected'}
                    onChange={(e) =>
                      setUserData(prev => ({
                        ...prev,
                        gender: e.target.value
                      }))
                    }
                  >
                    <option value="Not Selected">
                      Not Selected
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>
                  </select>
                ) : (
                  <p className="text-sm font-medium text-[#087f91]">
                    {userData.gender || 'Not provided'}
                  </p>
                )}

              </div>


              {/* Birthday */}
              <div className="p-4 rounded-2xl bg-[#f7fcfd] border border-[#e3f1f3] hover:border-[#19b7c8]/35 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300">

                <p className="text-[11px] font-semibold text-[#7b9096] mb-2">
                  Birthday
                </p>

                {isEdit ? (
                  <input
                    className="w-full h-10 px-3 text-sm bg-white border border-[#cfe7ea] rounded-lg outline-none focus:border-[#19b7c8] focus:ring-2 focus:ring-[#19b7c8]/10"
                    type="date"
                    value={
                      userData.dob === 'Not Selected'
                        ? ''
                        : userData.dob || ''
                    }
                    onChange={(e) =>
                      setUserData(prev => ({
                        ...prev,
                        dob: e.target.value
                      }))
                    }
                  />
                ) : (
                  <p className="text-sm font-medium text-[#087f91]">
                    {userData.dob || 'Not provided'}
                  </p>
                )}

              </div>

            </div>

          </section>


          {/* Actions */}
          <div className="mt-7 pt-6 border-t border-[#e5f1f3] flex flex-wrap gap-3">

            {isEdit ? (
              <>
                <button
                  type="button"
                  disabled={loading}
                  onClick={saveProfile}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#087f91] text-white text-sm font-semibold shadow-sm hover:bg-[#056071] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loading && (
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  )}

                  {loading
                    ? 'Saving...'
                    : 'Save Information'}
                </button>

                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-full border border-[#cfe7ea] bg-white text-[#087f91] text-sm font-semibold hover:bg-[#f1fafb] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEdit(true)}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#087f91] text-white text-sm font-semibold shadow-sm hover:bg-[#056071] hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
              >
                Edit Profile

                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20h9"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.5a2.1 2.1 0 013 3L8 18l-4 1 1-4L16.5 3.5z"
                  />
                </svg>
              </button>
            )}

          </div>

        </div>

      </section>

    </main>
  )
}

export default MyProfile