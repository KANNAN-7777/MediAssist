import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import userModel from '../models/userModel.js'
import appointmentModel from '../models/appointmentModel.js'
import doctorModel from '../models/doctorModel.js'

import { v2 as cloudinary } from 'cloudinary'
import razorpay from 'razorpay'


// API for user registration
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: 'Missing Details'
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

    const existingUser = await userModel.findOne({
      email: cleanEmail
    })

    if (existingUser) {
      return res.json({
        success: false,
        message: 'User already exists'
      })
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const user = await userModel.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword
    })

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    )

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token
    })

  } catch (error) {

    console.log(
      'REGISTER ERROR:',
      error
    )

    if (error.code === 11000) {
      return res.json({
        success: false,
        message: 'User already exists'
      })
    }

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API for user login
const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body

    if (!email || !password) {
      return res.json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const cleanEmail = email.trim().toLowerCase()

    const user = await userModel.findOne({
      email: cleanEmail
    })

    if (!user) {
      return res.json({
        success: false,
        message: 'User does not exist'
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    )

    return res.json({
      success: true,
      message: 'Login successful',
      token
    })

  } catch (error) {

    console.log(
      'LOGIN ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API for user profile
const getProfile = async (req, res) => {
  try {

    const userData = await userModel
      .findById(req.userId)
      .select('-password')

    if (!userData) {
      return res.json({
        success: false,
        message: 'User not found'
      })
    }

    return res.json({
      success: true,
      userData
    })

  } catch (error) {

    console.log(
      'PROFILE ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to update user profile
const updateProfile = async (req, res) => {
  try {

    const {
      name,
      phone,
      address,
      dob,
      gender
    } = req.body

    const userId = req.userId
    const imageFile = req.file

    if (!userId) {
      return res.json({
        success: false,
        message: 'Not Authorized'
      })
    }

    if (!name || !phone) {
      return res.json({
        success: false,
        message: 'Name and phone are required'
      })
    }

    let parsedAddress = {
      line1: '',
      line2: ''
    }

    if (address) {
      try {

        parsedAddress = JSON.parse(address)

      } catch (error) {

        return res.json({
          success: false,
          message: 'Invalid address format'
        })
      }
    }

    const updateData = {
      name: name.trim(),
      phone: phone.trim(),
      address: parsedAddress,
      dob: dob || 'Not Selected',
      gender: gender || 'Not Selected'
    }

    if (imageFile) {

      const imageUpload =
        await cloudinary.uploader.upload(
          imageFile.path,
          {
            resource_type: 'image'
          }
        )

      updateData.image =
        imageUpload.secure_url
    }

    await userModel.findByIdAndUpdate(
      userId,
      updateData
    )

    return res.json({
      success: true,
      message: 'Profile updated successfully'
    })

  } catch (error) {

    console.log(
      'UPDATE PROFILE ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId

    const {
      docId,
      slotDate,
      slotTime,
      paymentMethod
    } = req.body

    if (
      !userId ||
      !docId ||
      !slotDate ||
      !slotTime ||
      !paymentMethod
    ) {
      return res.json({
        success: false,
        message: 'Missing Details'
      })
    }

    if (!['Online', 'Cash'].includes(paymentMethod)) {
      return res.json({
        success: false,
        message: 'Invalid payment method'
      })
    }

    const userData = await userModel
      .findById(userId)
      .select('-password')

    if (!userData) {
      return res.json({
        success: false,
        message: 'User not found'
      })
    }

    const docData = await doctorModel
      .findById(docId)
      .select('-password')

    if (!docData) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }

    if (!docData.available) {
      return res.json({
        success: false,
        message: 'Doctor is not available'
      })
    }

    const slotsBooked = {
      ...(docData.slots_booked || {})
    }

    if (!slotsBooked[slotDate]) {
      slotsBooked[slotDate] = []
    }

    if (slotsBooked[slotDate].includes(slotTime)) {
      return res.json({
        success: false,
        message: 'Slot is already booked'
      })
    }

    slotsBooked[slotDate].push(slotTime)

    await doctorModel.findByIdAndUpdate(
      docId,
      {
        slots_booked: slotsBooked
      }
    )

    await appointmentModel.create({
      userId,
      docId: docData._id.toString(),
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
      cancelled: false,
      payment: false,
      paymentMethod,
      isCompleted: false
    })

    return res.json({
      success: true,
      message: 'Appointment booked successfully'
    })

  } catch (error) {
    console.log('BOOK APPOINTMENT ERROR:', error)

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// API to get user appointments
const listAppointment = async (req, res) => {
  try {

    const userId = req.userId

    if (!userId) {
      return res.json({
        success: false,
        message: 'Not Authorized'
      })
    }

    const appointments =
      await appointmentModel.find({
        userId
      })

    return res.json({
      success: true,
      appointments
    })

  } catch (error) {

    console.log(
      'LIST APPOINTMENTS ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId
    const { appointmentId } = req.body

    if (!userId || !appointmentId) {
      return res.json({
        success: false,
        message: 'Missing Details'
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

if (appointmentData.userId !== req.userId) {
  return res.json({
    success: false,
    message: 'Not Authorized'
  })
}

    // Already cancelled appointment
    // Check whether refund is still pending
    if (appointmentData.cancelled) {

      if (
        appointmentData.paymentMethod === 'Online' &&
        appointmentData.payment === true &&
        appointmentData.razorpayPaymentId &&
        appointmentData.refund !== true
      ) {
        try {
          const refundData = await razorpayInstance.payments.refund(
            appointmentData.razorpayPaymentId,
            {
              amount: appointmentData.amount * 100
            }
          )

          appointmentData.refund = true
          appointmentData.refundId = refundData.id

          await appointmentData.save()

          return res.json({
            success: true,
            message: 'Refund initiated successfully',
            refund: true,
            refundId: refundData.id
          })

        } catch (error) {
          console.log('REFUND ERROR:', error)

          return res.json({
            success: false,
            message: error.message
          })
        }
      }

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

    // REFUND ONLY FOR PAID ONLINE APPOINTMENTS
    if (
      appointmentData.paymentMethod === 'Online' &&
      appointmentData.payment === true &&
      appointmentData.razorpayPaymentId &&
      appointmentData.refund !== true
    ) {
      try {
        refundData = await razorpayInstance.payments.refund(
          appointmentData.razorpayPaymentId,
          {
            amount: appointmentData.amount * 100
          }
        )

        appointmentData.refund = true
        appointmentData.refundId = refundData.id

      } catch (error) {
        console.log('REFUND ERROR:', error)

        return res.json({
          success: false,
          message: 'Refund failed: ' + error.message
        })
      }
    }

    // Cancel appointment
    appointmentData.cancelled = true

    await appointmentData.save()

    // Release doctor slot
    const doctorData = await doctorModel.findById(
      appointmentData.docId
    )

    if (doctorData) {

      let slots_booked = doctorData.slots_booked

      if (
        slots_booked[appointmentData.slotDate] &&
        slots_booked[appointmentData.slotDate].includes(
          appointmentData.slotTime
        )
      ) {

        slots_booked[appointmentData.slotDate] =
          slots_booked[appointmentData.slotDate].filter(
            (slot) => slot !== appointmentData.slotTime
          )

        if (slots_booked[appointmentData.slotDate].length === 0) {
          delete slots_booked[appointmentData.slotDate]
        }

        await doctorModel.findByIdAndUpdate(
          appointmentData.docId,
          { slots_booked }
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

    console.log('CANCEL APPOINTMENT ERROR:', error)

    return res.json({
      success: false,
      message: error.message
    })
  }
}

// Razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})


// API to create Razorpay order
const paymentRazorpay = async (req, res) => {
  try {

    const userId = req.userId
    const { appointmentId } = req.body

    if (!userId || !appointmentId) {
      return res.json({
        success: false,
        message: 'Appointment ID is required'
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

    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: 'Not Authorized'
      })
    }

    if (appointmentData.cancelled) {
      return res.json({
        success: false,
        message: 'Appointment is cancelled'
      })
    }

    if (appointmentData.payment) {
      return res.json({
        success: false,
        message: 'Appointment is already paid'
      })
    }

    const options = {
      amount:
        Number(appointmentData.amount) * 100,

      currency:
        process.env.CURRENCY || 'INR',

      receipt:
        appointmentId.toString()
    }

    const order =
      await razorpayInstance.orders.create(
        options
      )

    console.log(
      'RAZORPAY ORDER:',
      order
    )

    return res.json({
      success: true,
      order
    })

  } catch (error) {

    console.log(
      'RAZORPAY CREATE ORDER ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


// API to verify Razorpay payment
const verifyRazorpay = async (req, res) => {
  try {

    console.log(
      'VERIFY BODY:',
      req.body
    )

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.json({
        success: false,
        message: 'Payment details are missing'
      })
    }

    const body =
      razorpay_order_id +
      '|' +
      razorpay_payment_id

    const expectedSignature =
      crypto
        .createHmac(
          'sha256',
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(body)
        .digest('hex')

    if (
      expectedSignature !==
      razorpay_signature
    ) {
      return res.json({
        success: false,
        message: 'Payment verification failed'
      })
    }

    const orderInfo =
      await razorpayInstance.orders.fetch(
        razorpay_order_id
      )

    const appointmentId =
      orderInfo.receipt

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

    if (appointmentData.payment) {
      return res.json({
        success: true,
        message: 'Payment already verified'
      })
    }

    appointmentData.payment = true
appointmentData.paymentMethod = 'Online'
appointmentData.razorpayPaymentId = razorpay_payment_id

await appointmentData.save()

    console.log(
      'PAYMENT UPDATED:',
      appointmentData._id,
      appointmentData.payment
    )

    return res.json({
      success: true,
      message: 'Payment verified successfully'
    })

  } catch (error) {

    console.log(
      'VERIFY PAYMENT ERROR:',
      error
    )

    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
}