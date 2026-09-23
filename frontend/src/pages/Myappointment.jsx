import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import { AppContext } from '../context/AppContext'

const Myappointment = () => {
  const {
    backendUrl,
    token
  } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('-')

    return (
      dateArray[2] +
      ' ' +
      month[Number(dateArray[1]) - 1] +
      ' ' +
      dateArray[0]
    )
  }

  // Get user appointments
  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/appointments',
        {
          headers: {
            token
          }
        }
      )

      if (data.success) {
        setAppointments(
          [...data.appointments].reverse()
        )
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(
        'APPOINTMENT ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        error.message
      )
    }
  }

  // Cancel appointment
  const cancelAppointment = async (appointmentId) => {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment?'
    )

    if (!confirmCancel) {
      return
    }

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-appointment',
        {
          appointmentId
        },
        {
          headers: {
            token
          }
        }
      )

      if (data.success) {
        toast.success(data.message)
        await getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(
        'CANCEL ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        error.message
      )
    }
  }

  // Razorpay payment
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: 'MediAssist',

      description: 'Appointment Payment',

      order_id: order.id,

      handler: async (response) => {
        console.log(
          'RAZORPAY RESPONSE:',
          response
        )

        try {
          const { data } = await axios.post(
            backendUrl + '/api/user/verifyRazorpay',
            {
              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature
            },
            {
              headers: {
                token
              }
            }
          )

          console.log(
            'VERIFY RESPONSE:',
            data
          )

          if (data.success) {
            toast.success(
              'Payment successful'
            )

            await getUserAppointments()
          } else {
            toast.error(
              data.message
            )
          }
        } catch (error) {
          console.log(
            'VERIFY PAYMENT ERROR:',
            error
          )

          toast.error(
            error.response?.data?.message ||
            error.message
          )
        }
      },

      modal: {
        ondismiss: () => {
          toast.info(
            'Payment cancelled'
          )
        }
      },

      theme: {
        color: '#087f91'
      }
    }

    const rzp = new window.Razorpay(options)

    rzp.on(
      'payment.failed',
      (response) => {
        console.log(
          'PAYMENT FAILED:',
          response
        )

        toast.error(
          response.error?.description ||
          'Payment failed'
        )
      }
    )

    rzp.open()
  }

  // Create Razorpay order
  const appointmentRazorpay = async (appointment) => {
    if (appointment.paymentMethod === 'Cash') {
      toast.info(
        'Please pay the appointment fee at the hospital'
      )

      return
    }

    if (appointment.payment) {
      toast.info(
        'Appointment is already paid'
      )

      return
    }

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-razorpay',
        {
          appointmentId: appointment._id
        },
        {
          headers: {
            token
          }
        }
      )

      if (data.success) {
        console.log(
          'RAZORPAY ORDER:',
          data.order
        )

        initPay(data.order)
      } else {
        toast.error(
          data.message
        )
      }
    } catch (error) {
      console.log(
        'RAZORPAY ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        error.message
      )
    }
  }

  // Load appointments
  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <section className="relative py-8 sm:py-10 lg:py-12 pb-16">

      {/* Background decoration */}
      <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-[#19b7c8]/5 blur-3xl pointer-events-none" />

      <div className="relative">

        {/* HEADER */}
        <div className="mb-8 sm:mb-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f8fa] border border-[#d2eef1] text-[#087f91] text-[10px] sm:text-[11px] font-bold tracking-wide">

                <span className="relative flex w-2 h-2">

                  <span className="absolute inline-flex w-full h-full rounded-full bg-[#19b7c8] opacity-60 animate-ping" />

                  <span className="relative inline-flex w-2 h-2 rounded-full bg-[#19b7c8]" />

                </span>

                HEALTHCARE SCHEDULE

              </div>

              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#082b3a]">
                My Appointments
              </h1>

              <p className="mt-2 max-w-xl text-sm sm:text-[15px] text-[#6c8188] leading-6">
                Manage your upcoming consultations, payment status
                and appointment history in one place.
              </p>

            </div>

            {appointments.length > 0 && (

              <div className="flex items-center gap-3 w-fit px-4 py-3 rounded-2xl bg-white border border-[#dceff2] shadow-sm">

                <div className="w-9 h-9 rounded-xl bg-[#e8f8fa] flex items-center justify-center">

                  <svg
                    className="w-4 h-4 text-[#087f91]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="17"
                      rx="2"
                    />

                    <path
                      strokeLinecap="round"
                      d="M16 2v4M8 2v4M3 10h18"
                    />
                  </svg>

                </div>

                <div>

                  <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8a9ba0]">
                    Total
                  </p>

                  <p className="text-sm font-bold text-[#082b3a]">
                    {appointments.length}{' '}
                    {appointments.length === 1
                      ? 'Appointment'
                      : 'Appointments'}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

        {/* EMPTY STATE */}
        {appointments.length === 0 ? (

          <div className="relative overflow-hidden rounded-[28px] bg-white border border-[#dceff2] shadow-[0_15px_45px_rgba(8,43,58,0.05)]">

            <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-[#19b7c8]/5 blur-3xl" />

            <div className="relative min-h-[430px] flex items-center justify-center px-5 py-12">

              <div className="max-w-sm text-center">

                <div className="relative w-24 h-24 mx-auto">

                  <div className="absolute inset-2 rounded-[28px] bg-[#dff5f7] rotate-6" />

                  <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#eaf9fa] to-[#d9f3f5] border border-[#d1edf0] flex items-center justify-center text-[#087f91]">

                    <svg
                      className="w-10 h-10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="3"
                        y="4"
                        width="18"
                        height="17"
                        rx="2"
                      />

                      <path
                        strokeLinecap="round"
                        d="M16 2v4M8 2v4M3 10h18"
                      />

                      <path
                        strokeLinecap="round"
                        d="M8 14h2M14 14h2M8 18h2"
                      />
                    </svg>

                  </div>

                </div>

                <h2 className="mt-7 text-xl font-bold text-[#082b3a]">
                  No appointments yet
                </h2>

                <p className="mt-2 text-sm text-[#6c8188] leading-6">
                  Your upcoming and previous appointments will
                  appear here once you book a doctor.
                </p>

                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#f4fbfc] border border-[#e1f1f3]">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#19b7c8]" />

                  <span className="text-xs text-[#6c8188]">
                    Your healthcare journey starts here
                  </span>

                </div>

              </div>

            </div>

          </div>

        ) : (

          <div className="space-y-5">

            {appointments.map((item, index) => (

              <article
                key={item._id || index}
                className={`group relative overflow-hidden rounded-[24px] bg-white border shadow-[0_10px_35px_rgba(8,43,58,0.045)] transition-all duration-300 ${
                  item.cancelled
                    ? 'border-[#f0dfe1]'
                    : 'border-[#dceff2] hover:-translate-y-1 hover:border-[#19b7c8]/30 hover:shadow-[0_18px_45px_rgba(8,127,145,0.09)]'
                }`}
              >

                {/* Top accent */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] ${
                    item.cancelled
                      ? 'bg-[#e7a8ae]'
                      : item.payment
                        ? 'bg-[#18a875]'
                        : 'bg-gradient-to-r from-[#087f91] to-[#19b7c8]'
                  }`}
                />

                <div className="p-4 sm:p-5 lg:p-6">

                  <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.5fr] gap-5 lg:gap-6">

                    {/* DOCTOR */}
                    <div className="relative rounded-2xl bg-gradient-to-br from-[#f7fcfd] to-[#edf9fa] border border-[#dceff2] p-4">

                      <div className="flex gap-4">

                        <div className="relative flex-shrink-0">

                          <img
                            src={item.docData?.image}
                            alt={item.docData?.name || 'Doctor'}
                            className={`w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-white shadow-sm ${
                              item.cancelled
                                ? 'grayscale opacity-70'
                                : 'group-hover:scale-[1.025]'
                            } transition-all duration-500`}
                          />

                          <span
                            className={`absolute bottom-2 right-2 w-3 h-3 rounded-full border-2 border-white ${
                              item.cancelled
                                ? 'bg-[#aeb9bc]'
                                : 'bg-[#18a875] shadow-[0_0_0_4px_rgba(24,168,117,0.12)]'
                            }`}
                          />

                        </div>

                        <div className="min-w-0 pt-1">

                          <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-[#8a9ba0]">
                            Doctor
                          </p>

                          <h2 className="mt-1 text-base sm:text-lg font-bold text-[#082b3a] leading-6">
                            {item.docData?.name}
                          </h2>

                          <p className="mt-1 text-sm font-semibold text-[#087f91]">
                            {item.docData?.speciality}
                          </p>

                        </div>

                      </div>

                      {/* Address */}
                      <div className="mt-4 pt-4 border-t border-[#dceff2] flex items-start gap-2.5">

                        <div className="w-8 h-8 flex-shrink-0 rounded-lg bg-white border border-[#dceff2] flex items-center justify-center">

                          <svg
                            className="w-4 h-4 text-[#19b7c8]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 21s7-5.2 7-11a7 7 0 10-14 0c0 5.8 7 11 7 11z"
                            />

                            <circle
                              cx="12"
                              cy="10"
                              r="2"
                            />

                          </svg>

                        </div>

                        <div>

                          <p className="text-[10px] uppercase tracking-wide font-semibold text-[#8a9ba0]">
                            Clinic
                          </p>

                          <p className="mt-1 text-xs text-[#6c8188] leading-5">

                            {item.docData?.address?.line1}

                            {item.docData?.address?.line2 && (
                              <>
                                <br />
                                {item.docData.address.line2}
                              </>
                            )}

                          </p>

                        </div>

                      </div>

                    </div>

                    {/* DETAILS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {/* DATE */}
                      <div className="rounded-2xl bg-[#f8fcfd] border border-[#e1f1f3] p-4 hover:border-[#bfe4e8] transition-colors">

                        <div className="flex items-center gap-2.5">

                          <div className="w-8 h-8 rounded-xl bg-[#e5f7f9] text-[#087f91] flex items-center justify-center">

                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              viewBox="0 0 24 24"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="17"
                                rx="2"
                              />

                              <path
                                strokeLinecap="round"
                                d="M16 2v4M8 2v4M3 10h18"
                              />

                            </svg>

                          </div>

                          <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#8a9ba0]">
                            Date & Time
                          </p>

                        </div>

                        <p className="mt-3 text-sm font-bold text-[#082b3a]">
                          {slotDateFormat(item.slotDate)}
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#087f91]">
                          {item.slotTime}
                        </p>

                      </div>

                      {/* FEE */}
                      <div className="rounded-2xl bg-[#f8fcfd] border border-[#e1f1f3] p-4 hover:border-[#bfe4e8] transition-colors">

                        <div className="flex items-center gap-2.5">

                          <div className="w-8 h-8 rounded-xl bg-[#e5f7f9] text-[#087f91] flex items-center justify-center">

                            <span className="text-sm font-bold">
                              ₹
                            </span>

                          </div>

                          <p className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#8a9ba0]">
                            Appointment Fee
                          </p>

                        </div>

                        <p className="mt-3 text-lg font-bold text-[#082b3a]">
                          ₹{item.amount}
                        </p>

                        <p className="mt-1 text-xs text-[#6c8188]">
                          {item.paymentMethod === 'Cash'
                            ? 'Pay at hospital'
                            : 'Online payment'}
                        </p>

                      </div>

                      {/* PAYMENT */}
                      <div className="sm:col-span-2 rounded-2xl bg-[#f8fcfd] border border-[#e1f1f3] p-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                          <div className="flex items-center gap-3">

                            <div className="w-9 h-9 rounded-xl bg-[#e5f7f9] text-[#087f91] flex items-center justify-center">

                              {item.paymentMethod === 'Cash' ? (

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

                              ) : (

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

                              )}

                            </div>

                            <div>

                              <p className="text-[10px] uppercase tracking-wide font-semibold text-[#8a9ba0]">
                                Payment Method
                              </p>

                              <p className="mt-0.5 text-sm font-semibold text-[#082b3a]">
                                {item.paymentMethod === 'Cash'
                                  ? 'Cash Payment'
                                  : 'Online Payment'}
                              </p>

                            </div>

                          </div>

                          {/* PAYMENT STATUS */}
                          {!item.cancelled && (

                            <div>

                              {item.paymentMethod === 'Cash' ? (

                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff7e7] text-[#b77916] text-xs font-semibold border border-[#f4dfb4]">

                                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93d]" />

                                  Cash Payment

                                </span>

                              ) : item.payment ? (

                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaf9f3] text-[#13845e] text-xs font-semibold border border-[#ccefe0]">

                                  <span className="w-1.5 h-1.5 rounded-full bg-[#18a875]" />

                                  Payment Complete

                                </span>

                              ) : (

                                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fff7e7] text-[#b77916] text-xs font-semibold border border-[#f4dfb4]">

                                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93d]" />

                                  Payment Pending

                                </span>

                              )}

                            </div>

                          )}

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* ACTION BAR */}
                <div className="px-4 sm:px-5 lg:px-6 py-4 bg-[#fbfeff] border-t border-[#e5f1f3]">

                  {item.cancelled ? (

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-[#fff0f1] text-[#c84f59] flex items-center justify-center">

                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            d="M6 6l12 12M18 6L6 18"
                          />
                        </svg>

                      </div>

                      <div>

                        <p className="text-sm font-semibold text-[#c84f59]">
                          Appointment Cancelled
                        </p>

                        <p className="text-[10px] text-[#a77b7f]">
                          This appointment is no longer active.
                        </p>

                      </div>

                    </div>

                  ) : (

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2.5">

                      {/* Cash */}
                      {item.paymentMethod === 'Cash' && (

                        <div className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#fff7e7] border border-[#f4dfb4] text-[#b77916] text-xs font-semibold">

                          <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93d]" />

                          Pay at Hospital

                        </div>

                      )}

                      {/* Online unpaid */}
                      {item.paymentMethod !== 'Cash' &&
                      !item.payment && (

                        <button
                          type="button"
                          onClick={() =>
                            appointmentRazorpay(item)
                          }
                          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#087f91] to-[#19b7c8] text-white text-sm font-semibold shadow-[0_8px_20px_rgba(8,127,145,0.18)] hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(8,127,145,0.25)] transition-all duration-300"
                        >

                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
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

                          Pay Online

                        </button>

                      )}

                      {/* Online paid */}
                      {item.paymentMethod !== 'Cash' &&
                      item.payment && (

                        <div className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#eaf9f3] border border-[#ccefe0] text-[#13845e] text-sm font-semibold">

                          <svg
                            className="w-4 h-4"
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

                          Paid Online

                        </div>

                      )}

                      {/* Cancel */}
                      <button
                        type="button"
                        onClick={() =>
                          cancelAppointment(item._id)
                        }
                        className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-[#efd5d8] bg-white text-[#c84f59] text-sm font-semibold hover:bg-[#fff2f3] hover:border-[#e4b7bc] hover:-translate-y-0.5 transition-all duration-300"
                      >
                        Cancel Appointment
                      </button>

                    </div>

                  )}

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </section>
  )
}

export default Myappointment