import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctors, setDoctors] = useState([])


  const calculateAge = (dob) => {

    const today = new Date()
    const birthDate = new Date(dob)

    let age =
      today.getFullYear() -
      birthDate.getFullYear()

    const month =
      today.getMonth() -
      birthDate.getMonth()

    if (
      month < 0 ||
      (
        month === 0 &&
        today.getDate() < birthDate.getDate()
      )
    ) {
      age--
    }

    return age
  }


  const getDoctorsData = async () => {

    try {

      const { data } = await axios.get(
        backendUrl + '/api/doctor/list'
      )

      if (data.success) {
        setDoctors(data.doctors)
      }

    } catch (error) {

      console.log(
        'GET DOCTORS ERROR:',
        error.response?.data ||
        error.message
      )

    }
  }


  useEffect(() => {
    getDoctorsData()
  }, [])


  const value = {
    calculateAge,
    doctors,
    setDoctors,
    getDoctorsData,
    backendUrl
  }


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider