import React from 'react'
import { useNavigate } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
const Unauthorized = () => {
    const navigate = useNavigate()
    return (
        <div className="dashboard-container">
            <SideBar/>
            <main className="flex main-content">
                <div>
                    <h1>403 - Unauthorized</h1>
                    <p>You do not have permission to access this page.</p>
                    <button className='btn' onClick={()=>{ navigate('/dashboard')}}>Back to dashboard</button>
                </div>
            </main>
        </div>
    )
}

export default Unauthorized