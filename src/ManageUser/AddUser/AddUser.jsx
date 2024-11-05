import { useState } from 'react'
import './AddUser.css'
import axios from 'axios'
import ToggleMode from '../../Components/ToggleMode/ToggleMode'
import { toast, ToastContainer } from 'react-toastify'
import { useUser } from '../../Context/UserContext'
import SideBar from '../../Components/SideBar/SideBar'

const AddUser = ({ mode, toggleMode }) => {
    const userData = useUser()
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }) 

    const Submit = async (e) => {
        e.preventDefault();

        try {
            if (formData.password !== formData.confirmPassword) {
                return toast.error("Password doesn't matched!")
            }
            const response = await axios.post("http://localhost:4000/user/register", formData, {withCredentials: true,})
            if (response) {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    setFormdata({
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    })
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.message)
            } else {
                toast.error("Something Went Wrong!")
            }
        }
    }

    return (
        <div className={!mode ? "dashboard-container" : "dashboard-container dashboard-container-dark"}>
            <SideBar role={userData.role} mode={mode} />
            <main className="main-content">
                <div className="main-heading">
                    <div>
                        <h1>New user </h1>
                        <p>Here you can see an overview of your activities and manage settings.</p>
                    </div>
                    <ToggleMode ischecked={mode} handleMode={toggleMode} />
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={4000} 
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <div className="flex formContainer">
                    <form onSubmit={Submit}>
                        <div className="form-heading">
                            <h2>Add User</h2>
                        </div>
                        <div className="formFields">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Mubarak" name='name' value={formData.name} onChange={(e) => { setFormdata(prev => ({ ...prev, name: e.target.value })) }} required />
                        </div>
                        <div className="formFields">
                            <label htmlFor="email">Email</label>
                            <input type="text" placeholder="eample@gmail.com" name='email' value={formData.email} onChange={(e) => { setFormdata(prev => ({ ...prev, email: e.target.value })) }} required />
                        </div>
                        <div className="flex gap formFields">
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" placeholder="v6b^5a4#3MrrH" name='password' value={formData.password} onChange={(e) => { setFormdata(prev => ({ ...prev, password: e.target.value })) }} required />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input type="password" placeholder="v6b^5a4#3MrrH" name='confirmPassword' value={formData.confirmPassword} onChange={(e) => { setFormdata(prev => ({ ...prev, confirmPassword: e.target.value })) }} required />
                            </div>
                        </div>
                        <div className="formActions">
                            <button type="submit" >Add User</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AddUser