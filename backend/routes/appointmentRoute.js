import express from 'express'
import authUser from '../middlewares/authUser.js'
import { bookAppointment } from '../controllers/appointmentController.js'

const appointmentRouter = express.Router()

appointmentRouter.post(
  '/book-appointment',
  authUser,
  bookAppointment
)

export default appointmentRouter