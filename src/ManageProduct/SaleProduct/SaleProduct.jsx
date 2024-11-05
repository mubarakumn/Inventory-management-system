import { useEffect, useState } from 'react'
import './SaleProduct.css'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import ToggleMode from '../../Components/ToggleMode/ToggleMode'
import { useUser } from '../../Context/UserContext'
import SideBar from '../../Components/SideBar/SideBar'


const SaleProduct = ({ mode, toggleMode }) => {
  const [products, setProducts] = useState([])
  const [productToTable, setProductToTable] = useState([])
  const [selectedProduct, setselectedProduct] = useState(null)
  const navigate = useNavigate();

  const userData = useUser()

  // console.log(userData);

  // APi for Getting Product
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/product/getProduct", { withCredentials: true})
        if (response) {
          setProducts(response.data.response)
        }
      } catch (error) {
        toast.error("Failed to fetch products. Please try again later.");
        console.log(error);
      }
    }
    getProducts()
  }, [])

  // Function to set product as Selected Product
  const handleSetSelectedProduct = (e) => {
    const productId = e.target.value;
    const product = products.find(item => item._id === productId)
    setselectedProduct(product)
  }

  // add product to table
  const handleAddProductToTable = () => {
    if (selectedProduct !== null) {
      setProductToTable(prev => (
        [
          ...prev,
          { ...selectedProduct, quantity: 1 }
        ]
      ))
    } else {
      toast.error("Select product or Already exists!");
    }
    setselectedProduct(null)
  }

  //Handle quantity Change
  const handleQuantityChange = (productId, newQuantity) => {
    setProductToTable(prevTable => (
      prevTable.map(item => (item._id === productId ? { ...item, quantity: Number(newQuantity) } : item)
      ))
    )
  }

  //Remove product from Table
  const handleRemove = (productId) => {
    setProductToTable(prevTable => prevTable.filter(item => item._id !== productId))
  }


  return (
    <div className={!mode ? "dashboard-container" : "dashboard-container dashboard-container-dark"}>
      <SideBar role={userData.role} mode={mode} />
      <main className="main-content">
        <ToastContainer />
        <div className="main-heading">
          <div>
            <h1>Sales</h1>
            <p>Here you can see an overview of your activities and manage settings.</p>
          </div>
          <ToggleMode ischecked={mode} handleMode={toggleMode} />
        </div>
        <div className="flexCol formContainer">
          <div className='flex gap salesSelect'>
            <div className="selectContainer">
              <label htmlFor="productName">Select Product</label>
              <select className="select" name="productName" key={"fjy5r75"} onChange={handleSetSelectedProduct}>
              <option >Select Product</option>
                {
                  products.map((product) => (
                    <>
                      <option key={product._id} value={product._id}>{product.productName}</option>
                    </>
                  ))
                }
              </select>
            </div>
            <div className="formActions">
              <button type="submit" onClick={handleAddProductToTable}>Add Product</button>
            </div>
          </div>
          <div className="saleTable-container">
            <table className='saleTable'>
              <thead >
                <tr>
                  <td>Product name</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Remove</td>
                </tr>
              </thead>
              <tbody>
                {productToTable.map(product => (
                  <tr key={product._id}>
                    <td>{product.productName}</td>
                    <td><input type="number" placeholder='Enter quantity' value={product.quantity} onChange={(e) => handleQuantityChange(product._id, e.target.value)} /></td>
                    <td>&#8358; {product.quantity <= 1 ? product.sellingPrice : (product.sellingPrice * product.quantity)}<sup className='priceSpan'>{product.quantity <= 1 ? " *per one" : " *total"}</sup></td>
                    <td><button onClick={() => handleRemove(product._id)} >Remove</button></td>
                  </tr>
                ))

                }
                {
                  productToTable.length === 0 ? ("") :
                    <tr colSpan={2}>
                      <td >Total :</td>
                      <td colSpan={3}>
                        &#8358; {productToTable.reduce((acc, product) => acc + (product.quantity * product.sellingPrice), 0)}
                      </td>
                    </tr>
                }
              </tbody>
            </table>
          </div>
          <div className="flex formActions" style={{ margin: "10px", width: "100%", justifyContent: "flex-end" }}>
            {
              productToTable.length === 0 ? ("") : (
                <button style={{ width: "150px" }} onClick={() => navigate('/payment', { state: { productToTable } })}>Proceed</button>
              )
            }
          </div>
        </div>
      </main>
    </div>
  )
}

export default SaleProduct