import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'

import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// API to add doctor
const addDoctor = async (req, res) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body || {}

    const imageFile = req.file

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({
        success: false,
        message: 'Missing Details'
      })
    }

    if (!imageFile) {
      return res.json({
        success: false,
        message: 'Image is required'
      })
    }

    const cleanEmail = email.trim().toLowerCase()

    if (!validator.isEmail(cleanEmail)) {
      return res.json({
        success: false,
        message: 'Please enter a valid email'
      })
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: 'Please enter a strong password'
      })
    }

    const existingDoctor = await doctorModel.findOne({
      email: cleanEmail
    })

    if (existingDoctor) {
      return res.json({
        success: false,
        message: 'Doctor with this email already exists'
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const imageUpload = await cloudinary.uploader.upload(
      imageFile.path
    )

    const imageUrl = imageUpload.secure_url

    let parsedAddress

    try {
      parsedAddress = JSON.parse(address)
    } catch (error) {
      return res.json({
        success: false,
        message: 'Invalid address format'
      })
    }

    const doctorData = {
      name,
      email: cleanEmail,
      password: hashedPassword,
      image: imageUrl,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: parsedAddress,
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)

    await newDoctor.save()

    return res.json({
      success: true,
      message: 'Doctor Added'
    })

  } catch (error) {
    console.log('ADD DOCTOR ERROR:', error)

    if (error.code === 11000) {
      return res.json({
        success: false,
        message: 'Doctor with this email already exists'
      })
    }

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to login admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    const isValid =
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD

    if (isValid) {
      const token = jwt.sign(
        { email },
        process.env.JWT_SECRET
      )

      return res.json({
        success: true,
        token
      })
    }

    return res.json({
      success: false,
      message: 'Invalid credentials'
    })

  } catch (error) {
    console.log('ADMIN LOGIN ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to get all doctors
const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({})
      .select('-password')

    return res.json({
      success: true,
      doctors
    })

  } catch (error) {
    console.log('ALL DOCTORS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to change doctor availability
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
    console.log('CHANGE AVAILABILITY ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to get all appointments for admin
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({})
      .sort({ date: -1 })

    return res.json({
      success: true,
      appointments
    })

  } catch (error) {
    console.log('ADMIN APPOINTMENTS ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to cancel appointment by admin
const cancelAppointmentAdmin = async (req, res) => {
  try {
    const { appointmentId } = req.body

    if (!appointmentId) {
      return res.json({
        success: false,
        message: 'Appointment ID is required'
      })
    }

    const appointmentData =
      await appointmentModel.findById(appointmentId)

    if (!appointmentData) {
      return res.json({
        success: false,
        message: 'Appointment not found'
      })
    }

    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: 'Appointment already cancelled'
      })
    }

    // Mark appointment as cancelled
    appointmentData.cancelled = true

    await appointmentData.save()

    // Release doctor slot
    const doctorData = await doctorModel.findById(
      appointmentData.docId
    )

    if (doctorData) {

      const slotsBooked = {
        ...(doctorData.slots_booked || {})
      }

      if (slotsBooked[appointmentData.slotDate]) {

        slotsBooked[appointmentData.slotDate] =
          slotsBooked[appointmentData.slotDate].filter(
            slot => slot !== appointmentData.slotTime
          )

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
      message: 'Appointment cancelled successfully'
    })

  } catch (error) {
    console.log(
      'ADMIN CANCEL APPOINTMENT ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
  try {

    const doctors = await doctorModel.find({})
    const users = await userModel.find({})
    const appointments = await appointmentModel.find({})

    const cancelledAppointments = appointments.filter(
      item => item.cancelled
    )

    // Temporary refund count
    // Paid appointments which were cancelled
    const refunds = appointments.filter(
      item => item.cancelled && item.payment
    )

    const latestAppointments = [...appointments]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5)

    const dashData = {
      doctors: doctors.length,
      users: users.length,
      appointments: appointments.length,
      cancelledAppointments: cancelledAppointments.length,
      refunds: refunds.length,
      latestAppointments
    }

    return res.json({
      success: true,
      dashData
    })

  } catch (error) {

    console.log(
      'ADMIN DASHBOARD ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
export {
  addDoctor,
  loginAdmin,
  allDoctors,
  changeAvailable,
  appointmentsAdmin,
  cancelAppointmentAdmin,
  adminDashboard
}