import express from 'express'

import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
} from '../controllers/userController.js'

import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

const userRouter = express.Router()

// Register
userRouter.post(
  '/register',
  registerUser
)

// Login
userRouter.post(
  '/login',
  loginUser
)

// Get profile
userRouter.get(
  '/get-profile',
  authUser,
  getProfile
)

// Update profile
userRouter.post(
  '/update-profile',
  upload.single('image'),
  authUser,
  updateProfile
)

// Book appointment
userRouter.post(
  '/book-appointment',
  authUser,
  bookAppointment
)

// User appointments
userRouter.get(
  '/appointments',
  authUser,
  listAppointment
)

// Cancel appointment
userRouter.post(
  '/cancel-appointment',
  authUser,
  cancelAppointment
)

// Razorpay payment
userRouter.post(
  '/payment-razorpay',
  authUser,
  paymentRazorpay
)

// Verify Razorpay payment
userRouter.post(
  '/verifyRazorpay',
  authUser,
  verifyRazorpay
)

export default userRouter