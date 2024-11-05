import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import SideBar from '../Components/SideBar/SideBar';
import ToggleMode from '../Components/ToggleMode/ToggleMode';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { useUser } from '../Context/UserContext';

const Dashboard = ({ mode, toggleMode, toggleView }) => {
  const [products, setProducts] = useState([])
  const [users, setUsers] = useState([])
  const [todaysSales, setTodaysSales] = useState([])
  const [time, setTime] = useState()
  const navigate = useNavigate()
  
  const userData = useUser();

  const todaysDate = new Date();
function tm (){
    setTime(todaysDate.toLocaleTimeString());
  }
setTimeout(() => {
  tm()
}, 1000);

  let role = userData.role

  useEffect(() => {
    const getdata = async () => {
      const products = await axios.get('http://localhost:4000/product/getProduct', {withCredentials: true})
      if (products) {
        setProducts(products.data.response)
      }
      const users = await axios.get('http://localhost:4000/user/getUsers', { withCredentials: true})
      if (users) {
        setUsers(users.data)
      }
      // Sales Data for Today
      const sales = await axios.get('http://localhost:4000/sale/getSales', { withCredentials: true})
      if (sales) {
        const salesdata = sales.data
        const FillteredSales =  sales.data.filter(d=>{
             const saleDate =  new Date(d.date);  
            return saleDate.toLocaleDateString() === todaysDate.toLocaleDateString()
        })
        setTodaysSales(FillteredSales)
      }
    }
    getdata()
  }, []);

  const columns = [
    { name: "Date", selector: row => new Date(row.date).toLocaleDateString() },
    { name: "Cashier", selector: row => row.cashierId },
    { name: "Total Amount", selector: row => row.totalAmount },
    { name: "Payment Method", selector: row => row.PaymentMethod },
  ]
  const userColumns = [
    {name: "Name", selector: row => row.name},
    {name: "Email", selector: row => row.email},
  ]
  
  return (
    <div className="dashboard-container">
      <ToastContainer />
      <SideBar role={userData.role} mode={mode} toggleView={toggleView} />
      <main className="main-content">
        <div className="main-heading">
          <div className='flex' style={{alignItems: "flex-start"}}>
            <div>
            <h1>Welcome! {userData.name} </h1>
            <p>Here you can see an overview of your activities and manage settings.</p>
            </div>
            <h5>Time: {time}</h5>
          </div>
          <ToggleMode ischecked={mode} handleMode={toggleMode} />
        </div>
        <div className="Activities">
          <div className="status">
            {role === "admin" && (
              <>
            <div className="flexCol box" onClick={() => { navigate('/updateUser') }}>
              Total Users
              <p>{users.length}</p>
            </div>
            <div className="flexCol box" onClick={() => { navigate('/updateProduct') }}>
              Total Products
              <p>{products.length}</p>
            </div>
            <div className="flexCol box" >
             Today's Sales
              <p>{todaysSales.length}</p>
            </div>
              </>
            )}
          </div>
          <div className="actions">
            <h2  className="actionHead">Actions </h2>
            <hr className='hr' />
            <div className="actionButtons">
              <button className='actionBtn' onClick={() => { navigate('/saleProduct') }}>Sale product </button>
              {
                role === "admin" &&
                <>
                  <button className='actionBtn' onClick={() => { navigate('/updateProduct') }}>Manage product </button>
                  <button className='actionBtn' onClick={() => { navigate('/updateUser') }}>Manage User </button>
                </>
              }
              {
                role === 'staff' && <button className='actionBtn' onClick={() => { toast.error("Action Is Only By Admin") }}>Other Actions</button>
              }
            </div>
            <div className="flex details">
              <div className="left">
                <h4>Recent Sales</h4>
                <div>
                  <DataTable
                    columns={columns}
                    data={todaysSales}
                    pagination
                  />
                </div>
              </div>
              <div className="right">
              {role === "admin" && (
                <>
                <h4>Users</h4>
                <div>
                  <DataTable
                  columns={userColumns}
                  data={users}
                  />
                  </div>
                </>
              )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
