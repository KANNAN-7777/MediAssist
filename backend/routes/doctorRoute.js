import express from 'express'

import {
  doctorList,
  loginDoctor,
  doctorAppointments,
  cancelAppointmentDoctor,
  doctorProfile,
  changeAvailabilityDoctor,
  updateDoctorProfile
} from '../controllers/doctorController.js'

import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)

doctorRouter.post('/login', loginDoctor)

doctorRouter.get(
  '/appointments',
  authDoctor,
  doctorAppointments
)

doctorRouter.post(
  '/cancel-appointment',
  authDoctor,
  cancelAppointmentDoctor
)

doctorRouter.get(
  '/profile',
  authDoctor,
  doctorProfile
)

doctorRouter.post(
  '/change-availability',
  authDoctor,
  changeAvailabilityDoctor
)

doctorRouter.post(
  '/update-profile',
  authDoctor,
  updateDoctorProfile
)

export default doctorRouter