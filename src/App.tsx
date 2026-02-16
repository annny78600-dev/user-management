import { ToastContainer } from "react-toastify";
import UsersPage from "./pages/UsersPage"
import "react-toastify/dist/ReactToastify.css";



function App() {
  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />
     <UsersPage/>
    </>
  )
}

export default App
