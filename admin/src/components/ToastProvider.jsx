import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={false}
      newestOnTop
      closeOnClick={false}
      pauseOnHover
      pauseOnFocusLoss={false}
      draggable={false}
      closeButton
      limit={5}
      theme="light"
      style={{
        zIndex: 99999999
      }}
    />
  )
}

export default ToastProvider