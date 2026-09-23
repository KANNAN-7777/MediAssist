import { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import ToastProvider from './components/ToastProvider'

import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'

import UnifiedLogin from './pages/UnifiedLogin'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Admin/Dashboard'
import DoctorsList from './pages/Admin/DoctorsList'
import AllApointments from './pages/Admin/AllApointments'
import AddDoctor from './pages/Admin/AddDoctor'

import DoctorDashboard from './pages/Doctor/DoctorDashboard'
import DoctorAppointments from './pages/Doctor/DoctorAppointments'
import DoctorProfile from './pages/Doctor/DoctorProfile'
import PatientHistory from './pages/Doctor/PatientHistory'


const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3fbfd] text-[#082b3a]">

      <Navbar />

      <div className="flex min-h-[calc(100vh-68px)] items-start">

        <Sidebar />

        <main className="min-w-0 flex-1">

          <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            {children}
          </div>

        </main>

      </div>

    </div>
  )
}


const DoctorLayout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f3fbfd] text-[#082b3a]">

      <Navbar />

      <div className="flex min-h-[calc(100vh-68px)] items-start">

        <Sidebar />

        <main className="min-w-0 flex-1">

          <div className="mx-auto w-full max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            {children}
          </div>

        </main>

      </div>

    </div>
  )
}


const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <>

      {/* GLOBAL TOAST */}
      <ToastProvider />

      <Routes>

        {/* ================= LOGIN ================= */}

        <Route
          path="/"
          element={<UnifiedLogin />}
        />

        <Route
          path="/login"
          element={<UnifiedLogin />}
        />

        <Route
          path="/admin-login"
          element={<UnifiedLogin />}
        />

        <Route
          path="/doctor-login"
          element={<UnifiedLogin />}
        />


        {/* ================= ADMIN ================= */}

        <Route
          path="/admin-dashboard"
          element={
            aToken ? (
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/all-appointments"
          element={
            aToken ? (
              <AdminLayout>
                <AllApointments />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/add-doctor"
          element={
            aToken ? (
              <AdminLayout>
                <AddDoctor />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/doctor-list"
          element={
            aToken ? (
              <AdminLayout>
                <DoctorsList />
              </AdminLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        {/* ================= DOCTOR ================= */}

        <Route
          path="/doctor-dashboard"
          element={
            dToken ? (
              <DoctorLayout>
                <DoctorDashboard />
              </DoctorLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/doctor-appointments"
          element={
            dToken ? (
              <DoctorLayout>
                <DoctorAppointments />
              </DoctorLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        <Route
          path="/patient-history"
          element={
            dToken ? (
              <DoctorLayout>
                <PatientHistory />
              </DoctorLayout>
            ) : (
              <Navigate to="/doctor-login" replace />
            )
          }
        />

        <Route
          path="/doctor-profile"
          element={
            dToken ? (
              <DoctorLayout>
                <DoctorProfile />
              </DoctorLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

    </>
  )
}

export default App