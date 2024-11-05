import { useState } from 'react'
import './AddProduct.css'
import axios from 'axios'
import ToggleMode from '../../Components/ToggleMode/ToggleMode'
import { toast, ToastContainer } from 'react-toastify'
import { useUser } from '../../Context/UserContext'
import SideBar from '../../Components/SideBar/SideBar'

const AddProduct = ({ mode, toggleMode}) => {
    const userData = useUser();
    const [formData, setFormdata] = useState({
        productName: '',
        brand: '',
        quantity: '',
        description: '',
        purchasePrice: '',
        sellingPrice: '',
    })

    const Submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/product/addProduct", formData, { withCredentials: true})
            if (response) {
                if (response.status === 200) {
                    toast.success(response.data.message)
                    setFormdata({
                        productName: '',
                        brand: '',
                        quantity: '',
                        description: '',
                        purchasePrice: '',
                        sellingPrice: '',
                    })
                }else{
                    toast.error("Something Went Wrong!")
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
        <div className={!mode ? "dashboard-container" : "dashboard-container dashboard-container-dark" }>
      <SideBar role={userData.role} mode={mode}/>
      <main className="main-content">
                <div className="main-heading">
                    <div>
                        <h1>Welcome to the Admin Dashboard</h1>
                        <p>Here you can see an overview of your activities and manage settings.</p>
                    </div>
                    <ToggleMode ischecked={mode} handleMode={toggleMode}/>
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
                <div className='flex formContainer'>
                    <form onSubmit={Submit} >
                        <div className="form-heading">
                            <h2>Add Product</h2>
                        </div>
                        <div className="formFields">
                            <label htmlFor="productName">Product Name</label>
                            <input type="text" placeholder="Galaxy S10" name='productName' value={formData.productName} onChange={(e) => { setFormdata(prev => ({ ...prev, productName: e.target.value })) }} required/>
                        </div>
                        <div className="formFields">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" placeholder="Samsung" name='brand' value={formData.brand} onChange={(e) => { setFormdata(prev => ({ ...prev, brand: e.target.value })) }} required/>
                        </div>
                        <div className="formFields">
                            <label htmlFor="Quantity">Quantity</label>
                            <input type="text" placeholder="Enter Quantity" name='Quantity' value={formData.quantity} onChange={(e) => { setFormdata(prev => ({ ...prev, quantity: e.target.value })) }} required/>
                        </div>
                        <div className="flex gap formFields">
                            <div>
                                <label htmlFor="purchasePrice">Purchase Price</label>
                                <input type="number" placeholder="N 10,000" name='purchasePrice' value={formData.purchasePrice} onChange={(e) => { setFormdata(prev => ({ ...prev, purchasePrice: e.target.value })) }} required/>
                            </div>
                            <div>
                                <label htmlFor="sellingPrice">Selling Price</label>
                                <input type="number" placeholder="N 10,000" name='sellingPrice' value={formData.sellingPrice} onChange={(e) => { setFormdata(prev => ({ ...prev, sellingPrice: e.target.value })) }} required/>
                            </div>
                        </div>
                        <div className="formFields">
                            <label htmlFor="description">Description (Optiional)</label>
                            <input type="text" placeholder="the product is..." name='description' value={formData.description} onChange={(e) => { setFormdata(prev => ({ ...prev, description: e.target.value })) }} />
                        </div>
                        <div className="formActions">
                            <button type="submit" >Add Product</button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}

export default AddProduct