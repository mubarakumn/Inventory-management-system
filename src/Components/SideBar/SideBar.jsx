import { useNavigate } from 'react-router-dom'
import './SideBar.css'
import { BiHomeSmile, BiLogOutCircle } from "react-icons/bi";
import { MdOutlineShoppingBasket, MdReport, MdSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { AiFillShop } from "react-icons/ai";
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';


const SideBar = ({ role, mode, toggleView }) => {

    const [showSettings, setShowSettings] = useState(false)
    const navigate = useNavigate()
    // Logout function
    const logout = async () => {
        const out = await axios.get('http://localhost:4000/user/logout ', { withCredentials: true })
        if (out) {
            toast.success(out.data.message)
            setTimeout(() => {
                navigate('/')
            }, 800);
        } else {
            toast.error(out.data.message)
        }
    }
    return (
        <aside className={!mode ? "sidebar" : "sidebar sidebar-dark"}>
            <ToastContainer
                position="top-right"
                autoClose={500}
            />
            <div className="sidebar-header">
                <h2>Dashboard
                </h2>
                <span className='roledisplay'>{role}</span>

            </div>
            <ul className="sidebar-menu">
                <li onClick={() => { navigate('/dashboard') }}>
                    <BiHomeSmile className='icon' />
                    <span>

                        Home
                    </span>
                </li>
                <li onClick={() => { navigate('/saleProduct') }}>
                    <MdOutlineShoppingBasket className='icon' />
                    <span>

                        Sale Product
                    </span>
                </li>
                {role === "admin" && (
                    <>
                        <li onClick={() => { navigate('/updateProduct') }}>
                            <AiFillShop className='icon' />
                            <span>
                                Manage product

                            </span>
                        </li>
                        <li onClick={() => { navigate('/updateUser') }}>
                            <FaUsers className='icon' />
                            <span>

                                Manage User
                            </span>
                        </li>
                        <li onClick={() => { navigate("/generateReport") }}>
                            <MdReport className='icon' />
                            <span>

                                Generate Report
                            </span>
                        </li>
                    </>
                )}
                <li onClick={() => setShowSettings(!showSettings)}>
                    <MdSettings className='icon' />
                    <span>
                        Settings

                    </span>
                    <div className={showSettings ? "settings" : "hidden"}>
                        <ul>
                            <li>
                                <input type="checkbox" id='view' className='toggleView' onChange={() => { setShowSettings(false), toggleView() }} />
                                <label htmlFor="view">Switch View</label>
                            </li>
                            <li>
                                <span onClick={() => { logout() }}>
                                    <BiLogOutCircle className='icon' />
                                    Logout
                                </span>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </aside>
    )
}

export default SideBar