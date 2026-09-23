import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'


// API to get all doctors
const getDoctors = async (req, res) => {
  try {

    const doctors = await doctorModel
      .find({})
      .select('-password')

    return res.json({
      success: true,
      doctors
    })

  } catch (error) {

    console.log(
      'GET DOCTORS ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to change doctor availability by admin
const changeAvailable = async (req, res) => {
  try {

    const { docId } = req.body

    if (!docId) {
      return res.json({
        success: false,
        message: 'Doctor ID is required'
      })
    }

    const doctor = await doctorModel.findById(docId)

    if (!doctor) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }

    doctor.available = !doctor.available

    await doctor.save()

    return res.json({
      success: true,
      message: 'Availability changed successfully',
      available: doctor.available
    })

  } catch (error) {

    console.log(
      'CHANGE AVAILABILITY ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to get doctors for frontend
const doctorList = async (req, res) => {
  try {

    const doctors = await doctorModel
      .find({})
      .select('-password -email')

    return res.json({
      success: true,
      doctors
    })

  } catch (error) {

    console.log(
      'DOCTOR LIST ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API for doctor login
const loginDoctor = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const cleanEmail = email
      .trim()
      .toLowerCase()

    const doctor = await doctorModel.findOne({
      email: cleanEmail
    })

    if (!doctor) {
      return res.json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      doctor.password
    )

    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid credentials'
      })
    }

    const token = jwt.sign(
      {
        id: doctor._id
      },
      process.env.JWT_SECRET
    )

    return res.json({
      success: true,
      message: 'Login successful',
      token
    })

  } catch (error) {

    console.log(
      'DOCTOR LOGIN ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to get doctor appointments
const doctorAppointments = async (req, res) => {
  try {

    const doctorId = req.doctorId

    console.log(
      'LOGGED IN DOCTOR ID:',
      doctorId
    )

    const appointments = await appointmentModel
      .find({
        docId: doctorId
      })
      .sort({
        date: -1
      })

    console.log(
      'APPOINTMENT COUNT:',
      appointments.length
    )

    console.log(
      'APPOINTMENT DOCTOR IDS:',
      appointments.map(
        item => item.docId
      )
    )

    return res.json({
      success: true,
      appointments
    })

  } catch (error) {

    console.log(
      'DOCTOR APPOINTMENTS ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to cancel appointment by doctor
const cancelAppointmentDoctor = async (req, res) => {
  try {

    const doctorId = req.doctorId
    const { appointmentId } = req.body

    if (!doctorId || !appointmentId) {
      return res.json({
        success: false,
        message: 'Missing Details'
      })
    }

    const appointmentData =
      await appointmentModel.findById(
        appointmentId
      )

    if (!appointmentData) {
      return res.json({
        success: false,
        message: 'Appointment not found'
      })
    }

    if (appointmentData.docId !== doctorId) {
      return res.json({
        success: false,
        message: 'Not Authorized'
      })
    }

    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: 'Appointment already cancelled'
      })
    }

    if (appointmentData.isCompleted) {
      return res.json({
        success: false,
        message: 'Completed appointment cannot be cancelled'
      })
    }

    let refundData = null


    // Refund ONLY for paid online appointments
    if (
      appointmentData.paymentMethod === 'Online' &&
      appointmentData.payment === true &&
      appointmentData.razorpayPaymentId &&
      appointmentData.refund !== true
    ) {

      refundData =
        await razorpayInstance.payments.refund(
          appointmentData.razorpayPaymentId,
          {
            amount:
              appointmentData.amount * 100
          }
        )

      appointmentData.refund = true
      appointmentData.refundId =
        refundData.id
    }


    appointmentData.cancelled = true

    await appointmentData.save()


    // Release doctor slot
    const doctorData =
      await doctorModel.findById(
        appointmentData.docId
      )

    if (doctorData) {

      const slotsBooked = {
        ...(doctorData.slots_booked || {})
      }

      if (
        slotsBooked[
          appointmentData.slotDate
        ]
      ) {

        slotsBooked[
          appointmentData.slotDate
        ] =
          slotsBooked[
            appointmentData.slotDate
          ].filter(
            slot =>
              slot !== appointmentData.slotTime
          )

        if (
          slotsBooked[
            appointmentData.slotDate
          ].length === 0
        ) {

          delete slotsBooked[
            appointmentData.slotDate
          ]

        }

        await doctorModel.findByIdAndUpdate(
          appointmentData.docId,
          {
            slots_booked: slotsBooked
          }
        )
      }
    }


    return res.json({
      success: true,

      message: refundData
        ? 'Appointment cancelled and refund initiated'
        : 'Appointment cancelled successfully',

      refund: !!refundData
    })

  } catch (error) {

    console.log(
      'DOCTOR CANCEL APPOINTMENT ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to get logged-in doctor profile
const doctorProfile = async (req, res) => {
  try {

    const doctorId = req.doctorId

    if (!doctorId) {
      return res.json({
        success: false,
        message: 'Doctor ID not found'
      })
    }

    const doctor =
      await doctorModel
        .findById(doctorId)
        .select('-password')

    if (!doctor) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }

    return res.json({
      success: true,
      doctor
    })

  } catch (error) {

    console.log(
      'DOCTOR PROFILE ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to change availability by logged-in doctor
const changeAvailabilityDoctor = async (req, res) => {
  try {

    const doctorId = req.doctorId

    if (!doctorId) {
      return res.json({
        success: false,
        message: 'Doctor ID not found'
      })
    }

    const doctor =
      await doctorModel.findById(doctorId)

    if (!doctor) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }

    doctor.available = !doctor.available

    await doctor.save()

    return res.json({
      success: true,
      message: 'Availability changed successfully',
      available: doctor.available
    })

  } catch (error) {

    console.log(
      'DOCTOR AVAILABILITY ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// Razorpay
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})
// API to update logged-in doctor profile
const updateDoctorProfile = async (req, res) => {
  try {

    const doctorId = req.doctorId

    if (!doctorId) {
      return res.json({
        success: false,
        message: 'Doctor ID not found'
      })
    }

    const {
      name,
      degree,
      speciality,
      experience,
      fees,
      address,
      about
    } = req.body

    if (
      !name ||
      !degree ||
      !speciality ||
      !experience ||
      fees === undefined ||
      !about
    ) {
      return res.json({
        success: false,
        message: 'Please fill all required details'
      })
    }

    const doctor = await doctorModel.findById(doctorId)

    if (!doctor) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }


    doctor.name = name
    doctor.degree = degree
    doctor.speciality = speciality
    doctor.experience = experience
    doctor.fees = Number(fees)
    doctor.about = about


    if (address) {

      doctor.address = {
        line1: address.line1 || '',
        line2: address.line2 || ''
      }

    }


    await doctor.save()


    // Get updated doctor information
    const updatedDoctor = await doctorModel
      .findById(doctorId)
      .select('-password')


    // Update doctor information inside existing appointments
    await appointmentModel.updateMany(
      {
        docId: doctorId
      },
      {
        $set: {
          docData: {
            _id: updatedDoctor._id,
            name: updatedDoctor.name,
            image: updatedDoctor.image,
            speciality: updatedDoctor.speciality,
            degree: updatedDoctor.degree,
            experience: updatedDoctor.experience,
            fees: updatedDoctor.fees,
            address: updatedDoctor.address
          }
        }
      }
    )


    return res.json({
      success: true,
      message: 'Profile updated successfully',
      doctor: updatedDoctor
    })


  } catch (error) {

    console.log(
      'UPDATE DOCTOR PROFILE ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export {
  getDoctors,
  changeAvailable,
  doctorList,
  loginDoctor,
  doctorAppointments,
  cancelAppointmentDoctor,
  doctorProfile,
  changeAvailabilityDoctor,
  updateDoctorProfile
}