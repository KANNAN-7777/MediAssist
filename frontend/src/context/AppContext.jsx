import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

export const AppContext = createContext()

const AppProvider = (props) => {
  const currencySymbol = '$'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])

  const [token, setToken] = useState(
    localStorage.getItem('token') || ''
  )

  const [userData, setUserData] = useState(null)

  // Get all doctors
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/doctor/list'
      )

      if (data.success) {
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(
        'DOCTOR ERROR:',
        error.response?.data || error.message
      )

      toast.error(
        error.response?.data?.message ||
        'Failed to load doctors'
      )
    }
  }

  // Get logged-in user profile
  const loadUserProfileData = async () => {
    if (!token) {
      setUserData(null)
      return
    }

    try {
      const { data } = await axios.get(
        backendUrl + '/api/user/get-profile',
        {
          headers: {
            token
          }
        }
      )

      if (data.success) {
        setUserData(data.userData)
      } else {
        toast.error(data.message)
        setUserData(null)
      }
    } catch (error) {
      console.log(
        'PROFILE ERROR:',
        error.response?.data || error.message
      )

      setUserData(null)

      toast.error(
        error.response?.data?.message ||
        'Failed to load user profile'
      )
    }
  }

  // Load doctors when app starts
  useEffect(() => {
    getDoctorsData()
  }, [])

  // Load user profile whenever authentication changes
  useEffect(() => {
    loadUserProfileData()
  }, [token])

  const value = {
    doctors,
    currencySymbol,
    backendUrl,
    getDoctorsData,

    token,
    setToken,

    userData,
    setUserData,
    loadUserProfileData
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppProvider