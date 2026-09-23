import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers

    console.log('DOCTOR TOKEN RECEIVED:', dtoken)

    if (!dtoken) {
      return res.json({
        success: false,
        message: 'Not Authorized. Login Again'
      })
    }

    const token_decode = jwt.verify(
      dtoken,
      process.env.JWT_SECRET
    )

    console.log('TOKEN DOCTOR ID:', token_decode.id)

    const doctor = await doctorModel.findById(token_decode.id)

    if (!doctor) {
      return res.json({
        success: false,
        message: 'Doctor not found'
      })
    }

    req.doctorId = doctor._id.toString()

    console.log('REQ DOCTOR ID:', req.doctorId)

    next()

  } catch (error) {
    console.log('AUTH DOCTOR ERROR:', error)

    return res.json({
      success: false,
      message: 'Not Authorized. Login Again'
    })
  }
}

export default authDoctor