import express from 'express'

import {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  cancelAppointmentAdmin,
  adminDashboard
} from '../controllers/adminControler.js'

import {
  changeAvailable
} from '../controllers/doctorController.js'

import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()


// Admin login
adminRouter.post(
  '/login',
  loginAdmin
)


// Add doctor
adminRouter.post(
  '/add-doctor',
  upload.single('image'),
  authAdmin,
  addDoctor
)


// Get all doctors
adminRouter.post(
  '/all-doctors',
  authAdmin,
  allDoctors
)


// Change doctor availability
adminRouter.post(
  '/change-availability',
  authAdmin,
  changeAvailable
)


// Get all appointments
adminRouter.get(
  '/appointments',
  authAdmin,
  appointmentsAdmin
)


// Cancel appointment
adminRouter.post(
  '/cancel-appointment',
  authAdmin,
  cancelAppointmentAdmin
)


// Admin dashboard
adminRouter.get(
  '/dashboard',
  authAdmin,
  adminDashboard
)


export default adminRouter