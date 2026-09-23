import { createContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState(
    localStorage.getItem('aToken') || ''
  )

  const [doctors, setDoctors] = useState([])

  const [appointments, setAppointments] = useState([])

  const [dashData, setDashData] = useState(null)

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL


  // Get all doctors
  const getAllDoctors = async () => {

    try {

      const { data } = await axios.post(
        backendUrl + '/api/admin/all-doctors',
        {},
        {
          headers: {
            atoken: aToken
          }
        }
      )

      if (data.success) {

        setDoctors(data.doctors)

      } else {

        toast.error(data.message)

      }

    } catch (error) {

      console.log(
        'GET DOCTORS ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to get doctors'
      )
    }
  }


  // Change doctor availability
  const changeAvailable = async (docId) => {

    try {

      const { data } = await axios.post(
        backendUrl +
        '/api/admin/change-availability',
        {
          docId
        },
        {
          headers: {
            atoken: aToken
          }
        }
      )

      if (data.success) {

        setDoctors(
          prevDoctors =>
            prevDoctors.map(item =>
              item._id === docId
                ? {
                    ...item,
                    available: data.available
                  }
                : item
            )
        )

        toast.success(
          data.available
            ? 'Doctor is now available'
            : 'Doctor is now unavailable'
        )

      } else {

        toast.error(
          data.message
        )

      }

    } catch (error) {

      console.log(
        'CHANGE AVAILABILITY ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to change availability'
      )
    }
  }


  // Get all appointments
  const getAllAppointments = async () => {

    try {

      const { data } = await axios.get(
        backendUrl +
        '/api/admin/appointments',
        {
          headers: {
            atoken: aToken
          }
        }
      )

      if (data.success) {

        setAppointments(
          data.appointments
        )

      } else {

        toast.error(
          data.message
        )

      }

    } catch (error) {

      console.log(
        'GET APPOINTMENTS ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to get appointments'
      )
    }
  }


  // Cancel appointment by admin
  const cancelAppointment = async (appointmentId) => {

    try {

      const { data } = await axios.post(
        backendUrl +
        '/api/admin/cancel-appointment',
        {
          appointmentId
        },
        {
          headers: {
            atoken: aToken
          }
        }
      )

      if (data.success) {

        toast.success(
          data.message
        )

        await getAllAppointments()

      } else {

        toast.error(
          data.message
        )

      }

    } catch (error) {

      console.log(
        'ADMIN CANCEL ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to cancel appointment'
      )
    }
  }


  // Get dashboard data
  const getDashData = async () => {

    try {

      const { data } = await axios.get(
        backendUrl +
        '/api/admin/dashboard',
        {
          headers: {
            atoken: aToken
          }
        }
      )

      if (data.success) {

        setDashData(data.dashData)

      } else {

        toast.error(
          data.message
        )

      }

    } catch (error) {

      console.log(
        'DASHBOARD ERROR:',
        error
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to get dashboard data'
      )
    }
  }


  const value = {

    aToken,
    setAToken,

    backendUrl,

    doctors,
    setDoctors,
    getAllDoctors,
    changeAvailable,

    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,

    dashData,
    setDashData,
    getDashData

  }


  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider