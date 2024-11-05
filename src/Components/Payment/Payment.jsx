import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../Context/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import './Payment.css'
import axios from 'axios';
import SideBar from '../SideBar/SideBar';

const Payment = ({mode, toggleMode}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    PaymentMethod: '',
    discount: 0
  })
  const location = useLocation()
  const userData = useUser()

  const navigate = useNavigate()
  const selectedItems = location.state.productToTable
  // console.log(selectedItems);

const handleSales = async () => {
    const salesData = {
      items: selectedItems.map(product => (
        {
          productId: product._id,
          quantity: product.quantity,
          sellingPrice: product.sellingPrice,
          purchasePrice: product.purchasePrice,
        }
      )),
      cashierId: userData.name,
      customerName: formData.customerName,
      PaymentMethod: formData.PaymentMethod,
      discount: { type: "Percentage", amount: formData.discount }
    }
    // console.log("Sales data:", salesData);
    try {
      const response = await axios.post('http://localhost:4000/sale/addSales', salesData, { withCredentials: true });
      if (response) {
        navigate('/receipt', { state: { salesData } });
        // console.log("it works dsf");
      } else {
        console.log(response)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message);
    }
  };

  const handleChange = (e)=>{
    const {name, value} = e.target
    setFormData(prev=>({
      ...prev,
      [name]: value
    }))
  }

  const subTotal = selectedItems.reduce((acc, product) => acc + (product.quantity * product.sellingPrice), 0)

  return (
    <div className="dashboard-container">
      <SideBar role={userData.role} mode={mode} />
      <main className="main-content">
        <ToastContainer/>
        <div className="flex gap paymentcontent">
          <div className="left">
            <div>Payment</div>
            <table className='saleTable'>
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Items</td>
                  <td>Price</td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                {
                  selectedItems.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.productName}</td>
                      <td>{item.sellingPrice}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))
                }
                {
                  selectedItems.length === 0 ? ("") :
                    <tr colSpan={2}>
                      <td >Total :</td>
                      <td colSpan={3}>
                      &#8358;
                        {
                          
                          formData.discount > 0 ?
                            subTotal - (subTotal * formData.discount / 100)
                            :
                            subTotal
                        }
                      </td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
          <div className="right">
            <form action="">
              <div className="formField">
                <label htmlFor=""></label>
                <input type="text" name='customerName'  placeholder='Customer Name' value={formData.customerName} onChange={handleChange}/>
              </div>
              <div className="formFields">
                <select name="paymentMethod" id="" onChange={handleChange}>
                  <option value="">Payment method</option>
                  <option value="Cash payment">Cash payment</option>
                  <option value="creditCard">Credit Card</option>
                </select>
              </div>
              <div className="formField">
                <select name="discount" id="" onChange={handleChange}>
                  <option value="">Select Discount</option>
                  <option value={5}>5%</option>
                  <option value={10}>10%</option>
                </select>
              </div>
            </form>
          <button className='btn' onClick={handleSales}>Proceed</button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Payment