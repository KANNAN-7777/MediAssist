import { createContext, useState } from 'react'
import axios from 'axios'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [dToken, setDToken] = useState(
    localStorage.getItem('dToken') || ''
  )

  const [appointments, setAppointments] = useState([])

  const [doctorData, setDoctorData] = useState(null)


  const getAppointments = async () => {

    try {

      if (!dToken) return

      const { data } = await axios.get(
        backendUrl + '/api/doctor/appointments',
        {
          headers: {
            dtoken: dToken
          }
        }
      )

      if (data.success) {
        setAppointments(data.appointments || [])
      }

    } catch (error) {

      console.log(
        'GET APPOINTMENTS ERROR:',
        error.response?.data || error.message
      )

    }

  }


  const getDoctorProfile = async () => {

    try {

      if (!dToken) return

      const { data } = await axios.get(
        backendUrl + '/api/doctor/profile',
        {
          headers: {
            dtoken: dToken
          }
        }
      )

      if (data.success) {
        setDoctorData(data.doctor)
      }

    } catch (error) {

      console.log(
        'GET DOCTOR PROFILE ERROR:',
        error.response?.data || error.message
      )

    }

  }


  const changeAvailability = async () => {

    try {

      if (!dToken) {
        return {
          success: false,
          message: 'Doctor is not logged in'
        }
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/change-availability',
        {},
        {
          headers: {
            dtoken: dToken
          }
        }
      )

      if (data.success) {

        setDoctorData(prev => ({
          ...prev,
          available: data.available
        }))

      }

      return data

    } catch (error) {

      console.log(
        'CHANGE AVAILABILITY ERROR:',
        error.response?.data || error.message
      )

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message
      }

    }

  }


  const updateDoctorProfile = async (profileData) => {

    try {

      if (!dToken) {
        return {
          success: false,
          message: 'Doctor is not logged in'
        }
      }

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        profileData,
        {
          headers: {
            dtoken: dToken
          }
        }
      )

      if (data.success) {
        setDoctorData(data.doctor)
      }

      return data

    } catch (error) {

      console.log(
        'UPDATE DOCTOR PROFILE ERROR:',
        error.response?.data || error.message
      )

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message
      }

    }

  }


  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(
        backendUrl + '/api/doctor/cancel-appointment',
        {
          appointmentId
        },
        {
          headers: {
            dtoken: dToken
          }
        }
      )

      if (data.success) {
        await getAppointments()
      }

      return data

    } catch (error) {

      console.log(
        'CANCEL APPOINTMENT ERROR:',
        error.response?.data || error.message
      )

      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message
      }

    }

  }


  const getPatientKey = (appointment) => {

    return (
      appointment?.userId?._id ||
      appointment?.userId ||
      appointment?.userData?._id ||
      appointment?.userData?.email ||
      appointment?.userData?.name ||
      appointment?.userEmail ||
      appointment?.email ||
      appointment?.userName ||
      appointment?.name ||
      'unknown-patient'
    )

  }


  const getPatientName = (appointment) => {

    return (
      appointment?.userData?.name ||
      appointment?.userId?.name ||
      appointment?.userName ||
      appointment?.name ||
      'Patient'
    )

  }


  const getPatientHistory = (patientKey) => {

    if (!patientKey) {
      return []
    }

    return appointments
      .filter(
        appointment =>
          String(getPatientKey(appointment)) === String(patientKey)
      )
      .sort((a, b) => {

        const first = new Date(
          `${a?.slotDate || ''} ${a?.slotTime || ''}`
        ).getTime()

        const second = new Date(
          `${b?.slotDate || ''} ${b?.slotTime || ''}`
        ).getTime()

        return second - first

      })

  }


  const getPatientList = () => {

    const patients = new Map()

    appointments.forEach(appointment => {

      const key = getPatientKey(appointment)

      if (!patients.has(String(key))) {

        patients.set(String(key), {
          key,
          name: getPatientName(appointment),
          image:
            appointment?.userData?.image ||
            appointment?.userData?.profileImage ||
            appointment?.userId?.image ||
            '',
          gender:
            appointment?.userData?.gender ||
            appointment?.userId?.gender ||
            '',
          dob:
            appointment?.userData?.dob ||
            appointment?.userId?.dob ||
            '',
          email:
            appointment?.userData?.email ||
            appointment?.userId?.email ||
            appointment?.userEmail ||
            appointment?.email ||
            '',
          phone:
            appointment?.userData?.phone ||
            appointment?.userId?.phone ||
            appointment?.phone ||
            '',
          appointments: 0,
          completed: 0,
          cancelled: 0,
          upcoming: 0,
          lastVisit: null
        })

      }

      const patient = patients.get(String(key))

      patient.appointments += 1

      if (appointment?.isCompleted) {
        patient.completed += 1
      }

      if (appointment?.cancelled) {
        patient.cancelled += 1
      }

      if (!appointment?.cancelled && !appointment?.isCompleted) {
        patient.upcoming += 1
      }

      if (appointment?.slotDate) {

        if (
          !patient.lastVisit ||
          new Date(appointment.slotDate) >
            new Date(patient.lastVisit)
        ) {
          patient.lastVisit = appointment.slotDate
        }

      }

    })

    return Array.from(patients.values())
      .sort((a, b) => {

        if (!a.lastVisit) return 1
        if (!b.lastVisit) return -1

        return new Date(b.lastVisit) - new Date(a.lastVisit)

      })

  }


  const value = {
    dToken,
    setDToken,

    backendUrl,

    appointments,
    setAppointments,

    doctorData,
    setDoctorData,

    getAppointments,
    getDoctorProfile,

    changeAvailability,

    updateDoctorProfile,

    cancelAppointment,

    getPatientKey,
    getPatientName,
    getPatientHistory,
    getPatientList
  }


  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider