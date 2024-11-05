import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Auth/Login'
import Dashboard from './Dashboard/Dashboard'
import AddProduct from './ManageProduct/AddProduct/AddProduct'
import SaleProduct from './ManageProduct/SaleProduct/SaleProduct'
import AddUser from './ManageUser/AddUser/AddUser'
import 'react-toastify/ReactToastify.css'
import { Receipt } from './Components/Receipt/Receipt'
import uselocalStorage from "use-local-storage"
import GenerateReport from './Components/GenerateReport/GenerateReport'
import UpdateUser from './ManageUser/UpdateUser/UpdateUser'
import UpdateProduct from './ManageProduct/UpdateProduct/UpdateProduct'
import { ProtectedRoute } from './Auth/ProtectedRoute/ProtectedRoute'
import Unauthorized from './Components/Unauthorized/Unauthorized'
import Payment from './Components/Payment/Payment'

const App = () => {
  const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [mode, setMode] = uselocalStorage("isdark", preference);
  const [smallView, setSmallView] = uselocalStorage("smallView", false);

  function toggleMode() {
    setMode(!mode)
  }

  function toggleView() {
    console.log("View Change");
    setSmallView(!smallView)
  }
  return (
    <BrowserRouter>
      <div className='app' data-theme={mode ? "dark" : "light"} data-view={!smallView ? 'fullView' : "smallView"}>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/unauthorized' element={<Unauthorized  />} />
          <Route path='/dashboard' element={
            <ProtectedRoute allowedRoles={['admin', 'staff']} >
              <Dashboard  mode={mode} toggleMode={toggleMode} toggleView={toggleView} />
            </ProtectedRoute>
          } />
          <Route path='/saleProduct' element={
            <ProtectedRoute allowedRoles={['admin','staff']} >
              <SaleProduct mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/addProduct' element={
            <ProtectedRoute allowedRoles={['admin']} >
              <AddProduct mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/UpdateProduct' element={
            <ProtectedRoute allowedRoles={['admin']} >
              <UpdateProduct mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/addUser' element={
            <ProtectedRoute allowedRoles={['admin']} >
              <AddUser mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/updateUser' element={
            <ProtectedRoute allowedRoles={['admin']} >

              <UpdateUser mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/payment' element={
            <ProtectedRoute allowedRoles={['admin','staff']}>
              <Payment mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/receipt' element={
            <ProtectedRoute allowedRoles={['admin','staff']}>
              <Receipt mode={mode} toggleMode={toggleMode} />
            </ProtectedRoute>
          } />
          <Route path='/generateReport' element={
            <ProtectedRoute allowedRoles={['admin']} >
              <GenerateReport mode={mode} toggleMode={toggleMode} toggleView={toggleView} />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App