import React, {
  useContext,
  useEffect,
  useState
} from 'react'

import { DoctorContext } from '../../context/DoctorContext'

const Icon = ({ name, size = 18 }) => {
  const paths = {
    user: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5.5 20c.7-3.4 2.9-5 6.5-5s5.8 1.6 6.5 5" />
      </>
    ),
    briefcase: (
      <>
        <rect x="3" y="6.5" width="18" height="13" rx="2" />
        <path d="M8 6.5V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1.5" />
        <path d="M3 11h18" />
        <path d="M10 11v2h4v-2" />
      </>
    ),
    degree: (
      <>
        <path d="M3 9.5 12 4l9 5.5-9 5.5-9-5.5Z" />
        <path d="M7 12v4.5c2.8 2 7.2 2 10 0V12" />
        <path d="M21 10v5" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.5 2" />
      </>
    ),
    wallet: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 8h18" />
        <path d="M16 13h2" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 10-8 10S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5" />
        <path d="M12 8h.01" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z" />
        <path d="m14.5 7.5 3 3" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    check: (
      <>
        <path d="m5 12 4 4L19 6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3 19 6v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6l7-3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const DoctorProfile = () => {
  const {
    dToken,
    doctorData,
    getDoctorProfile,
    changeAvailability,
    updateDoctorProfile
  } = useContext(DoctorContext)

  const [edit, setEdit] = useState(false)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    speciality: '',
    experience: '',
    fees: '',
    address: '',
    about: ''
  })

  useEffect(() => {
    if (dToken) {
      getDoctorProfile()
    }
  }, [dToken])

  useEffect(() => {
    if (doctorData) {
      const address =
        typeof doctorData.address === 'object'
          ? `${doctorData.address?.line1 || ''}${doctorData.address?.line2 ? `, ${doctorData.address.line2}` : ''}`
          : doctorData.address || ''

      setFormData({
        name: doctorData.name || '',
        degree: doctorData.degree || '',
        speciality: doctorData.speciality || '',
        experience: doctorData.experience || '',
        fees: doctorData.fees || '',
        address,
        about: doctorData.about || ''
      })
    }
  }, [doctorData])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      const data = await updateDoctorProfile(formData)

      if (data.success) {
        await getDoctorProfile()
        setEdit(false)
        alert('Profile updated successfully')
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.log('PROFILE UPDATE ERROR:', error)
      alert('Profile update failed')
    } finally {
      setSaving(false)
    }
  }

  if (!doctorData) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#dceff2] bg-white/85 px-10 py-10 text-center shadow-[0_20px_60px_rgba(8,127,145,0.08)] backdrop-blur-xl">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f8fa]">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#c7e9ed] border-t-[#087f91]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#082b3a]">
              Loading profile
            </p>
            <p className="mt-1 text-xs text-[#6c8188]">
              Preparing your professional information...
            </p>
          </div>
        </div>
      </div>
    )
  }

  const addressText =
    typeof doctorData.address === 'object'
      ? `${doctorData.address?.line1 || ''}${doctorData.address?.line2 ? `, ${doctorData.address.line2}` : ''}`
      : doctorData.address || ''

  const isAvailable = Boolean(doctorData.available)

  return (
    <div className="w-full min-w-0 space-y-5 pb-8">

      <section className="relative overflow-hidden rounded-[26px] border border-[#dceff2] bg-white/90 px-5 py-5 shadow-[0_18px_55px_rgba(8,127,145,0.07)] backdrop-blur-xl sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#19b7c8]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-40 w-40 rounded-full bg-[#087f91]/5 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="mb-2 flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#087f91]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />
              Professional Profile
            </div>

            <h1 className="text-2xl font-black tracking-[-0.03em] text-[#082b3a] sm:text-3xl">
              My Profile
            </h1>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-[#6c8188]">
              Manage your professional information, consultation details and appointment availability.
            </p>
          </div>

          <div
            className={`inline-flex w-fit max-w-full items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-bold ${
              isAvailable
                ? 'border-[#cdeedf] bg-[#effbf6] text-[#16835d]'
                : 'border-[#f1d6d9] bg-[#fff5f6] text-[#c45460]'
            }`}
          >
            <span
              className={`relative flex h-2 w-2 rounded-full ${
                isAvailable ? 'bg-[#18a875]' : 'bg-[#e65d67]'
              }`}
            >
              {isAvailable && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[#18a875]/40" />
              )}
            </span>

            <span className="break-words">
              {isAvailable
                ? 'Available for appointments'
                : 'Currently unavailable'}
            </span>
          </div>
        </div>
      </section>


      <section className="relative overflow-hidden rounded-[28px] border border-[#cfe8ec] bg-gradient-to-br from-[#ffffff] via-[#f6fcfd] to-[#eaf8fa] shadow-[0_22px_70px_rgba(8,127,145,0.10)]">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#19b7c8]/10 blur-3xl" />
          <div className="absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-[#087f91]/5 blur-3xl" />
          <div className="absolute right-[25%] top-8 h-20 w-20 rounded-full border border-[#19b7c8]/10" />
          <div className="absolute right-[26%] top-9 h-16 w-16 rounded-full border border-[#19b7c8]/10" />
        </div>

        <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:p-8">

          <div className="flex min-w-0 flex-1 flex-col gap-5 sm:flex-row sm:items-center">

            <div className="relative mx-auto shrink-0 sm:mx-0">
              <div className="rounded-[28px] bg-gradient-to-br from-[#19b7c8] to-[#087f91] p-[3px] shadow-[0_16px_35px_rgba(8,127,145,0.20)]">
                <div className="rounded-[25px] bg-white p-1">
                  <img
                    src={doctorData.image}
                    alt={doctorData.name || 'Doctor'}
                    className="h-28 w-28 rounded-[21px] object-cover object-top sm:h-32 sm:w-32"
                  />
                </div>
              </div>

              <span
                className={`absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white ${
                  isAvailable ? 'bg-[#18a875]' : 'bg-[#e65d67]'
                }`}
              >
                {isAvailable && (
                  <Icon name="check" size={12} />
                )}
              </span>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">

              <div className="mb-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="rounded-full border border-[#cde9ed] bg-white/80 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#087f91]">
                  Verified Doctor
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-[#e3eff1] bg-white/70 px-2.5 py-1 text-[9px] font-bold text-[#6c8188]">
                  <Icon name="shield" size={11} />
                  MediAssist
                </span>
              </div>

              <h2 className="break-words text-2xl font-black tracking-[-0.03em] text-[#082b3a] sm:text-3xl">
                Dr. {doctorData.name}
              </h2>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-semibold text-[#5f777f] sm:justify-start">
                <span className="break-words">
                  {doctorData.degree || 'Medical Professional'}
                </span>

                {doctorData.speciality && (
                  <>
                    <span className="text-[#19b7c8]">•</span>
                    <span className="break-words text-[#087f91]">
                      {doctorData.speciality}
                    </span>
                  </>
                )}
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                <span className="rounded-xl border border-[#dceff2] bg-white px-3 py-2 text-[10px] font-bold text-[#536c74] shadow-sm">
                  {doctorData.experience || 'Experience not specified'}
                </span>

                <span
                  className={`rounded-xl border px-3 py-2 text-[10px] font-bold ${
                    isAvailable
                      ? 'border-[#cdeedf] bg-[#effbf6] text-[#16835d]'
                      : 'border-[#f1d6d9] bg-[#fff5f6] text-[#c45460]'
                  }`}
                >
                  {isAvailable ? 'Available' : 'Not Available'}
                </span>
              </div>

            </div>
          </div>

          <button
            type="button"
            onClick={() => setEdit(true)}
            className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#087f91] px-5 py-3.5 text-xs font-extrabold text-white shadow-[0_12px_25px_rgba(8,127,145,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#056071] hover:shadow-[0_18px_35px_rgba(8,127,145,0.24)] sm:w-auto"
          >
            <Icon name="edit" size={15} />
            Edit Profile
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>

        </div>
      </section>


      <section className="grid min-w-0 gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">

        <div className="min-w-0 rounded-[24px] border border-[#dceff2] bg-white/90 p-5 shadow-[0_16px_45px_rgba(8,127,145,0.06)] backdrop-blur-xl sm:p-6">

          <div className="mb-6 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f8fa] text-[#087f91]">
              <Icon name="briefcase" size={19} />
            </div>

            <div className="min-w-0">
              <h2 className="text-base font-extrabold text-[#082b3a]">
                Professional Information
              </h2>

              <p className="mt-1 text-xs leading-5 text-[#7a8d93]">
                Your medical and professional details
              </p>
            </div>
          </div>

          <div className="grid min-w-0 gap-3 sm:grid-cols-2">

            <div className="group rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfe5e9] hover:bg-white hover:shadow-[0_10px_25px_rgba(8,127,145,0.07)]">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="user" size={15} />
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Doctor Name
              </span>
              <strong className="mt-1 block break-words text-sm font-extrabold text-[#082b3a]">
                {doctorData.name || 'Not provided'}
              </strong>
            </div>

            <div className="group rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfe5e9] hover:bg-white hover:shadow-[0_10px_25px_rgba(8,127,145,0.07)]">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="briefcase" size={15} />
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Speciality
              </span>
              <strong className="mt-1 block break-words text-sm font-extrabold text-[#082b3a]">
                {doctorData.speciality || 'Not provided'}
              </strong>
            </div>

            <div className="group rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfe5e9] hover:bg-white hover:shadow-[0_10px_25px_rgba(8,127,145,0.07)]">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="degree" size={15} />
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Medical Degree
              </span>
              <strong className="mt-1 block break-words text-sm font-extrabold text-[#082b3a]">
                {doctorData.degree || 'Not provided'}
              </strong>
            </div>

            <div className="group rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfe5e9] hover:bg-white hover:shadow-[0_10px_25px_rgba(8,127,145,0.07)]">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="clock" size={15} />
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Experience
              </span>
              <strong className="mt-1 block break-words text-sm font-extrabold text-[#082b3a]">
                {doctorData.experience || 'Not provided'}
              </strong>
            </div>

            <div className="group rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfe5e9] hover:bg-white hover:shadow-[0_10px_25px_rgba(8,127,145,0.07)]">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="wallet" size={15} />
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Consultation Fee
              </span>
              <strong className="mt-1 block break-words text-sm font-extrabold text-[#087f91]">
                ₹{doctorData.fees || '0'}
              </strong>
            </div>

            <div className="group rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bfe5e9] hover:bg-white hover:shadow-[0_10px_25px_rgba(8,127,145,0.07)]">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="shield" size={15} />
              </div>
              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Current Status
              </span>
              <strong
                className={`mt-1 block break-words text-sm font-extrabold ${
                  isAvailable ? 'text-[#16835d]' : 'text-[#c45460]'
                }`}
              >
                {isAvailable ? 'Available' : 'Not Available'}
              </strong>
            </div>

            <div className="min-w-0 rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 sm:col-span-2">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="location" size={15} />
              </div>

              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                Practice Address
              </span>

              <strong className="mt-1 block break-words text-sm font-extrabold leading-6 text-[#082b3a]">
                {addressText || 'Not provided'}
              </strong>
            </div>

            <div className="min-w-0 rounded-2xl border border-[#e5f0f2] bg-[#f9fcfd] p-4 sm:col-span-2">
              <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                <Icon name="info" size={15} />
              </div>

              <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                About
              </span>

              <p className="mt-2 break-words text-sm leading-6 text-[#5f777f]">
                {doctorData.about || 'No information provided.'}
              </p>
            </div>

          </div>
        </div>


        <div className="flex min-w-0 flex-col gap-5">

          <div className="relative overflow-hidden rounded-[24px] border border-[#cfe8ec] bg-gradient-to-br from-[#ffffff] to-[#eefafb] p-5 shadow-[0_16px_45px_rgba(8,127,145,0.07)] sm:p-6">

            <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#19b7c8]/10 blur-2xl" />

            <div className="relative">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f8fa] text-[#087f91]">
                    <span className="h-3 w-3 rounded-full bg-[#18a875]" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-sm font-extrabold text-[#082b3a]">
                      Appointment Availability
                    </h3>

                    <p className="mt-1 break-words text-xs leading-5 text-[#71878e]">
                      {isAvailable
                        ? 'Patients can currently book appointments with you.'
                        : 'Patients cannot currently book appointments with you.'}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-extrabold ${
                    isAvailable
                      ? 'bg-[#effbf6] text-[#16835d]'
                      : 'bg-[#fff5f6] text-[#c45460]'
                  }`}
                >
                  {isAvailable ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between rounded-2xl border border-white bg-white/80 p-3.5 shadow-sm">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-[#81949a]">
                    Booking Status
                  </p>

                  <p
                    className={`mt-1 text-sm font-extrabold ${
                      isAvailable ? 'text-[#16835d]' : 'text-[#c45460]'
                    }`}
                  >
                    {isAvailable ? 'Available' : 'Unavailable'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={changeAvailability}
                  aria-label="Change availability"
                  className={`relative h-8 w-14 rounded-full p-1 transition-all duration-300 ${
                    isAvailable
                      ? 'bg-[#087f91] shadow-[0_7px_18px_rgba(8,127,145,0.20)]'
                      : 'bg-[#c8d5d9]'
                  }`}
                >
                  <span
                    className={`block h-6 w-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
                      isAvailable ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>


          <div className="min-w-0 rounded-[24px] border border-[#dceff2] bg-white/90 p-5 shadow-[0_16px_45px_rgba(8,127,145,0.06)] sm:p-6">

            <div className="mb-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#087f91]">
                About
              </span>
            </div>

            <p className="break-words text-sm leading-7 text-[#5f777f]">
              {doctorData.about ||
                'Add information about your professional experience and medical practice.'}
            </p>

          </div>


          <div className="rounded-[24px] border border-[#dceff2] bg-gradient-to-br from-[#082b3a] to-[#056071] p-5 text-white shadow-[0_18px_45px_rgba(8,43,58,0.14)] sm:p-6">

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Icon name="shield" size={19} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-extrabold">
                  Professional Profile
                </h3>

                <p className="mt-1 break-words text-xs leading-5 text-white/65">
                  Keep your professional details accurate so patients receive clear information before booking.
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-white/50">
                  Specialty
                </span>
                <span className="mt-1 block break-words text-xs font-bold text-white">
                  {doctorData.speciality || 'Not set'}
                </span>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-white/50">
                  Fee
                </span>
                <span className="mt-1 block text-xs font-bold text-white">
                  ₹{doctorData.fees || '0'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {edit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#06202d]/55 p-3 backdrop-blur-md sm:p-6">

          <div className="my-auto flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[26px] border border-white/70 bg-white shadow-[0_30px_100px_rgba(6,32,45,0.28)]">

            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-[#e5eff1] bg-gradient-to-r from-[#f9fdfe] to-[#eefafb] px-5 py-5 sm:px-7">

              <div className="min-w-0">
                <div className="mb-1 flex items-center gap-2 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#087f91]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#19b7c8]" />
                  Profile Settings
                </div>

                <h2 className="text-xl font-black tracking-[-0.02em] text-[#082b3a]">
                  Edit Profile
                </h2>

                <p className="mt-1 break-words text-xs leading-5 text-[#71878e]">
                  Update your professional information.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEdit(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#dceff2] bg-white text-[#6c8188] transition-all duration-200 hover:border-[#b9e0e5] hover:bg-[#e8f8fa] hover:text-[#087f91]"
                aria-label="Close edit profile"
              >
                <Icon name="close" size={17} />
              </button>

            </div>


            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-7">

              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                    Doctor Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#d9eaed] bg-[#fbfdfe] px-3.5 py-3 text-sm font-medium text-[#082b3a] outline-none transition-all placeholder:text-[#9aabb0] focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                    Degree
                  </label>

                  <input
                    type="text"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#d9eaed] bg-[#fbfdfe] px-3.5 py-3 text-sm font-medium text-[#082b3a] outline-none transition-all focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                    Speciality
                  </label>

                  <input
                    type="text"
                    name="speciality"
                    value={formData.speciality}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#d9eaed] bg-[#fbfdfe] px-3.5 py-3 text-sm font-medium text-[#082b3a] outline-none transition-all focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                    Experience
                  </label>

                  <input
                    type="text"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#d9eaed] bg-[#fbfdfe] px-3.5 py-3 text-sm font-medium text-[#082b3a] outline-none transition-all focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                    Consultation Fee
                  </label>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#087f91]">
                      ₹
                    </span>

                    <input
                      type="number"
                      name="fees"
                      value={formData.fees}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[#d9eaed] bg-[#fbfdfe] py-3 pl-8 pr-3.5 text-sm font-medium text-[#082b3a] outline-none transition-all focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#d9eaed] bg-[#fbfdfe] px-3.5 py-3 text-sm font-medium text-[#082b3a] outline-none transition-all focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                  />
                </div>

              </div>


              <div className="mt-4">
                <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#637b82]">
                  About
                </label>

                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  rows="6"
                  className="w-full resize-y rounded-xl border border-[#d9eaed] bg-[#fbfdfe] px-3.5 py-3 text-sm font-medium leading-6 text-[#082b3a] outline-none transition-all focus:border-[#19b7c8] focus:bg-white focus:ring-4 focus:ring-[#19b7c8]/10"
                />
              </div>


              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#dceff2] bg-[#f5fbfc] p-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#087f91] shadow-sm">
                  <Icon name="shield" size={15} />
                </div>

                <p className="text-[11px] leading-5 text-[#6c8188]">
                  Keep your professional information accurate and up to date for patients using MediAssist.
                </p>
              </div>

            </div>


            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-[#e5eff1] bg-[#fbfdfe] px-5 py-4 sm:flex-row sm:justify-end sm:px-7">

              <button
                type="button"
                onClick={() => setEdit(false)}
                className="rounded-xl border border-[#d8e8eb] bg-white px-5 py-3 text-xs font-extrabold text-[#60777e] transition-all duration-200 hover:border-[#bcdfe4] hover:bg-[#f4fafb] hover:text-[#087f91]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#087f91] px-5 py-3 text-xs font-extrabold text-white shadow-[0_10px_22px_rgba(8,127,145,0.18)] transition-all duration-200 hover:bg-[#056071] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon name="check" size={14} />
                    Save Changes
                  </>
                )}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default DoctorProfile