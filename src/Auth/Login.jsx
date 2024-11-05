import { useNavigate } from 'react-router-dom';
import './Login.css'
import axios from 'axios'
import { useState } from 'react';

import {toast, ToastContainer} from 'react-toastify'
const Login = () => {
  const [formData, setFormData] = useState({email: '', password:''})
  const navigate = useNavigate()

    const Submit = async(e)=>{
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:4000/user/login", formData, { withCredentials: true})
          if(res.status === 200){
            toast.success(res.data.message);
            setTimeout(() => {
              setFormData({ email: '', password: '' }); 
              navigate('dashboard')
            }, 1000);
          }
        } catch (error) {
          if(error.response && error.response.data){
            toast.error(error.response.data.message)
          }else{
            toast.error("Something Went Wrong!")
          }
        }
    }

    return (
      <div className="container">
        <ToastContainer
          position="top-right"
          autoClose={800}  // Close after 5 seconds
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
        />
        <div className="form">
          <form onSubmit={Submit}>
            <div className="form-heading">
              <h2>Login</h2>
            </div>
            <div className="formFields">
              <input type="text" placeholder="Email" name='email' value={formData.email} onChange={(e)=>{setFormData(prev => ({...prev, email: e.target.value}))}}/>
            </div>
            <div className="formFields">
              <input type="password" placeholder="Password" name='password' value={formData.password} onChange={(e)=>{setFormData(prev =>({ ...prev, password: e.target.value}))}}/>
            </div>
            <div className="formActions">
              <button type="submit" >Login</button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;
  