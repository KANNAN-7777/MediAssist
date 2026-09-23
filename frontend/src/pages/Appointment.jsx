import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docID } = useParams()
  const navigate = useNavigate()

  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData
  } = useContext(AppContext)

  const daysOfWeek = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ]

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Online')

  const fetchDocInfo = () => {
    const doctor = doctors.find(
      item => item._id === docID
    )

    setDocInfo(doctor || null)
  }

  const getAvailableSlots = () => {
    if (!docInfo) return

    const allSlots = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)

      currentDate.setDate(
        today.getDate() + i
      )

      currentDate.setSeconds(0)
      currentDate.setMilliseconds(0)

      const endTime = new Date(today)

      endTime.setDate(
        today.getDate() + i
      )

      endTime.setHours(21, 0, 0, 0)
      endTime.setSeconds(0)
      endTime.setMilliseconds(0)

      if (i === 0) {
        let currentHour = currentDate.getHours()
        let currentMinutes = currentDate.getMinutes()

        if (currentHour < 10) {
          currentDate.setHours(10)
          currentDate.setMinutes(0)
        } else {
          if (currentMinutes < 30) {
            currentDate.setMinutes(30)
          } else {
            currentDate.setHours(currentHour + 1)
            currentDate.setMinutes(0)
          }
        }
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const timeSlots = []

      while (currentDate < endTime) {
        const formattedTime =
          currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })

        const day = String(
          currentDate.getDate()
        ).padStart(2, '0')

        const month = String(
          currentDate.getMonth() + 1
        ).padStart(2, '0')

        const year = currentDate.getFullYear()

        const slotDate =
          `${year}-${month}-${day}`

        const bookedSlots =
          docInfo.slots_booked?.[slotDate] || []

        const isSlotAvailable =
          !bookedSlots.includes(formattedTime)

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(
          currentDate.getMinutes() + 30
        )
      }

      allSlots.push(timeSlots)
    }

    setDocSlots(allSlots)
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      navigate('/login')
      return
    }

    if (!docInfo) {
      toast.error('Doctor information not found')
      return
    }

    if (!slotTime) {
      toast.warn('Please select a time slot')
      return
    }

    const selectedSlot = docSlots[slotIndex]?.find(
      item => item.time === slotTime
    )

    if (!selectedSlot) {
      toast.error('Please select a valid slot')
      return
    }

    const selectedDate = selectedSlot.datetime

    const slotDate =
      `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, '0')}-${String(
        selectedDate.getDate()
      ).padStart(2, '0')}`

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        {
          docId: docID,
          slotDate,
          slotTime,
          paymentMethod
        },
        {
          headers: {
            token
          }
        }
      )

      if (data.success) {
        toast.success(data.message)

        setSlotTime('')

        await getDoctorsData()

        navigate('/myappointment')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(
        'BOOK APPOINTMENT ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to book appointment'
      )
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docID])

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots()
    }
  }, [docInfo])

  if (!docInfo) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">

        <div className="text-center">

          <div className="relative w-12 h-12 mx-auto">

            <div className="absolute inset-0 rounded-full border-2 border-[#dceff2]" />

            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#087f91] animate-spin" />

          </div>

          <p className="mt-4 text-sm font-medium text-[#6c8188]">
            Loading doctor information...
          </p>

        </div>

      </div>
    )
  }

  return (
    <section className="relative py-7 sm:py-9 lg:py-11 pb-16">

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#19b7c8]/5 blur-3xl pointer-events-none" />

      <div className="absolute top-[35%] -left-32 w-72 h-72 rounded-full bg-[#087f91]/5 blur-3xl pointer-events-none" />

      <div className="relative">

        {/* PAGE LABEL */}
        <div className="mb-5">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-[10px] sm:text-[11px] font-bold tracking-wide">

            <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />

            BOOK APPOINTMENT

          </div>

        </div>

        {/* DOCTOR SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-5 lg:gap-6">

          {/* Doctor image */}
          <div className="relative group">

            <div className="absolute -inset-2 rounded-[30px] bg-[#19b7c8]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative overflow-hidden rounded-[28px] bg-[#edf9fa] border border-[#dceff2] shadow-[0_15px_40px_rgba(8,43,58,0.07)]">

              <div className="relative">

                <img
                  src={docInfo.image}
                  alt={docInfo.name}
                  className="w-full aspect-[4/4.3] sm:aspect-[4/3] lg:aspect-[4/4.3] object-cover object-top group-hover:scale-[1.025] transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#062b3a]/55 via-transparent to-transparent" />

              </div>

              {/* Availability */}
              <div className="absolute left-4 right-4 bottom-4">

                <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white/90 backdrop-blur-xl border border-white shadow-xl">

                  <div className="flex items-center gap-2.5">

                    <span className="relative flex w-2.5 h-2.5">

                      <span className="absolute inset-0 rounded-full bg-[#18a875]/40 animate-ping" />

                      <span className="relative w-2.5 h-2.5 rounded-full bg-[#18a875]" />

                    </span>

                    <span className="text-xs font-semibold text-[#082b3a]">
                      Available for consultation
                    </span>

                  </div>

                  <span className="text-[9px] font-bold tracking-wider text-[#087f91]">
                    ONLINE
                  </span>

                </div>

              </div>

            </div>

          </div>

          {/* Doctor information */}
          <div className="rounded-[28px] bg-white border border-[#dceff2] shadow-[0_12px_40px_rgba(8,43,58,0.045)] p-5 sm:p-7 lg:p-8">

            <div className="flex items-start justify-between gap-4">

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-[#082b3a]">
                    {docInfo.name}
                  </h1>

                  <img
                    className="w-5 h-5"
                    src={assets.verified_icon}
                    alt="Verified doctor"
                  />

                </div>

                <div className="flex flex-wrap items-center gap-2.5 mt-2.5">

                  <p className="text-sm text-[#6c8188]">
                    {docInfo.degree} · {docInfo.speciality}
                  </p>

                  <span className="px-2.5 py-1 rounded-full bg-[#e8f8fa] border border-[#d5eef1] text-[#087f91] text-[10px] font-bold">
                    {docInfo.experience}
                  </span>

                </div>

              </div>

              <div className="hidden sm:flex flex-shrink-0 w-11 h-11 rounded-2xl bg-[#e8f8fa] text-[#087f91] items-center justify-center">

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
                    d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4"
                  />

                </svg>

              </div>

            </div>

            <div className="my-6 h-px bg-[#e8f1f3]" />

            {/* About */}
            <div>

              <div className="flex items-center gap-2.5 mb-3">

                <div className="w-8 h-8 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center">

                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                    />

                    <path
                      strokeLinecap="round"
                      d="M12 11v5"
                    />

                    <circle
                      cx="12"
                      cy="8"
                      r=".7"
                      fill="currentColor"
                    />

                  </svg>

                </div>

                <h2 className="text-sm font-bold text-[#082b3a]">
                  About Doctor
                </h2>

              </div>

              <p className="text-sm text-[#6c8188] leading-6">
                {docInfo.about}
              </p>

            </div>

            {/* Fee */}
            <div className="mt-6 flex items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-[#f3fbfc] to-[#f8fcfd] border border-[#dceff2]">

              <div>

                <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-[#8a9ba0]">
                  Consultation Fee
                </p>

                <div className="flex items-baseline gap-1.5 mt-1">

                  <span className="text-xl font-bold text-[#082b3a]">
                    {currencySymbol}
                    {docInfo.fees}
                  </span>

                  <span className="text-xs text-[#8a9ba0]">
                    / consultation
                  </span>

                </div>

              </div>

              <div className="w-11 h-11 rounded-xl bg-[#e4f7f9] text-[#087f91] flex items-center justify-center">

                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="12"
                    rx="2"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                  />

                </svg>

              </div>

            </div>

          </div>

        </div>

        {/* BOOKING PANEL */}
        <div className="mt-6 lg:ml-[376px]">

          <div className="rounded-[28px] bg-white border border-[#dceff2] shadow-[0_12px_40px_rgba(8,43,58,0.045)] p-5 sm:p-7">

            {/* Booking header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">

              <div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] text-[#087f91] text-[10px] font-bold tracking-wide">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />

                  APPOINTMENT SLOT

                </div>

                <h2 className="mt-3 text-xl sm:text-2xl font-bold text-[#082b3a]">
                  Choose your appointment
                </h2>

                <p className="mt-1.5 text-sm text-[#6c8188]">
                  Select a convenient date and available time.
                </p>

              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-[#f5fbfc] border border-[#e0f0f2]">

                <span className="w-2 h-2 rounded-full bg-[#18a875]" />

                <span className="text-[10px] font-semibold text-[#6c8188]">
                  Live availability
                </span>

              </div>

            </div>

            {/* DATE */}
            <div className="mt-7">

              <div className="flex items-center justify-between mb-3">

                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#7b9096]">
                  Select Date
                </p>

                <span className="text-[10px] text-[#9aa9ad]">
                  Next 7 days
                </span>

              </div>

              <div className="flex gap-2.5 overflow-x-auto pb-2">

                {docSlots.map((item, index) => {

                  const selected =
                    slotIndex === index

                  const hasSlots =
                    item.length > 0

                  const date =
                    item[0]?.datetime

                  return (
                    <button
                      type="button"
                      key={index}
                      disabled={!hasSlots}
                      onClick={() => {
                        setSlotIndex(index)
                        setSlotTime('')
                      }}
                      className={`relative flex-shrink-0 w-[76px] sm:w-[84px] py-3.5 rounded-2xl border text-center transition-all duration-300 ${
                        selected
                          ? 'bg-gradient-to-br from-[#056071] to-[#087f91] border-[#087f91] text-white shadow-lg shadow-[#087f91]/20 -translate-y-1'
                          : hasSlots
                            ? 'bg-white border-[#dceff2] text-[#082b3a] hover:border-[#19b7c8]/50 hover:-translate-y-1 hover:shadow-md'
                            : 'bg-[#f7f9fa] border-[#edf0f1] text-[#b7c0c3] cursor-not-allowed'
                      }`}
                    >

                      {selected && (
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#6ee7c5]" />
                      )}

                      <p className={`text-[10px] font-bold tracking-wide ${
                        selected
                          ? 'text-white/70'
                          : ''
                      }`}>
                        {date
                          ? daysOfWeek[date.getDay()]
                          : '---'}
                      </p>

                      <p className="mt-1 text-xl font-bold">
                        {date
                          ? date.getDate()
                          : '--'}
                      </p>

                      <p className={`mt-1 text-[9px] font-medium ${
                        selected
                          ? 'text-white/60'
                          : hasSlots
                            ? 'text-[#8a9ba0]'
                            : 'text-[#b7c0c3]'
                      }`}>
                        {hasSlots
                          ? `${item.length} slots`
                          : 'Unavailable'}
                      </p>

                    </button>
                  )
                })}

              </div>

            </div>

            {/* TIME */}
            <div className="mt-7">

              <div className="flex items-center justify-between mb-3">

                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#7b9096]">
                  Available Time
                </p>

                {slotTime && (
                  <span className="px-2.5 py-1 rounded-full bg-[#e8f8fa] text-[#087f91] text-[10px] font-bold">
                    {slotTime}
                  </span>
                )}

              </div>

              {docSlots[slotIndex]?.length > 0 ? (

                <div className="flex flex-wrap gap-2">

                  {docSlots[slotIndex].map(
                    (item, index) => {

                      const selected =
                        item.time === slotTime

                      return (
                        <button
                          type="button"
                          key={index}
                          onClick={() =>
                            setSlotTime(item.time)
                          }
                          className={`min-w-[86px] px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-200 ${
                            selected
                              ? 'bg-[#087f91] border-[#087f91] text-white shadow-md shadow-[#087f91]/15 -translate-y-0.5'
                              : 'bg-white border-[#dceff2] text-[#6c8188] hover:border-[#19b7c8] hover:text-[#087f91] hover:bg-[#f4fbfc] hover:-translate-y-0.5'
                          }`}
                        >
                          {item.time.toLowerCase()}
                        </button>
                      )
                    }
                  )}

                </div>

              ) : (

                <div className="p-6 rounded-2xl bg-[#f7f9fa] border border-[#e7edef] text-center">

                  <div className="w-10 h-10 mx-auto rounded-xl bg-[#edf3f4] text-[#9aa9ad] flex items-center justify-center">

                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />

                      <path
                        strokeLinecap="round"
                        d="M12 7v5l3 2"
                      />

                    </svg>

                  </div>

                  <p className="mt-2 text-sm text-[#8a9ba0]">
                    No available time slots for this date.
                  </p>

                </div>

              )}

            </div>

            {/* PAYMENT */}
            <div className="mt-7 pt-6 border-t border-[#e8f1f3]">

              <p className="text-xs font-bold uppercase tracking-[0.1em] text-[#7b9096]">
                Payment Method
              </p>

              <p className="mt-1 text-[11px] text-[#9aa9ad]">
                Choose how you would like to pay for your consultation.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Online */}
                <label
                  className={`group relative flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'Online'
                      ? 'border-[#19b7c8] bg-[#f1fbfc] shadow-sm'
                      : 'border-[#dceff2] bg-white hover:border-[#b9e3e7] hover:-translate-y-0.5'
                  }`}
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Online"
                    checked={paymentMethod === 'Online'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="accent-[#087f91]"
                  />

                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#e8f8fa] text-[#087f91] flex items-center justify-center">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="2"
                        y="5"
                        width="20"
                        height="14"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        d="M2 10h20"
                      />

                    </svg>

                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#082b3a]">
                      Pay Online
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#7c9096]">
                      Secure Razorpay payment
                    </p>

                  </div>

                  {paymentMethod === 'Online' && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#087f91] text-white flex items-center justify-center">

                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12l4 4L19 6"
                        />
                      </svg>

                    </span>
                  )}

                </label>

                {/* Cash */}
                <label
                  className={`group relative flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all duration-300 ${
                    paymentMethod === 'Cash'
                      ? 'border-[#19b7c8] bg-[#f1fbfc] shadow-sm'
                      : 'border-[#dceff2] bg-white hover:border-[#b9e3e7] hover:-translate-y-0.5'
                  }`}
                >

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === 'Cash'}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                    className="accent-[#087f91]"
                  />

                  <div className="w-10 h-10 flex-shrink-0 rounded-xl bg-[#fff7e7] text-[#b77916] flex items-center justify-center">

                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="12"
                        rx="2"
                      />

                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                      />

                    </svg>

                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#082b3a]">
                      Pay by Cash
                    </p>

                    <p className="mt-0.5 text-[11px] text-[#7c9096]">
                      Pay at the hospital
                    </p>

                  </div>

                  {paymentMethod === 'Cash' && (
                    <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#087f91] text-white flex items-center justify-center">

                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12l4 4L19 6"
                        />
                      </svg>

                    </span>
                  )}

                </label>

              </div>

            </div>

            {/* SUMMARY */}
            <div className="mt-7 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#062b3a] via-[#056071] to-[#087f91]">

              <div className="relative p-5 sm:p-6">

                <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-[#19b7c8]/15 blur-2xl pointer-events-none" />

                <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">

                  <div>

                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-white/45">
                      Appointment Summary
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">

                      <span className="text-sm font-bold text-white">
                        {slotTime
                          ? slotTime
                          : 'Select a time'}
                      </span>

                      <span className="w-1 h-1 rounded-full bg-white/30" />

                      <span className="text-sm text-white/65">
                        {paymentMethod === 'Online'
                          ? 'Online Payment'
                          : 'Cash Payment'}
                      </span>

                    </div>

                    <p className="mt-1.5 text-xs text-white/45">
                      Consultation fee: {currencySymbol}
                      {docInfo.fees}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={bookAppointment}
                    className="group w-full sm:w-auto flex-shrink-0 flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-white text-[#056071] text-sm font-bold shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                  >

                    Book Appointment

                    <span className="w-7 h-7 rounded-full bg-[#e8f8fa] flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">

                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>

                    </span>

                  </button>

                </div>

              </div>

            </div>

            {/* Security */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-[#7c9096]">

              <svg
                className="w-4 h-4 text-[#18a875]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3l7 3v5c0 4.8-3 8-7 10-4-2-7-5.2-7-10V6l7-3z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4"
                />

              </svg>

              Secure appointment booking

            </div>

          </div>

        </div>

        {/* RELATED DOCTORS */}
        <div className="mt-14">

          <RelatedDoctors
            docId={docID}
            speciality={docInfo.speciality}
          />

        </div>

      </div>

    </section>
  )
}

export default Appointment